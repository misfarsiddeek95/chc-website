import Image from 'next/image'
import { Icons } from '@/components/Icons'
import EnquiryForm from '@/components/EnquiryForm'
import {
  CardGrid, CheckGrid, PageHero, PillList, Section, SectionHeader, Steps, TextLink, type SectionTone,
} from '@/components/ui'
import { contact } from '@/content/site'
import { servicesByPath, type ServiceContent, type ServiceSection } from '@/content/services'

const tones: SectionTone[] = ['white', 'lavender', 'white', 'warm', 'white', 'lavender']

function SectionBlock({ s, tone }: { s: ServiceSection; tone: SectionTone }) {
  const headingId = `${s.id}-title`
  if (s.kind === 'split') {
    return (
      <Section tone={tone} id={s.id} labelledBy={headingId}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-xl shadow-purple-100" style={{ backgroundColor: s.tint ?? '#ddd4f7' }}>
            {s.img && <Image src={s.img} alt={s.imgAlt ?? ''} width={700} height={875} sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover" />}
          </div>
          <div>
            {s.eyebrow && <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">{s.eyebrow}</p>}
            <h2 id={headingId} className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1a1238] leading-tight mb-5">{s.title}</h2>
            {s.body.map((p, i) => <p key={i} className="text-gray-600 text-lg leading-relaxed mb-4">{p}</p>)}
            {s.bullets && <div className="mt-6"><CheckGrid items={s.bullets} columns={1} tone="plain" /></div>}
          </div>
        </div>
      </Section>
    )
  }
  const header = <SectionHeader eyebrow={s.eyebrow} title={<span id={headingId}>{s.title}</span>} intro={'intro' in s ? s.intro : undefined} />
  return (
    <Section tone={tone} id={s.id} labelledBy={headingId}>
      {header}
      {s.kind === 'cards' && <CardGrid cards={s.cards} columns={s.columns} />}
      {s.kind === 'checks' && <CheckGrid items={s.items} columns={s.columns} tone={tone === 'lavender' ? 'lavender' : 'plain'} />}
      {s.kind === 'pills' && <PillList items={s.items} />}
      {s.kind === 'steps' && <Steps steps={s.steps} />}
      {s.kind === 'details' && (
        <details className="group rounded-2xl bg-white border border-purple-100 shadow-sm">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-semibold text-[#27156F]">
            {s.summary}
            <span className="transition-transform group-open:rotate-180"><Icons.ChevronDown /></span>
          </summary>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 px-6 pb-6 text-sm text-gray-700">
            {s.items.map(i => <li key={i} className="py-1 border-b border-gray-100">{i}</li>)}
          </ul>
        </details>
      )}
    </Section>
  )
}

/** Labels for related links that point at pages other than services. */
const otherPageLabels: Record<string, string> = {
  '/ndis-eligibility/': 'Check NDIS eligibility',
  '/referrals/': 'Refer a client',
  '/funding-schemes/': 'Funding schemes',
  '/locations/': 'Our locations',
}

export default function ServicePage({ path }: { path: string }) {
  const page: ServiceContent | undefined = servicesByPath[path]
  if (!page) throw new Error(`No service content for "${path}" in src/content/services.ts`)
  const crumbs = [{ label: 'Home', to: '/' }, ...(page.parent ? [page.parent] : []), { label: page.navLabel }]
  const introParagraphs = typeof page.intro === 'string' ? [page.intro] : page.intro

  return (
    <>
      <PageHero
        crumbs={crumbs}
        badge={page.badge}
        title={page.h1}
        intro={<div className="space-y-4">{introParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>}
        img={page.img}
        imgAlt={page.imgAlt}
        tint={page.tint}
        onBook
        onChat
        primaryLabel={page.primaryCta}
      />

      {page.sections.map((s, i) => <SectionBlock key={s.id} s={s} tone={tones[i % tones.length]} />)}

      {page.faqs && page.faqs.length > 0 && (
        <Section tone="white" id="common-questions" labelledBy="common-questions-title">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
            <div>
              <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Common questions</p>
              <h2 id="common-questions-title" className="font-display text-3xl md:text-4xl font-bold text-[#1a1238] leading-tight mb-4">
                {page.navLabel.replace(/ \(.*\)$/, '')}: your questions answered.
              </h2>
              <TextLink to="/faqs/">More FAQs</TextLink>
            </div>
            <div className="space-y-3">
              {page.faqs.map(f => (
                <details key={f.q} className="group rounded-2xl bg-[#FAFAF7] border border-purple-100">
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
      )}

      {page.funding.length > 0 && (
        <section aria-labelledby="funding-title" className="bg-[#F0EDFF] py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <h2 id="funding-title" className="font-display text-xl font-bold text-[#1a1238] md:w-56 flex-shrink-0">Funding options</h2>
            <div className="flex flex-wrap items-center gap-2">
              {page.funding.map(f => (
                <span key={f} className="text-sm font-medium px-3.5 py-1.5 rounded-full bg-white border border-purple-100 text-[#27156F]">{f}</span>
              ))}
              <span className="ml-1"><TextLink to="/funding-schemes/">How funding works</TextLink></span>
            </div>
          </div>
        </section>
      )}

      {/* Enquiry */}
      <Section tone="cream" id="enquire" labelledBy="enquire-title">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Talk to our team</p>
            <h2 id="enquire-title" className="font-display text-3xl md:text-4xl font-bold text-[#1a1238] leading-tight mb-4">
              {page.enquiry?.title ?? `Questions about ${page.navLabel.replace(/ \(.*\)$/, '').toLowerCase()}?`}
            </h2>
            <div className="space-y-4 mb-6">
              {(page.enquiry?.body ?? ['Send us your details and we’ll call you back to talk through your needs, funding and the next available appointment.']).map((p, i) => (
                <p key={i} className="text-gray-600 text-lg leading-relaxed">{p}</p>
              ))}
            </div>
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-[#27156F] font-semibold text-lg hover:text-[#9e5c00]">
              <Icons.Phone /> {contact.phone}
            </a>
            {page.related.length > 0 && (
              <nav aria-label="Related pages" className="mt-10">
                <h3 className="text-xs font-semibold text-gray-600 tracking-widest uppercase mb-3">Related services</h3>
                <ul className="space-y-2">
                  {page.related.map(r => (
                    <li key={r}>
                      <TextLink to={r}>{servicesByPath[r]?.navLabel ?? otherPageLabels[r] ?? r}</TextLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <EnquiryForm variant="book" defaultService={page.defaultService} submitLabel={page.enquiry?.submitLabel ?? 'Request a Call Back'} />
          </div>
        </div>
        {page.note && <p className="mt-10 text-sm text-gray-600 max-w-4xl">{page.note}</p>}
      </Section>
    </>
  )
}
