# Complete Healthcare Connect — content and launch notes

Carried over from the original build. Covers the analysis of the existing WordPress
site, the page inventory, the content changes, and the business items that must be
confirmed before launch. For how the code works, see `../README.md`.

## 1. Website analysis

**Homepage and design system.** The homepage (now `src/views/HomePage.tsx`) is the visual source of truth.
- **Brand:** purple `#27156F` for brand and trust; orange `#FF9D00` for actions; cream `#FAFAF7`, lavender `#F0EDFF` and warm `#F5F2EC` backgrounds; ink `#1a1238` for headings.
- **Type:** Poppins throughout, with large bold headings and an UPPERCASE orange eyebrow label above each section.
- **Shapes:** 12px radius on buttons, 16px on cards, 24px on photos and panels; soft purple-tinted shadows.
- **Spacing:** a 1280px max-width container with 24px gutters and 80/112px vertical section padding.

**Architecture (original).** The design was built in Figma Make with React 19, Vite and Tailwind CSS v4. It has since been moved to Next.js (see `../README.md`). Originally the whole site was a single 1,700-line `App.tsx` with no routing; every link was an on-page anchor or opened the booking modal.

**Issues found and fixed**
| Issue | Fix |
|---|---|
| No pages beyond the homepage; nav links were `#anchors` | Real pages with their own URLs (Next.js App Router) |
| Single-page app: crawlers see an empty `<div id="root">` | Every route is prerendered to static HTML at build time (Next.js static generation), then hydrated |
| Header overflowed at about 1400px (8 top-level links, Book button cut off) | Services and About grouped into accessible dropdowns |
| Booking form did nothing on submit | Shared `EnquiryForm` with validation, error/loading/success states and real delivery |
| Chat "Refer a client" said it would open the form but didn't | Referral buttons (homepage, chat, final CTA) now go to the Referrals page, which explains the process and links the secure forms |
| Some homepage sections had no route to their page | "More about who we are", "How funding works" and "All clinic addresses and directions" links added |
| Duplicate `id="accommodation"` (card and section) | Card IDs removed |
| Homepage said "Our three clinics"; the business has five | Capalaba and Cannon Hill added |
| Small orange text (eyebrows, taglines) was 2.08:1 on white, failing WCAG AA | `#9e5c00` (4.6–5.3:1) for small orange text on light backgrounds; brand orange kept for buttons, dots and text on purple |
| Footer legal links at 30% white (2.6:1) | Raised to 60% white (7.2:1) |
| `site.json` had `robots.index: false` and the title typo "Healycare" | Fixed; language set to `en-AU` |

## 2. Page inventory

| URL | Page | Purpose | Status |
|---|---|---|---|
| `/` | Home | Brand, services overview, conversion | Existing, links updated |
| `/ndis-services/` | Disability Services (NDIS) | NDIS supports, getting started, 24 registration groups | Preserved URL |
| `/ndis-eligibility/` | NDIS Eligibility | Interactive self-check and how to apply | Preserved URL |
| `/aged-care-services/` | Aged Care Services | In-home care and allied health for older Australians | New |
| `/early-intervention/` | Early Intervention | Children's speech, OT and physio | New |
| `/housing-living-support/` | Supported Accommodation | SIL (Logan), ILO, SDA (Marsden), highly specialised accommodation (Waterford West) | Preserved URL |
| `/supported-independent-living/` | SIL | SIL in detail | Preserved URL |
| `/home-community-support/` | Home & Community Support | Support workers at home and in the community | Preserved URL |
| `/maintenance-in-the-home/` | Maintenance in the Home | Transitional care after hospital | New |
| `/allied-health-services/` | Allied Health & Rehabilitation | Hub for the four disciplines | Preserved URL |
| `/allied-health-services/physiotherapy/` (also `/occupational-therapy/`, `/speech-pathology/`, `/podiatry/`) | Discipline pages | Conditions, services, funding | New (were sections of one page) |
| `/funding-schemes/` | Funding Schemes | NDIS, NIISQ, Medicare, WorkCover, CTP, DVA, aged care, private | Preserved URL |
| `/referrals/` | Referrals | Process for professionals, NDIS forms, quick referral | New |
| `/locations/` | Locations | Five clinics, directions, mobile service areas | New |
| `/about-us/` | About Us | Story, mission, vision, principles, values | Preserved URL |
| `/our-team/` | Our Team | Team by discipline | Preserved URL |
| `/careers/` | Careers | Open roles, benefits, how to apply | Preserved URL |
| `/contact/` | Contact Us | Enquiry form, phones, email, clinics, feedback | Preserved URL |
| `/blog/` | Blog | Article listing with topic filter, RSS feed | New |
| `/fall-prevention/`, `/integrating-mindfulness/`, `/how-to-choose-the-right-ndis-provider/`, `/physiotherapy-for-ndis-participants-in-logan-central/` | Blog articles | Health tips and NDIS guides | Preserved URLs, **rewritten — clinical review needed** |
| `/news/` | News | Announcements, community, careers, media contact | New |
| `/faqs/` | FAQs | Bookings, NDIS, costs, feedback (FAQPage schema) | New |
| `/feedback-and-complaints/` | Feedback & Complaints | How to give feedback, the process, independent bodies | New |
| `/accessibility/` | Accessibility statement | WCAG 2.1 AA commitment, known limitations, help | New |
| `/sitemap/` | HTML sitemap | Every page, grouped (generated from the route table) | New |
| `/privacy-policy/`, `/terms-and-conditions/`, `/cancellation-policy/`, `/cookie-policy/` | Policies | Legal | Preserved URLs, **text to be added** (noindex until then) |
| `/404.html` | Not found | Recovery links | New |

