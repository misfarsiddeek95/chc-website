import Image from 'next/image'
import niisqLogo from '@/assets/niisq-logo.png'
import { Callout, CtaBand, PageHero, Section, SectionHeader, TextLink } from '@/components/ui'
import { contact } from '@/content/site'

type Scheme = { id: string; name: string; who: string; body: string; services: string; link?: { to: string; label: string } }

const schemes: Scheme[] = [
  { id: 'ndis', name: 'NDIS', who: 'People with disability aged under 65', body: 'We are a registered NDIS provider across 24 registration groups, including therapy, nursing, support coordination, in-home support and supported accommodation.', services: 'Most of our services', link: { to: '/ndis-services/', label: 'NDIS services' } },
  { id: 'niisq', name: 'NIISQ', who: 'People with serious injuries from motor vehicle accidents in Queensland', body: 'We are a registered provider for the National Injury Insurance Scheme Queensland.', services: 'Allied health, in-home support and nursing' },
  { id: 'medicare', name: 'Medicare', who: 'Eligible patients with a GP referral or care plan', body: 'Some allied health services can be claimed through Medicare. Bulk billing is available, conditions apply. Ask us whether your appointment qualifies.', services: 'Allied health' },
  { id: 'workcover', name: 'WorkCover Queensland', who: 'Workers with an accepted workplace injury claim', body: 'Rehabilitation to help you return to work safely, plus independent functional assessments and reports.', services: 'Physiotherapy, occupational therapy', link: { to: '/allied-health-services/physiotherapy/', label: 'Physiotherapy' } },
  { id: 'ctp', name: 'CTP insurance', who: 'People injured in a motor vehicle accident', body: 'Injury management and rehabilitation under compulsory third party insurance claims.', services: 'Physiotherapy, occupational therapy' },
  { id: 'dva', name: 'DVA', who: 'Veterans and eligible family members', body: 'We provide allied health and community services to Department of Veterans’ Affairs clients.', services: 'Allied health, community nursing' },
  { id: 'aged-care', name: 'Support at Home & My Aged Care', who: 'Older Australians assessed through My Aged Care', body: 'We support older Australians through the Support at Home Program, CHSP, the Transition Care Program and respite, with personal care, nursing, domestic help and therapy, subject to eligibility and approved service arrangements.', services: 'Aged care, nursing and allied health', link: { to: '/aged-care-services/', label: 'Aged care services' } },
  { id: 'private', name: 'Private health insurance', who: 'Clients with extras cover', body: 'You may be able to claim part of the cost of some allied health sessions, depending on your fund and level of cover.', services: 'Allied health' },
]

export default function FundingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Funding Schemes' }]}
        badge="NDIS · NIISQ · Medicare · WorkCover · CTP · DVA"
        title="Funding schemes we work with."
        intro={<p>We are registered, approved or contracted across a range of funding schemes, so more people can access care. Not sure what you’re eligible for? We’ll help you work it out.</p>}
        onBook
        onChat
        aside={
          <div className="rounded-3xl bg-white border border-purple-100 shadow-2xl shadow-purple-200 p-8 flex flex-col gap-6 items-center justify-center">
            <Image src="https://completehealthcareconnect.com.au/wp-content/uploads/2023/09/2-2.png" alt="NDIS registered provider" width={220} height={90} sizes="220px" className="max-h-24 w-auto object-contain" />
            <Image src={niisqLogo} alt="NIISQ registered provider" width={260} height={83} sizes="260px" className="max-h-20 w-auto object-contain" />
          </div>
        }
      />

      <Section tone="white" id="schemes" labelledBy="schemes-title">
        <SectionHeader eyebrow="Schemes" title={<span id="schemes-title">How you can fund your care.</span>} />
        <ul className="grid md:grid-cols-2 gap-6">
          {schemes.map(s => (
            <li key={s.id} id={s.id} className="scroll-mt-28 rounded-2xl bg-[#FAFAF7] border border-gray-100 p-7">
              <h3 className="font-display text-2xl font-bold text-[#1a1238] mb-1">{s.name}</h3>
              <p className="text-[#9e5c00] text-sm font-semibold mb-3">{s.who}</p>
              <p className="text-gray-700 leading-relaxed mb-4">{s.body}</p>
              <p className="text-sm text-gray-600 mb-4"><span className="font-semibold text-[#1a1238]">Services:</span> {s.services}</p>
              {s.link && <TextLink to={s.link.to}>{s.link.label}</TextLink>}
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-3xl">
          <Callout>
            Funding rules change and depend on your circumstances. Before your first appointment, our team will confirm what your funding covers and whether there are any out-of-pocket costs. Call <a href={contact.phoneHref} className="font-semibold underline">{contact.phone}</a>.
          </Callout>
        </div>
      </Section>

      <CtaBand title="Not sure which funding applies to you?" body={<>Tell us about your situation and we’ll explain your options in plain language. Call <a href={contact.phoneHref} className="text-[#27156F] font-semibold underline">{contact.phone}</a>.</>} />
    </>
  )
}
