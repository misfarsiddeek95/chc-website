import { Icons } from '@/components/Icons'
import Link from '@/components/Link'
import { CtaBand, PageHero, PillList, Section, SectionHeader } from '@/components/ui'
import { clinics, contact, holidayHours, mapEmbedUrl, telehealthServices } from '@/content/site'
import { clinicDetails } from '@/content/clinics'
import { formatHolidayRange } from '@/lib/format'

const directionsUrl = (lat: number, lng: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

/** One clinic: /locations/<slug>/. A Server Component: no JavaScript is sent for it. */
export default function ClinicPage({ slug }: { slug: string }) {
  const c = clinics.find(x => x.slug === slug)
  const d = clinicDetails[slug]
  if (!c || !d) throw new Error(`No clinic "${slug}" in src/content/site.ts and src/content/clinics.ts`)
  const address = `${c.street}, ${c.suburb} QLD ${c.postcode}`
  const others = clinics.filter(x => x.slug !== slug)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Locations', to: '/locations/' }, { label: c.name }]}
        badge={`${c.area} · ${contact.hoursShort}`}
        title={d.heading}
        intro={<p>{d.intro}</p>}
        onBook
        onChat
        aside={
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-purple-200 bg-[#F0EDFF]">
            {/* Lazy-loaded keyless Google Map; see mapEmbedUrl in src/content/site.ts. */}
            <iframe
              src={mapEmbedUrl(c)}
              title={`Map: Complete Healthcare Connect ${c.name}, ${address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>
        }
      />

      <Section tone="white" id="visit" labelledBy="visit-title">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <SectionHeader eyebrow="Visit us" title={<span id="visit-title">Address, hours and directions.</span>} />
            {/* NAP as crawlable text, matching the footer, schema and Google listing. */}
            <dl className="space-y-5 text-gray-700">
              <div className="flex gap-4">
                <dt className="sr-only">Address</dt>
                <span aria-hidden="true" className="w-11 h-11 rounded-xl bg-[#27156F]/8 text-[#27156F] flex items-center justify-center flex-shrink-0"><Icons.MapPin /></span>
                <dd><address className="not-italic leading-relaxed"><strong className="block text-[#1a1238]">Complete Healthcare Connect {c.name}</strong>{c.street}<br />{c.suburb} QLD {c.postcode}</address></dd>
              </div>
              <div className="flex gap-4">
                <dt className="sr-only">Opening hours</dt>
                <span aria-hidden="true" className="w-11 h-11 rounded-xl bg-[#27156F]/8 text-[#27156F] flex items-center justify-center flex-shrink-0"><Icons.Clock /></span>
                <dd className="leading-relaxed">
                  {contact.hours}<br />
                  <span className="text-sm text-gray-600">{holidayHours.note} {holidayHours.closures.map(h => `${h.label}: closed ${formatHolidayRange(h.from, h.to)}.`).join(' ')}</span>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="sr-only">Phone</dt>
                <span aria-hidden="true" className="w-11 h-11 rounded-xl bg-[#27156F]/8 text-[#27156F] flex items-center justify-center flex-shrink-0"><Icons.Phone /></span>
                <dd className="leading-relaxed"><a href={contact.phoneHref} className="font-semibold text-[#27156F] underline">{contact.phone}</a><br /><span className="text-sm text-gray-600">{contact.afterHours}</span></dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={directionsUrl(c.lat, c.lng)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-5 py-3 rounded-xl text-sm">
                Get directions<span className="sr-only"> to {c.name} (opens Google Maps)</span> <Icons.ExternalLink />
              </a>
              <a href={c.gbp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
                Reviews &amp; photos on Google<span className="sr-only"> (opens in a new tab)</span> <Icons.ExternalLink />
              </a>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {[
              { t: 'Parking', b: d.parking },
              { t: 'Public transport', b: d.transport },
              { t: 'Accessibility', b: d.access },
            ].map(x => (
              <div key={x.t} className="rounded-2xl bg-[#FAFAF7] border border-gray-100 p-6">
                <h3 className="font-display text-lg font-bold text-[#1a1238] mb-1">{x.t}</h3>
                <p className="text-gray-600 leading-relaxed">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="lavender" id="services" labelledBy="services-title">
        <SectionHeader eyebrow={`At our ${c.name} clinic`} title={<span id="services-title">Services at {c.name}.</span>} intro={`We also provide home visits around ${c.area}, and ${telehealthServices.join(', ').toLowerCase().replace(/, ([^,]*)$/, ' and $1')} by telehealth.`} />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {d.services.map(s => (
            <li key={s.to}>
              <Link to={s.to} className="flex items-center justify-between gap-3 rounded-2xl bg-white border border-purple-100 px-6 py-5 font-semibold text-[#1a1238] hover:border-[#27156F] transition-colors">
                {s.label} <Icons.ArrowRight />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" id="areas" labelledBy="areas-title">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <SectionHeader eyebrow="Suburbs we see clients from" title={<span id="areas-title">Near {c.name}.</span>} intro={`Clients visit our ${c.name} clinic from across ${c.area}, and our team makes home visits in these suburbs and nearby.`} />
          <PillList items={d.nearby} />
        </div>
      </Section>

      <Section tone="warm" id="faqs" labelledBy="faqs-title">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
          <div>
            <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Common questions</p>
            <h2 id="faqs-title" className="font-display text-3xl md:text-4xl font-bold text-[#1a1238] leading-tight mb-4">About our {c.name} clinic.</h2>
            <Link to="/faqs/" className="inline-flex items-center gap-1 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">More FAQs <Icons.ArrowRight /></Link>
          </div>
          <div className="space-y-3">
            {d.faqs.map(f => (
              <details key={f.q} className="group rounded-2xl bg-white border border-purple-100">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-semibold text-[#1a1238]">
                  <h3 className="text-base font-semibold">{f.q}</h3>
                  <span aria-hidden="true" className="text-[#27156F] transition-transform group-open:rotate-180 flex-shrink-0"><Icons.ChevronDown /></span>
                </summary>
                <p className="px-6 pb-6 text-gray-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white" id="other-clinics" labelledBy="other-title">
        <h2 id="other-title" className="font-display text-2xl font-bold text-[#1a1238] mb-6">Our other clinics</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {others.map(o => (
            <li key={o.slug}>
              <Link to={`/locations/${o.slug}/`} className="flex items-center justify-between gap-3 rounded-2xl bg-[#FAFAF7] border border-gray-100 px-6 py-5 hover:border-[#27156F] transition-colors">
                <span><span className="block font-display font-bold text-[#1a1238]">{o.name}</span><span className="block text-sm text-gray-600">{o.street}, {o.suburb} QLD {o.postcode}</span></span>
                <Icons.ArrowRight />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title={`Book at our ${c.name} clinic.`} />
    </>
  )
}
