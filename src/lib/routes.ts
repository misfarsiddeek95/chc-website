import { posts } from '@/content/blog'
import { allFaqs, type Faq } from '@/content/faqs'
import { services } from '@/content/services'
import { clinics, contact, holidayHours, serviceRegions, SITE_NAME, SITE_URL, social, videoTestimonials } from '@/content/site'
import { clinicDetails } from '@/content/clinics'
import { authors } from '@/content/authors'

// One entry per URL. `title` + `description` feed <title>, meta description,
// Open Graph and the sitemap; `crumbs` feed the BreadcrumbList schema.
export type RouteDef = {
  path: string
  title: string
  description: string
  crumbs: { name: string; path: string }[]
  noindex?: boolean
  /** Group on the HTML sitemap page. */
  section?: 'Home' | 'Services' | 'Allied health' | 'Resources & help' | 'About CHC' | 'Policies & site'
  changefreq?: 'weekly' | 'monthly' | 'yearly'
  priority?: number
  schema?: object[]
}

const home = { name: 'Home', path: '/' }

// Where we take enquiries (src/content/site.ts › serviceRegions). In-person services depend on local availability.
const areaServed = serviceRegions.map(r => ({ '@type': 'State', name: r.state, containedInPlace: { '@type': 'Country', name: 'Australia' } }))

const organization = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/chc-mark.png`,
  alternateName: 'CHC',
  description: 'Allied health, NDIS disability support, community nursing, aged care and in-home care, with three clinics in South East Queensland and in-home support and telehealth in other Australian states, subject to availability.',
  telephone: '+61-1300-450-334',
  email: contact.email,
  faxNumber: '+61-7-3036-6061',
  taxID: contact.abn,
  contactPoint: [{
    '@type': 'ContactPoint', contactType: 'customer service', telephone: '+61-1300-450-334', email: contact.email, areaServed: 'AU', availableLanguage: 'English',
    hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:00' },
  }],
  // NDIS registration ID as shown on the NDIS services page.
  identifier: { '@type': 'PropertyValue', propertyID: 'NDIS provider registration', value: '4-FZ38IK2' },
  areaServed,
  knowsAbout: ['NDIS disability support', 'NIISQ rehabilitation', 'DVA Community Nursing', 'Aged care and Support at Home', 'Paediatric early intervention', 'Supported Independent Living', 'Physiotherapy', 'Occupational therapy', 'Speech pathology', 'Podiatry', 'Community nursing', 'Telehealth'],
  sameAs: social.map(s => s.href),
  department: clinics.map(c => ({ '@id': `${SITE_URL}/locations/${c.slug}/#clinic` })),
}

const mapUrl = (c: (typeof clinics)[number]) => c.gbp

function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

const clinicSchemaFor = (c: (typeof clinics)[number]) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': `${SITE_URL}/locations/${c.slug}/#clinic`,
  name: `${SITE_NAME} — ${c.name}`,
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  telephone: '+61-1300-450-334',
  url: `${SITE_URL}/locations/${c.slug}/`,
  image: `${SITE_URL}/brand/og-image.png`,
  email: contact.email,
  hasMap: mapUrl(c),
  areaServed: [c.area, ...(clinicDetails[c.slug]?.nearby ?? [])].map(name => ({ '@type': 'Place', name })),
  isAcceptingNewPatients: true,
  geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lng },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:00' }],
  // Holiday closures (MOCK dates in src/content/site.ts › holidayHours). opens = closes = 00:00 means closed.
  specialOpeningHoursSpecification: holidayHours.closures.map(h => ({ '@type': 'OpeningHoursSpecification', validFrom: h.from, validThrough: h.to, opens: '00:00', closes: '00:00' })),
  ...(c.features?.includes('Rehab gym') ? { amenityFeature: [{ '@type': 'LocationFeatureSpecification', name: 'Rehabilitation gym', value: true }] } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: c.street,
    addressLocality: c.suburb,
    addressRegion: 'QLD',
    postalCode: c.postcode,
    addressCountry: 'AU',
  },
})
const clinicSchema = clinics.map(clinicSchemaFor)

