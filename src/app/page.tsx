import HomePage from '@/views/HomePage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <HomePage />
    </>
  )
}
