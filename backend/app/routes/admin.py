import os
from datetime import datetime, timedelta
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from jose import JWTError, jwt
from passlib.context import CryptContext
from enum import Enum
from app.core.config import settings

router = APIRouter()

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return email
    except JWTError:
        raise credentials_exception

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_token(token, credentials_exception)

class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    CLOSED = "closed"

class LeadResponse(BaseModel):
    id: str
    name: str
    company: Optional[str] = None
    email: str
    service_required: str
    budget: Optional[str] = None
    status: LeadStatus
    date_submitted: datetime

class Token(BaseModel):
    access_token: str
    token_type: str

_HASHED_ADMIN_PASSWORD = pwd_context.hash(settings.ADMIN_PASSWORD)

@router.post("/auth/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != settings.ADMIN_EMAIL:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not pwd_context.verify(form_data.password, _HASHED_ADMIN_PASSWORD):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.lead import Lead

@router.get("/admin/leads", response_model=List[LeadResponse])
async def get_leads(
    current_user: str = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100,
    status: Optional[LeadStatus] = None,
    service_required: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Lead)
    
    if status:
        query = query.filter(Lead.status == status.value)
    if service_required:
        query = query.filter(Lead.service_required.ilike(f"%{service_required}%"))
    
    leads = query.offset(skip).limit(limit).all()
    
    return [
        LeadResponse(
            id=str(lead.id),
            name=lead.full_name,
            company=lead.company_name,
            email=lead.email,
            service_required=lead.service_required,
            budget=lead.budget_range,
            status=LeadStatus(lead.status),
            date_submitted=lead.created_at,
        )
        for lead in leads
    ]

@router.patch("/admin/leads/{lead_id}", response_model=LeadResponse)
async def update_lead_status(
    lead_id: str,
    status: LeadStatus,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    
    lead.status = status.value
    db.commit()
    db.refresh(lead)
    
    return LeadResponse(
        id=str(lead.id),
        name=lead.full_name,
        company=lead.company_name,
        email=lead.email,
        service_required=lead.service_required,
        budget=lead.budget_range,
        status=LeadStatus(lead.status),
        date_submitted=lead.created_at,
    )

@router.get("/admin/leads/export")
async def export_leads_csv(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    import csv
    from io import StringIO
    from fastapi.responses import StreamingResponse
    
    leads = db.query(Lead).all()
    output = StringIO()
    writer = csv.writer(output)
    
    writer.writerow(["ID", "Name", "Company", "Email", "Service Required", "Budget", "Status", "Date Submitted"])
    
    for lead in leads:
        writer.writerow([
            lead.id,
            lead.full_name,
            lead.company_name,
            lead.email,
            lead.service_required,
            lead.budget_range,
            lead.status,
            lead.created_at.isoformat() if lead.created_at else "",
        ])
    
    response = StreamingResponse(iter([output.getvalue()]), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=leads_export.csv"
    return response