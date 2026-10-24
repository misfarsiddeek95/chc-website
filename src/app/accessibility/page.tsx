import AccessibilityPage from '@/views/AccessibilityPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/accessibility/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <AccessibilityPage />
    </>
  )
}