## 3. Content improvements

- All copy was rewritten from the facts on the current site: shorter sentences, plain Australian English, "we" and "you", and one idea per paragraph. Headings follow the homepage's sentence-case style.
- **Corrected or standardised:**
  - NDIS registration group names now use their full official wording.
  - The contact form's region list uses correct state names; the old one had "North Territory" and "Capital Territory".
  - Duplicate staff entries on the old team page were removed.
- **Reorganised:**
  - The one long allied health page is now a hub plus four discipline pages.
  - NDIS content is grouped into what we offer, getting started and registration.
  - Contact details live in one data file (`src/content/site.ts`), so the phone number, email and clinics are identical everywhere.
- **Not invented:** no new statistics, testimonials, accreditations or prices were added. Unconfirmed items are listed under Outstanding items below.

## 4. Outstanding items: business decisions and launch tasks

### Launch blockers
1. **Existing form pages.** `/ndis-referral-form/`, `/ndis-service-agreement/` and `/revised-planned-intervention/` are WordPress forms that the new site links to. If the new site replaces WordPress on this domain, those URLs will break. Either keep WordPress running for those paths (or on a subdomain and update `src/content/site.ts`), or rebuild the forms.
2. **Policy text.** Privacy, Terms, Cancellation and Cookie policy pages show a "policy text to be added" notice. Paste in the approved wording, then remove `noindex: true` from those routes in `src/lib/routes.ts`.
3. **Form delivery.** Set `NEXT_PUBLIC_FORM_ENDPOINT` to a form backend, or accept the email-app fallback. Health information is involved, so choose a backend with appropriate privacy controls.
4. **Homepage testimonials.** The quotes from "Margaret T.", "James K." and "Sarah L." came from the design prototype and aren't on the current site. Replace them with real, consented client feedback. The current site's "Good News Stories" (from Williams M, Charles and Kakozi) could be used with permission and their exact wording.

### Facts to confirm
5. **Homepage statistics:** 30+ clinicians, 50+ support workers and 10,000+ clients don't appear on the current site. The current team page lists about 25 clinicians and nurses and 28 support workers.
6. **Homepage locations:** resolved — the business content (Oct 2026) lists QLD (incl. Townsville and Cairns), NSW, VIC, SA and WA. In-person availability still varies by area.
7. **Accommodation:** resolved — the business content confirms SIL (Logan), SDA (Marsden), ILO and highly specialised accommodation (Waterford West). Short-Term Accommodation (respite) and MTA are no longer listed on the site; add them back if still offered.
8. **Maintenance in the Home:** resolved — page rewritten from the business content (Greater Brisbane, request-a-quote model). Confirm how it is funded if you want funding shown on the page.
9. **Aged care funding:** resolved — the site now refers to Support at Home, CHSP, the Transition Care Program, respite and DVA Community Nursing, as in the business content.
10. **Funding per service:** which schemes apply to which service is inferred from the site-wide list (for example DVA, Medicare and private health insurance on the discipline pages). The current site shows HCF, nib, Navy Health, Defence Health, GMHBA and Teachers Health logos without explaining the arrangement.
11. **Contact details:** the current site's email link points to admin@completehealthcareconnect.com.au while showing admin@chcconnect.com.au, and its header phone link dials 07 3472 5655. The new site uses 1300 450 334, 07 3036 6061 and admin@chcconnect.com.au.
12. **Online booking portal:** the current site links to an online client portal. Its URL wasn't found. Add it if bookings should go there instead of the form.
13. **Team listing:** first names and roles come from the current site. Confirm current staff and their consent to be listed. Photos and bios could be added.

