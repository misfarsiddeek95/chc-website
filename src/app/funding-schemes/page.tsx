import FundingPage from '@/views/FundingPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/funding-schemes/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <FundingPage />
    </>
  )
}
