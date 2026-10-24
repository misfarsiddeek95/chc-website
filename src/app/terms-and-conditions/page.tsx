import LegalPage from '@/views/LegalPage'
import { getRoute } from '@/lib/routes'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/terms-and-conditions/'

const route = getRoute(PATH)

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <LegalPage title={route.crumbs[route.crumbs.length - 1].name} summary={route.description} />
    </>
  )
}
