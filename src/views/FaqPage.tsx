'use client'

import { Icons } from '@/components/Icons'
import { CtaBand, PageHero, Section, TextLink } from '@/components/ui'
import { faqGroups } from '@/content/faqs'
import { contact } from '@/content/site'
import { useSiteUi } from '@/ui-context'

export default function FaqPage() {
  const { openBook, openChat } = useSiteUi()
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'FAQs' }]}
        badge="Bookings · NDIS · Costs · Feedback"
        title="Frequently asked questions."
        intro={<p>Quick answers about booking, the NDIS, funding and costs. Can’t find what you need? Call <a href={contact.phoneHref} className="text-[#27156F] font-semibold underline">{contact.phone}</a> or chat with our team.</p>}
        onBook={openBook}
        onChat={openChat}
        aside={
          <nav aria-label="FAQ topics" className="rounded-3xl bg-white border border-purple-100 shadow-2xl shadow-purple-200 p-7">
            <h2 className="font-display text-xl font-bold text-[#1a1238] mb-4">Jump to a topic</h2>
            <ul className="space-y-2">
              {faqGroups.map(g => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="flex items-center justify-between rounded-xl px-4 py-3 bg-[#FAFAF7] hover:bg-[#F0EDFF] text-[#1a1238] font-semibold">
                    {g.title} <span className="text-sm text-gray-600 font-normal">{g.faqs.length} questions</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {faqGroups.map((g, gi) => (
        <Section key={g.id} id={g.id} tone={gi % 2 ? 'lavender' : 'white'} labelledBy={`${g.id}-title`} className="scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
            <h2 id={`${g.id}-title`} className="font-display text-3xl md:text-4xl font-bold text-[#1a1238]">{g.title}</h2>
            <div className="space-y-3">
              {g.faqs.map(f => (
                <details key={f.q} className="group rounded-2xl bg-white border border-purple-100 shadow-sm">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-semibold text-[#1a1238]">
                    {f.q}
                    <span className="text-[#27156F] transition-transform group-open:rotate-180 flex-shrink-0"><Icons.ChevronDown /></span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    <p className={f.link ? 'mb-3' : ''}>{f.a}</p>
                    {f.link && <TextLink to={f.link.to}>{f.link.label}</TextLink>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <CtaBand title="Still have a question?" onBook={openBook} onChat={openChat} />
    </>
  )
}
