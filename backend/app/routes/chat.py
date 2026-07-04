import logging
from datetime import datetime, timedelta
from typing import Dict, Optional
import httpx
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel

router = APIRouter()

# In-memory rate limiting (IP -> [timestamps])
# TODO: Replace with Redis for production
rate_limit_store: Dict[str, list] = {}
RATE_LIMIT_MAX = 20
RATE_LIMIT_WINDOW_HOURS = 1

logger = logging.getLogger(__name__)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[list[Message]] = []

class ChatResponse(BaseModel):
    response: str

def check_rate_limit(ip: str) -> bool:
    now = datetime.utcnow()
    window_start = now - timedelta(hours=RATE_LIMIT_WINDOW_HOURS)
    
    if ip not in rate_limit_store:
        rate_limit_store[ip] = []
    
    rate_limit_store[ip] = [ts for ts in rate_limit_store[ip] if ts > window_start]
    
    if len(rate_limit_store[ip]) >= RATE_LIMIT_MAX:
        return False
    
    rate_limit_store[ip].append(now)
    return True

def retrieve_relevant_chunks(query: str, kb: list[str], top_k: int = 3) -> list[tuple[str, int]]:
    """Simple keyword-based relevance scoring - returns chunks and scores."""
    query_lower = query.lower()
    scores = []
    for chunk in kb:
        score = 0
        for word in query_lower.split():
            if word in chunk.lower():
                score += 1
        if score > 0:
            scores.append((chunk, score))
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores[:top_k]

@router.post("/chat", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat(
    request: Request,
    chat_data: ChatRequest,
):
    client_ip = request.client.host if request.client else "unknown"
    if not check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        return ChatResponse(response="I'm having trouble responding right now — please try again or use the Contact form.")
    
    groq_api_key = ""  # Will use environment variable
    from app.core.config import settings
    groq_api_key = settings.GROQ_API_KEY
    
    if not groq_api_key:
        logger.warning("Groq API key not configured")
        return ChatResponse(response="Chat service is not configured. Please contact us directly at hello@sole-tech.ai")
    
    # Import knowledge base
    from app.data.knowledge_base import KNOWLEDGE_BASE
    
    relevant_chunks = retrieve_relevant_chunks(chat_data.message, KNOWLEDGE_BASE)
    context = "\n\n".join([chunk for chunk, _ in relevant_chunks])
    
    system_prompt = f"""You are the Sole-Tech AI assistant. You can answer general AI/technology questions helpfully. When asked about Sole-Tech specifically, use ONLY the following context and do not invent details not present here:

{context}

If the context doesn't cover what's asked about Sole-Tech, say you're not certain and suggest the Contact page."""
    
    messages = [{"role": "system", "content": system_prompt}]
    messages.extend([{"role": msg.role, "content": msg.content} for msg in chat_data.history[-6:]])
    messages.append({"role": "user", "content": chat_data.message})
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {groq_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 500,
                },
            )
            
            if response.status_code == 429:
                logger.warning("Groq rate limit hit")
                return ChatResponse(response="I'm experiencing high demand right now. Please try again in a moment.")
            
            response.raise_for_status()
            data = response.json()
            return ChatResponse(response=data["choices"][0]["message"]["content"])
            
    except httpx.TimeoutException:
        logger.error("Groq API timeout")
        return ChatResponse(response="I'm taking too long to respond — please try again or use the Contact form.")
    except Exception as e:
        logger.error(f"Groq API error: {e}")
        return ChatResponse(response="I'm having trouble responding right now — please try again or use the Contact form.")