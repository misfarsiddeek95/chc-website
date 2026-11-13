import { CtaBand, PageHero, Section, SectionHeader, TextLink } from '@/components/ui'
import { staffLanguages } from '@/content/site'

// Team listing as published on the current website (Oct 2026). First names and
// roles only; duplicates removed. Photos and bios: see docs/IMPLEMENTATION.md.
type Member = { name: string; role: string }

const groups: { id: string; title: string; intro: string; members: Member[] }[] = [
  {
    id: 'management',
    title: 'Management & coordination',
    intro: 'Keeping care organised, from your first call to your ongoing plan.',
    members: [
      // Director's profile removed at the client's request (13 Nov 2026).
      { name: 'Naomi', role: 'In-Home & Community Support Coordinator' },
      { name: 'Chandni', role: 'Marketing Consultant' },
      { name: 'Hafsa', role: 'Accountant' },
      { name: 'Aimee', role: 'Administration' },
      { name: 'Ashleigh', role: 'Administration' },
      { name: 'Annie', role: 'Administration' },
      { name: 'Nethmini', role: 'Reception' },
      { name: 'Zainab', role: 'Reception & Graphic Design' },
    ],
  },
  {
    id: 'allied-health',
    title: 'Allied health',
    intro: 'Physiotherapists, occupational therapists, speech pathologists, podiatrists and allied health assistants.',
    members: [
      { name: 'Jonathan', role: 'Senior Physiotherapist' },
      { name: 'Shiril', role: 'Senior Physiotherapist' },
      { name: 'Joan', role: 'Physiotherapist' },
      { name: 'Anamica', role: 'Physiotherapist' },
      { name: 'Iris', role: 'Physiotherapist' },
      { name: 'Kinjal', role: 'Senior Occupational Therapist' },
      { name: 'Natalie', role: 'Senior Occupational Therapist' },
      { name: 'Vida', role: 'Senior Occupational Therapist' },
      { name: 'Peter', role: 'Occupational Therapist' },
      { name: 'Ronel', role: 'Occupational Therapist' },
      { name: 'Anson', role: 'Occupational Therapist' },
      { name: 'Emily', role: 'Senior Speech Pathologist' },
      { name: 'Madeline', role: 'Senior Speech Pathologist' },
      { name: 'Chu Ting', role: 'Speech Pathologist' },
      { name: 'Rachael', role: 'Speech Pathologist' },
      { name: 'Brenda', role: 'Speech Pathologist' },
      { name: 'Laura', role: 'Podiatrist' },
      { name: 'Lesley', role: 'Podiatrist' },
      { name: 'Keira', role: 'Allied Health Assistant' },
      { name: 'Sarah', role: 'Allied Health Assistant' },
      { name: 'Zaki', role: 'Allied Health Assistant & Support Worker' },
    ],
  },
  {
    // Client review (13 Nov 2026): add a Medical Doctors section.
    // MOCK names and roles: replace with CHC's doctors (with their consent) before launch.
    id: 'medical-doctors',
    title: 'Medical doctors',
    intro: 'CHC’s own doctors provide medical assessments, clinical oversight, medication reviews and telehealth consultations, working closely with our nurses and allied health team.',
    members: [
      { name: 'Dr Michael', role: 'Senior Medical Officer' },
      { name: 'Dr Priya', role: 'Medical Officer' },
      { name: 'Dr Samuel', role: 'Medical Officer (Telehealth)' },
    ],
  },
  {
    id: 'nursing',
    title: 'Nursing: Registered Nurses & Enrolled Nurses',
    intro: 'Our Registered Nurses (RNs) lead community nursing, wound care, medication management and complex care, supported by Enrolled Nurses (ENs).',
    members: [
      { name: 'Tanaka', role: 'Community Nurse (RN)' },
      { name: 'Paulette', role: 'Community Nurse (RN)' },
      { name: 'Joyce', role: 'Community Nurse (RN) & Support Worker' },
      { name: 'Urvi', role: 'Enrolled Nurse (EN) & Support Worker' },
    ],
  },
]

// Client review (13 Nov 2026): 3 support workers. MOCK selection: the first three names
// from the previous list; confirm which three to show.
const supportWorkers = ['Ali', 'Anayet', 'Aref']

function initials(name: string) {
  return name.split(/\s+/).map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about-us/' }, { label: 'Our Team' }]}
        badge="Doctors · Clinicians · Nurses · Support workers"
        title="Meet the people behind your care."
        intro={<p>Our multidisciplinary team works together across medicine, allied health, nursing and in-home support, so you get joined-up care from people who know you.</p>}
        img="https://images.unsplash.com/photo-1764006145420-df3006edf060?w=800&h=600&fit=crop&auto=format"
        imgAlt="Healthcare professional with a client in a wheelchair"
        onBook
        onChat
      />

      <nav aria-label="Team sections" className="bg-white border-b border-gray-100 sticky top-[64px] z-30">
        <ul className="max-w-7xl mx-auto px-6 flex gap-2 overflow-x-auto scrollbar-hide py-3">
          {[...groups.map(g => ({ id: g.id, t: g.title })), { id: 'support-workers', t: 'In-home & community support' }].map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="block whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:border-[#27156F] hover:text-[#27156F]">{l.t}</a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((g, gi) => (
        <Section key={g.id} id={g.id} tone={gi % 2 ? 'lavender' : 'white'} labelledBy={`${g.id}-title`} className="scroll-mt-32">
          <SectionHeader eyebrow={`${g.members.length} team members`} title={<span id={`${g.id}-title`}>{g.title}</span>} intro={g.intro} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {g.members.map(m => (
              <li key={m.name + m.role} className="min-w-0 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <span aria-hidden="true" className="w-12 h-12 rounded-full bg-[#F0EDFF] text-[#27156F] font-display font-bold flex items-center justify-center flex-shrink-0">{initials(m.name)}</span>
                <span>
                  <span className="block font-display font-bold text-[#1a1238]">{m.name}</span>
                  <span className="block text-sm text-gray-600 leading-snug">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section id="support-workers" tone="warm" labelledBy="sw-title" className="scroll-mt-32">
        <SectionHeader
          eyebrow={`${supportWorkers.length} support workers`}
          title={<span id="sw-title">In-home & community support.</span>}
          intro="Our support workers and carers help clients with personal care, daily living and community access across South East Queensland."
        />
        <ul className="flex flex-wrap gap-2.5">
          {supportWorkers.map(n => (
            <li key={n} className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">{n}</li>
          ))}
        </ul>
        <div className="mt-10"><TextLink to="/careers/">Interested in joining us? View careers</TextLink></div>
      </Section>

      <Section id="languages" tone="white" labelledBy="languages-title">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-center">
          <SectionHeader
            eyebrow="Care in your language"
            title={<span id="languages-title">Many of our team are bilingual.</span>}
            intro="Ask for a team member who speaks your language when you book. We can also arrange a professional interpreter."
          />
          <ul className="flex flex-wrap gap-2.5">
            {staffLanguages.map(l => (
              <li key={l} className="bg-[#F0EDFF] text-[#27156F] text-sm font-medium px-4 py-2 rounded-full">{l}</li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
