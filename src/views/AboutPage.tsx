'use client'

import { Icons } from '@/components/Icons'
import { CtaBand, OutlineButton, PageHero, Section, SectionHeader, TextLink } from '@/components/ui'
import { useSiteUi } from '@/ui-context'

const principles = [
  { title: 'Quality health outcomes', body: 'Safe, effective, evidence-based care that makes a real difference.' },
  { title: 'Client focused', body: 'We measure success by how our clients feel about their care, and build lasting relationships.' },
  { title: 'Innovation', body: 'We keep our practice current and serve clients and partners ethically and on time.' },
  { title: 'Efficiency', body: 'We keep improving how we work and adapt quickly, without compromising quality.' },
  { title: 'People', body: 'Our staff are central to everything we do. We recognise excellence and invest in growth.' },
]

const values = [
  { title: 'Accountability', body: 'We take responsibility, focus on solutions and keep our promises.' },
  { title: 'Courage & agility', body: 'We respond to change, adopt proven new methods and back colleagues who do the right thing.' },
  { title: 'Integrity & compliance', body: 'We hold high professional and ethical standards and act with honesty and fairness.' },
  { title: 'Teamwork & respect', body: 'We communicate openly, value different perspectives and support one another.' },
  { title: 'Results', body: 'We meet our commitments on quality, timeliness and performance.' },
]

export default function AboutPage() {
  const { openBook, openChat } = useSiteUi()
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        badge="Allied health · Disability support · In-home care"
        title="Quality, comprehensive healthcare, connected."
        intro={<p>Complete Healthcare Connect began in Brisbane and has grown into a multidisciplinary team of clinicians, nurses and support workers. We believe quality healthcare is a basic right, and we work to make it affordable, holistic and easy to access.</p>}
        img="https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=800&h=600&fit=crop&auto=format"
        imgAlt="Healthcare worker smiling with an older patient"
        onBook={openBook}
        onChat={openChat}
      />

      <Section tone="white" id="our-story" labelledBy="story-title">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Our story</p>
            <h2 id="story-title" className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-[#1a1238] leading-tight mb-5">From one Brisbane team to a growing network.</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              We started in Brisbane with a simple aim: to provide, or connect people with, the best possible care. Today our clinics across South East Queensland bring physiotherapy, occupational therapy, speech pathology, podiatry, nursing and support work together under one roof.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We also support clients in other states through mobile services and telehealth, and we plan to keep growing so more Australians can access connected, high-quality care.
            </p>
          </div>
          <div className="grid gap-5">
            <div className="rounded-3xl bg-[#F0EDFF] p-7">
              <h3 className="font-display text-xl font-bold text-[#27156F] mb-2">Our mission</h3>
              <p className="text-gray-700 leading-relaxed">To provide or connect the best care for every client through quality, comprehensive and integrated clinical practice, education and research.</p>
            </div>
            <div className="rounded-3xl bg-[#27156F] text-white p-7">
              <h3 className="font-display text-xl font-bold mb-2">Our vision</h3>
              <p className="text-white/80 leading-relaxed">To be a trusted provider, connector and partner for quality clinical and non-clinical healthcare, improving people’s lives every day.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="lavender" id="principles" labelledBy="principles-title">
        <SectionHeader eyebrow="How we work" title={<span id="principles-title">Our principles.</span>} />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {principles.map((p, i) => (
            <li key={p.title} className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <span className="font-display text-sm font-bold text-[#9e5c00]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-lg font-bold text-[#1a1238] mt-2 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white" id="values" labelledBy="values-title">
        <SectionHeader eyebrow="What we stand for" title={<span id="values-title">Our values.</span>} intro="They guide how we treat clients, colleagues and partners, in clinical and non-clinical work alike." />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map(v => (
            <li key={v.title} className="flex gap-4 rounded-2xl bg-[#FAFAF7] border border-gray-100 p-6">
              <span className="w-10 h-10 rounded-xl bg-[#27156F]/8 text-[#27156F] flex items-center justify-center flex-shrink-0"><Icons.Check /></span>
              <div>
                <h3 className="font-display text-lg font-bold text-[#1a1238] mb-1">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="brand" id="community" labelledBy="community-title">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow text-[#FF9D00] text-sm font-semibold tracking-widest uppercase mb-3">In the community</p>
            <h2 id="community-title" className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">Proud to back local clubs.</h2>
            <p className="text-white/80 text-lg leading-relaxed">Our sponsorship program supports local sporting and social clubs, because healthy, connected communities matter to us.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <OutlineButton to="/our-team/" light>Meet our team</OutlineButton>
            <OutlineButton to="/careers/" light>Join our team</OutlineButton>
          </div>
        </div>
      </Section>

      <Section tone="cream" id="more" labelledBy="more-title">
        <h2 id="more-title" className="sr-only">More about us</h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {[
            { t: 'Our team', b: 'Meet our clinicians, nurses, coordinators and support workers.', to: '/our-team/' },
            { t: 'Funding schemes', b: 'See the funding schemes we are registered or approved with.', to: '/funding-schemes/' },
            { t: 'Locations', b: 'Find your nearest clinic, or ask about mobile and telehealth services.', to: '/locations/' },
          ].map(c => (
            <li key={c.t} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
              <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">{c.t}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.b}</p>
              <TextLink to={c.to}>{`View ${c.t.toLowerCase()}`}</TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand onBook={openBook} onChat={openChat} />
    </>
  )
}
