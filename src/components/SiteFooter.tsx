'use client'

import { Icons } from '@/components/Icons'
import Logo from '@/components/Logo'
import Link from '@/components/Link'
import { aboutNav, clinics, contact, forms, resourcesNav, servicesNav, social } from '@/content/site'

export default function SiteFooter({ onBook }: { onBook: () => void }) {
  return (
    <footer className="bg-[#0f0a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_1.4fr] gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo size={36} light />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Allied health, NDIS disability support and in-home care across South East Queensland.
            </p>
            <div className="flex gap-3">
              {social.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF9D00] transition-colors"
                >
                  {s.label === 'Facebook' ? <Icons.Facebook /> : s.label === 'Instagram' ? <Icons.Instagram /> : <Icons.YouTube />}
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
              {[...aboutNav, ...resourcesNav, { label: 'Funding Schemes', to: '/funding-schemes/' }, { label: 'Refer a Client', to: '/referrals/' }, { label: 'Contact Us', to: '/contact/' }].map(s => (
                <li key={s.to}><Link to={s.to} className="text-white/70 hover:text-white text-sm transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Clinics">
            <h2 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-4">Clinics</h2>
            <ul className="space-y-2.5">
              {clinics.map(c => (
                <li key={c.slug}><Link to={`/locations/#${c.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-4">Contact</h2>
            <div className="space-y-3">
              <a href={contact.phoneHref} className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors">
                <Icons.Phone /> {contact.phone}
              </a>
              <a href={contact.phoneAltHref} className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors">
                <Icons.Phone /> {contact.phoneAlt}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors whitespace-nowrap">
                <Icons.Mail /> {contact.email}
              </a>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="mt-6 w-full bg-[#FF9D00] hover:bg-[#e88e00] text-white font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              Book an Appointment
            </button>
            <ul className="mt-5 space-y-2 text-sm">
              <li><a href={forms.feedback} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">Client feedback form<span className="sr-only"> (opens in a new tab)</span></a></li>
              <li><a href={forms.complaint} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">Make a complaint<span className="sr-only"> (opens in a new tab)</span></a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* The year is baked in at build time; suppressHydrationWarning covers a build from last year. */}
          <p className="text-white/60 text-xs" suppressHydrationWarning>© {new Date().getFullYear()} Complete Healthcare Connect Pty Ltd. All rights reserved.</p>
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
          </ul>
        </div>
      </div>
    </footer>
  )
}
