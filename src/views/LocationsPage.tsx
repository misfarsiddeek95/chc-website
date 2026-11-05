import { Icons } from '@/components/Icons'
import Link from '@/components/Link'
import { ActionButton } from '@/components/SiteActions'
import { CtaBand, PageHero, PillList, Section, SectionHeader } from '@/components/ui'
import { clinics, contact, holidayHours, mapEmbedUrl, serviceAreas, serviceRegions, telehealthServices } from '@/content/site'

const directionsUrl = (lat: number, lng: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Locations' }]}
        badge={`${clinics.length} clinics · Mobile & telehealth`}
        title="Find a clinic near you."
        intro={<p>Visit one of our three South East Queensland clinics, or let our clinicians and support workers come to you at home, school or work. In other states we provide in-home support and telehealth.</p>}
        onBook
        onChat
        aside={
          <div className="rounded-3xl bg-[#27156F] text-white p-8 shadow-2xl shadow-purple-200 relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF9D00]/10 translate-x-1/3 -translate-y-1/3" />
            <p className="relative text-[#FF9D00] text-xs font-semibold uppercase tracking-widest mb-4">Our clinics</p>
            <ul className="relative space-y-3">
              {clinics.map((c, i) => (
                <li key={c.slug}>
                  <Link to={`/locations/${c.slug}/`} className="flex items-center gap-4 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 px-4 py-3 transition-colors">
                    <span className="w-9 h-9 rounded-lg bg-[#FF9D00]/20 text-[#FFBE55] font-display font-bold text-xs flex items-center justify-center">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-semibold">{c.name}</span>
                      <span className="block text-sm text-white/70">{c.area} · QLD {c.postcode}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section tone="white" id="clinics" labelledBy="clinics-title">
        <SectionHeader eyebrow="Clinic details" title={<span id="clinics-title">Our clinics.</span>} intro={<>Open {contact.hours}. Call <a href={contact.phoneHref} className="text-[#27156F] font-semibold underline">{contact.phone}</a> to book at any clinic. Appointments are by booking.</>} />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map(c => {
            return (
              <li key={c.slug} id={c.slug} className="scroll-mt-28 bg-[#FAFAF7] rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
                {/* Lazy-loaded: the map only loads when the card scrolls near the screen. */}
                <div className="aspect-[4/3] bg-[#F0EDFF] border-b border-gray-100">
                  <iframe
                    src={mapEmbedUrl(c)}
                    title={`Map: Complete Healthcare Connect ${c.name}, ${c.street}, ${c.suburb}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                <p className="eyebrow text-[#9e5c00] text-xs font-semibold uppercase tracking-widest mb-1">{c.area}</p>
                <h3 className="font-display text-2xl font-bold text-[#1a1238] mb-3"><Link to={`/locations/${c.slug}/`} className="hover:text-[#27156F] hover:underline">{c.name}</Link></h3>
                <address className="not-italic text-gray-700 leading-relaxed mb-4">
                  {c.street}<br />{c.suburb} QLD {c.postcode}
                </address>
                <p className="flex items-center gap-2 text-sm text-gray-700 mb-2"><Icons.Clock /> {contact.hoursShort}</p>
                <p className="text-xs text-gray-600 mb-2 pl-6">{holidayHours.note}</p>
                {c.features && <p className="flex items-center gap-2 text-sm text-gray-700 mb-2"><Icons.Check /> {c.features.join(', ')}</p>}
                <div className="mt-auto pt-4 flex flex-col gap-2">
                  <Link to={`/locations/${c.slug}/`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">
                    {c.name} clinic details <Icons.ArrowRight />
                  </Link>
                  <a href={directionsUrl(c.lat, c.lng)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">
                    Get directions <Icons.ExternalLink /><span className="sr-only"> to {c.name} (opens Google Maps)</span>
                  </a>
                  <a href={c.gbp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">
                    Reviews &amp; photos on Google <Icons.ExternalLink /><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">
                    <Icons.Phone /> Call to book
                  </a>
                </div>
                </div>
              </li>
            )
          })}
          <li className="md:col-span-2 lg:col-span-3 rounded-2xl border-2 border-dashed border-[#27156F]/20 p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white">
            <div>
            <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">Can’t get to a clinic?</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">Many of our services are mobile. We can visit you at home, at school or at work. Occupational therapy, speech pathology and medical consultations are also available by telehealth.</p>
            </div>
            <ActionButton action="chat" className="self-start md:self-center flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">Ask our team <Icons.ArrowRight /></ActionButton>
          </li>
        </ul>
      </Section>

      <Section tone="lavender" id="areas" labelledBy="areas-title">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <SectionHeader eyebrow="Mobile services" title={<span id="areas-title">Areas we visit.</span>} intro="Our in-home and community teams work across these areas and surrounding suburbs." />
          <PillList items={serviceAreas} />
        </div>
      </Section>

      <Section tone="white" id="other-states" labelledBy="other-states-title">
        <SectionHeader
          eyebrow="Outside South East Queensland"
          title={<span id="other-states-title">No clinic near you? We can still help.</span>}
          intro="We don’t have clinics outside South East Queensland, but we provide in-home support and telehealth in these regions."
        />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {serviceRegions.map(r => (
            <li key={r.state} className="rounded-2xl bg-[#FAFAF7] border border-gray-100 p-5">
              <h3 className="font-display font-bold text-[#1a1238] mb-1">{r.state}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{r.areas}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-gray-600">Telehealth: {telehealthServices.join(', ').toLowerCase().replace(/^./, m => m.toUpperCase())}. Podiatry needs an in-person visit.</p>
      </Section>

      <CtaBand />
    </>
  )
}
