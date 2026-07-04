import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Lead(Base):
    __tablename__ = "leads"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    full_name = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=False)
    phone_number = Column(String(50), nullable=True)
    service_required = Column(String(100), nullable=False)
    budget_range = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="new")
    created_at = Column(DateTime, default=datetime.utcnow)