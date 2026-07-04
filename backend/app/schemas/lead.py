from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class LeadCreate(BaseModel):
    full_name: str = Field(..., max_length=255)
    company_name: Optional[str] = Field(None, max_length=255)
    email: EmailStr
    phone_number: Optional[str] = Field(None, max_length=50)
    service_required: str = Field(..., max_length=100)
    budget_range: str = Field(..., max_length=50)
    message: str = Field(..., min_length=10)
    website: Optional[str] = None  # Honeypot field

class LeadResponse(BaseModel):
    id: str
    created_at: datetime
    status: str

class LeadInDB(LeadResponse):
    class Config:
        from_attributes = True