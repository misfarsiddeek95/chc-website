import ContactPage from '@/views/ContactPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/contact/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <ContactPage />
    </>
  )
}
