import type { NextConfig } from 'next'

// Two ways to deploy (see README.md › Deploying):
//   npm run build         → a Next.js server build (Vercel, Node, Docker). Redirects,
//                           security headers and image optimisation run on the server.
//   npm run build:static  → STATIC_EXPORT=1: plain HTML/CSS/JS in out/ for any static
//                           host. Redirects and headers then come from public/_redirects
//                           and public/_headers (Netlify / Cloudflare Pages format).
const isStaticExport = process.env.STATIC_EXPORT === '1'
const isDev = process.env.NODE_ENV === 'development'

/** Origin of the optional form backend, allowed in the Content-Security-Policy. */
function formEndpointOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_FORM_ENDPOINT
  if (!raw) return ''
  try {
    return new URL(raw).origin
  } catch {
    throw new Error(`NEXT_PUBLIC_FORM_ENDPOINT is not a valid URL: "${raw}"`)
  }
}

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js inlines its bootstrap scripts; 'unsafe-eval' is needed only by the dev server.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://completehealthcareconnect.com.au",
  "font-src 'self'",
  `connect-src 'self' ${formEndpointOrigin()}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  // One year, this host only. Add `includeSubDomains; preload` once every subdomain is HTTPS-only.
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

/** Old WordPress URLs. Keep in sync with public/_redirects (used by static hosting). */
const legacyRedirects = [
  { source: '/our-team-:slug', destination: '/our-team/', permanent: true },
  { source: '/test-add', destination: '/', permanent: true },
  { source: '/covid-safe-practices', destination: '/', permanent: true },
  { source: '/branches', destination: '/locations/', permanent: true },
]

const nextConfig: NextConfig = {
  // Matches the existing WordPress URL style: /about-us/ rather than /about-us.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport ? { output: 'export' as const } : {}),
  images: {
    // A static export has no server to resize images, so they are served as-is.
    unoptimized: isStaticExport,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'completehealthcareconnect.com.au', pathname: '/wp-content/uploads/**' },
    ],
  },
  // redirects() and headers() are not supported by `output: 'export'`.
  ...(isStaticExport
    ? {}
    : {
        async redirects() {
          return legacyRedirects
        },
        async headers() {
          return [{ source: '/:path*', headers: securityHeaders }]
        },
      }),
}

export default nextConfig
