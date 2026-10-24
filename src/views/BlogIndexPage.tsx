'use client'

import { useState } from 'react'
import { Icons } from '@/components/Icons'
import { Breadcrumbs, CtaBand, Section } from '@/components/ui'
import Link from '@/components/Link'
import { categories, formatDate, posts } from '@/content/blog'
import { useSiteUi } from '@/ui-context'

export default function BlogIndexPage() {
  const { openBook, openChat } = useSiteUi()
  const [active, setActive] = useState<string>('All')
  const shown = active === 'All' ? posts : posts.filter(p => p.category === active)
  const featured = posts[0]

  return (
    <>
      <section className="bg-[#FAFAF7] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-[#F0EDFF] hidden md:block" />
        <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-16 md:pb-20">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-8 md:mt-10">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 bg-[#27156F]/8 text-[#27156F] text-xs font-semibold px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#FF9D00]" aria-hidden="true" /> Health tips · NDIS guides · Healthy ageing
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-[#1a1238]">Blog: practical advice from our clinicians.</h1>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
                Guides and tips from our physiotherapists, occupational therapists, speech pathologists and support team, to help you stay well and get the most from your care.
              </p>
            </div>
            <Link to={featured.path} className="group block rounded-3xl bg-white border border-purple-100 shadow-2xl shadow-purple-200 overflow-hidden">
              <div className="h-48 flex items-end p-6" style={{ backgroundColor: featured.tint }}>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#27156F] bg-white/80 rounded-full px-3 py-1">Featured · {featured.category}</span>
              </div>
              <div className="p-7">
                <h2 className="font-display text-2xl font-bold text-[#1a1238] leading-snug mb-3 group-hover:text-[#27156F]">{featured.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{featured.intro}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#27156F]">Read article <Icons.ArrowRight /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Section tone="white" id="articles" labelledBy="articles-title">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">All articles</p>
            <h2 id="articles-title" className="font-display text-3xl md:text-4xl font-bold text-[#1a1238]">Latest from the blog.</h2>
          </div>
          <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
            {['All', ...categories].map(c => (
              <button
                key={c}
                type="button"
                aria-pressed={active === c}
                onClick={() => setActive(c)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${active === c ? 'bg-[#27156F] text-white border-[#27156F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#27156F] hover:text-[#27156F]'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map(p => (
            <li key={p.path}>
              <Link to={p.path} className="service-card group h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100" style={{ boxShadow: '0 2px 16px rgba(39,21,111,0.06)' }}>
                <div className="h-36 flex items-end p-5" style={{ backgroundColor: p.tint }}>
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#27156F] bg-white/80 rounded-full px-3 py-1">{p.category}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-bold text-[#1a1238] leading-snug mb-2 group-hover:text-[#27156F]">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{p.description}</p>
                  <p className="flex items-center gap-2 text-xs text-gray-600">
                    <Icons.Clock /> {p.readMins} min read · Updated {formatDate(p.updated)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-gray-600">
          Looking for announcements? See our <Link to="/news/" className="text-[#27156F] font-semibold underline">news</Link>. Have a question? Read our <Link to="/faqs/" className="text-[#27156F] font-semibold underline">FAQs</Link>.
        </p>
      </Section>

      <CtaBand title="Want advice for your situation?" onBook={openBook} onChat={openChat} />
    </>
  )
}
