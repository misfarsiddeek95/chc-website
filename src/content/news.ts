// News items. Only verifiable announcements are listed. Add dated news as it
// happens (newest first): new clinics, services, partnerships, events.
export type NewsItem = {
  id: string
  date?: string // ISO; undefined = ongoing
  label: string
  title: string
  summary: string
  link: { label: string; to: string }
}

export const news: NewsItem[] = [
  {
    id: 'now-hiring',
    date: '2026-10-24',
    label: 'Careers',
    title: 'We’re hiring across South East Queensland',
    summary:
      'We’re looking for occupational therapists, registered nurses, allied health assistants, support workers and reception and administration staff to join our growing team.',
    link: { label: 'See open roles', to: '/careers/' },
  },
  {
    id: 'new-website',
    date: '2026-10-24',
    label: 'Announcement',
    title: 'Our new website is here',
    summary:
      'Find services faster, check your NDIS eligibility in a minute, book an appointment or send a referral online, and find directions to all three clinics.',
    link: { label: 'Explore our services', to: '/ndis-services/' },
  },
  {
    id: 'our-clinics',
    label: 'Locations',
    title: 'Three clinics across South East Queensland',
    summary:
      'Visit us in Logan Central, Booval (Ipswich) or North Lakes, weekdays 8:30 am to 5 pm, or book a home visit or telehealth appointment.',
    link: { label: 'Find a clinic', to: '/locations/' },
  },
  {
    id: 'community-sponsorship',
    label: 'Community',
    title: 'Supporting local sporting and social clubs',
    summary:
      'Our community sponsorship program supports local clubs, because healthy, connected communities matter to us.',
    link: { label: 'About us', to: '/about-us/' },
  },
]
