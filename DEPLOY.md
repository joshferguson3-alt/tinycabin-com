# Deploy Tiny Cabin (Origin → Netlify)

Hosting is **Netlify** (Hobby/Starter is enough). Do not use Vercel for this project — Origin-on-Vercel requires a paid Vercel team.

**Codebase:** https://cursor.com/codebase/juchewa/tmp-2240ea70dbeffa08

Origin stays the working remote. This environment has **no Netlify login**, so there is no public `https://….netlify.app` URL to invent here. Josh publishes with the CLI or a GitHub bridge (steps below). `tinycabin.com` can stay on the GoDaddy lander until that preview looks right.

---

## How the app builds on Netlify

`netlify.toml` sets:

- **Command:** `npm run build` (`next build`)
- **Publish:** `.next`
- **Node:** 22

Netlify detects Next.js and attaches the current **OpenNext** adapter (`@netlify/plugin-nextjs`) automatically. Do **not** add that package to `package.json` — pinning opts out of adapter updates.

Local check (same command Netlify runs):

```bash
npm install
npm run build
```

---

## Publish from this Origin repo

Netlify’s git UI talks to GitHub / GitLab / Bitbucket / Azure DevOps — **not** Origin. Use **Path A** (CLI, no GitHub) or **Path B** (GitHub only as a deploy mirror).

### Path A — Netlify CLI (cleanest, no secrets in the repo)

Josh runs this on his machine (browser login; no token committed):

```bash
git clone <your Origin remote> tinycabin
cd tinycabin
npm install

npx netlify-cli login
npx netlify-cli sites:create --name tinycabin
npx netlify-cli link
```

Set **one** lead destination (or do it in the UI: **Site configuration → Environment variables**):

```bash
npx netlify-cli env:set FORMSPREE_FORM_ID your-form-id
# or LEAD_WEBHOOK_URL / RESEND_API_KEY + LEAD_TO_EMAIL — see the table below
```

Deploy:

```bash
npx netlify-cli deploy --build --prod
```

Netlify prints a **Website URL** like `https://<name>.netlify.app`. Open that in a normal browser.

Later updates (still from a checkout of Origin `main`):

```bash
git pull origin main
npx netlify-cli deploy --build --prod
```

Do not put `NETLIFY_AUTH_TOKEN` in this repo.

### Path B — GitHub bridge (continuous deploys)

Use this only if Josh wants Netlify to rebuild on every push. Origin remains the daily remote.

1. In Cursor, open https://cursor.com/codebase/juchewa/tmp-2240ea70dbeffa08 and use **Create repo** (or create an empty GitHub repo yourself).
2. Add GitHub as a **second** remote — do not replace `origin`:

   ```bash
   git remote add github git@github.com:<you>/<repo>.git
   git push -u github main
   ```

3. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project → GitHub** → that repo.
4. Confirm Netlify reads `netlify.toml` (build `npm run build`, publish `.next`).
5. Add env vars from the table below → **Deploy**.
6. Copy `https://<name>.netlify.app`.

After that: keep committing to **Origin**, then `git push origin main && git push github main` so Netlify sees the same commit.

---

## Lead-form env placeholders

Used only in `src/lib/deliver-lead.ts` (called from the `submitLead` server action and `POST /api/lead`). No `NEXT_PUBLIC_*` vars.

Set **the first matching option**. Leave the others empty.

| Env var | Required when | Where used | Example value (not a real secret) | What it is |
| --- | --- | --- | --- | --- |
| `FORMSPREE_FORM_ID` | Option A | `deliver-lead.ts` → `https://formspree.io/f/${FORMSPREE_FORM_ID}` | `xxxxxxxx` | Id in the Formspree endpoint. Create a form at https://formspree.io. |
| `LEAD_WEBHOOK_URL` | Option B | `deliver-lead.ts` POST JSON | `https://hooks.zapier.com/hooks/catch/000000/xxxxxx/` | HTTPS URL that accepts JSON. |
| `LEAD_WEBHOOK_SECRET` | Optional with B | `Authorization: Bearer …` | `replace-with-a-long-random-string` | Only if the webhook checks a bearer token. |
| `RESEND_API_KEY` | Option C | `deliver-lead.ts` → Resend API | `re_xxxxxxxx` | Key from https://resend.com. |
| `LEAD_TO_EMAIL` | Option C | Resend `to` | `josh@example.com` | Inbox for the lead. |
| `LEAD_FROM_EMAIL` | Optional with C | Resend `from` | `Tiny Cabin <hello@tinycabin.com>` | Verified Resend domain, or leave unset for `Tiny Cabin <onboarding@resend.dev>`. |

