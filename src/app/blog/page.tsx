import BlogIndexPage from '@/views/BlogIndexPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/blog/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <BlogIndexPage />
    </>
  )
}
