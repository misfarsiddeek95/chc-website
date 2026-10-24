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
| `/housing-living-support/` | Supported Accommodation | SIL and STA overview, how to apply | Preserved URL |
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
6. **Homepage locations:** Sydney, Melbourne, Adelaide, Perth and Townsville appear on the homepage. The current site lists five Queensland clinics and says services run in QLD, NSW, VIC and SA. Perth and Townsville aren't mentioned anywhere.
7. **Homepage accommodation:** SDA, MTA, ILO and 24/7 appear on the homepage. The current site confirms only SIL and STA (respite).
8. **Maintenance in the Home:** this content comes only from the homepage. Confirm the service, who funds it, and the referral process.
9. **Aged care funding:** the current site refers to Home Care Packages, which have moved to the Support at Home program. Confirm CHC's registration and update the wording.
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
18. **Orange buttons:** white text on `#FF9D00` is 2.08:1, below WCAG AA even for large text. Options: dark ink text on orange (about 8:1), or a darker orange fill. This affects every call to action, so it's left for the brand owner to decide.
