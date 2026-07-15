# Camp Sparkle — Application Site

Standalone summer day-camp application form for **Camp Sparkle**.

- **Frontend:** Next.js on [Vercel](https://vercel.com)
- **Backend:** Express API on [Railway](https://railway.app) (emails via Resend)

## Quick start (local)

```bash
cd C:\camp-sparkle
npm install
cd server && npm install && cd ..
```

Terminal 1 — API:

```bash
cd server
# set EMAIL_TO + RESEND_API_KEY in the environment or a server/.env you load yourself
npm run dev
```

Terminal 2 — site:

```bash
# .env.local
APPLY_API_URL=http://localhost:4000

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

### 1. Railway (backend)

1. Create a new project from this repo; set **Root Directory** to `server`.
2. Set variables: `EMAIL_TO`, `RESEND_API_KEY`, `EMAIL_FROM` (optional), `ALLOWED_ORIGINS`.
3. Deploy and copy the public URL (e.g. `https://….up.railway.app`).

### 2. Vercel (frontend)

1. Import the GitHub repo in Vercel.
2. Set `APPLY_API_URL` to the Railway URL (no trailing slash).
3. Deploy.

## Form fields

- Child: name, age (1–12), diagnoses, allergies, notes
- Parent/guardian: name, phone, email (optional)
- Emergency contact: name, phone, relationship (optional)
