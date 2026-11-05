// POST /api/enquiry — receives the booking, referral, contact and franchise forms.
//
// Layers, in order: method/content-type/origin checks (blocks cross-site posts),
// size limit, per-IP and global rate limits, optional Turnstile, strict parsing and
// validation (src/lib/enquiry.ts), honeypot, then email to the admin inbox.
//
// This file uses the `.api.ts` extension so it is only part of the server build:
// `npm run build:static` (output: 'export') cannot include POST handlers.

import { NextResponse, type NextRequest } from 'next/server'
import { parseEnquiry } from '@/lib/enquiry'
import { SITE_URL } from '@/content/site'
import { log, ipTag } from '@/lib/server/log'
import { RateLimiter } from '@/lib/server/rate-limit'
import { mailerConfigured, sendEnquiryEmail } from '@/lib/server/mailer'
import { verifyTurnstile } from '@/lib/server/turnstile'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const MAX_BODY_BYTES = 16 * 1024
const perIp = new RateLimiter(5, 10 * 60 * 1000) // 5 enquiries per 10 minutes per IP
const global = new RateLimiter(200, 60 * 60 * 1000) // 200 per hour per instance

const json = (status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })

/** Client IP from the edge proxy. Only trust these headers when the app sits behind one (TRUST_PROXY=1). */
function clientIp(req: NextRequest): string {
  if (process.env.TRUST_PROXY === '1') {
    const cf = req.headers.get('cf-connecting-ip')
    if (cf) return cf
    const xff = req.headers.get('x-forwarded-for')
    if (xff) return xff.split(',')[0].trim()
    const real = req.headers.get('x-real-ip')
    if (real) return real
  }
  return 'unknown'
}

/** Same-origin check (CSRF): the request must come from this site's own pages. */
function sameOrigin(req: NextRequest): boolean {
  const site = req.headers.get('sec-fetch-site')
  if (site && site !== 'same-origin') return false
  const origin = req.headers.get('origin')
  if (!origin) return site === 'same-origin'
  const allowed = new Set([new URL(SITE_URL).origin, req.nextUrl.origin, ...(process.env.ALLOWED_ORIGINS ?? '').split(',').map(s => s.trim()).filter(Boolean)])
  return allowed.has(origin)
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  const tag = await ipTag(ip)

  if (!(req.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) {
    return json(415, { error: 'Unsupported request.' })
  }
  if (!sameOrigin(req)) {
    log('warn', 'enquiry.rejected', { reason: 'cross-origin', ip: tag })
    return json(403, { error: 'Forbidden.' })
  }
  const declared = Number(req.headers.get('content-length') ?? 0)
  if (declared > MAX_BODY_BYTES) return json(413, { error: 'Request too large.' })

  const limit = perIp.hit(ip)
  const total = global.hit('all')
  if (!limit.allowed || !total.allowed) {
    log('warn', 'enquiry.rate_limited', { ip: tag, scope: limit.allowed ? 'global' : 'ip' })
    const retry = String(limit.allowed ? total.retryAfterSec : limit.retryAfterSec)
    return json(429, { error: 'Too many requests. Please wait a few minutes or call 1300 450 334.' }, { 'Retry-After': retry })
  }

  // Read the body ourselves so the size limit holds even without a Content-Length header.
  let text: string
  try {
    text = await req.text()
  } catch {
    return json(400, { error: 'Invalid request.' })
  }
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return json(413, { error: 'Request too large.' })

  let body: unknown
  try {
    body = JSON.parse(text)
  } catch {
    return json(400, { error: 'Invalid request.' })
  }

  const token = (body as Record<string, unknown> | null)?.['turnstileToken']
  if (!(await verifyTurnstile(token, ip))) {
    log('warn', 'enquiry.rejected', { reason: 'turnstile', ip: tag })
    return json(403, { error: 'We couldn’t verify this request. Please refresh the page and try again.' })
  }

  const parsed = parseEnquiry(body)
  if (!parsed.ok) {
    log('info', 'enquiry.invalid', { ip: tag, status: parsed.status, fields: parsed.errors ? Object.keys(parsed.errors) : [] })
    return json(parsed.status, { error: parsed.message, errors: parsed.errors ?? {} })
  }

  // Honeypot filled: report success so the bot learns nothing, but send nothing.
  if (parsed.bot) {
    log('info', 'enquiry.honeypot', { ip: tag })
    return json(200, { ok: true })
  }

  if (!mailerConfigured()) {
    if (process.env.NODE_ENV !== 'production') {
      log('info', 'enquiry.dev_not_sent', { type: parsed.enquiry.variant, fields: Object.keys(parsed.enquiry.fields) })
      return json(200, { ok: true, dev: true })
    }
    log('error', 'enquiry.mailer_missing', { type: parsed.enquiry.variant })
    return json(503, { error: 'Our form isn’t available right now. Please call 1300 450 334 or email admin@chcconnect.com.au.' })
  }

  try {
    await sendEnquiryEmail(parsed.enquiry)
  } catch (err) {
    log('error', 'enquiry.send_failed', { type: parsed.enquiry.variant, ip: tag, message: err instanceof Error ? err.message : 'unknown' })
    return json(502, { error: 'We couldn’t send your request just now. Please try again, or call 1300 450 334.' })
  }
  log('info', 'enquiry.sent', { type: parsed.enquiry.variant, ip: tag, page: parsed.enquiry.page })
  return json(200, { ok: true })
}

// Anything other than POST.
export function GET() {
  return json(405, { error: 'Method not allowed.' }, { Allow: 'POST' })
}
