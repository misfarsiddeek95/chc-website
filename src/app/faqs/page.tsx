import FaqPage from '@/views/FaqPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/faqs/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <FaqPage />
    </>
  )
}
