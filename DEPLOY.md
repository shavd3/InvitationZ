# Deployment Setup — Wedding Invite

Follow these steps to publish the invitation site.

## 1. Run the database migration

In [Supabase SQL Editor](https://supabase.com/dashboard), run:

```
wedding-planner/supabase-invite.sql
```

This adds `invite_token`, `confirmed_count`, and `rsvp_responded_at` to `guest_items`.

## 2. Get your Supabase service role key

Supabase Dashboard → Project Settings → API → **service_role** (secret).

Add it to `wedding-invite/.env.local`:

```
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## 3. Create GitHub repo

1. Go to https://github.com/new
2. Repository name: `wedding-invite`
3. Create **without** README (code already exists locally)
4. Then run:

```powershell
cd wedding-invite
git remote add origin https://github.com/shavd3/wedding-invite.git
git push -u origin main
```

## 4. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import `shavd3/wedding-invite`
3. Add environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (update after first deploy) |
| `SUPABASE_URL` | `https://zbtgrbssgcnpwaqhvhth.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase dashboard |
| `ADMIN_PASSWORD` | Your chosen admin password |

4. Deploy, then update `NEXT_PUBLIC_SITE_URL` to the final Vercel URL and redeploy.

## 5. Custom domain (when ready)

Vercel project → Settings → Domains → add your purchased domain and follow DNS instructions.

## 6. Send invitations

1. Open `https://your-site.vercel.app/admin`
2. Sign in with your `ADMIN_PASSWORD`
3. Copy each guest's personal link and send via WhatsApp/SMS
