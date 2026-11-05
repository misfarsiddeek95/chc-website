import { Icons } from '@/components/Icons'
import { CardGrid, CheckGrid, OutlineButton, PageHero, PrimaryLink, Section, SectionHeader } from '@/components/ui'
import { contact, jobBoards, serviceRegions } from '@/content/site'

// Careers content supplied by the business (Oct 2026). Applications go by email so
// candidates can attach a CV.

const applyHref = (subject: string) =>
  `mailto:${contact.careersEmail}?subject=${encodeURIComponent(subject)}`

const graduateSupport = [
  { title: 'Mentorship & supervision', body: 'Guidance from experienced clinicians.' },
  { title: 'Structured onboarding', body: 'Orientation, shadowing and gradual caseload development.' },
  { title: 'Diverse clinical experience', body: 'Paediatrics, disability, neurological rehabilitation and aged care.' },
  { title: 'Multidisciplinary learning', body: 'Collaborate with experienced healthcare professionals.' },
  { title: 'Career progression', body: 'Opportunities to develop specialist interests and leadership skills.' },
  { title: 'Work–life balance', body: 'Flexible arrangements depending on your position.' },
]

const roles = [
  { tag: 'Allied health', title: 'Occupational Therapists', body: 'Paediatrics, neurodevelopmental conditions, functional assessments, assistive technology and rehabilitation.' },
  { tag: 'Allied health', title: 'Speech Pathologists', body: 'Speech, language, communication, swallowing and paediatric developmental support.' },
  { tag: 'Allied health', title: 'Physiotherapists', body: 'Musculoskeletal, neurological, paediatric, aged care and community rehabilitation.' },
  { tag: 'Allied health', title: 'Podiatrists', body: 'Preventative foot care, diabetic foot management, musculoskeletal and community podiatry.' },
  { tag: 'Nursing & community care', title: 'Registered Nurses, Enrolled Nurses & Assistants in Nursing', body: 'Community nursing, aged care, disability, complex clinical care and rehabilitation.' },
  { tag: 'Nursing & community care', title: 'Disability Support Workers & Carers', body: 'Supporting independence, daily living, community participation and personal goals.' },
  { tag: 'Medical', title: 'Medical Doctors', body: 'Community-based medicine, medical assessments, clinical oversight and integrated healthcare.' },
]

// Current vacancies (business answer, Nov 2026). Locations and work types are MOCK until confirmed.
const vacancies = [
  { title: 'Speech Pathologist', where: 'Logan Central & North Lakes', type: 'Full-time or part-time' },
  { title: 'Occupational Therapist', where: 'Logan Central & Booval', type: 'Full-time or part-time' },
  { title: 'Physiotherapist', where: 'Logan Central', type: 'Full-time' },
  { title: 'Podiatrist', where: 'Clinic & home visits, SEQ', type: 'Part-time' },
  { title: 'Registered Nurse', where: 'Community, South East Queensland', type: 'Full-time, part-time or casual' },
  { title: 'Support Workers', where: 'South East Queensland', type: 'Part-time or casual' },
]

