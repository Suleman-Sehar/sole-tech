import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.models.lead import Base
from app.core.database import get_db

SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test_leads.db"
engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_contact_success():
    response = client.post("/api/contact", json={
        "full_name": "Test User",
        "email": "test@example.com",
        "service_required": "AI Consulting",
        "budget_range": "$10k–$50k",
        "message": "This is a test message for the contact form."
    })
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["status"] == "new"

def test_create_contact_missing_required():
    response = client.post("/api/contact", json={
        "full_name": "",
        "email": "invalid-email",
        "service_required": "",
        "budget_range": "",
        "message": "short"
    })
    assert response.status_code == 422

def test_create_contact_honeypot():
    response = client.post("/api/contact", json={
        "full_name": "Test User",
        "email": "test@example.com",
        "service_required": "AI Consulting",
        "budget_range": "$10k–$50k",
        "message": "This is a test message.",
        "website": "bot-filled-value"
    })
    assert response.status_code == 422