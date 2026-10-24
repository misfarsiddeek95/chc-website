import { Icons } from '@/components/Icons'
import { Callout, PageHero, Section, SectionHeader, Steps } from '@/components/ui'
import { contact, forms } from '@/content/site'

const external = [
  { name: 'NDIS Quality and Safeguards Commission', who: 'For NDIS participants', href: 'https://www.ndiscommission.gov.au/complaints/report' },
  { name: 'Aged Care Quality and Safety Commission', who: 'For aged care and Home Care Package clients', href: 'https://www.agedcarequality.gov.au/' },
  { name: 'Office of the Health Ombudsman (Queensland)', who: 'For any health service in Queensland · 133 OHO (133 646)', href: 'https://www.oho.qld.gov.au/' },
]

export default function ComplaintsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about-us/' }, { label: 'Feedback & Complaints' }]}
        badge="Compliments · Suggestions · Complaints"
        title="We want to hear from you."
        intro={<p>Your feedback helps us improve. Whether something went well or not, tell us. Making a complaint won’t affect the care you receive.</p>}
        aside={
          <div className="rounded-3xl bg-white border border-purple-100 shadow-2xl shadow-purple-200 p-7 space-y-3">
            <a href={forms.feedback} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 bg-[#27156F] hover:bg-[#3820A0] text-white font-semibold px-6 py-4 rounded-xl transition-colors">
              Give feedback<span className="sr-only"> (opens in a new tab)</span> <Icons.ExternalLink />
            </a>
            <a href={forms.complaint} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 bg-[#FF9D00] hover:bg-[#e88e00] text-white font-semibold px-6 py-4 rounded-xl transition-colors">
              Make a complaint<span className="sr-only"> (opens in a new tab)</span> <Icons.ExternalLink />
            </a>
            <p className="text-sm text-gray-600 pt-2">Or call <a href={contact.phoneHref} className="text-[#27156F] font-semibold underline">{contact.phone}</a> or email <a href={`mailto:${contact.email}`} className="text-[#27156F] font-semibold underline">{contact.email}</a>.</p>
          </div>
        }
      />

      <Section tone="white" id="process" labelledBy="process-title">
        <SectionHeader eyebrow="Our process" title={<span id="process-title">What happens when you raise a concern.</span>} />
        <Steps
          steps={[
            { title: 'Tell us', body: 'Speak to any team member, call or email us, or use the online forms. You can stay anonymous, and someone can make the complaint for you.' },
            { title: 'We acknowledge it', body: 'We confirm we’ve received your feedback and explain what will happen next.' },
            { title: 'We look into it', body: 'We review what happened, talk with the people involved and keep you informed.' },
            { title: 'We respond and improve', body: 'We tell you the outcome and what we’re changing as a result.' },
          ]}
        />
      </Section>

      <Section tone="lavender" id="support" labelledBy="support-title">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <SectionHeader eyebrow="Support" title={<span id="support-title">Help to make a complaint.</span>} intro="A family member, friend, carer, support coordinator or independent advocate can help you or speak on your behalf. Tell us if you need an interpreter or information in another format." />
          </div>
          <Callout>
            If something is urgent or someone is at risk, call <strong>000</strong>. For other urgent concerns about your care, call us on <a href={contact.phoneHref} className="font-semibold underline">{contact.phone}</a>.
          </Callout>
        </div>
      </Section>

      <Section tone="white" id="external" labelledBy="external-title">
        <SectionHeader eyebrow="Not resolved?" title={<span id="external-title">You can contact an independent body.</span>} intro="If you’re not satisfied with how we handled your complaint, or you prefer not to raise it with us, you can contact:" />
        <ul className="grid md:grid-cols-3 gap-6">
          {external.map(e => (
            <li key={e.name} className="rounded-2xl bg-[#FAFAF7] border border-gray-100 p-7 flex flex-col">
              <h3 className="font-display text-lg font-bold text-[#1a1238] mb-2">{e.name}</h3>
              <p className="text-sm text-gray-600 mb-5 flex-1">{e.who}</p>
              <a href={e.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">
                Visit website <Icons.ExternalLink /><span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
