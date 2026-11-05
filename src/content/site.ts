// Business facts used across the site. Sources: the current website
// (completehealthcareconnect.com.au, read 23 Oct 2026) and the homepage design.
// Anything marked CONFIRM needs a business check before launch (see docs/IMPLEMENTATION.md).

export const SITE_URL = 'https://completehealthcareconnect.com.au'
export const SITE_NAME = 'Complete Healthcare Connect'

export const contact = {
  phone: '1300 450 334',
  phoneHref: 'tel:1300450334',
  /** Fax only (confirmed Nov 2026). Not a phone line, so it is never shown as a tel: link. */
  fax: '07 3036 6061',
  email: 'admin@chcconnect.com.au',
  careersEmail: 'hr@chcconnect.com.au',
  abn: '82 379 817 655',
  /** Office and phone hours (business answer: 8:30–5). Weekdays assumed — MOCK until confirmed. */
  hours: 'Monday to Friday, 8:30 am to 5:00 pm',
  hoursShort: 'Mon–Fri 8:30 am–5 pm',
  afterHours: 'After-hours calls still go through 1300 450 334.',
  /**
   * WhatsApp chat. MOCK number: replace with CHC's WhatsApp Business number, or set
   * to '' to hide the button. International format, digits only (61 = Australia).
   */
  whatsapp: '61400000000',
  whatsappMessage: 'Hi CHC, I’d like to ask about your services.',
}

/**
 * Holiday hours. Shown on Locations, clinic pages and the footer, and added to the
 * clinic schema (specialOpeningHoursSpecification). MOCK dates: update each year.
 */
export const holidayHours = {
  note: 'Closed on Queensland public holidays.',
  closures: [
    { label: 'Christmas and New Year', from: '2026-12-24', to: '2027-01-04' },
  ],
}

/** Zanda is CHC's practice-management system (CRM). MOCK: the real portal and form links are still to come. */
export const zanda = {
  booking: 'https://chcconnect.zanda.example/book',
  portal: 'https://chcconnect.zanda.example/portal',
}

export const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/CompleteHealthcareConnectPTYLTD/' },
  { label: 'Instagram', href: 'https://www.instagram.com/completehealthcareconnect/' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCeCRfxJ9DBRAwX2k5cx9c6g' },
  // MOCK: the business confirmed a LinkedIn presence; the company page URL is still to come.
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/complete-healthcare-connect/' },
]

