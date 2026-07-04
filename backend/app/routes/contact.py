import logging
from datetime import datetime, timedelta
from typing import Dict
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse
from app.core.database import get_db
from app.core.config import settings
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter()

# In-memory rate limiting (IP -> [timestamps])
# TODO: Replace with Redis for production
rate_limit_store: Dict[str, list] = {}
RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW_HOURS = 1

logger = logging.getLogger(__name__)

def check_rate_limit(ip: str) -> bool:
    now = datetime.utcnow()
    window_start = now - timedelta(hours=RATE_LIMIT_WINDOW_HOURS)
    
    if ip not in rate_limit_store:
        rate_limit_store[ip] = []
    
    # Clean old entries
    rate_limit_store[ip] = [ts for ts in rate_limit_store[ip] if ts > window_start]
    
    if len(rate_limit_store[ip]) >= RATE_LIMIT_MAX:
        return False
    
    rate_limit_store[ip].append(now)
    return True

def send_email(to_email: str, subject: str, body: str):
    if not settings.SMTP_USER or not settings.SMTP_PASS:
        logger.warning("SMTP credentials not configured - skipping email")
        return
    
    msg = MIMEMultipart()
    msg["From"] = settings.SMTP_FROM
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))
    
    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASS)
            server.send_message(msg)
        logger.info(f"Email sent to {to_email}")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")

@router.post("/contact", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(
    request: Request,
    lead_data: LeadCreate,
    db: Session = Depends(get_db)
):
    # Honeypot check
    if lead_data.website:
        logger.info(f"Honeypot triggered for submission")
        raise HTTPException(status_code=422, detail="Invalid submission")
    
    # Rate limiting
    client_ip = request.client.host if request.client else "unknown"
    if not check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(
            status_code=429,
            detail="Too many submissions. Please try again later."
        )
    
    # Create lead
    db_lead = Lead(
        full_name=lead_data.full_name,
        company_name=lead_data.company_name,
        email=lead_data.email,
        phone_number=lead_data.phone_number,
        service_required=lead_data.service_required,
        budget_range=lead_data.budget_range,
        message=lead_data.message,
        status="new"
    )
    
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    
    logger.info(f"Lead created: id={db_lead.id}")
    
    # Send notification email
    notification_body = f"""
    New Lead from Sole-Tech Contact Form
    
    Name: {db_lead.full_name}
    Company: {db_lead.company_name or 'N/A'}
    Email: {db_lead.email}
    Phone: {db_lead.phone_number or 'N/A'}
    Service: {db_lead.service_required}
    Budget: {db_lead.budget_range}
    
    Message:
    {db_lead.message}
    """
    send_email(settings.NOTIFICATION_EMAIL, f"New Lead: {db_lead.full_name}", notification_body)
    
    # Send auto-reply
    auto_reply_body = f"""
    Thank you for reaching out to Sole-Tech!
    
    We've received your inquiry and will respond within 1 business day.
    
    Best regards,
    The Sole-Tech Team
    """
    send_email(lead_data.email, "Thanks for contacting Sole-Tech!", auto_reply_body)
    
    return LeadResponse(
        id=db_lead.id,
        created_at=db_lead.created_at,
        status=db_lead.status
    )