const whyJoin = [
  { title: 'Supportive team', body: 'Work alongside passionate, experienced healthcare professionals.' },
  { title: 'Professional growth', body: 'Mentoring, clinical development and career progression opportunities.' },
  { title: 'Flexible opportunities', body: 'Full-time, part-time, casual and contractor arrangements.' },
  { title: 'Diverse work settings', body: 'Clinics, homes, schools, community and telehealth.' },
  { title: 'Meaningful work', body: 'Make a real difference in people’s lives.' },
  { title: 'Growing organisation', body: 'Be part of an expanding multidisciplinary healthcare network.' },
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Careers' }]}
        badge="Start strong · Grow with confidence · Build a career you love"
        title="Your career. Your growth. Your chance to make a difference."
        intro={
          <div className="space-y-4">
            <p>Great healthcare starts with great people. Whether you’re a new graduate, an experienced clinician looking for new opportunities, or a passionate support professional, we’re here to help you grow.</p>
            <p>Join a supportive, growing multidisciplinary team where your ideas are valued, your development matters and your work makes a genuine difference.</p>
          </div>
        }
        img="https://images.unsplash.com/photo-1709880754472-be89c13abc52?w=800&h=600&fit=crop&auto=format"
        imgAlt="Clinician working with a client in a rehabilitation session"
        actions={
          <>
            <PrimaryLink href={applyHref('Job application')}>Apply Now<Icons.ArrowRight /></PrimaryLink>
            <OutlineButton href="#open-roles">Explore Opportunities</OutlineButton>
          </>
        }
      />

      <Section tone="white" id="new-graduates" labelledBy="grad-title">
        <SectionHeader
          eyebrow="New graduates: your future starts here"
          title={<span id="grad-title">Your first job should be more than just a job.</span>}
          intro="Starting your healthcare career is exciting, and the right support makes all the difference. We help new graduates build confidence, develop clinical skills and grow into independent healthcare professionals. Depending on your role, opportunities include:"
        />
        <CardGrid cards={graduateSupport} />
        <div data-reveal className="mt-10 flex flex-col md:flex-row md:items-center gap-6 md:justify-between rounded-2xl bg-[#F0EDFF] p-7">
          <p className="font-display text-lg md:text-xl font-bold text-[#1a1238] max-w-2xl">
            You don’t need years of experience to make a difference. Just passion, curiosity and the right team behind you.
          </p>
          <PrimaryLink href={applyHref('Application: New Graduate')} className="flex-shrink-0">Apply as a New Graduate<Icons.ArrowRight /></PrimaryLink>
        </div>
      </Section>

      <Section tone="white" id="vacancies" labelledBy="vacancies-title">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="We’re hiring now"
            title={<span id="vacancies-title">Current vacancies.</span>}
            intro="Apply by email with your CV, or find these roles on our job boards."
          />
          <ul className="flex gap-3 md:mb-12">
            {jobBoards.map(b => (
              <li key={b.label}>
                <a href={b.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
                  {b.label}<span className="sr-only"> job listings (opens in a new tab)</span> <Icons.ExternalLink />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul className="divide-y divide-gray-100 border-y border-gray-100">
          {vacancies.map(v => (
            <li key={v.title} className="py-5 grid md:grid-cols-[1.4fr_1.4fr_1.2fr_auto] gap-2 md:gap-6 md:items-center">
              <h3 className="font-display text-lg font-bold text-[#1a1238]">{v.title}</h3>
              <p className="flex items-center gap-2 text-sm text-gray-600"><Icons.MapPin /> {v.where}</p>
              <p className="flex items-center gap-2 text-sm text-gray-600"><Icons.Clock /> {v.type}</p>
              <a href={applyHref(`Application: ${v.title}`)} className="inline-flex items-center justify-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Apply<span className="sr-only"> for {v.title}</span> <Icons.ArrowRight />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="lavender" id="open-roles" labelledBy="roles-title">
        <SectionHeader
          eyebrow="Roles we recruit for"
          title={<span id="roles-title">Don’t see your role? Tell us anyway.</span>}
          intro={<>Email your CV and a short cover note to <a href={`mailto:${contact.careersEmail}`} className="text-[#27156F] font-semibold underline">{contact.careersEmail}</a>, or use the button on any role.</>}
        />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map(r => (
            <li key={r.title} data-reveal className="service-card rounded-2xl bg-white border border-gray-100 p-7 flex flex-col" style={{ boxShadow: '0 2px 16px rgba(39,21,111,0.06)' }}>
              <p className="eyebrow text-[#9e5c00] text-xs font-semibold tracking-widest uppercase mb-2">{r.tag}</p>
              <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">{r.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{r.body}</p>
              <a href={applyHref(`Application: ${r.title}`)} className="mt-auto inline-flex items-center justify-between gap-3 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
                Apply by email<span className="sr-only"> for {r.title}</span> <Icons.Mail />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" id="why-join" labelledBy="why-title">
        <SectionHeader eyebrow="Why choose a career with CHC" title={<span id="why-title">Work that matters, with room to grow.</span>} />
        <CardGrid cards={whyJoin} />
      </Section>

      <Section tone="warm" id="locations" labelledBy="locations-title">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <SectionHeader
            eyebrow="Career opportunities across Australia"
            title={<span id="locations-title">Where we’re hiring.</span>}
            intro="We welcome applications and expressions of interest from these areas. Opportunities vary by location, position and service demand."
          />
          <CheckGrid columns={1} tone="plain" items={serviceRegions.map(r => `${r.state}: ${r.areas}`)} />
        </div>
      </Section>

      <Section tone="brand" id="apply" labelledBy="apply-title">
        <div data-reveal className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-[#FF9D00] text-sm font-semibold tracking-widest uppercase mb-3">Your next chapter starts here</p>
          <h2 id="apply-title" className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight mb-5">New graduate or experienced professional? We’d love to hear from you.</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-4">
            Whether you’re looking for your first graduate position, more flexibility or your next career challenge, CHC offers opportunities to learn, grow and make a meaningful impact.
          </p>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Don’t see a current vacancy? Apply anyway. We welcome expressions of interest as we continue to grow.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <PrimaryLink href={applyHref('Job application')}>Apply Now<Icons.ArrowRight /></PrimaryLink>
            <OutlineButton href={applyHref('CV submission')} light>Submit Your CV</OutlineButton>
            <OutlineButton href={applyHref('Join the CHC talent network')} light>Join Our Talent Network</OutlineButton>
          </div>
          <p className="text-white/80 text-sm mt-8">
            Questions? Call <a href={contact.phoneHref} className="font-semibold text-white underline">{contact.phone}</a>.
          </p>
        </div>
      </Section>

      <div className="bg-[#FAFAF7]">
        <p className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-600">
          Employment opportunities, supervision, flexibility and professional development arrangements vary by role. Relevant qualifications, registrations and screening requirements apply.
        </p>
      </div>
    </>
  )
}