### Content and assets
14. **Photos:** pages use the same Unsplash stock photos as the homepage design. Replace them with real CHC photography where possible. The podiatry page has no photo yet.
15. **Partner logos:** the NDIS, WorkCover and DVA logos on the homepage and funding page are hotlinked from the WordPress site. Download them into `public/` before WordPress is retired.
16. **Blog articles:** the four articles keep their original URLs but are newly written on the same topics. Have a clinician review each before launch. The mindfulness and Logan Central physiotherapy articles couldn't be read from the current site, so they're new versions rather than rewrites; the original publish dates for those two are unknown.
20. **News:** only verifiable items are listed (hiring, the new website, five clinics, community sponsorship). Add dated announcements as they happen in `src/content/news.ts`.
21. **Feedback & complaints:** confirm the four-step process and the commitment that making a complaint won't affect care. The NDIS Commission and Aged Care Commission are linked rather than given phone numbers, because their numbers couldn't be confirmed from their own sites; the Health Ombudsman's 133 OHO (133 646) was confirmed.
22. **FAQs:** answers use only confirmed facts. Confirm the referral guidance for Medicare, WorkCover, CTP and DVA, and that all three NDIS plan-management types are accepted.
17. **Retired pages:** `/covid-safe-practices/` and `/test-add/` now redirect to the homepage, and the individual `/our-team-*/` bio pages redirect to `/our-team/`.

### Design decision
18. **Orange buttons:** resolved in the quality audit (section 6). Button text is navy on the same orange (8.5:1). A darker orange fill with white text is the alternative if the brand owner prefers it.

## 5. Content update, 31 Oct 2026

