'use client'

import { Icons } from '@/components/Icons'
import { Breadcrumbs, CtaBand, TextLink } from '@/components/ui'
import Link from '@/components/Link'
import { formatDate, posts, postsByPath, type Block } from '@/content/blog'
import { useSiteUi } from '@/ui-context'

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case 'h2': return <h2 key={i} className="font-display text-2xl md:text-3xl font-bold text-[#1a1238] mt-12 mb-4">{b.text}</h2>
    case 'p': return <p key={i} className="text-gray-700 text-lg leading-relaxed mb-5">{b.text}</p>
    case 'list':
      return (
        <ul key={i} className="space-y-2.5 mb-6">
          {b.items.map(it => (
            <li key={it} className="flex gap-3 text-gray-700 text-lg leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#FF9D00] flex-shrink-0" aria-hidden="true" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <div key={i} className="flex gap-3 rounded-2xl bg-[#F0EDFF] p-5 my-8 text-[#1a1238] leading-relaxed">
          <span className="text-[#27156F] flex-shrink-0 mt-0.5"><Icons.Info /></span>
          <p>{b.text}</p>
        </div>
      )
  }
}

export default function BlogPostPage({ path }: { path: string }) {
  const { openBook, openChat } = useSiteUi()
  const post = postsByPath[path]
  if (!post) throw new Error(`No blog post for "${path}" in src/content/blog.ts`)
  const more = posts.filter(p => p.path !== path).slice(0, 3)

  return (
    <>
      <article>
        <header className="bg-[#FAFAF7] relative overflow-hidden">
          <div className="relative max-w-3xl mx-auto px-6 pt-8 pb-12 md:pb-16">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog/' }, { label: post.category }]} />
            <p className="mt-10 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#27156F] bg-[#27156F]/8 rounded-full px-3 py-1.5">{post.category}</span>
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-[1.1] text-[#1a1238] mb-6">{post.title}</h1>
            <p className="text-gray-600 text-xl leading-relaxed mb-8">{post.intro}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 border-t border-gray-200 pt-5">
              <span className="font-semibold text-[#1a1238]">{post.author}</span>
              {post.published && <span>Published <time dateTime={post.published}>{formatDate(post.published)}</time></span>}
              <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
              <span className="flex items-center gap-1.5"><Icons.Clock /> {post.readMins} min read</span>
            </div>
          </div>
        </header>

        <div className="bg-white">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            {post.body.map(renderBlock)}

            <aside aria-label="Book with us" className="mt-12 rounded-3xl bg-[#27156F] text-white p-7 md:p-9">
              <h2 className="font-display text-2xl font-bold mb-2">Talk to our team</h2>
              <p className="text-white/80 leading-relaxed mb-6">Our clinicians can give advice that fits your situation, in clinic, at home or by telehealth.</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={openBook} className="inline-flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-white font-semibold px-6 py-3 rounded-xl text-sm">Book an Appointment <Icons.ArrowRight /></button>
                <button type="button" onClick={openChat} className="inline-flex items-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-[#27156F] font-semibold px-6 py-3 rounded-xl text-sm"><Icons.Chat /> Chat with Our Team</button>
              </div>
            </aside>

            <nav aria-label="Related services" className="mt-10">
              <h2 className="text-xs font-semibold text-gray-600 tracking-widest uppercase mb-3">Related services</h2>
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {post.related.map(r => <li key={r.to}><TextLink to={r.to}>{r.label}</TextLink></li>)}
              </ul>
            </nav>

            <p className="mt-10 text-sm text-gray-600 border-t border-gray-100 pt-6">
              This article is general information only and isn’t a substitute for advice from your doctor or health professional.
            </p>
          </div>
        </div>
      </article>

      <section aria-labelledby="more-title" className="bg-[#F0EDFF] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 id="more-title" className="font-display text-3xl font-bold text-[#1a1238]">More articles</h2>
            <Link to="/blog/" className="inline-flex items-center gap-1 text-sm font-semibold text-[#27156F] hover:text-[#9e5c00]">All articles <Icons.ArrowRight /></Link>
          </div>
          <ul className="grid md:grid-cols-3 gap-6">
            {more.map(p => (
              <li key={p.path}>
                <Link to={p.path} className="group block h-full rounded-2xl bg-white border border-purple-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#9e5c00]">{p.category}</span>
                  <h3 className="font-display text-lg font-bold text-[#1a1238] leading-snug mt-2 group-hover:text-[#27156F]">{p.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand onBook={openBook} onChat={openChat} />
    </>
  )
}
