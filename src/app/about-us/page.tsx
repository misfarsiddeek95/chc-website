import AboutPage from '@/views/AboutPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/about-us/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <AboutPage />
    </>
  )
}
