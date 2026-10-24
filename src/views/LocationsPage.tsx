'use client'

import { Icons } from '@/components/Icons'
import { CtaBand, PageHero, PillList, Section, SectionHeader } from '@/components/ui'
import { clinics, contact, serviceAreas } from '@/content/site'
import { useSiteUi } from '@/ui-context'

const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export default function LocationsPage() {
  const { openBook, openChat } = useSiteUi()
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Locations' }]}
        badge={`${clinics.length} clinics · Mobile & telehealth`}
        title="Find a clinic near you."
        intro={<p>Visit one of our five South East Queensland clinics, or let our clinicians and support workers come to you at home, school or work. Telehealth is available for clients further afield.</p>}
        onBook={openBook}
        onChat={openChat}
        aside={
          <div className="rounded-3xl bg-[#27156F] text-white p-8 shadow-2xl shadow-purple-200 relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF9D00]/10 translate-x-1/3 -translate-y-1/3" />
            <p className="relative text-[#FF9D00] text-xs font-semibold uppercase tracking-widest mb-4">Our clinics</p>
            <ul className="relative space-y-3">
              {clinics.map((c, i) => (
                <li key={c.slug}>
                  <a href={`#${c.slug}`} className="flex items-center gap-4 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 px-4 py-3 transition-colors">
                    <span className="w-9 h-9 rounded-lg bg-[#FF9D00]/20 text-[#FF9D00] font-display font-bold text-xs flex items-center justify-center">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-semibold">{c.name}</span>
                      <span className="block text-sm text-white/70">{c.area} · QLD {c.postcode}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section tone="white" id="clinics" labelledBy="clinics-title">
        <SectionHeader eyebrow="Clinic details" title={<span id="clinics-title">Our clinics.</span>} intro={<>Call <a href={contact.phoneHref} className="text-[#27156F] font-semibold underline">{contact.phone}</a> to book at any clinic. Appointments are by booking.</>} />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map(c => {
            const address = `${c.street}, ${c.suburb} QLD ${c.postcode}`
            return (
              <li key={c.slug} id={c.slug} className="scroll-mt-28 bg-[#FAFAF7] rounded-2xl border border-gray-100 p-7 flex flex-col">
                <span className="w-11 h-11 rounded-xl bg-[#27156F]/8 text-[#27156F] flex items-center justify-center mb-5"><Icons.MapPin /></span>
                <p className="eyebrow text-[#9e5c00] text-xs font-semibold uppercase tracking-widest mb-1">{c.area}</p>
                <h3 className="font-display text-2xl font-bold text-[#1a1238] mb-3">{c.name}</h3>
                <address className="not-italic text-gray-700 leading-relaxed mb-6">
                  {c.street}<br />{c.suburb} QLD {c.postcode}
                </address>
                <div className="mt-auto flex flex-wrap gap-3">
                  <a href={mapsUrl(address)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">
                    Get directions <Icons.ExternalLink /><span className="sr-only"> to {c.name} (opens Google Maps)</span>
                  </a>
                  <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">
                    <Icons.Phone /> Call to book
                  </a>
                </div>
              </li>
            )
          })}
          <li className="rounded-2xl border-2 border-dashed border-[#27156F]/20 p-7 flex flex-col justify-center bg-white">
            <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">Can’t get to a clinic?</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">Many of our services are mobile. We can visit you at home, at school or at work, or see you by telehealth.</p>
            <button onClick={openChat} className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">Ask our team <Icons.ArrowRight /></button>
          </li>
        </ul>
      </Section>

      <Section tone="lavender" id="areas" labelledBy="areas-title">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <SectionHeader eyebrow="Mobile services" title={<span id="areas-title">Areas we visit.</span>} intro="Our in-home and community teams work across these areas and surrounding suburbs." />
          <PillList items={serviceAreas} />
        </div>
      </Section>

      <CtaBand onBook={openBook} onChat={openChat} />
    </>
  )
}
