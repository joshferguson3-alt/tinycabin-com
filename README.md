# Tiny Cabin

Marketing and lead-generation site for [tinycabin.com](https://tinycabin.com): **tiny cabin kits and builders only**. Not a rentals marketplace, not a gear shop.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui.

## Local run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Dev server: [http://127.0.0.1:43147](http://127.0.0.1:43147)

Without a lead destination configured, the match form still validates. In development it logs the payload and shows a preview-mode message. In production it returns an error until you plug in one destination.

```bash
npm run build
npm start -- --port 43147
```

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Hero, how it works, trust notes, match form |
| `/guides` | Guide hub |
| `/guides/tiny-cabin-kit-cost` | Kit vs. project cost |
| `/guides/tiny-cabin-vs-tiny-home` | Cabin vs. THOW vs. ADU |
| `/guides/best-tiny-cabin-kits` | Selection criteria (no fake rankings) |
| `/guides/tiny-cabin-permits` | U.S. permit map + check-local disclaimer |
| `/privacy` | Privacy policy for a lead site |

SEO: unique titles/descriptions, Open Graph tags, generated `sitemap.xml` and `robots.txt`.

## Lead form destination

The match form posts through a Next.js server action (`submitLead`). `POST /api/lead` is also available for JSON clients. Delivery uses **the first configured option**:

1. **Formspree** — set `FORMSPREE_FORM_ID` (the `xxxxx` in `https://formspree.io/f/xxxxx`).
2. **Webhook** — set `LEAD_WEBHOOK_URL`. Optional `LEAD_WEBHOOK_SECRET` is sent as `Authorization: Bearer …`.
3. **Resend** — set `RESEND_API_KEY` and `LEAD_TO_EMAIL`. Optional `LEAD_FROM_EMAIL` (defaults to Resend’s test sender `Tiny Cabin <onboarding@resend.dev>`).

Copy `.env.example` and fill **one** path. Do not invent credentials in the repo.

Honeypot field: `company`. If it is filled, the API pretends success and drops the submit.

## Deploy on Vercel

1. Push this repo to GitHub / GitLab / Bitbucket, or import the folder in Vercel.
2. [vercel.com/new](https://vercel.com/new) → import the project.
3. Framework preset: Next.js. Build command `npm run build`, output is the default Next.js output.
4. Add the same env vars from `.env.example` (at least one lead destination).
5. Deploy. Confirm `https://<project>.vercel.app` and `/api/lead` (submit the form once).
6. Project → Settings → Domains → add `tinycabin.com` and `www.tinycabin.com`.

## Point GoDaddy DNS at Vercel

Do this in GoDaddy after the domain is added in Vercel. Vercel will show the exact records; they are usually:

**Apex `tinycabin.com`**

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `10.0.1.2` | 600 or default |

Vercel documents the current A-record IPs in the domain settings. Use those values if they differ.

**WWW**

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| CNAME | `www` | `cname.vercel-dns.com` | 600 or default |

Steps in GoDaddy:

1. DNS → DNS Records for `tinycabin.com`.
2. Remove conflicting A / CNAME / forwarding records for `@` and `www` (and any parked-page forwarding).
3. Add the A and CNAME records Vercel displays.
4. Wait for propagation, then wait for Vercel to issue the certificate.

This repo does not change GoDaddy DNS for you.

## Soft-launch checklist

- [ ] One lead destination env var set in Vercel
- [ ] Send a test inquiry and confirm it arrives
- [ ] Domain and HTTPS live
- [ ] Privacy email (`hello@tinycabin.com`) receives mail, or update the address in `src/lib/site.ts`
