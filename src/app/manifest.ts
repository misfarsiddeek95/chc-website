import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/content/site'

export const dynamic = 'force-static'

// Web app manifest (/manifest.webmanifest): name, colours and icon for "Add to home screen".
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'CHC',
    description: 'Allied health, NDIS disability support and in-home care in South East Queensland.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF7',
    theme_color: '#27156F',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
