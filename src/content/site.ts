// Business facts used across the site. Sources: the current website
// (completehealthcareconnect.com.au, read 23 Oct 2026) and the homepage design.
// Anything marked CONFIRM needs a business check before launch (see docs/IMPLEMENTATION.md).

export const SITE_URL = 'https://completehealthcareconnect.com.au'
export const SITE_NAME = 'Complete Healthcare Connect'

export const contact = {
  phone: '1300 450 334',
  phoneHref: 'tel:1300450334',
  phoneAlt: '07 3036 6061',
  phoneAltHref: 'tel:+61730366061',
  email: 'admin@chcconnect.com.au',
  careersEmail: 'hr@chcconnect.com.au',
}

export const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/CompleteHealthcareConnectPTYLTD/' },
  { label: 'Instagram', href: 'https://www.instagram.com/completehealthcareconnect/' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCeCRfxJ9DBRAwX2k5cx9c6g' },
]

/** Existing secure forms on the current site. They must stay live at these URLs (CONFIRM hosting). */
export const forms = {
  referral: `${SITE_URL}/ndis-referral-form/`,
  serviceAgreement: `${SITE_URL}/ndis-service-agreement/`,
  plannedIntervention: `${SITE_URL}/revised-planned-intervention/`,
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
}

export const clinics: Clinic[] = [
  { slug: 'logan-central', name: 'Logan Central', street: 'Unit 3/1 Mooney Street', suburb: 'Logan Central', postcode: '4114', area: 'Logan' },
  { slug: 'booval', name: 'Booval', street: 'Unit 3/125 Brisbane Road', suburb: 'Booval', postcode: '4304', area: 'Ipswich' },
  { slug: 'north-lakes', name: 'North Lakes', street: 'Unit 509, Level 5, 6 North Lakes Drive', suburb: 'North Lakes', postcode: '4509', area: 'Moreton Bay' },
  { slug: 'capalaba', name: 'Capalaba', street: 'Shop 69–70, Capalaba Park Shopping Centre, 45 Redland Bay Road', suburb: 'Capalaba', postcode: '4157', area: 'Redlands' },
  { slug: 'cannon-hill', name: 'Cannon Hill', street: 'Shop 1, Kmart Plaza, 1909 Creek Road', suburb: 'Cannon Hill', postcode: '4170', area: 'Brisbane East' },
]

export const serviceAreas = ['Brisbane', 'Logan', 'Ipswich', 'North Lakes', 'Caboolture', 'Redlands', 'Gold Coast']

export type NavItem = { label: string; to: string; description?: string }
export type NavGroup = { label: string; to?: string; items?: NavItem[] }

export const servicesNav: NavItem[] = [
  { label: 'Disability Services (NDIS)', to: '/ndis-services/', description: 'Registered NDIS supports, nursing and coordination' },
  { label: 'Aged Care Services', to: '/aged-care-services/', description: 'Care and therapy for older Australians at home' },
  { label: 'Early Intervention', to: '/early-intervention/', description: 'Therapy for babies, children and families' },
  { label: 'Supported Accommodation', to: '/housing-living-support/', description: 'SIL and short-term accommodation' },
  { label: 'Home & Community Support', to: '/home-community-support/', description: 'Support workers at home and out and about' },
  { label: 'Maintenance in the Home', to: '/maintenance-in-the-home/', description: 'Supported care at home after hospital' },
  { label: 'Allied Health & Rehabilitation', to: '/allied-health-services/', description: 'Physio, OT, speech pathology and podiatry' },
]

export const aboutNav: NavItem[] = [
  { label: 'About Us', to: '/about-us/' },
  { label: 'Our Team', to: '/our-team/' },
  { label: 'Careers', to: '/careers/' },
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
]

export const mainNav: NavGroup[] = [
  { label: 'Services', items: servicesMenu },
  { label: 'Funding', to: '/funding-schemes/' },
  { label: 'Referrals', to: '/referrals/' },
  { label: 'Locations', to: '/locations/' },
  { label: 'Resources', items: resourcesNav },
  { label: 'About', items: aboutNav },
  { label: 'Contact', to: '/contact/' },
]
