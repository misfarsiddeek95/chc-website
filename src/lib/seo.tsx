import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/content/site'
import { getRoute, type RouteDef } from '@/lib/routes'

// 1200×630 sharing image (designed Nov 2026; the business had no social image).
const OG_IMAGE = { url: '/brand/og-image.png', width: 1200, height: 630, alt: `${SITE_NAME}: allied health, NDIS and home care` }

export const RSS_ALTERNATE = { 'application/rss+xml': [{ url: '/blog/rss.xml', title: `${SITE_NAME} Blog` }] }

export function canonicalUrl(path: string) {
  return SITE_URL + path
}

/** Page metadata (title, description, canonical, robots, Open Graph, Twitter) from the route table. */
export function routeMetadata(route: RouteDef): Metadata {
  const url = canonicalUrl(route.path)
  return {
    // `absolute` because route titles already include the brand.
    title: { absolute: route.title },
    description: route.description,
    // Metadata objects merge shallowly, so the RSS link is repeated here or pages would drop it.
    alternates: { ...(route.path === '/404/' ? {} : { canonical: url }), types: RSS_ALTERNATE },
    // Next.js adds its own noindex tag to the 404 page, so it isn't repeated there.
    robots: route.path === '/404/' ? undefined : route.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_AU',
      title: route.title,
      description: route.description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: route.title,
      description: route.description,
      images: [OG_IMAGE.url],
    },
  }
}

export function pageMetadata(path: string): Metadata {
  return routeMetadata(getRoute(path))
}

function breadcrumbSchema(route: RouteDef) {
  if (route.crumbs.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: route.crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  }
}

/** Serialises JSON-LD safely: "<" is escaped so content can never close the <script> tag. */
function serialise(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/** Structured data for a route: its own schema plus the BreadcrumbList. */
/** Page type for the WebPage schema (checklist: WebPage / AboutPage / ContactPage). */
function pageType(path: string): string {
  if (path === '/about-us/' || path === '/our-team/') return 'AboutPage'
  if (path === '/contact/') return 'ContactPage'
  if (['/blog/', '/news/', '/locations/', '/sitemap/'].includes(path)) return 'CollectionPage'
  return 'WebPage'
}

function webPageSchema(route: RouteDef) {
  const url = canonicalUrl(route.path)
  return {
    '@context': 'https://schema.org',
    '@type': pageType(route.path),
    '@id': `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: `${SITE_URL}${OG_IMAGE.url}`,
  }
}

export function RouteJsonLd({ path }: { path: string }) {
  const route = getRoute(path)
  const schemas = [webPageSchema(route), ...(route.schema ?? []), breadcrumbSchema(route)].filter((s): s is object => s !== null)
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialise(s) }} />
      ))}
    </>
  )
}
