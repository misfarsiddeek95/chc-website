import { Icons } from '@/components/Icons'
import { CheckGrid, PageHero, Section, SectionHeader } from '@/components/ui'
import { contact } from '@/content/site'

// Open roles as listed on the current careers page (23 Oct 2026). Keep this list current.
const openRoles = [
  { title: 'Occupational Therapist', type: 'Allied health' },
  { title: 'Registered Nurse', type: 'Nursing' },
  { title: 'Allied Health Assistant', type: 'Allied health' },
  { title: 'Support Worker', type: 'In-home & community support' },
  { title: 'Receptionist / Admin Support', type: 'Administration' },
]

const otherDisciplines = [
  'Physiotherapist', 'Speech Pathologist', 'Psychologist', 'Exercise Physiologist', 'Dietitian', 'Support Coordinator',
  'NAATI-accredited Interpreter', 'Complex Home Modification Builder', 'Bookkeeper',
]

const applyHref = (role: string) =>
  `mailto:${contact.careersEmail}?subject=${encodeURIComponent(`Application: ${role}`)}`

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about-us/' }, { label: 'Careers' }]}
        badge="We’re hiring across South East Queensland"
        title="Build your career with a team that feels like family."
        intro={<p>Join a growing team of clinicians, nurses, support workers and administrators. We offer flexible work, real professional growth and a pathway to long-term leadership roles.</p>}
        img="https://images.unsplash.com/photo-1709880754472-be89c13abc52?w=800&h=600&fit=crop&auto=format"
        imgAlt="Clinician working with a client in a rehabilitation session"
        aside={undefined}
      />

      <Section tone="white" id="open-roles" labelledBy="roles-title">
        <SectionHeader eyebrow="Open roles" title={<span id="roles-title">Current opportunities.</span>} intro={<>Apply by emailing your resume and a short cover note to <a href={`mailto:${contact.careersEmail}`} className="text-[#27156F] font-semibold underline">{contact.careersEmail}</a>.</>} />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {openRoles.map(r => (
            <li key={r.title} className="service-card rounded-2xl bg-white border border-gray-100 p-7 flex flex-col" style={{ boxShadow: '0 2px 16px rgba(39,21,111,0.06)' }}>
              <p className="eyebrow text-[#9e5c00] text-xs font-semibold tracking-widest uppercase mb-2">{r.type}</p>
              <h3 className="font-display text-xl font-bold text-[#1a1238] mb-6">{r.title}</h3>
              <a href={applyHref(r.title)} className="mt-auto inline-flex items-center justify-between gap-3 bg-[#FF9D00] hover:bg-[#e88e00] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
                Apply by email <Icons.Mail />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="lavender" id="why-join" labelledBy="why-title">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <SectionHeader eyebrow="Why join CHC" title={<span id="why-title">Work that matters, with room to grow.</span>} intro="Our people are central to our success. We recognise excellence and invest in every team member’s development." />
          <CheckGrid columns={1} items={['Flexible working arrangements', 'Real work–life balance', 'Professional development and supervision', 'A supportive, family-like team culture', 'Pathways into senior and management roles']} />
        </div>
      </Section>

      <Section tone="white" id="register-interest" labelledBy="interest-title">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeader eyebrow="Don’t see your role?" title={<span id="interest-title">Register your interest.</span>} intro="We regularly look for people in these disciplines, in clinical, non-clinical and administrative roles." />
            <a href={applyHref('Expression of interest')} className="inline-flex items-center gap-2 border-2 border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white font-semibold px-7 py-4 rounded-xl transition-all">
              Send an expression of interest <Icons.ArrowRight />
            </a>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {otherDisciplines.map(d => <li key={d} className="bg-[#FAFAF7] border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">{d}</li>)}
          </ul>
        </div>
      </Section>
    </>
  )
}
