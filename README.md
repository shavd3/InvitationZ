# Amaya & Shavin — Wedding Invitation

Public-facing wedding invitation site with personalized RSVP links for the church ceremony (10 Oct 2026).

## Setup

1. Run the SQL migration in Supabase SQL Editor:
   - [`../wedding-planner/supabase-invite.sql`](../wedding-planner/supabase-invite.sql)

2. Copy `.env.example` to `.env.local` and fill in:
   - `SUPABASE_URL` — same as wedding-planner
   - `SUPABASE_SERVICE_ROLE_KEY` — from Supabase Dashboard → Settings → API (server-only, never commit)
   - `ADMIN_PASSWORD` — password for `/admin`
   - `NEXT_PUBLIC_SITE_URL` — your site URL (e.g. `http://localhost:3000` locally)

3. Install and run:

```bash
npm install
npm run dev
```

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with link to find invitation |
| `/find` | Name search fallback |
| `/[name-token]` | Personalized RSVP page |
| `/admin` | Password-protected link list + RSVP status |

## Deploy

Push to GitHub and import to Vercel. Set the same env vars in Vercel project settings.
