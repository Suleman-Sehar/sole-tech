# Sole-Tech - Deployment Documentation

## Frontend (Next.js) - Vercel Deployment

### Environment Variables Required:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Build Settings:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Deployment Steps:
1. Push code to a GitHub/GitLab repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

---

## Backend (FastAPI) - Hugging Face Spaces Deployment

### Environment Variables Required:
```
JWT_SECRET=your-strong-random-secret-key-here
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure-password-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=hello@sole-tech.ai
LEAD_NOTIFICATION_EMAIL=hello@sole-tech.ai
DATABASE_URL=sqlite:///./leads.db
```

### Deployment Steps:
1. Create a Hugging Face Space with Docker template
2. Push the `Dockerfile` and `requirements.txt` from `/sole-tech/backend/` to the space
3. Set environment variables in Space settings
4. Space will auto-build and deploy

---

## Project Structure

### Frontend (`/sole-tech/frontend`):
- `/app` - Next.js App Router pages
  - `/admin/login` - Admin authentication page
  - `/admin/dashboard` - Lead management dashboard
  - `/blog` - Blog placeholder (coming soon)
  - `/faq` - FAQ page with JSON-LD schema
  - `/privacy` - Privacy policy page
  - `/terms` - Terms & conditions page
  - `/contact` - Contact form with honeypot spam protection
  - `/services` - Services page with JSON-LD Service schema
- `/components` - Reusable UI components
  - GlassCard, GradientButton, Navbar, Footer, etc.
- `/app/sitemap.ts` - Sitemap generation
- `/app/robots.ts` - Robots.txt configuration

### Backend (`/sole-tech/backend`):
- `/app/main.py` - FastAPI application entry point
- `/app/routes/admin.py` - Admin endpoints (auth, leads CRUD)
- `/app/routes/contact.py` - Contact form endpoint
- `/app/models/lead.py` - SQLAlchemy Lead model
- `/Dockerfile` - Container configuration