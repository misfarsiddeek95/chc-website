import NewsPage from '@/views/NewsPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/news/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <NewsPage />
    </>
  )
}
