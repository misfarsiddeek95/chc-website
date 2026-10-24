import ComplaintsPage from '@/views/ComplaintsPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/feedback-and-complaints/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <ComplaintsPage />
    </>
  )
}
