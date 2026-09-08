# Deploy Tiny Cabin (Origin → Vercel)

Origin is the source of truth. Do **not** mirror this repo to GitHub just to deploy.

**Codebase:** https://cursor.com/codebase/juchewa/tmp-2240ea70dbeffa08

This agent **cannot** publish a public `https://` preview from the current environment. There is no Vercel login, token, or connected Vercel project here. Josh must connect **Vercel ↔ Origin** in the dashboards (steps below). After that, Vercel issues a `*.vercel.app` URL on the next deploy of `main`.

`tinycabin.com` can stay on the GoDaddy lander until that preview looks right.

---

## Blockers before a public URL exists

1. **Connect Vercel to this Origin repo** (click-path in the next section).
2. **Vercel team plan:** Origin repos are private. [Vercel for Origin](https://vercel.com/docs/git/vercel-for-origin) does **not** deploy from a Hobby team. Use a Vercel team where you are Owner or Member (Pro or equivalent).
3. **Optional but required before live leads:** set **one** lead destination env var on the Vercel project (table below). Production without a destination shows an error on submit instead of silently dropping the lead.

---

## Connect Vercel ↔ Origin (click path)

Do **one** of these. Both keep Origin as the git remote.

### Path A — from Cursor / Origin (repo Apps tab)

1. Open https://cursor.com/codebase/juchewa/tmp-2240ea70dbeffa08
2. Open this repository.
3. Open the repo **Apps** tab.
4. Connect **Vercel** (install / authorize the Vercel app on this Origin repo).
5. Finish the Vercel project create flow that opens (Next.js should be detected).
6. Deploy. Copy the production URL (`https://<project>.vercel.app`).

### Path B — from the Vercel dashboard

1. Sign in at [vercel.com](https://vercel.com) on a **non-Hobby** team (Owner or Member).
2. **Add New… → Project** (or [vercel.com/new](https://vercel.com/new)).
3. Choose **Continue with Origin** (not GitHub / GitLab / Bitbucket).
4. Pick the Origin team / codebase that owns this repo, then select **this** repository.
5. Framework Preset: **Next.js**. Leave Build Command `next build` / `npm run build` and the default Next.js output.
6. Add env vars from the table below (or skip and add them later under Settings → Environment Variables).
7. **Deploy**. Copy the `https://….vercel.app` URL from the deployment.

### After it is connected

- Push to `main` → production deployment (updates the production `*.vercel.app` and any assigned domains).
- Other branches / Origin PRs → preview deployments with their own URLs.
- Confirm: Vercel project → **Settings → Git** shows this Origin repository connected.

Official reference: https://vercel.com/docs/git/vercel-for-origin

---

## Lead-form env placeholders

Used only in `src/lib/deliver-lead.ts` (called from the `submitLead` server action and `POST /api/lead`). The form itself does not need `NEXT_PUBLIC_*` vars.

Set **the first matching option** (Formspree, then webhook, then Resend). Leave the others empty.

Copy `.env.example` to `.env.local` for local testing. On Vercel: **Project → Settings → Environment Variables** → add the same names for Production (and Preview if you want test leads from preview URLs).

| Env var | Required when | Where used | Example value (not a real secret) | What it is |
| --- | --- | --- | --- | --- |
| `FORMSPREE_FORM_ID` | Option A | `deliver-lead.ts` → `https://formspree.io/f/${FORMSPREE_FORM_ID}` | `xxxxxxxx` | The id in the Formspree endpoint. Create a form at https://formspree.io. |
| `LEAD_WEBHOOK_URL` | Option B | `deliver-lead.ts` POST JSON | `https://hooks.zapier.com/hooks/catch/000000/xxxxxx/` | Full HTTPS URL that accepts a JSON body. |
| `LEAD_WEBHOOK_SECRET` | Optional with B | `Authorization: Bearer …` | `replace-with-a-long-random-string` | Only if your webhook checks a bearer token. |
| `RESEND_API_KEY` | Option C | `deliver-lead.ts` → `https://api.resend.com/emails` | `re_xxxxxxxx` | API key from https://resend.com. |
| `LEAD_TO_EMAIL` | Option C | Resend `to` | `josh@example.com` | Inbox that should receive the lead. |
| `LEAD_FROM_EMAIL` | Optional with C | Resend `from` | `Tiny Cabin <hello@tinycabin.com>` | Must be a verified Resend domain (or leave unset to use `Tiny Cabin <onboarding@resend.dev>` for tests). |

**Priority:** if `FORMSPREE_FORM_ID` is set, webhook and Resend are ignored. If only `LEAD_WEBHOOK_URL` is set, Resend is ignored.

**Not env vars (edit code if needed):**

| Value | File | Current |
| --- | --- | --- |
| Public site URL / canonical / sitemap | `src/lib/site.ts` → `url`, `domain` | `https://tinycabin.com` |
| Contact / privacy email | `src/lib/site.ts` → `email` | `hello@tinycabin.com` |

Do not commit real keys. `.env*` local files are gitignored.

### What happens if nothing is set

| Environment | Submit result |
| --- | --- |
| `npm run dev` | Redirect to `/?lead=preview#match`. Lead logged in the server console only. |
| Vercel production | Redirect to `/?lead=error#match` telling the visitor to email `hello@tinycabin.com`. |

---

## App is Vercel-ready (standard Next.js)

- Framework: Next.js App Router (`next` 16).
- Build: `npm run build` (Vercel’s Next.js preset).
- Start (local prod): `npm start` (port `43147` in this repo’s script).
- No `vercel.json` required; Vercel detects Next.js from `package.json`.

Local check:

```bash
npm install
npm run build
```

---

## GoDaddy DNS checklist (after the preview is good)

Do **not** change DNS while `tinycabin.com` is still the lander you want to keep. When you are ready:

### In Vercel (first)

1. Open the project → **Settings → Domains**.
2. Add `tinycabin.com` and `www.tinycabin.com`.
3. Copy the **exact** A / CNAME values from that domain card. Newer projects may not use the generic IP.

Typical values (use the card if it differs):

| Host | Type | Name in GoDaddy | Value (typical) |
| --- | --- | --- | --- |
| Apex `tinycabin.com` | A | `@` | Often `76.76.21.21` — **copy from the Vercel domain card** |
| `www.tinycabin.com` | CNAME | `www` | Often `cname.vercel-dns.com` or a project-specific `*.vercel-dns-*.com` — **copy from the card** |

### In GoDaddy

1. GoDaddy → **My Products** → `tinycabin.com` → **DNS** → **DNS Records**.
2. Turn **off** domain forwarding / the parked lander for `@` and `www` (those override A/CNAME).
3. Delete conflicting **A**, **CNAME**, **Forwarding**, and **Parked** records for `@` and `www`.
4. Add the A record for `@` from the Vercel card.
5. Add the CNAME for `www` from the Vercel card.
6. Leave MX / email records alone unless you are also moving mail.
7. TTL: 600 seconds or GoDaddy default.
8. Save. Wait for propagation (minutes to a few hours).
9. Back in Vercel Domains, wait until the domain is **Valid** and the certificate is issued.

This repo does not change GoDaddy DNS.

### Quick verify (after DNS)

```bash
dig +short A tinycabin.com
dig +short CNAME www.tinycabin.com
```

The A record should match the Vercel card. Then open `https://tinycabin.com` (not the old lander).

---

## Soft-launch checklist

- [ ] Vercel ↔ Origin connected (Apps tab or Continue with Origin)
- [ ] `https://<project>.vercel.app` opens in a normal browser
- [ ] One lead destination env var set on the Vercel project
- [ ] Test submit on the preview URL; confirm the inbox / Formspree / webhook
- [ ] `hello@tinycabin.com` receives mail, or update `src/lib/site.ts`
- [ ] GoDaddy A/CNAME applied only after the preview is approved
