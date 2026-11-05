# Complete Healthcare Connect — website (Next.js)

The Complete Healthcare Connect website, built with **Next.js 16 (App Router)**, React 19,
TypeScript and Tailwind CSS v4. Every page is prerendered to static HTML at build time,
so content, links and metadata are present without JavaScript.

Business items to confirm before launch (policy text, mock data, form hosting…) are
listed in [`docs/CONTENT-NOTES.md`](docs/CONTENT-NOTES.md) (section 7 lists every mock value).

| Document | Covers |
|---|---|
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Environment variables, hosting, Cloudflare, launch checklist, monitoring |
| [`docs/SECURITY.md`](docs/SECURITY.md) | Protections in place, infrastructure requirements, remaining risks |
| [`docs/CONTENT-NOTES.md`](docs/CONTENT-NOTES.md) | Business answers, mock data, outstanding content |

## Quick start

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local   # optional in development (forms log instead of emailing)
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build for a Next.js server (Vercel, Node, Docker) |
| `npm start` | Serves the production build on port 3000 |
| `npm run build:static` | Static export to `out/` for any static host (see Deploying) |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript, strict mode |
| `npm test` | Unit tests (form validation, sanitising, rate limiter) |
| `npm run test:api -- <url>` | Integration tests for `POST /api/enquiry` against a running server build |
| `npm run test:e2e -- <url>` | Browser tests for every page at 4 widths (see Testing) |
| `npm run check` | lint + typecheck + unit tests (run before every commit) |
| `npm run audit` | `npm audit` for production dependencies |

## Project structure

```
src/
  app/                         Next.js routes (one folder per URL)
    layout.tsx                 <html>, font, site-wide metadata, <SiteShell>
    page.tsx                   Homepage
    about-us/page.tsx …        One folder per hand-built page
    [...slug]/page.tsx         Service pages and blog articles, generated from src/content
    not-found.tsx              404 page
    sitemap.ts → /sitemap.xml  robots.ts → /robots.txt  blog/rss.xml/route.ts → RSS feed
    globals.css                Tailwind v4, brand tokens, motion
  views/                       Page bodies (HomePage, ServicePage, BlogPostPage …)
  components/                  SiteShell, SiteHeader, SiteFooter, EnquiryForm, BookModal,
                               ChatPanel, Link, Logo, Icons, ui.tsx (page building blocks)
  content/                     All business facts and copy: site.ts (contact, clinics, nav),
                               services.ts, blog.ts, news.ts, faqs.ts
  lib/routes.ts                Every URL: title, description, breadcrumb, schema, sitemap data
  lib/seo.tsx                  Page metadata and JSON-LD from lib/routes.ts
  ui-context.tsx               useSiteUi(): open the booking dialog / chat from any page
  assets/  fonts/              Local images and the self-hosted Poppins font
public/                        Static files, plus _redirects and _headers for static hosts
scripts/validate.mjs           Playwright checks for every page at 4 widths
```

### How a page is wired

Each `page.tsx` is a small server component: it exports `metadata` from the route table
and renders the JSON-LD plus a view:

```tsx
const PATH = '/about-us/'
export const metadata = pageMetadata(PATH)
export default function Page() {
  return (<><RouteJsonLd path={PATH} /><AboutPage /></>)
}
```

Pages are **Server Components** by default: no JavaScript is sent for them. Only the
parts that need the browser are Client Components (`'use client'`): the site shell
(header menus, booking dialog, chat), `EnquiryForm`, `ActionButton` (a book/chat button
that server pages can drop in), and the views with real state: the homepage (slider, tabs,
counters), the NDIS eligibility check and the blog filter.

### Adding content

- **A service page:** add an entry to `src/content/services.ts`. The page, metadata,
  Service schema, sitemap entry and HTML sitemap entry are created automatically.
  Add it to `servicesNav` in `src/content/site.ts` if it belongs in the menu.
- **A blog article:** add an entry to `src/content/blog.ts`. It gets a page, the
  BlogPosting schema, an RSS item and a sitemap entry.
- **A news item / FAQ:** `src/content/news.ts`, `src/content/faqs.ts`.
- **A new hand-built page:** create `src/app/<slug>/page.tsx` (copy an existing one),
  then add the route to `src/lib/routes.ts`. `getRoute()` throws at build time if a
  page has no route entry, so a missing title or description can't ship.

Internal links use `<Link to="/path/">` from `src/components/Link.tsx` (next/link with
`aria-current` on the current page). URLs keep the WordPress style with a trailing slash
(`trailingSlash: true`).

## Forms

`EnquiryForm` handles booking, referral, contact and franchise enquiries. Its rules live in
`src/lib/enquiry.ts`, shared by the browser and the server.

- **Server build (default):** the form POSTs JSON to `/api/enquiry`
  (`src/app/api/enquiry/route.api.ts`). The server checks the origin and size,
  rate-limits, verifies Turnstile if configured, re-validates and cleans every field,
  then emails the admin inbox through Resend. Field errors found by the server are shown
  on the form. See `docs/SECURITY.md` for each layer and `.env.example` for settings.
  Without `RESEND_API_KEY` in development, submissions are logged (field names only)
  and accepted; in production they return 503 so a missing key is noticed.
