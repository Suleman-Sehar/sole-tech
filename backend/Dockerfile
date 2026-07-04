FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir fastapi uvicorn python-multipart python-jose[cryptography] passlib[bcrypt] python-dotenv sqlalchemy pydantic-settings

COPY ./app ./app
COPY ./sole-tech/backend/.env ./.env 2>/dev/null || true

EXPOSE 7860

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]