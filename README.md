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

## Lead form and deploy

Exact env var names, example shapes, Vercel ↔ Origin click path, and the GoDaddy A/CNAME checklist: **[DEPLOY.md](./DEPLOY.md)**.

Origin stays the source of truth. Do not mirror to GitHub solely for Vercel.

Honeypot field: `company`. If filled, the submit is dropped and treated as success.
