import type { Metadata } from 'next'
import NotFoundPage from '@/views/NotFoundPage'
import { notFoundRoute } from '@/lib/routes'
import { routeMetadata } from '@/lib/seo'

export const metadata: Metadata = routeMetadata(notFoundRoute)

export default function NotFound() {
  return <NotFoundPage />
}
