import LocationsPage from '@/views/LocationsPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/locations/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <LocationsPage />
    </>
  )
}
