import TeamPage from '@/views/TeamPage'
import { pageMetadata, RouteJsonLd } from '@/lib/seo'

const PATH = '/our-team/'

export const metadata = pageMetadata(PATH)

export default function Page() {
  return (
    <>
      <RouteJsonLd path={PATH} />
      <TeamPage />
    </>
  )
}