const clinicTitles: Record<string, string> = {
  'logan-central': 'Logan Central Clinic: Physio, OT, Speech & Podiatry | CHC',
  booval: 'Booval (Ipswich) Clinic: Physio, OT, Speech & Podiatry | CHC',
  'north-lakes': 'North Lakes Clinic: Physio, OT, Speech & Podiatry | CHC',
}
const clinicDescriptions: Record<string, string> = {
  'logan-central': 'Physiotherapy, OT, speech pathology and podiatry in Logan Central, with a rehab gym. Free parking near Woodridge station. Open weekdays. Call 1300 450 334.',
  booval: 'Physiotherapy, OT, speech pathology and podiatry in Booval, Ipswich, near Booval station. NDIS, WorkCover, CTP and DVA welcome. Call 1300 450 334 to book.',
  'north-lakes': 'Physiotherapy, OT, speech pathology and podiatry in North Lakes, Moreton Bay. Lift access and free parking. Open weekdays. Call 1300 450 334 to book.',
}

const legal = (path: string, title: string, summary: string, seoTitle?: string): RouteDef => ({
  path,
  title: seoTitle ?? `${title} | ${SITE_NAME}`,
  description: summary,
  crumbs: [home, { name: title, path }],
  noindex: true,
  section: 'Policies & site',
  changefreq: 'yearly',
  priority: 0.2,
})

