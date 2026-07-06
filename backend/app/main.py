from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.contact import router as contact_router
from app.routes.admin import router as admin_router
from app.routes.chat import router as chat_router
from app.core.database import init_db

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://sole-tech.ai",
    "https://www.sole-tech.ai",
    "https://frontend-jn7t376lb-suleman-sehars-projects.vercel.app",
    "https://frontend-eight-fawn-70.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact_router, prefix="/api", tags=["contact"])
app.include_router(admin_router, prefix="/api", tags=["admin"])
app.include_router(chat_router, prefix="/api", tags=["chat"])

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}