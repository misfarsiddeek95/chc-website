import EligibilityPage from '@/views/EligibilityPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/ndis-eligibility/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <EligibilityPage />
    </>
  )
}
