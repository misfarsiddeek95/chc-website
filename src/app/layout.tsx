import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import SiteShell from '@/components/SiteShell'
import { SITE_NAME, SITE_URL } from '@/content/site'
import { RSS_ALTERNATE } from '@/lib/seo'
import './globals.css'

// Poppins, self-hosted (latin subset, SIL Open Font License: src/fonts/OFL-LICENSE.txt).
// No request to Google Fonts at build time or in the browser.
const poppins = localFont({
  variable: '--font-poppins',
  display: 'swap',
  src: [
    { path: '../fonts/poppins-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/poppins-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/poppins-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/poppins-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/poppins-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/poppins-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
})

// Site-wide defaults. Each page sets its own title, description, canonical and
// Open Graph tags from src/lib/routes.ts via pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_NAME,
  description: 'Allied health, NDIS disability support and in-home care across South East Queensland.',
  icons: { icon: '/brand/icon-192.png', apple: '/brand/icon-192.png' },
  alternates: { types: RSS_ALTERNATE },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#27156F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={poppins.variable} data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
