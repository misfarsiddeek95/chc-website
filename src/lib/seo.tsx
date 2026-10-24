import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/content/site'
import { getRoute, type RouteDef } from '@/lib/routes'

// Matches the file's real size. Swap in a 1200×630 image for sharper social previews.
const OG_IMAGE = { url: '/brand/og-image.png', width: 538, height: 440, alt: SITE_NAME }

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
export function RouteJsonLd({ path }: { path: string }) {
  const route = getRoute(path)
  const schemas = [...(route.schema ?? []), breadcrumbSchema(route)].filter((s): s is object => s !== null)
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialise(s) }} />
      ))}
    </>
  )
}
