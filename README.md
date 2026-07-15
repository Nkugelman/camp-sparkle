# Camp Sparkle — Application Site

Standalone summer day-camp application form for **Camp Sparkle**.

## Quick start

```bash
cd C:\camp-sparkle
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Email setup

1. Copy `.env.example` to `.env.local` (already created).
2. Set `EMAIL_TO` to the inbox that should receive applications.
3. Create a free [Resend](https://resend.com) account, create an API key, and set `RESEND_API_KEY`.
4. Optional: set `EMAIL_FROM` to a verified sender (for testing, Resend’s `onboarding@resend.dev` works and only sends to your Resend account email).

Without `RESEND_API_KEY`, submissions still work in development and print to the terminal.

## Form fields

- Child: name, age (1–12), diagnoses, allergies, notes
- Parent/guardian: name, phone, email (optional)
- Emergency contact: name, phone, relationship (optional)
