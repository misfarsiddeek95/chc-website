// Per-clinic page content for /locations/<slug>/.
//
// Each page is written for that clinic (nearby suburbs, how to get there, what is
// offered there), not a copy with the suburb swapped, which search engines treat
// as thin, duplicate content.
//
// MOCK (Nov 2026): suburbs, parking, transport, services at each clinic and the
// clinic FAQs are placeholders until the business confirms them. Address, hours
// and phone come from src/content/site.ts (confirmed).

export type ClinicDetail = {
  slug: string
  /** Page H1 and title keyword, e.g. "Allied health clinic in Logan Central". */
  heading: string
  intro: string
  /** Suburbs this clinic usually sees clients from. MOCK. */
  nearby: string[]
  /** What is offered at this clinic. MOCK. */
  services: { label: string; to: string }[]
  parking: string
  transport: string
  access: string
  faqs: { q: string; a: string }[]
}

const allied = [
  { label: 'Physiotherapy', to: '/allied-health-services/physiotherapy/' },
  { label: 'Occupational therapy', to: '/allied-health-services/occupational-therapy/' },
  { label: 'Speech pathology', to: '/allied-health-services/speech-pathology/' },
  { label: 'Podiatry', to: '/allied-health-services/podiatry/' },
]

export const clinicDetails: Record<string, ClinicDetail> = {
  'logan-central': {
    slug: 'logan-central',
    heading: 'Allied health clinic in Logan Central',
    intro:
      'Our Logan Central clinic offers physiotherapy, occupational therapy, speech pathology and podiatry, with a rehab gym for supervised exercise programs. It is also the base for our home visits and NDIS support across Logan.',
    nearby: ['Logan Central', 'Woodridge', 'Kingston', 'Slacks Creek', 'Springwood', 'Underwood', 'Marsden', 'Waterford West', 'Logan Reserve', 'Browns Plains'],
    services: [...allied, { label: 'Paediatric early intervention', to: '/early-intervention/' }, { label: 'NDIS disability support', to: '/ndis-services/' }],
    parking: 'Free on-site parking at the front of the building, including an accessible bay.',
    transport: 'A short walk from Woodridge train station and the Logan Central bus stops on Wembley Road.',
    access: 'Ground-floor entry with step-free access and an accessible toilet.',
    faqs: [
      { q: 'Does the Logan Central clinic have a gym?', a: 'Yes. Logan Central has a rehab gym where our physiotherapists run supervised strength, balance and return-to-work programs.' },
      { q: 'Is there parking at the Logan Central clinic?', a: 'Yes. There is free on-site parking, including an accessible bay near the entrance.' },
      { q: 'Can I see a paediatric therapist at Logan Central?', a: 'Yes. Our occupational therapists and speech pathologists see children at Logan Central, and can also visit homes, schools and childcare centres in the area.' },
    ],
  },
  booval: {
    slug: 'booval',
    heading: 'Allied health clinic in Booval, Ipswich',
    intro:
      'Our Booval clinic brings physiotherapy, occupational therapy, speech pathology and podiatry to Ipswich, with NDIS, WorkCover, CTP, DVA, Medicare and private clients welcome. Our Ipswich team also visits clients at home.',
    nearby: ['Booval', 'Ipswich', 'Bundamba', 'North Booval', 'Silkstone', 'East Ipswich', 'Brassall', 'Redbank Plains', 'Goodna', 'Springfield'],
    services: [...allied, { label: 'Home & community support', to: '/home-community-support/' }, { label: 'Aged care services', to: '/aged-care-services/' }],
    parking: 'Free parking in front of the clinic on Brisbane Road and in nearby side streets.',
    transport: 'About a 5-minute walk from Booval train station, on the Ipswich/Rosewood line.',
    access: 'Step-free entry from the street. Tell us if you need help getting in and we will meet you at the door.',
    faqs: [
      { q: 'Which services are available at the Booval clinic?', a: 'Physiotherapy, occupational therapy, speech pathology and podiatry. Our Ipswich team also provides home visits and in-home support.' },
      { q: 'How do I get to the Booval clinic by train?', a: 'Get off at Booval station on the Ipswich/Rosewood line. The clinic is about a 5-minute walk along Brisbane Road.' },
      { q: 'Do you see WorkCover and CTP clients in Ipswich?', a: 'Yes. Our Booval physiotherapists and occupational therapists treat clients with approved WorkCover Queensland and CTP claims.' },
    ],
  },
  'north-lakes': {
    slug: 'north-lakes',
    heading: 'Allied health clinic in North Lakes, Moreton Bay',
    intro:
      'Our North Lakes clinic serves Moreton Bay and Brisbane’s north with physiotherapy, occupational therapy, speech pathology and podiatry. It is in a lift-accessible building close to the Westfield North Lakes shopping centre.',
    nearby: ['North Lakes', 'Mango Hill', 'Kallangur', 'Petrie', 'Murrumba Downs', 'Griffin', 'Deception Bay', 'Redcliffe', 'Narangba', 'Caboolture'],
    services: [...allied, { label: 'Paediatric early intervention', to: '/early-intervention/' }, { label: 'NDIS disability support', to: '/ndis-services/' }],
    parking: 'Free undercover parking in the building car park. Visitor bays are signposted.',
    transport: 'Buses stop on North Lakes Drive, and Mango Hill station is about 5 minutes away by car.',
    access: 'The clinic is on Level 5, reached by lift. The building has accessible toilets on each floor.',
    faqs: [
      { q: 'Where is the North Lakes clinic?', a: 'Unit 509, Level 5, 6 North Lakes Drive, North Lakes QLD 4509. Take the lift to Level 5.' },
      { q: 'Is the North Lakes clinic wheelchair accessible?', a: 'Yes. The building has lift access to Level 5 and accessible toilets on each floor.' },
      { q: 'Do you visit homes around North Lakes?', a: 'Yes. Our clinicians and support workers visit clients across Moreton Bay, including Mango Hill, Kallangur, Redcliffe and Caboolture.' },
    ],
  },
}
