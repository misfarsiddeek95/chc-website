import { notFound } from 'next/navigation'
import ServicePage from '@/views/ServicePage'
import BlogPostPage from '@/views/BlogPostPage'
import { postsByPath, posts } from '@/content/blog'
import { servicesByPath, services } from '@/content/services'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

// Content-driven pages: every service page (e.g. /ndis-services/,
// /allied-health-services/physiotherapy/) and every blog article (which keep
// their original root-level WordPress URLs, e.g. /fall-prevention/).
// Add a service or post in src/content and it is built here automatically.
// Hand-built pages (about-us/, contact/ …) have their own folders, which take precedence.

type Params = { slug: string[] }

const toPath = (slug: string[]) => `/${slug.join('/')}/`
const toSlug = (path: string) => path.split('/').filter(Boolean)

// Only the paths below exist; anything else is a 404 (and no request reaches this page at runtime).
export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return [...services.map(s => s.path), ...posts.map(p => p.path)].map(path => ({ slug: toSlug(path) }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const path = toPath(slug)
  if (!servicesByPath[path] && !postsByPath[path]) notFound()
  return pageMetadata(path)
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const path = toPath(slug)
  const view = servicesByPath[path] ? <ServicePage path={path} /> : postsByPath[path] ? <BlogPostPage path={path} /> : null
  if (!view) notFound()
  return (
    <>
      <RouteJsonLd path={path} />
      {view}
    </>
  )
}
