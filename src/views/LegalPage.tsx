import { Breadcrumbs, Callout } from '@/components/ui'
import { contact } from '@/content/site'

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
          <strong>Policy text to be added.</strong> Paste the approved {title.toLowerCase()} wording here before launch.
        </Callout>
        <p className="text-gray-600 mt-8">
          Questions about this policy? Email <a className="text-[#27156F] font-semibold underline" href={`mailto:${contact.email}`}>{contact.email}</a> or
          call <a className="text-[#27156F] font-semibold underline" href={contact.phoneHref}>{contact.phone}</a>.
        </p>
      </div>
    </article>
  )
}
