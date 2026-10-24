import { posts } from '@/content/blog'
import { SITE_NAME, SITE_URL } from '@/content/site'

// /blog/rss.xml — RSS 2.0 feed of blog articles, newest first. Built once at build time.
export const dynamic = 'force-static'

const xml = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export function GET() {
  const items = posts
    .map(p => ({ ...p, date: p.published ?? p.updated }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(p => `    <item>
      <title>${xml(p.title)}</title>
      <link>${SITE_URL}${p.path}</link>
      <guid isPermaLink="true">${SITE_URL}${p.path}</guid>
      <description>${xml(p.description)}</description>
      <category>${xml(p.category)}</category>
      <pubDate>${new Date(`${p.date}T00:00:00+10:00`).toUTCString()}</pubDate>
    </item>`)

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(SITE_NAME)} Blog</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Health tips and NDIS guides from ${xml(SITE_NAME)}.</description>
    <language>en-au</language>
${items.join('\n')}
  </channel>
</rss>
`
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
