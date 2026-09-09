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
| `/` | Photo hero, how it works, cabin gallery, trust notes, match form |
| `/guides` | Guide hub |
| `/guides/tiny-cabin-kit-cost` | Kit vs. project cost |
| `/guides/tiny-cabin-vs-tiny-home` | Cabin vs. THOW vs. ADU |
| `/guides/best-tiny-cabin-kits` | Selection criteria (no fake rankings) |
| `/guides/tiny-cabin-permits` | U.S. permit map + check-local disclaimer |
| `/privacy` | Privacy policy for a lead site |

SEO: unique titles/descriptions, Open Graph tags, generated `sitemap.xml` and `robots.txt`.

## Lead form and deploy

Exact env var names, Netlify publish steps (CLI or GitHub bridge), and the GoDaddy A/CNAME checklist: **[DEPLOY.md](./DEPLOY.md)**.

Origin stays the working remote. Hosting is Netlify (no Vercel Pro).

Honeypot field: `company`. If filled, the submit is dropped and treated as success.

## Photography

Marketing photos are **real places** only — Unsplash-licensed JPEGs in `public/photos/`. They are served through `next/image` (AVIF/WebP, sized srcset). The homepage hero uses `priority` for LCP. Photographers are credited on each image (Unsplash License) and in the footer.

Josh’s Switzerland trip files were not on this filesystem; a licensed Zermatt cabin photo (Ryan Klaus) stands in until those assets are added.

| File | Photographer | Unsplash |
| --- | --- | --- |
| `hero-forest.jpg` | Olivier Guillard | [FKJgBUDoVC0](https://unsplash.com/photos/FKJgBUDoVC0) |
| `zermatt-cabin.jpg` | Ryan Klaus | [VQVmkIQojVk](https://unsplash.com/photos/VQVmkIQojVk) |
| `alpine-lake.jpg` | Luca Bravo | [zAjdgNXsMeg](https://unsplash.com/photos/zAjdgNXsMeg) |
| `snow-cabin.jpg` | Ian Keefe | [OgcJIKRnRC8](https://unsplash.com/photos/OgcJIKRnRC8) |
| `modern-cabin.jpg` | Lili Kovac | [BSQq5dRT_KU](https://unsplash.com/photos/BSQq5dRT_KU) |
| `interior-stove.jpg` | Clay Banks | [79yk4XalXCM](https://unsplash.com/photos/79yk4XalXCM) |
| `snowy-hut.jpg` | Krisztián Korhetz | [dB_OZdHyUws](https://unsplash.com/photos/dB_OZdHyUws) |
| `woods-cabin.jpg` | Björn Grochla | [jXJEnwB1C5Q](https://unsplash.com/photos/jXJEnwB1C5Q) |
| `interior-aframe.jpg` | Clay Banks | [3uuNKtEK8-g](https://unsplash.com/photos/3uuNKtEK8-g) |