**Priority:** `FORMSPREE_FORM_ID` wins, then `LEAD_WEBHOOK_URL`, then Resend.

On Netlify: **Site configuration → Environment variables** (Production + Preview if you want test leads on deploy previews). Locally: copy `.env.example` to `.env.local`.

### Affiliate / partner placeholders (optional)

Used in `src/lib/affiliates.ts`. Leave empty until Josh pastes an approved tracking URL. Empty or `#` hides that partner card. Set on Netlify and rebuild (static pages read these at build time).

| Env var | Partner card | Example |
| --- | --- | --- |
| `AFFILIATE_TEXAS_TINY_HOMES` | Texas Tiny Homes plans | `https://…` tracking link |
| `AFFILIATE_TINY_HOME_BUILDERS` | Tiny Home Builders plans | `https://…` tracking link |
| `AFFILIATE_JAMAICA_COTTAGE_SHOP` | Jamaica Cottage Shop | `https://…` tracking link |
| `AFFILIATE_COMPO_CLOSET` | CompoCloset | `https://…` tracking link |
| `AFFILIATE_AMAZON_ASSOCIATES` | Footer Amazon Associates line only | any non-empty flag, e.g. `1` |

Do not invent rankings. Cards only render when the URL is configured.

**Not env vars (edit code if needed):**

| Value | File | Current |
| --- | --- | --- |
| Public site URL / canonical / sitemap | `src/lib/site.ts` → `url`, `domain` | `https://tinycabin.com` |
| Contact / privacy email | `src/lib/site.ts` → `email` | `hello@tinycabin.com` |

Do not commit real keys.

### What happens if nothing is set

| Environment | Submit result |
| --- | --- |
| `npm run dev` | Redirect to `/?lead=preview#match`. Lead logged in the server console only. |
| Netlify production (`NODE_ENV=production`) | Redirect to `/?lead=error#match` telling the visitor to email `hello@tinycabin.com`. |

---

## GoDaddy DNS checklist (after the Netlify preview is good)

Do **not** change DNS while you still want the GoDaddy lander. When you are ready, keep DNS at GoDaddy (external DNS). Do **not** switch nameservers to Netlify unless you intend to move all DNS, including mail.

### In Netlify (first)

1. Site → **Domain management → Add a domain you already own**.
2. Add `tinycabin.com` (Netlify also adds `www.tinycabin.com`).
3. Open **Pending DNS verification** and copy the values if they differ from the table.

### Typical records (GoDaddy DNS)

| Host | Type | Name in GoDaddy | Value |
| --- | --- | --- | --- |
| Apex `tinycabin.com` | A | `@` | `75.2.60.5` (Netlify load balancer). Use this unless the dashboard shows a different IP. |
| `www.tinycabin.com` | CNAME | `www` | `<your-site>.netlify.app` (the site subdomain from the Netlify overview, not `tinycabin.com`) |

If GoDaddy ever offers ALIAS/ANAME at `@`, you may point `@` at `apex-loadbalancer.netlify.com` instead of the A record. Standard GoDaddy DNS does not; use the A record.

### In GoDaddy

1. **My Products** → `tinycabin.com` → **DNS** → **DNS Records**.
2. Turn **off** domain forwarding / the parked lander for `@` and `www`.
3. Delete extra **A**, **CNAME**, **Forwarding**, and **Parked** records for `@` and `www`. Keep **one** A record on `@` (multiple A records break SSL).
4. Add `A @ 75.2.60.5` (or the IP from the Netlify modal).
5. Add `CNAME www <your-site>.netlify.app`.
6. Leave MX / email records alone.
7. TTL: 600 seconds or GoDaddy default.
8. Save. Wait for propagation.
9. In Netlify, wait until HTTPS / Let’s Encrypt is provisioned.

This repo does not change GoDaddy DNS.

### Quick verify

```bash
dig +short A tinycabin.com          # expect 75.2.60.5
dig +short CNAME www.tinycabin.com  # expect <your-site>.netlify.app
```

Then open `https://tinycabin.com` (not the old lander).

Official: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/

---

## Soft-launch checklist

- [ ] `https://<name>.netlify.app` opens in a normal browser
- [ ] One lead destination env var set on the Netlify site
- [ ] Test submit; confirm Formspree / webhook / Resend
- [ ] `hello@tinycabin.com` receives mail, or update `src/lib/site.ts`
- [ ] GoDaddy A/CNAME applied only after the preview is approved
