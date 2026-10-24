import { posts } from '@/content/blog'
import { allFaqs } from '@/content/faqs'
import { services } from '@/content/services'
import { clinics, contact, SITE_NAME, SITE_URL, social } from '@/content/site'

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

const organization = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/chc-mark.png`,
  telephone: '+61-1300-450-334',
  email: contact.email,
  areaServed: 'South East Queensland, Australia',
  sameAs: social.map(s => s.href),
  department: clinics.map(c => ({ '@id': `${SITE_URL}/locations/#${c.slug}` })),
}

const clinicSchema = clinics.map(c => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': `${SITE_URL}/locations/#${c.slug}`,
  name: `${SITE_NAME} — ${c.name}`,
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  telephone: '+61-1300-450-334',
  url: `${SITE_URL}/locations/#${c.slug}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: c.street,
    addressLocality: c.suburb,
    addressRegion: 'QLD',
    postalCode: c.postcode,
    addressCountry: 'AU',
  },
}))

const legal = (path: string, title: string, summary: string): RouteDef => ({
  path,
  title: `${title} | ${SITE_NAME}`,
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
    title: 'Complete Healthcare Connect | Allied Health, NDIS & In-Home Care',
    description:
      'Allied health, NDIS disability support and in-home care across South East Queensland. Physiotherapy, OT, speech pathology, podiatry, nursing and supported living.',
    crumbs: [home],
    section: 'Home',
    priority: 1,
    changefreq: 'weekly',
    schema: [organization, { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL }],
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
      areaServed: { '@type': 'State', name: 'Queensland' },
    }],
  })),
  {
    path: '/ndis-eligibility/',
    section: 'Resources & help',
    title: 'Am I Eligible for the NDIS? Free Eligibility Check | CHC',
    description: 'Check whether you may be eligible for the NDIS in four quick questions, and learn how Complete Healthcare Connect can help you apply.',
    crumbs: [home, { name: 'Disability Services (NDIS)', path: '/ndis-services/' }, { name: 'NDIS Eligibility', path: '/ndis-eligibility/' }],
    priority: 0.8,
  },
  {
    path: '/funding-schemes/',
    section: 'About CHC',
    title: 'Funding Schemes: NDIS, NIISQ, Medicare, WorkCover, CTP, DVA | CHC',
    description: 'How to fund your care with Complete Healthcare Connect: NDIS, NIISQ, Medicare, WorkCover Queensland, CTP, DVA, Home Care Packages and private health insurance.',
    crumbs: [home, { name: 'Funding Schemes', path: '/funding-schemes/' }],
    priority: 0.8,
  },
  {
    path: '/referrals/',
    section: 'About CHC',
    title: 'Refer a Client | NDIS & Allied Health Referrals | CHC',
    description: 'Referral information for GPs, hospitals, support coordinators, case managers and insurers. Send an NDIS or allied health referral online.',
    crumbs: [home, { name: 'Referrals', path: '/referrals/' }],
    priority: 0.8,
  },
  {
    path: '/locations/',
    section: 'About CHC',
    title: 'Clinic Locations: Logan, Ipswich, North Lakes, Capalaba & Cannon Hill',
    description: 'Find a Complete Healthcare Connect clinic in Logan Central, Booval, North Lakes, Capalaba or Cannon Hill, or book mobile and telehealth services.',
    crumbs: [home, { name: 'Locations', path: '/locations/' }],
    priority: 0.8,
    schema: clinicSchema,
  },
  {
    path: '/about-us/',
    section: 'About CHC',
    title: 'About Us | Complete Healthcare Connect',
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
    title: 'Careers | Allied Health, Nursing & Support Work Jobs | CHC',
    description: 'Join Complete Healthcare Connect. Current roles for occupational therapists, registered nurses, allied health assistants, support workers and admin staff.',
    crumbs: [home, { name: 'About Us', path: '/about-us/' }, { name: 'Careers', path: '/careers/' }],
    priority: 0.5,
  },
  {
    path: '/contact/',
    section: 'About CHC',
    title: 'Contact Us | Book an Appointment | Complete Healthcare Connect',
    description: 'Call 1300 450 334, email admin@chcconnect.com.au or send an enquiry. Clinics in Logan Central, Booval, North Lakes, Capalaba and Cannon Hill.',
    crumbs: [home, { name: 'Contact Us', path: '/contact/' }],
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/blog/',
    section: 'Resources & help',
    title: 'Blog: Health Tips & NDIS Guides | Complete Healthcare Connect',
    description: 'Practical health and NDIS advice from our physiotherapists, occupational therapists, speech pathologists and support team.',
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
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
      image: `${SITE_URL}/brand/og-image.png`,
      inLanguage: 'en-AU',
    }],
  })),
  {
    path: '/news/',
    section: 'Resources & help',
    title: 'News & Announcements | Complete Healthcare Connect',
    description: 'The latest news from Complete Healthcare Connect: new services, clinic locations, community sponsorship and job opportunities.',
    crumbs: [home, { name: 'News', path: '/news/' }],
    priority: 0.5,
    changefreq: 'weekly',
  },
  {
    path: '/faqs/',
    section: 'Resources & help',
    title: 'FAQs: Bookings, NDIS, Funding & Costs | CHC',
    description: 'Answers to common questions about booking, referrals, home visits, telehealth, the NDIS, funding, costs, cancellations and complaints.',
    crumbs: [home, { name: 'FAQs', path: '/faqs/' }],
    priority: 0.7,
    schema: [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }],
  },
  {
    path: '/feedback-and-complaints/',
    section: 'About CHC',
    title: 'Feedback & Complaints | Complete Healthcare Connect',
    description: 'How to give feedback or make a complaint, what happens next, and independent bodies you can contact, including the NDIS Commission.',
    crumbs: [home, { name: 'About Us', path: '/about-us/' }, { name: 'Feedback & Complaints', path: '/feedback-and-complaints/' }],
    priority: 0.4,
    changefreq: 'yearly',
  },
  {
    path: '/accessibility/',
    section: 'Policies & site',
    title: 'Accessibility Statement | Complete Healthcare Connect',
    description: 'Our commitment to an accessible website, what we have done, known limitations, and how to get help or information in another format.',
    crumbs: [home, { name: 'Accessibility', path: '/accessibility/' }],
    priority: 0.3,
    changefreq: 'yearly',
  },
  {
    path: '/sitemap/',
    section: 'Policies & site',
    title: 'Sitemap | Complete Healthcare Connect',
    description: 'A list of every page on the Complete Healthcare Connect website: services, allied health, resources, company information and policies.',
    crumbs: [home, { name: 'Sitemap', path: '/sitemap/' }],
    priority: 0.3,
    changefreq: 'monthly',
  },
  legal('/privacy-policy/', 'Privacy Policy', 'How Complete Healthcare Connect collects, uses, stores and protects your personal and health information.'),
  legal('/terms-and-conditions/', 'Terms and Conditions', 'The terms that apply when you use the Complete Healthcare Connect website and services.'),
  legal('/cancellation-policy/', 'Cancellation Policy', 'Our policy for cancelling or rescheduling appointments, including notice periods and fees.'),
  legal('/cookie-policy/', 'Cookie Policy', 'How the Complete Healthcare Connect website uses cookies and similar technologies.'),
]

export const notFoundRoute: RouteDef = {
  path: '/404/',
  title: `Page Not Found | ${SITE_NAME}`,
  description: 'The page you were looking for could not be found.',
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
