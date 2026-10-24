# Complete Healthcare Connect — website (Next.js)

The Complete Healthcare Connect website, built with **Next.js 16 (App Router)**, React 19,
TypeScript and Tailwind CSS v4. Every page is prerendered to static HTML at build time,
so content, links and metadata are present without JavaScript.

Business items to confirm before launch (policy text, statistics, testimonials, form
hosting…) are listed in [`docs/CONTENT-NOTES.md`](docs/CONTENT-NOTES.md) › Outstanding items.

## Quick start

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local   # optional: set the form endpoint
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
| `npm run validate` | Site-wide browser checks against a running build (see Testing) |

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

Views that need interactivity (the booking dialog, tabs, forms) are client components
(`'use client'`). They are still rendered to HTML at build time.

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

`EnquiryForm` handles booking, referral and contact enquiries.

- **With `NEXT_PUBLIC_FORM_ENDPOINT`** set at build time, it POSTs JSON to that URL
  (Formspree, Power Automate, a CRM webhook…). The endpoint must accept CORS requests from
  the site's domain. Fields: `type`, `firstName`, `lastName`, `phone`, `email`,
  `organisation`, `service`, `region`, `ndisNumber`, `message`, `consent`, `page`
  (empty fields are omitted, values are trimmed). The endpoint's origin is added to the
  Content-Security-Policy automatically (server build) — for a static host add it to
  `connect-src` in `public/_headers`.
- **Without it**, the form opens the visitor's email app addressed to
  admin@chcconnect.com.au with the details filled in.

Health information is involved: choose a backend with appropriate privacy controls.
Built in: inline validation and an error summary, length limits, a 15-second request
timeout, double-submit protection, and a hidden honeypot field that silently drops bots.
Client-side checks are a convenience only; **the receiving endpoint must validate and
rate-limit submissions itself.**

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
- The Open Graph image is 538×440. A 1200×630 image would give sharper social previews.

## Accessibility

Skip link; one `<h1>` per page; landmark navs; keyboard-operable dropdowns, dialog
(focus trap, Esc, focus return), tabs (arrow keys, Home/End) and slider (pause button,
←/→, pauses on hover/focus); focus moves to the page content after navigation;
labelled form fields with linked errors; `prefers-reduced-motion` turns off all motion
and auto-advance. Known gap: white text on the `#FF9D00` orange buttons is below WCAG AA
contrast — a brand decision (see `docs/CONTENT-NOTES.md`).

## Deploying

**Option A — Vercel or any Node host (recommended).** `npm run build` then `npm start`
(or import the repo into Vercel). Redirects from the old WordPress URLs, security headers
and image optimisation (AVIF/WebP, responsive sizes) are handled by `next.config.ts`.

**Option B — static hosting** (Netlify, Cloudflare Pages, S3, cPanel). Run
`npm run build:static` and upload `out/`. `public/_redirects` and `public/_headers`
cover Netlify / Cloudflare Pages; on other hosts recreate them as server rules
(301 redirects + the headers). In this mode images are served unoptimised.

Before launch:
1. Keep the WordPress forms live (`/ndis-referral-form/`, `/ndis-service-agreement/`,
   `/revised-planned-intervention/`) or rebuild them — the site links to them.
2. Download the NDIS, WorkCover and DVA logos (currently hotlinked from WordPress) into
   `public/`, then update the URLs in `src/views/HomePage.tsx` and `src/views/FundingPage.tsx`
   and remove `completehealthcareconnect.com.au` from `images.remotePatterns` and the CSP.
3. Work through `docs/CONTENT-NOTES.md` › Outstanding items.

### Security headers

Set for every response (server build) or via `public/_headers` (static): a
Content-Security-Policy (no third-party scripts; images only from this site and
Unsplash; no framing), HSTS (one year, this host), `nosniff`, `X-Frame-Options: DENY`,
a strict referrer policy and a Permissions-Policy. `X-Powered-By` is removed. If you add
analytics, a chat widget or maps, allow their domains in the CSP in `next.config.ts`
(and `public/_headers`).

## Testing

`scripts/validate.mjs` opens every page at 1440, 1024, 768 and 375px and checks: no
JavaScript or hydration errors; exactly one `<h1>`; unique titles and descriptions;
canonical URL; robots tag; valid JSON-LD with breadcrumbs; RSS link; all internal links
and `#anchors` resolve; images have alt text; no duplicate IDs; no horizontal scroll.
Then it runs interaction tests: menus, hero slider, location tabs (click and keyboard),
booking dialog (focus, validation, Esc, closing on navigation), enquiry form, honeypot,
NDIS eligibility check, chat panel, mobile menu, 404 page, redirects, security headers,
sitemap, robots.txt and RSS.

```bash
npm install --no-save playwright && npx playwright install chromium   # once
npm run build && npm start &
npm run validate                                   # http://127.0.0.1:3000
# static export:
npm run build:static && npx serve out -l 5000 &
node scripts/validate.mjs http://127.0.0.1:5000 --static
```