export const routes: RouteDef[] = [
  {
    path: '/',
    title: 'Complete Healthcare Connect | Allied Health, NDIS & Home Care',
    description:
      'Allied health, NDIS disability support and in-home care in South East Queensland: physiotherapy, OT, speech pathology, podiatry, nursing and supported living.',
    crumbs: [home],
    section: 'Home',
    priority: 1,
    changefreq: 'weekly',
    schema: [
      organization,
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, alternateName: 'CHC', url: SITE_URL, inLanguage: 'en-AU', publisher: { '@id': `${SITE_URL}/#organization` } },
      // Client video testimonials (titles, descriptions and upload dates are MOCK: src/content/site.ts).
      ...videoTestimonials.map(v => ({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: v.title,
        description: v.description,
        thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
        uploadDate: v.uploadDate,
        contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
        publisher: { '@id': `${SITE_URL}/#organization` },
      })),
    ],
  },
  ...services.map<RouteDef>(s => ({
    path: s.path,
    title: `${s.seoTitle} | CHC`,
    description: s.description,
    section: s.path.startsWith('/allied-health-services/') ? 'Allied health' : 'Services',
    crumbs: [home, ...(s.parent ? [{ name: s.parent.label, path: s.parent.to }] : []), { name: s.navLabel, path: s.path }],
    priority: s.parent ? 0.7 : 0.9,
    schema: [{
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.navLabel,
      serviceType: s.serviceType ?? s.navLabel,
      description: s.description,
      url: `${SITE_URL}${s.path}`,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed,
    }, ...(s.faqs?.length ? [faqSchema(s.faqs)] : [])],
  })),
  {
    path: '/ndis-eligibility/',
    section: 'Resources & help',
    title: 'Am I Eligible for the NDIS? Free Eligibility Check | CHC',
    description: 'Check whether you may be eligible for the NDIS in four quick questions. Free and instant, with guidance from Complete Healthcare Connect on what to do next.',
    crumbs: [home, { name: 'Disability Services (NDIS)', path: '/ndis-services/' }, { name: 'NDIS Eligibility', path: '/ndis-eligibility/' }],
    priority: 0.8,
  },
  {
    path: '/funding-schemes/',
    section: 'About CHC',
    title: 'Funding: NDIS, NIISQ, Medicare, WorkCover, CTP & DVA | CHC',
    description: 'How to fund your care with Complete Healthcare Connect: NDIS, NIISQ, Medicare, WorkCover Queensland, CTP, DVA, Support at Home and private health insurance.',
    crumbs: [home, { name: 'Funding Schemes', path: '/funding-schemes/' }],
    priority: 0.8,
  },
  {
    path: '/referrals/',
    section: 'About CHC',
    title: 'Refer a Client | NDIS & Allied Health Referrals | CHC',
    description: 'Referral information for GPs, hospitals, support coordinators, case managers and insurers. Send an NDIS or allied health referral online or call 1300 450 334.',
    crumbs: [home, { name: 'Referrals', path: '/referrals/' }],
    priority: 0.8,
  },
  {
    path: '/locations/',
    section: 'About CHC',
    title: 'Our Clinics: Logan, Ipswich, North Lakes & Brisbane | CHC',
    description: 'Find a Complete Healthcare Connect clinic in Logan Central, Booval (Ipswich) or North Lakes, open weekdays 8:30–5, or book home visits and telehealth.',
    crumbs: [home, { name: 'Locations', path: '/locations/' }],
    priority: 0.8,
    schema: clinicSchema,
  },
  // One page per clinic (src/app/locations/[slug]). Titles keep the suburb near the front.
  ...clinics.map<RouteDef>(c => {
    const d = clinicDetails[c.slug]
    return {
      path: `/locations/${c.slug}/`,
      section: 'About CHC',
      title: clinicTitles[c.slug] ?? `${c.name} Clinic | Complete Healthcare Connect`,
      description: clinicDescriptions[c.slug] ?? d.intro.slice(0, 158),
      crumbs: [home, { name: 'Locations', path: '/locations/' }, { name: c.name, path: `/locations/${c.slug}/` }],
      priority: 0.8,
      changefreq: 'monthly',
      schema: [clinicSchemaFor(c), faqSchema(d.faqs)],
    }
  }),
  {
    path: '/about-us/',
    section: 'About CHC',
    title: 'About Us: Allied Health & NDIS Care in Queensland | CHC',
    description: 'Our story, mission, vision and values. Complete Healthcare Connect delivers quality, comprehensive allied health, disability support and in-home care.',
    crumbs: [home, { name: 'About Us', path: '/about-us/' }],
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/our-team/',
    section: 'About CHC',
    title: 'Our Team | Clinicians, Nurses & Support Workers | CHC',
    description: 'Meet the Complete Healthcare Connect team: physiotherapists, occupational therapists, speech pathologists, podiatrists, nurses and support workers.',
    crumbs: [home, { name: 'About Us', path: '/about-us/' }, { name: 'Our Team', path: '/our-team/' }],
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    path: '/careers/',
    section: 'About CHC',
    title: 'Careers & Graduate Jobs | Allied Health & Nursing | CHC',
    description: 'Careers at Complete Healthcare Connect: new graduate programs and roles for OTs, speech pathologists, physios, podiatrists, nurses, doctors and support workers.',
    crumbs: [home, { name: 'Careers', path: '/careers/' }],
    priority: 0.5,
  },
  {
    path: '/franchise-with-us/',
    section: 'About CHC',
    title: 'Franchise With Us | Healthcare Franchise Opportunities | CHC',
    description: 'Own a healthcare business with Complete Healthcare Connect: franchise opportunities in allied health, community nursing, disability and aged care in Australia.',
    crumbs: [home, { name: 'About Us', path: '/about-us/' }, { name: 'Franchise With Us', path: '/franchise-with-us/' }],
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    path: '/contact/',
    section: 'About CHC',
    title: 'Contact Complete Healthcare Connect | Book an Appointment',
    description: 'Call 1300 450 334, email admin@chcconnect.com.au or send an enquiry. Clinics in Logan Central, Booval and North Lakes, open weekdays 8:30–5.',
    crumbs: [home, { name: 'Contact Us', path: '/contact/' }],
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/blog/',
    section: 'Resources & help',
    title: 'Blog: Health Tips & NDIS Guides | Complete Healthcare Connect',
    description: 'Practical health and NDIS advice from our physiotherapists, occupational therapists and support team: falls prevention, wellbeing, choosing providers and more.',
    crumbs: [home, { name: 'Blog', path: '/blog/' }],
    priority: 0.7,
    changefreq: 'weekly',
    schema: [{
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${SITE_NAME} Blog`,
      url: `${SITE_URL}/blog/`,
      publisher: { '@id': `${SITE_URL}/#organization` },
      blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}${p.path}` })),
    }],
  },
  ...posts.map<RouteDef>(p => ({
    path: p.path,
    section: 'Resources & help',
    title: `${p.seoTitle} | CHC`,
    description: p.description,
    crumbs: [home, { name: 'Blog', path: '/blog/' }, { name: p.title, path: p.path }],
    priority: 0.6,
    schema: [{
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}${p.path}`,
      mainEntityOfPage: `${SITE_URL}${p.path}`,
      ...(p.published ? { datePublished: p.published } : {}),
      dateModified: p.updated,
      articleSection: p.category,
      // Named author (MOCK until confirmed, src/content/authors.ts), plus the sources the article cites.
      author: { '@type': 'Person', name: authors[p.author].name, jobTitle: authors[p.author].role, description: authors[p.author].credentials, worksFor: { '@id': `${SITE_URL}/#organization` } },
      ...(p.reviewedBy ? { contributor: { '@type': 'Person', name: authors[p.reviewedBy].name, jobTitle: authors[p.reviewedBy].role } } : {}),
      citation: p.sources.map(src => ({ '@type': 'CreativeWork', name: src.label, url: src.url })),
      abstract: p.takeaways.join(' '),
      publisher: { '@id': `${SITE_URL}/#organization` },
      image: `${SITE_URL}/brand/og-image.png`,
      inLanguage: 'en-AU',
    }],
  })),
  {
    path: '/news/',
    section: 'Resources & help',
    title: 'News & Announcements | Complete Healthcare Connect',
    description: 'The latest news from Complete Healthcare Connect: new services, our clinics in Logan, Ipswich and North Lakes, community sponsorship and job opportunities.',
    crumbs: [home, { name: 'News', path: '/news/' }],
    priority: 0.5,
    changefreq: 'weekly',
  },
  {
    path: '/faqs/',
    section: 'Resources & help',
    title: 'FAQs: Bookings, NDIS, Funding, Costs & Home Visits | CHC',
    description: 'Clear answers to common questions about booking, referrals, home visits, telehealth, the NDIS, funding, costs, opening hours, cancellations and complaints.',
    crumbs: [home, { name: 'FAQs', path: '/faqs/' }],
    priority: 0.7,
    schema: [faqSchema(allFaqs)],
  },
  {
    path: '/feedback-and-complaints/',
    section: 'About CHC',
    title: 'Feedback & Complaints | Complete Healthcare Connect',
    description: 'How to give feedback or make a complaint, what happens next, how long it takes, and independent bodies you can contact, including the NDIS Commission.',
    crumbs: [home, { name: 'About Us', path: '/about-us/' }, { name: 'Feedback & Complaints', path: '/feedback-and-complaints/' }],
    priority: 0.4,
    changefreq: 'yearly',
  },
  {
    path: '/accessibility/',
    section: 'Policies & site',
    title: 'Accessibility Statement | Complete Healthcare Connect',
    description: 'Our commitment to an accessible website (WCAG 2.2 AA), what we have done, known limitations, and how to get help or information in another format.',
    crumbs: [home, { name: 'Accessibility', path: '/accessibility/' }],
    priority: 0.3,
    changefreq: 'yearly',
  },
  {
    path: '/sitemap/',
    section: 'Policies & site',
    title: 'Sitemap: All Services, Clinic Locations & Resources | CHC',
    description: 'Every page on the Complete Healthcare Connect website in one list: services, allied health, clinic locations, resources, company information and policies.',
    crumbs: [home, { name: 'Sitemap', path: '/sitemap/' }],
    priority: 0.3,
    changefreq: 'monthly',
  },
  legal('/privacy-policy/', 'Privacy Policy', 'How Complete Healthcare Connect collects, uses, stores and protects your personal and health information, and how you can access or correct it.', 'Privacy Policy: How We Protect Your Information | CHC'),
  legal('/terms-and-conditions/', 'Terms and Conditions', 'The terms that apply when you use the Complete Healthcare Connect website and services, including accuracy of information and links to other sites.'),
  legal('/cancellation-policy/', 'Cancellation Policy', 'Our policy for cancelling or rescheduling appointments, including notice periods, late cancellation fees and NDIS short-notice cancellations.', 'Cancellation Policy: Notice Periods & Late Fees | CHC'),
  legal('/cookie-policy/', 'Cookie Policy', 'How the Complete Healthcare Connect website uses cookies, including analytics and embedded videos and maps, and how to change your cookie choices.', 'Cookie Policy: Analytics, Videos & Embedded Maps | CHC'),
]

export const notFoundRoute: RouteDef = {
  path: '/404/',
  title: `Page Not Found (404) | ${SITE_NAME}`,
  description: 'The page you were looking for could not be found. Find our services, clinic locations and contact details below, or call 1300 450 334 for help.',
  crumbs: [home],
  noindex: true,
}

const byPath = new Map(routes.map(r => [r.path, r]))
if (byPath.size !== routes.length) throw new Error('Duplicate path in src/lib/routes.ts')

export function findRoute(path: string): RouteDef | undefined {
  return byPath.get(path)
}

/** Route lookup for a page that must exist: a typo fails the build instead of shipping a broken page. */
export function getRoute(path: string): RouteDef {
  const route = byPath.get(path)
  if (!route) throw new Error(`No route registered for "${path}" in src/lib/routes.ts`)
  return route
}
