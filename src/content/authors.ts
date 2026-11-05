// Article authors and clinical reviewers (E-E-A-T: real people with real credentials
// help search engines and AI answer engines trust and cite health content).
//
// MOCK (Nov 2026): these names, roles and credentials are PLACEHOLDERS. The business
// will confirm which clinicians wrote or reviewed each article (questions 21 and 30).
// Replace every entry before launch, with the clinician's consent. Do not publish
// invented people or credentials.

export type Author = {
  id: string
  name: string
  role: string
  /** Registration or membership, e.g. "AHPRA-registered physiotherapist". */
  credentials: string
  bio: string
}

export const authors: Record<string, Author> = {
  physio: {
    id: 'physio',
    name: 'Alex Morgan',
    role: 'Senior Physiotherapist',
    credentials: 'AHPRA-registered physiotherapist, B.Physiotherapy',
    bio: 'Alex leads our physiotherapy team in Logan Central, working with older adults, NDIS participants and people returning to work after injury.',
  },
  ot: {
    id: 'ot',
    name: 'Jordan Lee',
    role: 'Occupational Therapist',
    credentials: 'AHPRA-registered occupational therapist, B.OccTherapy',
    bio: 'Jordan helps adults and children build everyday skills and routines, with a focus on mental wellbeing and independence at home.',
  },
  ndis: {
    id: 'ndis',
    name: 'Sam Taylor',
    role: 'NDIS Services Coordinator',
    credentials: '10 years in disability support and NDIS planning',
    bio: 'Sam helps participants and families understand their plans, choose supports and get services started.',
  },
}
