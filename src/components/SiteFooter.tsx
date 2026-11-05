'use client'

import { Icons } from '@/components/Icons'
import Logo from '@/components/Logo'
import Link from '@/components/Link'
import { aboutNav, acknowledgementOfCountry, clinics, contact, forms, holidayHours, resourcesNav, servicesNav, social } from '@/content/site'

export default function SiteFooter({ onBook }: { onBook: () => void }) {
  return (
    <footer className="bg-[#0f0a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Feedback & complaints: kept prominent so clients can always find how to raise a concern. */}
        <section aria-labelledby="footer-feedback-title" className="mb-14 rounded-2xl bg-white/[0.06] border border-white/10 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className="flex items-start gap-4 flex-1">
            <span aria-hidden="true" className="w-12 h-12 rounded-xl bg-[#FF9D00] text-[#1a1238] flex items-center justify-center flex-shrink-0 [&_svg]:w-5 [&_svg]:h-5">
              <Icons.Chat />
            </span>
            <div>
              <h2 id="footer-feedback-title" className="font-display text-xl md:text-2xl font-bold text-white mb-1">Feedback &amp; complaints</h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                Tell us what we did well or what we can do better. Every response is reviewed, and making a complaint won’t affect the care you receive.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={forms.feedback} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
              Give feedback<span className="sr-only"> (opens in a new tab)</span> <Icons.ExternalLink />
            </a>
            <a href={forms.complaint} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-[#27156F] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
              Make a complaint<span className="sr-only"> (opens in a new tab)</span> <Icons.ExternalLink />
            </a>
            <Link to="/feedback-and-complaints/" className="text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4">
              How we handle complaints
            </Link>
          </div>
        </section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr] gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo size={36} light />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Allied health, NDIS disability support and in-home care. Three clinics in South East Queensland, with in-home support and telehealth in other states.
            </p>
            <div className="flex gap-3">
              {social.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="w-12 h-12 md:w-9 md:h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF9D00] hover:text-[#1a1238] transition-colors"
                >
                  {(() => { const I = Icons[s.label as 'Facebook' | 'Instagram' | 'YouTube' | 'LinkedIn']; return <I /> })()}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-4">Services</h2>
            <ul className="space-y-2.5">
              {servicesNav.map(s => (
                <li key={s.to}><Link to={s.to} className="text-white/70 hover:text-white text-sm transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-4">Company</h2>
            <ul className="space-y-2.5">
              {[...aboutNav, { label: 'Careers', to: '/careers/' }, ...resourcesNav, { label: 'Funding Schemes', to: '/funding-schemes/' }, { label: 'Refer a Client', to: '/referrals/' }, { label: 'Contact Us', to: '/contact/' }].map(s => (
                <li key={s.to}><Link to={s.to} className="text-white/70 hover:text-white text-sm transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Clinics">
            <h2 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-4">Clinics</h2>
            <ul className="space-y-4">
              {clinics.map(c => (
                <li key={c.slug}>
                  {/* Full NAP as crawlable text (local SEO); matches the clinic page and schema. */}
                  <Link to={`/locations/${c.slug}/`} className="text-white hover:text-[#FFBE55] text-sm font-semibold transition-colors">{c.name}</Link>
                  <address className="not-italic text-white/70 text-xs leading-relaxed mt-0.5">{c.street}<br />{c.suburb} QLD {c.postcode}</address>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-4">Contact</h2>
            <div className="space-y-3">
              <a href={contact.phoneHref} className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors">
                <Icons.Phone /> {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors whitespace-nowrap">
                <Icons.Mail /> {contact.email}
              </a>
              <p className="flex items-start gap-2.5 text-white/70 text-sm"><Icons.Clock /> <span>{contact.hoursShort}<span className="block text-white/60 text-xs mt-0.5">After hours: call {contact.phone}</span><span className="block text-white/60 text-xs mt-0.5">{holidayHours.note}</span></span></p>
              <p className="text-white/60 text-xs pl-[26px]">Fax {contact.fax}</p>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="mt-6 w-full bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              Book an Appointment
            </button>
          </div>
        </div>

        {/* Acknowledgement of Country (wording proposed; the business asked us to choose suitable wording). */}
        <div className="border-t border-white/10 py-6 flex items-start gap-4">
          <span aria-hidden="true" className="flex gap-1 pt-1 flex-shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#000000] ring-1 ring-white/30" /><span className="w-3 h-3 rounded-full bg-[#CC0000]" /><span className="w-3 h-3 rounded-full bg-[#FFCC00]" />
          </span>
          <p className="text-white/70 text-sm leading-relaxed max-w-4xl">{acknowledgementOfCountry}</p>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* The year is baked in at build time; suppressHydrationWarning covers a build from last year. */}
          <p className="text-white/60 text-xs" suppressHydrationWarning>© {new Date().getFullYear()} Complete Healthcare Connect Pty Ltd · ABN {contact.abn} · NDIS registered provider 4-FZ38IK2</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              { label: 'Privacy Policy', to: '/privacy-policy/' },
              { label: 'Terms & Conditions', to: '/terms-and-conditions/' },
              { label: 'Cancellation Policy', to: '/cancellation-policy/' },
              { label: 'Cookie Policy', to: '/cookie-policy/' },
              { label: 'Accessibility', to: '/accessibility/' },
              { label: 'Sitemap', to: '/sitemap/' },
            ].map(l => (
              <li key={l.to}><Link to={l.to} className="text-white/60 hover:text-white text-xs transition-colors">{l.label}</Link></li>
            ))}
            {process.env.NEXT_PUBLIC_GA_ID && (
              <li><button type="button" onClick={() => window.dispatchEvent(new Event('chc:cookie-settings'))} className="text-white/60 hover:text-white text-xs transition-colors">Cookie settings</button></li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  )
}