Applied from the business's page content:
- **Homepage slider:** seven slides in care-journey order (Allied health, Paediatrics, Disability, Supported living, Aged care, Hospital to home, Telehealth). Each uses the supplied eyebrow, headline, tagline (as the three ticks) and button; the summary paragraph is shortened to fit the slide. The longer paragraphs are on the service pages. There is no telehealth page, so that slide links to the "Therapy options" section of Allied Health.
- **Service pages rewritten:** Maintenance in the Home, Allied Health & Rehabilitation (plus the four discipline pages' lists), Paediatric & Early Intervention, Supported Accommodation, Disability (NDIS, NIISQ, DVA) and Aged Care.
- **Careers** rewritten (new graduates, roles, locations) and moved into the main menu.
- **New page:** Franchise With Us (`/franchise-with-us/`), under About, with an expression-of-interest form.
- **Footer:** a prominent Feedback & complaints panel on every page.

To confirm or supply:
- **Photos:** the telehealth slide reuses a stock photo of two women at home; replace it with a telehealth image. All slides reuse the existing stock photography.
- **Franchise:** the content calls the model "proposed". Keep the disclaimer while that is true, and have the wording reviewed (franchising in Australia is regulated by the Franchising Code of Conduct).
- **Clinics:** the new content lists three allied health clinics (Logan Central, North Lakes, Booval) while the site lists five clinic locations (also Capalaba and Cannon Hill). Confirm which services each clinic offers.
- **Careers email:** applications go to hr@chcconnect.com.au. Confirm that inbox.

## 6. Quality audit, 1 Nov 2026

All 37 pages were checked with axe-core (WCAG 2.2 AA + best practice), a metadata/heading/link
crawler and the site validator at 1440, 1024, 768 and 375 px.

**Accessibility**
- Orange buttons used white text (2.1:1). Button text is now navy `#1a1238` on the same orange (8.5:1); orange is unchanged.
- The orange third line of the hero headline is now `#C76E00` (3.5:1, passes for large text).
- Focus ring: orange outer ring plus navy inner ring, so it is visible on light and dark backgrounds.
- Testimonial dots have 24 × 24 px tap targets. The header top bar is a labelled region. Sitemap links are underlined. Two 12 px grey captions darkened.
- Remaining: the small orange "+" inside the logo is decorative (logotype exemption).

**SEO, local SEO and GEO**
- Titles trimmed to 61 characters or fewer, and descriptions to 160 or fewer. Allied health titles now include the Logan, Ipswich and North Lakes clinic areas.
- Organisation schema: `alternateName`, description, contact point, NDIS registration ID, `knowsAbout`, and `areaServed` matching `serviceRegions` (was "South East Queensland" only). Clinic schema gains `hasMap` and `areaServed`.
- Footer tagline now matches the service area stated on the other pages: five clinics in South East Queensland and services in other states.
- "Common questions" sections (with FAQPage schema) on the 8 main service pages. Every answer restates facts already on that page or in the existing FAQs.
- `/llms.txt` is generated from the route table for AI assistants.
- Not changed, needs the business: opening hours and coordinates for each clinic (for clinic schema and Google Business Profile), a 1200 × 630 social image, whether Capalaba and Cannon Hill offer allied health (service pages list only Logan Central, North Lakes and Booval), and the spelling of team names "Gertude" and "Jacquis".

## 7. Business answers applied (4 Nov 2026)

Source: "CHC Website — Questions for the Business" answered by the client. Items marked **MOCK** are placeholders and must be replaced before launch.

| # | Answer | Applied |
|---|---|---|
| 1 | Remove Capalaba and Cannon Hill | Three clinics everywhere (site.ts, home tabs, Locations, Contact, footer, schema, llms.txt, news) |
| 2 | Hours 8:30–5 | Mon–Fri 8:30–5 shown (weekdays **MOCK**); schema hours; coordinates **MOCK** (approximate) |
| 3 | 30+ clinicians, 50+ support workers/carers | Stats: 30+, 50+, 3 clinics, 5 states. 10,000+ clients dropped (not confirmed) |
| 4 | Getrude, Jacquis | Fixed |
| 5 | No social image | Designed 1200×630 og-image.png |
| 6 | Any format is fine | Proposal: rebuild the 3 NDIS forms as Zanda online forms; links **MOCK** |
| 7 | No answer | **MOCK** draft policies (src/content/legal.ts), still noindex |
| 8 | Admin email | Unchanged |
| 9 | Keep testimonials + 3 YouTube videos | Video row added (click-to-play, youtube-nocookie); titles **MOCK** |
| 10 | 07 3036 6061 is a fax | Shown as fax only, no tel: link |
| 12 | Zanda CRM | "Book online now" in booking dialog; Zanda URLs **MOCK** |
| 15/27 | Local health region contract; own doctors | MITH copy + FAQs |
| 16 | No answer | **MOCK** STA and MTA cards on Supported Accommodation |
| 17/18/31 | No answer | Existing wording kept; no accreditations shown beyond NDIS registration |
| 19/20/41 | Photos, logos, vector logo "already sent" | Not received — still placeholders |
| 21/30 | Wants to review blog articles | Authors stay "Team CHC" until reviewed |
| 22 | Franchise model final | "Proposed" removed; Franchising Code disclosure line added |
| 24 | Bilingual staff, list to come | Languages section on Our Team; language list **MOCK** |
| 25 | Rehab gym; hydro at nearby pools | Gym at Logan Central (**MOCK** assumption); hydro wording updated |
| 26 | Remove EP, dietetics, psychology, counselling, PT | Removed (NDIS registration group 0126 kept: it is a registration fact) |
| 28/29 | No interstate clinics; telehealth = OT, speech, medical; no podiatry telehealth | Regions, hero slide, allied, FAQs, Locations |
| 32 | Show house, not address (SIL at Logan Reserve) | Suburb shown; privacy note in FAQ |
| 33 | Seek, LinkedIn; 6 vacancies | Current vacancies section; locations/types and job-board URLs **MOCK** |
| 34 | ABN 82 379 817 655 | Footer + schema taxID |
| 35 | Acknowledgement of Country | Footer, standard wording |
| 36 | After hours via 1300 | Header, footer, Contact, FAQ |
| 37 | Socials active; LinkedIn | LinkedIn added (URL **MOCK**) |
| 38 | GBP = Google searches | "View on Google" links per clinic (Maps search) |
| 39 | Our choice | Proposal: GA4 + Search Console with consent banner; Cookie Policy draft reflects this |
| 40 | Moving hosting; ASAP | Proposal: static hosting (Cloudflare Pages / Netlify / Vercel) |

### Clinic maps (5 Nov 2026)

Each clinic card on Locations embeds a Google Map (lazy-loaded, keyless embed). The map
searches "Complete Healthcare Connect, <address>" so it pins the Google Business Profile
when one exists. **MOCK until confirmed:** check each pin; if one is wrong, paste the
listing's own embed URL (Google Maps › Share › Embed a map) into `mapEmbedUrl` in
`src/content/site.ts`. CSP `frame-src` now allows `https://www.google.com`; the Cookie
Policy draft mentions Google Maps cookies.

## 8. SEO / AEO / GEO / Local SEO checklist fixes (5 Nov 2026)

Done in code:

- **Clinic pages:** `/locations/logan-central/`, `/locations/booval/` and `/locations/north-lakes/` (`src/content/clinics.ts`, `src/views/ClinicPage.tsx`), each with a map, NAP, hours, holiday note, parking, transport, accessibility, the services at that clinic, nearby suburbs, FAQs and a MedicalClinic + FAQPage schema.
- **Maps and NAP:** the Contact page shows a map for each clinic. The footer lists every clinic's full address.
- **Tabs:** all tab and testimonial content on the homepage is in the HTML (hidden until chosen). The hero slider keeps one H1, and its slides link to the full pages.
- **Schema:**
  - WebPage, AboutPage, ContactPage or CollectionPage on every page, and WebSite with an `@id`.
  - VideoObject for the 3 videos.
  - A Person author and contributor on BlogPosting, with citations.
  - Clinic schema with areaServed suburbs and holiday closures.
- **Blog articles:** each has a Key takeaways box, "Sources and further reading" (healthdirect, ndis.gov.au, NDIS Commission, Head to Health) and an author box.
- **Metadata:** every title is 50–61 characters and every description 140–160.
- **Floating buttons:** Back to Top and a WhatsApp button (pop and pulse, reduced-motion safe, 48px).
- **Small fixes:**
  - `manifest.webmanifest` with 192 and 512px icons.
  - Holiday hours.
  - 7 top-level menu items (Funding Schemes moved into Services).
  - 48px mobile tap targets on icon buttons.
  - The unused 300 font weight removed.
  - robots.txt names the AI crawlers and blocks `/api/`.
- **Analytics:** GA4 with Consent Mode and a cookie banner, off unless `NEXT_PUBLIC_GA_ID` is set. Events: generate_lead, call_click, whatsapp_click, email_click, cta_click and ai_referral.
- **Trust:** a "Registrations & memberships" section on About, with links to each clinic's Google reviews.

### Mock data to replace before launch (all marked MOCK in the code)

| Item | File | Notes |
|---|---|---|
| WhatsApp number | `src/content/site.ts` › `contact.whatsapp` | Set to `''` to hide the button |
| Holiday closure dates | `site.ts` › `holidayHours` | Update every year |
| Clinic suburbs, parking, transport, access, services, FAQs | `src/content/clinics.ts` | Confirm each clinic |
| Map pins | `site.ts` › `mapEmbedUrl` | Swap in each listing's embed URL if a pin is wrong |
| Blog authors and reviewers | `src/content/authors.ts` | Real clinicians with consent; **don't publish invented people** |
| Video titles, descriptions, upload dates | `site.ts` › `videoTestimonials` | Copy from YouTube |
| Testimonial suburbs | `src/views/HomePage.tsx` › `testimonials` | Confirm with the clients |
| Memberships (4 marked `mock: true`) | `site.ts` › `accreditations` | Keep only the ones CHC really holds |
| GA4 ID `G-XXXXXXXXXX` | `.env.example` | The real ID goes in hosting env vars |

Not done on purpose:

- **Star ratings and AggregateRating schema:** fake ratings break Google's rules. Link to Google reviews instead.
- **Policy pages:** they stay `noindex` until the approved wording is in.
- **Photo file names:** these change when the real photos arrive.
