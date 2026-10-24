import SitemapPage from '@/views/SitemapPage'
import { routes } from '@/lib/routes'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

// The HTML sitemap at /sitemap/. The XML sitemap for search engines is
// src/app/sitemap.ts, served at /sitemap.xml.
const PATH = '/sitemap/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <SitemapPage routes={routes} />
    </>
  )
}
