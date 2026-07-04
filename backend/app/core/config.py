import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASS: str = ""
    SMTP_FROM: str = "hello@sole-tech.ai"
    NOTIFICATION_EMAIL: str = "hello@sole-tech.ai"
    JWT_SECRET: str = ""
    ADMIN_EMAIL: str = ""
    ADMIN_PASSWORD: str = ""
    DATABASE_URL: str = "sqlite:///./leads.db"
    GROQ_API_KEY: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()