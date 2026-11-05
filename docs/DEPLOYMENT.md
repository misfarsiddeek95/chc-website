# Deployment

The recommended setup is the **server build on Vercel (or any Node host) behind Cloudflare**.
The server build is needed for the secure enquiry endpoint. Pages are still prerendered
to static HTML and cached at the edge, so it costs little more than static hosting.

## 1. Requirements

- Node.js 20.9 or later (22 LTS recommended)
- A Resend account with the sending domain verified (SPF and DKIM records)
- Cloudflare in front of the domain (DNS proxied)
- Optional: a Cloudflare Turnstile widget for the forms

## 2. Environment variables

Set these in the host's dashboard. All of them are in `.env.example`.

| Variable | Required | Secret | Purpose |
|---|---|---|---|
| `RESEND_API_KEY` | Production | **Yes** | Sends enquiry emails. Without it, production forms return 503. |
| `ENQUIRY_FROM` | Production | No | Verified sender, e.g. `CHC Website <website@chcconnect.com.au>` |
| `ENQUIRY_TO` | No | No | Receiving inbox. Default `admin@chcconnect.com.au` |
| `TURNSTILE_SECRET_KEY` | Recommended | **Yes** | Server-side Turnstile check |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | With the above | No | Shows the Turnstile widget. Must be set at **build** time (it also adds Cloudflare to the CSP). |
| `TRUST_PROXY` | Yes, behind a CDN | No | `1` to read the client IP from `CF-Connecting-IP` / `X-Forwarded-For` |
| `ALLOWED_ORIGINS` | No | No | Extra origins allowed to post forms (staging, a www/non-www variant) |
| `LOG_SALT` | Yes | Mildly | Random string for anonymising IPs in logs |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Static build only | No | External form backend. The server build defaults to `/api/enquiry`. |

`NEXT_PUBLIC_*` values are compiled into the browser bundle. Never put a secret in one.

## 3. Build and run

```bash
npm ci
npm run check            # lint, typecheck, unit tests
npm run build
npm start                # port 3000; set PORT to change
```

### Vercel

1. Import the repository. The framework is detected automatically.
2. Add the environment variables for Production (and Preview, using a test inbox).
3. Add the domain in Vercel, then in Cloudflare point DNS at Vercel with proxy **on**.
   Set Cloudflare SSL to *Full (strict)*.
4. Logs: Project › Logs, or add a log drain (Datadog, Better Stack, Axiom).

### Any Node host or Docker

`next start` serves the build. Run it under a process manager (systemd, PM2) or a container
with restart-on-failure, behind Cloudflare or nginx. A minimal Dockerfile:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
USER node
EXPOSE 3000
CMD ["npm", "start"]
```

### Static hosting (no form endpoint)

`npm run build:static` writes plain files to `out/` for Cloudflare Pages, Netlify or
cPanel. Redirects and headers come from `public/_redirects` and `public/_headers`.
Forms then use `NEXT_PUBLIC_FORM_ENDPOINT` or fall back to the visitor's email app.

## 4. Cloudflare settings

| Setting | Value |
|---|---|
| SSL/TLS | Full (strict). Always Use HTTPS on. Minimum TLS 1.2. |
| WAF | Managed rules on. Bot Fight Mode on. |
| Rate limiting rule | URI path equals `/api/enquiry` AND method `POST` → 10 requests / 1 minute per IP → Block 10 minutes |
| Caching | Default. Next.js sets `Cache-Control` for prerendered pages and immutable `/_next/static/*`. API responses are `no-store`. |
| Turnstile | Create a widget for the production domain(s) and copy both keys into the environment. |

## 5. Monitoring and error tracking

- **Logs:** the app writes one JSON line per event (see `docs/SECURITY.md`). Server errors
  from any route are logged by `src/instrumentation.ts` as `request.error`.
- **Alerts:** set them for `enquiry.send_failed`, `enquiry.mailer_missing`, any
  `request.error`, and unusual counts of `enquiry.rate_limited`.
- **Error tracking (optional):** to use Sentry, install `@sentry/nextjs`, run its setup,
  and call `Sentry.captureRequestError` inside `onRequestError` in `src/instrumentation.ts`.
  Then add Sentry's ingest domain to `connect-src` in the CSP.
- **Uptime:** an external check on `https://completehealthcareconnect.com.au/` every
  5 minutes, plus a weekly real form submission to confirm email delivery.
- **Performance:** check PageSpeed Insights and the Search Console Core Web Vitals report
  monthly.

## 6. Launch checklist

Content (from `docs/CONTENT-NOTES.md`, section 7):

- [ ] Replace every **MOCK** value:
  - Zanda links, LinkedIn and Seek URLs
  - Vacancy details and the staff languages list
  - Clinic coordinates and weekday hours
  - The gym's location and the video titles
  - STA/MTA, and the policy drafts
- [ ] Approved policy wording is in, then `noindex` is removed from `legal()` in `src/lib/routes.ts`
- [ ] Real photos are in `public/` and replace the Unsplash URLs. Then remove `images.unsplash.com` from `images.remotePatterns` and the CSP.
- [ ] NDIS / WorkCover / DVA logos are downloaded into `public/`, and `completehealthcareconnect.com.au` is removed from the CSP and `remotePatterns`.
- [ ] Vector logo and brand guidelines received.

Technical:

- [ ] Environment variables set. A test enquiry from production reaches the admin inbox, and Reply goes to the sender.
- [ ] Cloudflare rules from section 4 are live. `npm run test:api -- https://<domain>` passes, apart from the rate-limit check, which Cloudflare may answer first.
- [ ] `npm run test:e2e -- https://<domain>` passes.
- [ ] Old WordPress URLs redirect (`next.config.ts` › `legacyRedirects`). Add any others found in Google Search Console.
- [ ] Google Search Console: verify the domain, submit `/sitemap.xml`, request indexing of the key pages.
- [ ] Each Google Business Profile's website link points at `/locations/#<clinic>`, and its hours match the site.
- [ ] Analytics (proposed: GA4 + Search Console) are added with a consent banner. The CSP and Cookie Policy are updated to match.
- [ ] The admin mailbox has MFA, and access is limited to intake staff.

## 7. Updating the site

Edit content in `src/content/*.ts`, run `npm run check`, build, and deploy. Every push to
the main branch deploys automatically on Vercel. Use Preview deployments to review changes
before merging.
