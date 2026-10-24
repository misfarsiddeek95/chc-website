import ReferralsPage from '@/views/ReferralsPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/referrals/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <ReferralsPage />
    </>
  )
}
