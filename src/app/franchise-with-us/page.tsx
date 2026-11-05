import FranchisePage from '@/views/FranchisePage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/franchise-with-us/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <FranchisePage />
    </>
  )
}
