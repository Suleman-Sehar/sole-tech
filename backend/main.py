
import os
from datetime import datetime, timedelta
from typing import Optional, List
import csv
from io import StringIO

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from enum import Enum
from pydantic import Field
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from jose import JWTError, jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# --- Configuration ---
SECRET_KEY = os.environ.get("JWT_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# --- Password Hashing ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Hasher:
    @staticmethod
    def verify_password(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password):
        return pwd_context.hash(password)

# --- JWT Token Utilities ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
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

# --- Admin User Management (in-memory for now, using .env) ---
class UserInDB(BaseModel):
    email: str
    hashed_password: str

class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    CLOSED = "closed"

class Lead(BaseModel):
    id: int
    name: str
    company: Optional[str] = None
    email: str
    service_required: str
    budget: Optional[str] = None
    status: LeadStatus = LeadStatus.NEW
    date_submitted: datetime = Field(default_factory=datetime.utcnow)

# In-memory database for leads
leads_db: List[Lead] = []

# Add some dummy data for testing
leads_db.append(Lead(id=1, name="Alice Smith", company="ABC Corp", email="alice@example.com", service_required="Web Development", budget="$5,000", status=LeadStatus.NEW))
leads_db.append(Lead(id=2, name="Bob Johnson", company="XYZ Ltd", email="bob@example.com", service_required="Mobile App Development", budget="$10,000", status=LeadStatus.CONTACTED))
leads_db.append(Lead(id=3, name="Charlie Brown", email="charlie@example.com", service_required="SEO", status=LeadStatus.NEW))


# Seed admin user from environment variables
ADMIN_USER_EMAIL = os.environ.get("ADMIN_EMAIL")
ADMIN_USER_PASSWORD_RAW = os.environ.get("ADMIN_PASSWORD")
HASHED_ADMIN_PASSWORD = Hasher.get_password_hash(ADMIN_USER_PASSWORD_RAW)

admin_user_db = UserInDB(
    email=ADMIN_USER_EMAIL,
    hashed_password=HASHED_ADMIN_PASSWORD
)

def get_user(email: str):
    if email == admin_user_db.email:
        return admin_user_db
    return None

# --- Auth Endpoints ---
@app.post("/api/auth/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user or not Hasher.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# --- Lead Management Endpoints ---

@app.get("/api/admin/leads", response_model=List[Lead])
async def get_leads(
    current_user: str = Depends(get_current_user),
    skip: int = 0,
    limit: int = 10,
    status: Optional[LeadStatus] = None,
    service_required: Optional[str] = None
):
    filtered_leads = leads_db
    if status:
        filtered_leads = [lead for lead in filtered_leads if lead.status == status]
    if service_required:
        filtered_leads = [lead for lead in filtered_leads if service_required.lower() in lead.service_required.lower()]

    return filtered_leads[skip : skip + limit]

@app.patch("/api/admin/leads/{lead_id}", response_model=Lead)
async def update_lead_status(
    lead_id: int,
    new_status: LeadStatus,
    current_user: str = Depends(get_current_user)
):
    for lead in leads_db:
        if lead.id == lead_id:
            lead.status = new_status
            return lead
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

@app.get("/api/admin/leads/export", response_class=StreamingResponse)
async def export_leads_csv(current_user: str = Depends(get_current_user)):
    output = StringIO()
    writer = csv.writer(output)

    # Write header
    writer.writerow(["ID", "Name", "Company", "Email", "Service Required", "Budget", "Status", "Date Submitted"])

    # Write data
    for lead in leads_db:
        writer.writerow([
            lead.id,
            lead.name,
            lead.company,
            lead.email,
            lead.service_required,
            lead.budget,
            lead.status.value,
            lead.date_submitted.isoformat()
        ])

    response = StreamingResponse(iter([output.getvalue()]), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=leads_export.csv"
    return response

# --- Protected Admin Routes Example ---
@app.get("/api/admin/protected-test")
async def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": f"Welcome, {current_user}! You have access to protected admin data."}

