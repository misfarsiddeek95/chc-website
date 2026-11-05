import { Icons } from '@/components/Icons'
import EnquiryForm from '@/components/EnquiryForm'
import { Breadcrumbs, Callout, Section } from '@/components/ui'
import Link from '@/components/Link'
import { clinics, contact, forms, mapEmbedUrl, social } from '@/content/site'

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#FAFAF7] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-[#F0EDFF] hidden lg:block" />
        <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-16 md:pb-24">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 mt-8 md:mt-10 items-start">
            <div>
              <p className="inline-flex items-center gap-2 bg-[#27156F]/8 text-[#27156F] text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FF9D00]" aria-hidden="true" /> We usually reply within one business day
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-[#1a1238] mb-5">Contact us.</h1>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                Ask about a service, check availability or book an appointment. Call us, email us, or send the form and we’ll get back to you.
              </p>
              <ul className="space-y-4 mb-8">
                <li>
                  <a href={contact.phoneHref} className="flex items-center gap-4 group">
                    <span className="w-12 h-12 rounded-2xl bg-[#27156F] text-white flex items-center justify-center"><Icons.Phone /></span>
                    <span><span className="block text-sm text-gray-600">Call us</span><span className="block font-display text-xl font-bold text-[#1a1238] group-hover:text-[#27156F]">{contact.phone}</span></span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group">
                    <span className="w-12 h-12 rounded-2xl bg-[#27156F]/8 text-[#27156F] flex items-center justify-center"><Icons.Mail /></span>
                    <span><span className="block text-sm text-gray-600">Email</span><span className="block font-display text-lg font-bold text-[#1a1238] group-hover:text-[#27156F] break-all">{contact.email}</span></span>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-[#27156F]/8 text-[#27156F] flex items-center justify-center"><Icons.Clock /></span>
                  <span><span className="block text-sm text-gray-600">Office &amp; phone hours</span><span className="block font-display text-lg font-bold text-[#1a1238]">{contact.hours}</span><span className="block text-sm text-gray-600">After hours, calls to {contact.phone} are still answered. Fax {contact.fax}.</span></span>
                </li>
              </ul>
              <Callout icon="alert">
                This form isn’t monitored around the clock. <strong>In an emergency, call 000.</strong>
              </Callout>
            </div>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-2xl shadow-purple-100">
              <h2 className="font-display text-2xl font-bold text-[#1a1238] mb-1">Send an enquiry</h2>
              <p className="text-sm text-gray-600 mb-6">All fields are required unless marked optional.</p>
              <EnquiryForm variant="contact" />
            </div>
          </div>
        </div>
      </section>

      <Section tone="white" id="clinics" labelledBy="clinics-title">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Our clinics</p>
            <h2 id="clinics-title" className="font-display text-3xl md:text-4xl font-bold text-[#1a1238]">Visit us.</h2>
          </div>
          <Link to="/locations/" className="inline-flex items-center gap-1 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">Directions and details <Icons.ArrowRight /></Link>
        </div>
        <ul className="grid sm:grid-cols-3 gap-4">
          {clinics.map(c => (
            <li key={c.slug} className="rounded-2xl bg-[#FAFAF7] border border-gray-100 overflow-hidden">
              {/* Embedded map (checklist: map on the Contact page). Lazy-loaded. */}
              <div className="aspect-[16/10] bg-[#F0EDFF] border-b border-gray-100">
                <iframe src={mapEmbedUrl(c)} title={`Map: Complete Healthcare Connect ${c.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full border-0" />
              </div>
              <div className="p-5">
              <h3 className="font-display font-bold text-[#1a1238] mb-1"><Link to={`/locations/${c.slug}/`} className="hover:underline">{c.name}</Link></h3>
              <address className="not-italic text-sm text-gray-600 leading-relaxed">{c.street}, {c.suburb} QLD {c.postcode}</address>
              <p className="text-sm text-gray-600 mt-2">{contact.hoursShort}</p>
              <a href={c.gbp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">View on Google <Icons.ExternalLink /><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="lavender" id="more" labelledBy="more-title">
        <h2 id="more-title" className="sr-only">Other ways to reach us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-7 border border-purple-100 shadow-sm">
            <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">Referring a client?</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">Health professionals, coordinators and insurers can refer online.</p>
            <Link to="/referrals/" className="inline-flex items-center gap-1 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">Referral information <Icons.ArrowRight /></Link>
          </div>
          <div className="bg-white rounded-2xl p-7 border border-purple-100 shadow-sm">
            <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">Feedback & complaints</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">Tell us what we did well or what we can do better. Every response is reviewed.</p>
            <div className="flex flex-col gap-2">
              <a href={forms.feedback} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">Give feedback <Icons.ExternalLink /><span className="sr-only"> (opens in a new tab)</span></a>
              <a href={forms.complaint} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">Make a complaint <Icons.ExternalLink /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-7 border border-purple-100 shadow-sm">
            <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">Follow us</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">News, tips and stories from our team.</p>
            <div className="flex flex-col gap-2">
              {social.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">{s.label} <Icons.ExternalLink /><span className="sr-only"> (opens in a new tab)</span></a>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
