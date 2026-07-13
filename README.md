# Metis Client Hub

Firm-wide client intelligence for Metis Strategy. A living hub of every client we
serve, with a weekly **Client Pulse** briefing across all accounts, a personalized
digest for the clients each person works on, an automated weekly email, and
on-demand AI **podcast** episodes.

Built with Next.js (App Router) + React. Brand system mirrors the Metis PM Hub and
the Client Pulse newsletter (ink `#111`, teal `#3FC9BE`).

---

## Features

- **Home** (`/`) — interactive landing page introducing Metis Strategy and the
  hub: animated hero with AI-generated brand imagery, client marquee, live
  counters, 3D-tilt focus cards, and an auto-rotating feature showcase
  (`src/components/Landing.jsx`, images in `src/assets/landing/`).
- **Client wall** (`/clients`) — acquired.fm-style grid of all clients with
  sticky filters for **coast** (East / Central / West) and **project type**.
- **Client pages** — the latest weekly scrape up top, with an archive to browse
  prior editions. Each renders the Client Pulse format (stats, items, sources).
- **My Pulse** — a personalized briefing auto-built from the clients you follow
  (individually or by project type). "View as email" and "Send me a preview."
- **Weekly email** — Monday 7:00 AM ET digest per user (Vercel Cron → Resend).
- **Podcast** — two-host audio episode per client (ElevenLabs), UI-ready with a
  drafted script; flips to real synthesis when a key is present.

Every backend feature runs in **stub mode** with zero config and flips to live
when you add the matching key to `.env.local`.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3200
```

Sign in with any **@metisstrategy.com** email (demo gate; no password). Your
followed clients and digest settings are saved to that email.

---

## Going live (drop-in keys)

Copy `.env.example` → `.env.local` and fill in as you enable each piece:

| Feature            | Key(s)                                             | Stub behavior                          |
| ------------------ | -------------------------------------------------- | -------------------------------------- |
| Auth (Clerk SSO)   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | Demo email gate (see below)        |
| Weekly scrape      | `ANTHROPIC_API_KEY` (+ optional `SEARCH_API_KEY`)  | `npm run scrape` prints the plan       |
| Weekly email       | `RESEND_API_KEY`, `EMAIL_FROM`                     | Renders + returns a JSON receipt       |
| Podcast            | `ELEVENLABS_API_KEY`, voice IDs                    | Returns drafted script, no audio       |
| Cron auth          | `CRON_SECRET`                                      | Preview sends bypass auth              |

### Enabling Clerk SSO
The app ships with a lightweight demo sign-in in `src/lib/auth.jsx` so it runs
with no setup. To switch to real SSO restricted to the firm:
1. Add the Clerk keys to `.env.local` and `npm install @clerk/nextjs`.
2. Wrap `src/app/layout.jsx` in `<ClerkProvider>` and replace `AuthProvider` /
   `SignIn` with Clerk's `<SignedIn>/<SignedOut>` + `<SignIn>`.
3. Point `useAuth()` consumers at Clerk's `useUser()` (same `{ name, email }`
   shape) — no other component changes needed.

---

## Weekly automation

- **Scrape** (`scripts/scrape.mjs`, `npm run scrape`) refreshes the Pulse content
  for all clients. Schedule it ahead of the email (e.g. Sundays).
- **Email** (`/api/cron/weekly`) fans out the personalized digest — see below.

## Email integration (weekly newsletter)

The full pipeline is built; it activates on a **dynamic host (Vercel)** once the
keys are set. (The static GitHub Pages demo can't run server code, so email is
inactive there.)

**How it works**
1. **Subscribers** — when anyone signs in or edits Settings, the app POSTs their
   subscription (email, name, followed clients/tags, cadence, delivery day) to
   `POST /api/subscribers`. Stored in **Upstash Redis** in production, or a local
   `.data/subscribers.json` in dev (`src/lib/store.js`).
2. **Schedule** — `vercel.json` runs `GET /api/cron/weekly` daily at 07:00 ET.
   The job emails every subscriber whose cadence is `weekly` **and** whose chosen
   delivery day matches today (ET). Each person picks their day in Settings.
3. **Render + send** — it builds each recipient's personalized Client Pulse with
   the shared renderer and sends via **Resend** (`src/lib/email.js`). Emails carry
   a one-click **Unsubscribe** link (`/api/unsubscribe`).

**Turn it on**
```
RESEND_API_KEY=...            # Resend (verify your sending domain)
EMAIL_FROM="Metis Client Pulse <pulse@metisstrategy.com>"
UPSTASH_REDIS_REST_URL=...    # free DB at upstash.com
UPSTASH_REDIS_REST_TOKEN=...
CRON_SECRET=...               # Vercel auto-sends this to the cron endpoint
NEXT_PUBLIC_APP_URL=https://<your-deploy-url>
```
With no keys, everything runs in **stub mode**: sends are rendered and logged but
not delivered, so you can test the flow safely.

**Test it**
- Locally: `curl -X POST localhost:3200/api/subscribers -H 'content-type: application/json' -d '{"email":"you@metisstrategy.com","followedClients":["adp"],"digestDay":"Monday"}'`
  then `curl 'localhost:3200/api/cron/weekly?force=1'` to see the send summary.
- Deployed: the **Send me a preview** button on *My Pulse* emails you the current
  edition immediately (`/api/cron/weekly?preview=1`).

---

## Data model

- `src/lib/clients.js` — the roster (coast, sector, project-type tags, logo domain).
- `src/lib/pulse.js` — Pulse content, `PULSE[clientId][editionId]`. Seeded with
  real sourced research (week of July 6, 2026) plus archived prior editions.
- `src/lib/newsletter.js` — the shared HTML renderer (in-app view === emailed HTML).

## Deploy to Vercel

```bash
npm i -g vercel
vercel            # link + deploy a preview
vercel --prod     # production
```
Add the env vars in the Vercel dashboard. Cron runs automatically from `vercel.json`.

---

_Market data is point-in-time and summarized from public sources for internal
informational use only — not investment advice._
