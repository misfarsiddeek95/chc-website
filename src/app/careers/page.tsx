import CareersPage from '@/views/CareersPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/careers/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <CareersPage />
    </>
  )
}