- **Static build:** there is no server. Set `NEXT_PUBLIC_FORM_ENDPOINT` to an external
  form backend (it must validate and rate-limit too), or leave it empty and the form
  opens the visitor's email app addressed to admin@chcconnect.com.au.

The route file is named `route.api.ts` so the static export, which can't contain POST
handlers, leaves it out (`pageExtensions` in `next.config.ts`).

The NDIS referral, service agreement and planned intervention forms are proposed as
Zanda online forms (links in `src/content/site.ts`, currently mock).

## Chat panel

`ChatPanel` is a guided helper with canned replies. Nothing typed in it is sent anywhere,
and its wording does not promise a live reply. To offer real chat, replace the panel with
a chat provider's widget (and allow its domains in the CSP).

## SEO

- Per-page `<title>`, description, canonical, robots, Open Graph and Twitter tags from
  `src/lib/routes.ts`.
- JSON-LD: Organization, WebSite, MedicalClinic (each clinic), Service, Blog,
  BlogPosting, FAQPage and BreadcrumbList.
- `/sitemap.xml` (indexable pages only), `/robots.txt`, `/blog/rss.xml`, and an HTML
  sitemap at `/sitemap/`.
- Policy pages are `noindex` until the approved wording is added: then remove
  `noindex: true` from `legal()` in `src/lib/routes.ts`.
- Open Graph image: 1200×630 (`public/brand/og-image.png`).
- `/llms.txt`: a plain-text summary of the business and every page for AI answer engines.
- Local SEO: each clinic has MedicalClinic schema with address, geo, opening hours and
  its Google Business Profile link. Name, address and phone come from one source
  (`src/content/site.ts`) so they stay consistent everywhere.

## Accessibility

Skip link; one `<h1>` per page; landmark navs; keyboard-operable dropdowns, dialog
(focus trap, Esc, focus return), tabs (arrow keys, Home/End) and slider (pause button,
←/→, pauses on hover/focus); focus moves to the page content after navigation;
labelled form fields with linked errors; `prefers-reduced-motion` turns off all motion
and auto-advance; 24px minimum targets; visible focus ring on light and dark backgrounds.
Orange buttons use navy text (8:1 contrast). Checked with axe-core (WCAG 2.2 AA) on every
page: no violations apart from the decorative logo glyph.

## Deploying

See **[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)**. In short: `npm run build` and
`npm start` on Vercel or any Node host behind Cloudflare, with the variables from
`.env.example`. The static export (`npm run build:static`) is still supported but has no
form endpoint.

## Testing

| Level | Command | What it covers |
|---|---|---|
| Unit | `npm test` | Validation rules, type confusion, unknown fields, length limits, header-injection and bidi characters, HTML escaping, honeypot, rate limiter (incl. memory bound). Node's built-in test runner, no extra dependencies. |
| Integration | `npm run test:api -- http://localhost:3000` | The real endpoint: 405 on GET, 403 cross-site (CSRF), 415 non-JSON, 400 bad JSON, 413 oversize, 422 field errors, honeypot, `no-store`, 429 + `Retry-After`, and security headers on pages. |
| End-to-end | `npm run test:e2e -- http://localhost:3000` | Every page at 1440/1024/768/375px: no console or hydration errors, one `<h1>`, unique titles and descriptions, canonical, robots, valid JSON-LD, all internal links and anchors, alt text, no duplicate IDs, no horizontal scroll. Then interactions: menus, slider, tabs, dialog focus and Esc, forms (server errors shown on fields, success state), honeypot, eligibility check, chat, mobile menu, 404, redirects, headers, sitemap, robots and RSS. |

```bash
npm install --no-save playwright && npx playwright install chromium   # once, for e2e
npm run build && TRUST_PROXY=1 npm start &
npm test
npm run test:api -- http://localhost:3000
npm run test:e2e -- http://localhost:3000
# static export:
npm run build:static && npx serve out -l 5000 &
npm run test:e2e -- http://127.0.0.1:5000 --static
```

`test:api` needs `TRUST_PROXY=1` on the server so its rate-limit test can use its own
test IP addresses.

### Last results (4 Nov 2026)

- Unit: 15/15 pass.
- API: 10/10 pass.
- End-to-end: 39 pages × 4 widths, server and static builds, no problems.
- axe-core (WCAG 2.2 AA): 40 pages, no violations apart from the logo glyph. No broken links.
- Lighthouse (mobile, simulated throttling, local server):

| Page | Performance | Accessibility | Best practices | SEO | TBT | CLS |
|---|---|---|---|---|---|---|
| Home | 97 | 97 | 96 | 100 | 80 ms | 0 |
| Contact | 99 | 97 | 100 | 100 | 110 ms | 0 |
| FAQs | 97 | 96 | 100 | 100 | 100 ms | 0 |
| NDIS services | 95 | 97 | 96 | 100 | 130 ms | 0 |
| Locations | 94 | 96 | 100 | 100 | 140 ms | 0 |
| Physiotherapy | 91 | 97 | 96 | 100 | 230 ms | 0 |

  LCP was 1.9–2.9 s, but the test machine couldn't reach the Unsplash image host, so
  re-measure LCP on the deployed site (PageSpeed Insights) once real photos are in
  `public/`. The best-practices misses are the same blocked images.
- `npm audit --omit=dev`: 0 vulnerabilities. Dev-only advisory in ESLint's `minimatch`
  (see `docs/SECURITY.md`).
