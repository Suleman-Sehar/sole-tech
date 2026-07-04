# Sole-Tech

AI Solutions That Transform Businesses

## Project Structure

```
sole-tech/
├── frontend/           # Next.js application
│   ├── app/           # App Router pages
│   ├── components/    # Reusable UI components
│   └── styles/        # Global CSS
└── backend/           # FastAPI application
    ├── app/           # Application code
    └── Dockerfile     # Container configuration
```

## Local Development

### Frontend

```bash
cd sole-tech/frontend
npm install
npm run dev
```

### Backend

```bash
cd sole-tech/backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Deployment

### Frontend (Vercel)

Set these environment variables in Vercel:
- `NEXT_PUBLIC_API_URL` - Your backend URL (e.g., https://api.sole-tech.ai)

Build Command: `npm run build`

### Backend (Hugging Face Spaces)

Set these environment variables in Space settings:
- `JWT_SECRET` - Random secret for JWT signing
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password
- `SMTP_HOST` - SMTP server (optional, for email notifications)
- `SMTP_PORT` - SMTP port
- `SMTP_USERNAME` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `DATABASE_URL` - SQLite or PostgreSQL connection string

See DEPLOYMENT.md for detailed instructions.

## Environment Variables

Create `.env` files in both directories:

### frontend/.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### backend/.env
```
JWT_SECRET=your-secret-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=adminpassword
DATABASE_URL=sqlite:///./leads.db
```