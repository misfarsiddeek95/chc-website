import { Icons } from '@/components/Icons'
import EnquiryForm from '@/components/EnquiryForm'
import { PageHero, Section, SectionHeader, Steps } from '@/components/ui'
import { contact, forms } from '@/content/site'

const referrers = ['GPs & specialists', 'Hospitals & discharge planners', 'Support coordinators', 'Case managers', 'Insurers', 'Aged care providers']

const documents = [
  { title: 'NDIS participant referral', body: 'Refer an NDIS participant for allied health, disability support, accommodation or in-home care.', href: forms.referral, action: 'Open referral form' },
  { title: 'NDIS client service agreement', body: 'Participant details, support needs, goals and the CHC services selected.', href: forms.serviceAgreement, action: 'Open service agreement' },
  { title: 'Revised planned intervention & finances', body: 'Update the planned supports and budget for an existing participant.', href: forms.plannedIntervention, action: 'Open form' },
]

export default function ReferralsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Referrals' }]}
        badge="For health and disability professionals"
        title="Referring a client? We make it simple."
        intro={<p>We work closely with GPs, hospitals, support coordinators, case managers and insurers across Queensland. Send a referral online and our intake team will contact you and your client.</p>}
        img="https://images.unsplash.com/photo-1764006145420-df3006edf060?w=800&h=600&fit=crop&auto=format"
        imgAlt="Healthcare professional supporting a client in a wheelchair"
        tint="#3820A0"
        aside={undefined}
      />

      <Section tone="white" id="how" labelledBy="how-title">
        <SectionHeader eyebrow="How referrals work" title={<span id="how-title">From referral to first appointment.</span>} />
        <Steps
          steps={[
            { title: 'Send the referral', body: 'Use the online referral form or the quick form below. Include the client’s details, funding and the support needed.' },
            { title: 'We make contact', body: 'Our intake team contacts you and your client, usually within one business day, to confirm details.' },
            { title: 'Service agreement', body: 'For NDIS participants, we complete a service agreement with the client or their nominee.' },
            { title: 'Care begins', body: 'We match the right clinicians and keep you updated with reports and progress, with the client’s consent.' },
          ]}
        />
        <div className="mt-10">
          <p className="text-xs font-semibold text-gray-600 tracking-widest uppercase mb-3">We receive referrals from</p>
          <ul className="flex flex-wrap gap-2">
            {referrers.map(r => <li key={r} className="bg-[#F0EDFF] text-[#27156F] text-sm font-medium px-4 py-2 rounded-full">{r}</li>)}
          </ul>
        </div>
      </Section>

      <Section tone="lavender" id="forms" labelledBy="forms-title">
        <SectionHeader eyebrow="Secure online forms" title={<span id="forms-title">NDIS forms.</span>} intro="Each form opens securely in Zanda, our client management system, in a new tab. Submissions go straight to our intake team." />
        <ul className="grid md:grid-cols-3 gap-6">
          {documents.map((d, i) => (
            <li key={d.title} className="bg-white rounded-3xl p-7 border border-purple-100 shadow-sm flex flex-col">
              <span className="w-12 h-12 rounded-2xl bg-[#27156F] text-white font-display font-bold flex items-center justify-center mb-6">0{i + 1}</span>
              <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">{d.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{d.body}</p>
              <a href={d.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-5 py-3.5 rounded-xl text-sm transition-colors">
                {d.action}<span className="sr-only"> (opens in a new tab)</span> <Icons.ExternalLink />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream" id="quick-referral" labelledBy="quick-title">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Quick referral</p>
            <h2 id="quick-title" className="font-display text-3xl md:text-4xl font-bold text-[#1a1238] leading-tight mb-4">Not an NDIS referral?</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              For WorkCover, CTP, DVA, aged care, Medicare or private clients, send your details here and we’ll call you to take the referral.
            </p>
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-[#27156F] font-semibold text-lg hover:text-[#9e5c00]"><Icons.Phone /> {contact.phone}</a>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <EnquiryForm variant="referral" />
          </div>
        </div>
      </Section>
    </>
  )
}
