import type { MetadataRoute } from 'next'
import { routes } from '@/lib/routes'
import { canonicalUrl } from '@/lib/seo'

// /sitemap.xml — every indexable page from the route table.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes
    .filter(r => !r.noindex)
    .map(r => ({
      url: canonicalUrl(r.path),
      lastModified,
      changeFrequency: r.changefreq ?? 'monthly',
      priority: r.priority ?? 0.5,
    }))
}
