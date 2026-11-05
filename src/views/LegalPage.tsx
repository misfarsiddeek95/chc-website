import { Breadcrumbs, Callout } from '@/components/ui'
import { contact } from '@/content/site'
import { policies } from '@/content/legal'

// Policy pages. The approved legal wording must be copied in verbatim from the
// current site (or supplied by the business). Until then these pages are noindex
// and show a clear notice. See docs/IMPLEMENTATION.md › Outstanding items.
export default function LegalPage({ title, summary }: { title: string; summary: string }) {
  return (
    <article className="bg-[#FAFAF7]">
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: title }]} />
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mt-10 mb-5">{title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">{summary}</p>
        <Callout icon="alert">
          <strong>Draft wording for review.</strong> This {title.toLowerCase()} is a placeholder and must be approved by Complete Healthcare Connect before launch.
        </Callout>
        {policies[title] && (
          <div className="mt-10 space-y-8">
            <p className="text-sm text-gray-600">Last updated: {policies[title].updated}</p>
            {policies[title].sections.map(sec => (
              <section key={sec.h}>
                <h2 className="font-display text-2xl font-bold text-[#1a1238] mb-3">{sec.h}</h2>
                {sec.p.map((t, i) => <p key={i} className="text-gray-700 leading-relaxed mb-3">{t}</p>)}
              </section>
            ))}
          </div>
        )}
        <p className="text-gray-600 mt-8">
          Questions about this policy? Email <a className="text-[#27156F] font-semibold underline" href={`mailto:${contact.email}`}>{contact.email}</a> or
          call <a className="text-[#27156F] font-semibold underline" href={contact.phoneHref}>{contact.phone}</a>.
        </p>
      </div>
    </article>
  )
}
