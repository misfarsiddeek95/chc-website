import { notFound } from 'next/navigation'
import ClinicPage from '@/views/ClinicPage'
import { clinics } from '@/content/site'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

// One page per clinic: /locations/logan-central/, /locations/booval/, /locations/north-lakes/.
// Add a clinic to src/content/site.ts and its details to src/content/clinics.ts.

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return clinics.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  if (!clinics.some(c => c.slug === slug)) notFound()
  return pageMetadata(`/locations/${slug}/`)
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  if (!clinics.some(c => c.slug === slug)) notFound()
  const path = `/locations/${slug}/`
  return (
    <>
      <RouteJsonLd path={path} />
      <ClinicPage slug={slug} />
    </>
  )
}
