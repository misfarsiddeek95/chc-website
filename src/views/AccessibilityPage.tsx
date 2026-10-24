import { Breadcrumbs, CheckGrid } from '@/components/ui'
import { contact } from '@/content/site'

export default function AccessibilityPage() {
  return (
    <article className="bg-[#FAFAF7]">
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Accessibility' }]} />
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mt-10 mb-5">Accessibility statement.</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          We want everyone to be able to use our website, including people who use assistive technology. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA.
        </p>

        <h2 className="font-display text-2xl font-bold text-[#1a1238] mb-4">What we’ve done</h2>
        <CheckGrid
          columns={1}
          tone="plain"
          items={[
            'A “Skip to main content” link and a logical heading structure on every page',
            'Menus, dialogs and forms that work with a keyboard, with a visible focus outline',
            'Labelled form fields with clear error messages',
            'Text alternatives for meaningful images',
            'Layouts that adapt to phones, tablets and zoom up to 200%',
            'Body text colours chosen to meet contrast requirements',
          ]}
        />

        <h2 className="font-display text-2xl font-bold text-[#1a1238] mt-12 mb-4">Known limitations</h2>
        <ul className="space-y-3 text-gray-700 leading-relaxed mb-12 list-disc pl-5">
          <li>White text on our orange buttons has lower contrast than we’d like. We’re reviewing our button colours.</li>
          <li>Some forms, such as our NDIS referral and service agreement forms, are provided by third parties and may not be fully accessible.</li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-[#1a1238] mb-4">Need help or another format?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you have trouble using any part of this website, or need information in another format, contact us and we’ll help.
          Call <a className="text-[#27156F] font-semibold underline" href={contact.phoneHref}>{contact.phone}</a> or
          email <a className="text-[#27156F] font-semibold underline" href={`mailto:${contact.email}?subject=${encodeURIComponent('Website accessibility')}`}>{contact.email}</a>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          If you are deaf, or have a hearing or speech impairment, you can contact us through the National Relay Service.
        </p>
        <p className="text-sm text-gray-600 mt-10">This statement was last reviewed in October 2026.</p>
      </div>
    </article>
  )
}
