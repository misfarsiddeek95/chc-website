import { Icons } from '@/components/Icons'
import { ActionButton } from '@/components/SiteActions'
import { Breadcrumbs, CtaBand, TextLink } from '@/components/ui'
import Link from '@/components/Link'
import { authors } from '@/content/authors'
import { formatDate, posts, postsByPath, type Block } from '@/content/blog'

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
  const post = postsByPath[path]
  if (!post) throw new Error(`No blog post for "${path}" in src/content/blog.ts`)
  const more = posts.filter(p => p.path !== path).slice(0, 3)
  const author = authors[post.author]
  const reviewer = post.reviewedBy ? authors[post.reviewedBy] : undefined
  if (!author) throw new Error(`Unknown author "${post.author}" in src/content/authors.ts`)

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
              <span><span className="font-semibold text-[#1a1238]">{author.name}</span>, {author.role}</span>
              {reviewer && <span>Reviewed by {reviewer.name}, {reviewer.role}</span>}
              {post.published && <span>Published <time dateTime={post.published}>{formatDate(post.published)}</time></span>}
              <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
              <span className="flex items-center gap-1.5"><Icons.Clock /> {post.readMins} min read</span>
            </div>
          </div>
        </header>

        <div className="bg-white">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            {/* Key takeaways (AEO): a short summary answer engines can quote. */}
            <aside aria-labelledby="takeaways-title" className="mb-10 rounded-2xl bg-[#F0EDFF] border border-purple-100 p-6 md:p-7">
              <h2 id="takeaways-title" className="font-display text-lg font-bold text-[#1a1238] mb-3">Key takeaways</h2>
              <ul className="space-y-2">
                {post.takeaways.map(t => (
                  <li key={t} className="flex gap-3 text-gray-700 leading-relaxed"><span aria-hidden="true" className="text-[#27156F] mt-1 flex-shrink-0"><Icons.Check /></span>{t}</li>
                ))}
              </ul>
            </aside>

            {post.body.map(renderBlock)}

            {/* Sources: links to authoritative Australian sites (trust signal for readers, search and AI). */}
            <section aria-labelledby="sources-title" className="mt-12 border-t border-gray-100 pt-8">
              <h2 id="sources-title" className="font-display text-xl font-bold text-[#1a1238] mb-3">Sources and further reading</h2>
              <ul className="space-y-2 list-disc pl-5 text-gray-700">
                {post.sources.map(src => (
                  <li key={src.url}><a href={src.url} target="_blank" rel="noopener" className="text-[#27156F] underline underline-offset-2 hover:text-[#9e5c00]">{src.label}<span className="sr-only"> (opens in a new tab)</span></a></li>
                ))}
              </ul>
            </section>

            {/* Author box (E-E-A-T). MOCK authors until the business confirms: src/content/authors.ts. */}
            <section aria-labelledby="author-title" className="mt-10 rounded-2xl bg-[#FAFAF7] border border-gray-100 p-6 flex gap-5">
              <span aria-hidden="true" className="w-14 h-14 rounded-full bg-[#27156F] text-white font-display font-bold flex items-center justify-center flex-shrink-0">{author.name.split(' ').map(n => n[0]).join('')}</span>
              <div>
                <h2 id="author-title" className="font-display text-lg font-bold text-[#1a1238]">About the author: {author.name}</h2>
                <p className="text-sm text-[#9e5c00] font-semibold mb-2">{author.role} · {author.credentials}</p>
                <p className="text-gray-700 leading-relaxed text-sm">{author.bio}</p>
                {reviewer && <p className="text-sm text-gray-600 mt-3">Clinically reviewed by {reviewer.name}, {reviewer.role} ({reviewer.credentials}).</p>}
              </div>
            </section>

            <aside aria-label="Book with us" className="mt-12 rounded-3xl bg-[#27156F] text-white p-7 md:p-9">
              <h2 className="font-display text-2xl font-bold mb-2">Talk to our team</h2>
              <p className="text-white/80 leading-relaxed mb-6">Our clinicians can give advice that fits your situation, in clinic, at home or by telehealth.</p>
              <div className="flex flex-wrap gap-3">
                <ActionButton action="book" className="inline-flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-6 py-3 rounded-xl text-sm">Book an Appointment <Icons.ArrowRight /></ActionButton>
                <ActionButton action="chat" className="inline-flex items-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-[#27156F] font-semibold px-6 py-3 rounded-xl text-sm"><Icons.Chat /> Chat with Our Team</ActionButton>
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

      <CtaBand />
    </>
  )
}
