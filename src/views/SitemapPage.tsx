import { Breadcrumbs } from '@/components/ui'
import Link from '@/components/Link'
import type { RouteDef } from '@/lib/routes'

const order = ['Home', 'Services', 'Allied health', 'Resources & help', 'About CHC', 'Policies & site']

/** Human-readable sitemap: every page, grouped. Generated from the route table. */
export default function SitemapPage({ routes }: { routes: RouteDef[] }) {
  const groups = order
    .map(name => ({ name, items: routes.filter(r => (r.section ?? 'Policies & site') === name) }))
    .filter(g => g.items.length)
  const label = (r: RouteDef) => r.crumbs[r.crumbs.length - 1].name

  return (
    <article className="bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-24">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Sitemap' }]} />
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mt-10 mb-4">Sitemap.</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl">
          Every page on our website in one place. Search engines can use our <a href="/sitemap.xml" className="text-[#27156F] font-semibold underline">XML sitemap</a> and <a href="/blog/rss.xml" className="text-[#27156F] font-semibold underline">blog feed</a>.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(g => (
            <section key={g.name} aria-labelledby={`sm-${g.name}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <h2 id={`sm-${g.name}`} className="font-display text-xl font-bold text-[#1a1238] mb-4">{g.name}</h2>
              <ul className="space-y-2.5">
                {g.items.map(r => (
                  <li key={r.path}>
                    <Link to={r.path} className="text-[#27156F] underline underline-offset-4 decoration-[#27156F]/30 hover:text-[#9e5c00] hover:decoration-current">{label(r)}</Link>
                    {r.crumbs.length > 2 && r.section !== 'Resources & help' && <span className="text-xs text-gray-600"> · {r.crumbs[r.crumbs.length - 2].name}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