/** Where jobs are advertised (business answer). MOCK URLs until the real listings are supplied. */
export const jobBoards = [
  { label: 'Seek', href: 'https://www.seek.com.au/Complete-Healthcare-Connect-jobs' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/complete-healthcare-connect/jobs/' },
]

/** Client video testimonials on YouTube, collected with consent (business answer, Nov 2026). */
// MOCK titles, descriptions and upload dates: copy the real ones from each YouTube video.
export const videoTestimonials = [
  { id: 'T4EyBcS7WU8', title: 'Client story: support at home with CHC', description: 'A Complete Healthcare Connect client talks about the in-home support and care they receive.', uploadDate: '2024-03-01' },
  { id: 'JbpH2BxQaJc', title: 'Client story: therapy that made a difference', description: 'A client shares their experience of allied health therapy with Complete Healthcare Connect.', uploadDate: '2024-03-01' },
  { id: 'mg4ulGR3X0U', title: 'Client story: NDIS support with CHC', description: 'An NDIS participant describes working with the Complete Healthcare Connect team.', uploadDate: '2024-03-01' },
]

/**
 * NDIS forms. Proposal (Nov 2026): rebuild them as Zanda online forms, so submissions,
 * signatures and client records stay in the CRM the team already uses and WordPress can
 * be retired. MOCK URLs until the Zanda forms exist.
 */
export const forms = {
  referral: `${zanda.portal}/forms/ndis-referral`,
  serviceAgreement: `${zanda.portal}/forms/ndis-service-agreement`,
  plannedIntervention: `${zanda.portal}/forms/planned-intervention`,
  feedback: 'https://forms.office.com/r/UZ1i340N9N',
  complaint: 'https://forms.office.com/r/0iapdkRJ0A',
}

export type Clinic = {
  slug: string
  name: string
  street: string
  suburb: string
  postcode: string
  area: string
  /** Approximate map position (MOCK until the Google Business Profile pins are confirmed). */
  lat: number
  lng: number
  /** Google Business Profile, opened as a Maps search for the listing. */
  gbp: string
  /** Extra facilities at this clinic. */
  features?: string[]
}

const gbp = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

/**
 * Embedded Google Map for a clinic (keyless embed, no API key or billing).
 * Searches by business name + address so the pin opens the clinic's Google Business
 * Profile when one exists. MOCK until the real listings are confirmed: if a pin lands on
 * the wrong place, replace the query with the listing's exact name, or use
 * `https://www.google.com/maps/embed?pb=…` copied from Google Maps › Share › Embed a map.
 */
export const mapEmbedUrl = (c: Clinic) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`Complete Healthcare Connect, ${c.street}, ${c.suburb} QLD ${c.postcode}`)}&z=15&output=embed`

// Capalaba and Cannon Hill were removed at the business's request (Nov 2026).
export const clinics: Clinic[] = [
  // MOCK: the business said "the clinic has a rehab gym" without naming it; Logan Central assumed.
  { slug: 'logan-central', name: 'Logan Central', street: 'Unit 3/1 Mooney Street', suburb: 'Logan Central', postcode: '4114', area: 'Logan', lat: -27.6393, lng: 153.1093, gbp: gbp('Complete Healthcare Connect Logan Central'), features: ['Rehab gym'] },
  { slug: 'booval', name: 'Booval', street: 'Unit 3/125 Brisbane Road', suburb: 'Booval', postcode: '4304', area: 'Ipswich', lat: -27.6137, lng: 152.7889, gbp: gbp('Complete Healthcare Connect Booval') },
  { slug: 'north-lakes', name: 'North Lakes', street: 'Unit 509, Level 5, 6 North Lakes Drive', suburb: 'North Lakes', postcode: '4509', area: 'Moreton Bay', lat: -27.2367, lng: 153.0206, gbp: gbp('Complete Healthcare Connect North Lakes') },
]

export const serviceAreas = ['Brisbane', 'Logan', 'Ipswich', 'North Lakes', 'Caboolture', 'Redlands', 'Gold Coast']

/** Telehealth is a way of delivering care, not a separate service (business answer, Nov 2026). Podiatry needs an in-person visit. */
export const telehealthServices = ['Occupational therapy', 'Speech pathology', 'Medical consultations']

/** MOCK: the business will send the real list of languages its staff speak. */
export const staffLanguages = ['Arabic', 'Dari', 'Hindi', 'Punjabi', 'Samoan', 'Swahili', 'Tagalog', 'Vietnamese']

export const acknowledgementOfCountry =
  'Complete Healthcare Connect acknowledges the Traditional Custodians of the lands on which we live and work, and pays respect to Elders past and present. We recognise Aboriginal and Torres Strait Islander peoples’ continuing connection to land, water and community.'

/** Where we take enquiries and referrals (business content, Oct 2026). In-person services depend on local availability. */
export const serviceRegions = [
  { state: 'Queensland', areas: 'Brisbane, Logan, Ipswich, Moreton Bay, Gold Coast, Toowoomba, Townsville and Cairns.' },
  { state: 'New South Wales', areas: 'Sydney and Greater Sydney.' },
  { state: 'Victoria', areas: 'Melbourne and Greater Melbourne.' },
  { state: 'South Australia', areas: 'Adelaide and surrounding suburbs.' },
  { state: 'Western Australia', areas: 'Perth and surrounding suburbs.' },
]

export type NavItem = { label: string; to: string; description?: string }
export type NavGroup = { label: string; to?: string; items?: NavItem[] }

export const servicesNav: NavItem[] = [
  { label: 'Disability Services (NDIS)', to: '/ndis-services/', description: 'NDIS, NIISQ and DVA community nursing' },
  { label: 'Aged Care Services', to: '/aged-care-services/', description: 'Care and therapy for older Australians at home' },
  { label: 'Paediatric & Early Intervention', to: '/early-intervention/', description: 'Autism, ADHD and developmental support for children' },
  { label: 'Supported Accommodation', to: '/housing-living-support/', description: 'SIL, SDA and Individualised Living Options' },
  { label: 'Home & Community Support', to: '/home-community-support/', description: 'Support workers at home and out and about' },
  { label: 'Maintenance in the Home', to: '/maintenance-in-the-home/', description: 'Supported care at home after hospital' },
  { label: 'Allied Health & Rehabilitation', to: '/allied-health-services/', description: 'Physio, OT, speech pathology and podiatry' },
]

export const aboutNav: NavItem[] = [
  { label: 'About Us', to: '/about-us/' },
  { label: 'Our Team', to: '/our-team/' },
  { label: 'Franchise With Us', to: '/franchise-with-us/' },
  { label: 'Feedback & Complaints', to: '/feedback-and-complaints/' },
]

export const resourcesNav: NavItem[] = [
  { label: 'Blog', to: '/blog/', description: 'Health tips and NDIS guides' },
  { label: 'News', to: '/news/', description: 'Announcements and community news' },
  { label: 'FAQs', to: '/faqs/', description: 'Bookings, NDIS, funding and costs' },
]

/** Services dropdown: every service plus the NDIS eligibility check. */
export const servicesMenu: NavItem[] = [
  ...servicesNav,
  { label: 'NDIS Eligibility Check', to: '/ndis-eligibility/', description: 'Four quick questions' },
  { label: 'Funding Schemes', to: '/funding-schemes/', description: 'NDIS, NIISQ, Medicare, WorkCover, CTP, DVA' },
]

export const mainNav: NavGroup[] = [
  // Seven top-level items (checklist: max 7). Funding Schemes is in the Services menu.
  { label: 'Services', items: servicesMenu },
  { label: 'Referrals', to: '/referrals/' },
  { label: 'Locations', to: '/locations/' },
  { label: 'Resources', items: resourcesNav },
  { label: 'About', items: aboutNav },
  { label: 'Careers', to: '/careers/' },
  { label: 'Contact', to: '/contact/' },
]

/**
 * Registrations and memberships shown as trust signals (About page).
 * `mock: true` entries are PLACEHOLDERS (question 31): confirm each is real and current
 * before launch, or remove it. Never show a membership CHC doesn't hold.
 */
export const accreditations: { title: string; detail: string; mock?: boolean }[] = [
  { title: 'Registered NDIS provider', detail: 'NDIS Quality and Safeguards Commission, registration ID 4-FZ38IK2' },
  { title: 'Registered NIISQ provider', detail: 'National Injury Insurance Scheme Queensland' },
  { title: 'AHPRA-registered clinicians', detail: 'Physiotherapists, occupational therapists, podiatrists, nurses and doctors', mock: true },
  { title: 'Speech Pathology Australia', detail: 'Certified practising speech pathologists', mock: true },
  { title: 'WorkCover Queensland', detail: 'Approved provider for workplace injury rehabilitation', mock: true },
  { title: 'DVA', detail: 'Services for eligible veterans and DVA cardholders', mock: true },
]
