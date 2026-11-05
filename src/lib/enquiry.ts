// Enquiry form rules shared by the browser (instant feedback) and the server
// (the real check: /api/enquiry never trusts what the browser sends).
// No React or Node imports here, so the same file runs in both and in unit tests.

export const VARIANTS = ['book', 'referral', 'contact', 'franchise'] as const
export type Variant = (typeof VARIANTS)[number]

export const serviceOptions = [
  'Physiotherapy',
  'Occupational Therapy',
  'Speech Pathology',
  'Podiatry',
  'NDIS Disability Services',
  'Home & Community Support',
  'Aged Care Services',
  'Supported Accommodation (SIL / SDA / ILO)',
  'Early Intervention',
  'Maintenance in the Home',
  'Community Nursing',
  'Telehealth (OT, speech or medical)',
  'Not sure — help me choose',
] as const

export const regions = [
  'South East Queensland',
  'North Queensland',
  'New South Wales',
  'Victoria',
  'South Australia',
  'Western Australia',
  'Other / telehealth',
] as const

/** The only fields the server accepts. Anything else in a request is dropped. */
export const FIELDS = ['firstName', 'lastName', 'phone', 'email', 'organisation', 'service', 'region', 'ndisNumber', 'message', 'consent'] as const
export type Field = (typeof FIELDS)[number]

export const maxLengths: Record<Field, number> = {
  firstName: 60, lastName: 60, phone: 30, email: 120, organisation: 120,
  service: 80, region: 80, ndisNumber: 20, message: 2000, consent: 3,
}

export const labels: Record<Exclude<Field, 'consent'>, string> = {
  firstName: 'First name', lastName: 'Last name', phone: 'Phone', email: 'Email', organisation: 'Organisation',
  service: 'Service', region: 'Location', ndisNumber: 'NDIS number', message: 'Message',
}

/** Hidden field people never see; bots that fill every field are ignored. */
export const HONEYPOT = 'website'

export type Values = Partial<Record<string, string>>
export type Errors = Partial<Record<Field, string>>

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/

/** Field errors in on-screen order, so the first key is the first field to fix. */
export function validate(values: Values, variant: Variant): Errors {
  const e: Errors = {}
  const v = (k: Field) => (values[k] ?? '').trim()
  if (!v('firstName')) e.firstName = 'Enter your first name.'
  if (!v('lastName')) e.lastName = 'Enter your last name.'
  const digits = v('phone').replace(/[^\d]/g, '')
  if (digits.length < 8 || digits.length > 15 || /[^\d\s()+-]/.test(v('phone'))) e.phone = 'Enter a phone number we can call, e.g. 0412 345 678.'
  const needsEmailAndMessage = variant === 'contact' || variant === 'franchise'
  if ((needsEmailAndMessage || v('email')) && !EMAIL_RE.test(v('email'))) e.email = 'Enter an email address like name@example.com.'
  if (variant === 'referral' && !v('organisation')) e.organisation = 'Enter your organisation or practice.'
  if (v('service') && !(serviceOptions as readonly string[]).includes(v('service'))) e.service = 'Choose a service from the list.'
  if (v('region') && !(regions as readonly string[]).includes(v('region'))) e.region = 'Choose a location from the list.'
  if (v('ndisNumber') && !/^\d{9}$/.test(v('ndisNumber').replace(/\s/g, ''))) e.ndisNumber = 'NDIS numbers have 9 digits. Leave this blank if you’re not sure.'
  if (needsEmailAndMessage && !v('message')) {
    e.message = variant === 'franchise' ? 'Tell us briefly about your background and preferred location.' : 'Tell us briefly how we can help.'
  }
  for (const f of FIELDS) {
    if (!e[f] && v(f).length > maxLengths[f]) e[f] = `Please keep this under ${maxLengths[f]} characters.`
  }
  if (v('consent') !== 'yes') e.consent = 'Please agree so our team can contact you.'
  return e
}

/** Removes control characters (keeps line breaks in the message) and trims. */
export function cleanText(s: string, multiline = false): string {
  // Zero-width, bidi-override and line/paragraph separator characters, written as escapes.
  const invisible = '\\u200B-\\u200F\\u2028-\\u202E\\u2066-\\u2069'
  const noCtrl = multiline
    ? s.replace(/\r\n?/g, '\n').replace(new RegExp(`[\\u0000-\\u0009\\u000B-\\u001F\\u007F${invisible}]`, 'g'), '')
    : s.replace(new RegExp(`[\\u0000-\\u001F\\u007F${invisible}]`, 'g'), ' ')
  return noCtrl.trim().replace(multiline ? /\n{3,}/g : /\s{2,}/g, multiline ? '\n\n' : ' ')
}

export type Enquiry = { variant: Variant; page: string; fields: Partial<Record<Field, string>> }

export type ParseResult =
  | { ok: true; enquiry: Enquiry; bot: boolean }
  | { ok: false; status: 400 | 422; errors?: Errors; message: string }

/**
 * Turns an untrusted JSON body into a clean enquiry: known fields only, strings only,
 * control characters removed, lengths and choices enforced, rules re-checked.
 */
export function parseEnquiry(body: unknown): ParseResult {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false, status: 400, message: 'Invalid request.' }
  const raw = body as Record<string, unknown>
  const variant = raw.type
  if (typeof variant !== 'string' || !(VARIANTS as readonly string[]).includes(variant)) return { ok: false, status: 400, message: 'Invalid request.' }

  const fields: Partial<Record<Field, string>> = {}
  for (const f of FIELDS) {
    const value = raw[f]
    if (value === undefined || value === null || value === '') continue
    if (typeof value !== 'string') return { ok: false, status: 400, message: 'Invalid request.' }
    // Reject absurd sizes before doing any work on them.
    if (value.length > maxLengths[f] * 2) return { ok: false, status: 422, errors: { [f]: `Please keep this under ${maxLengths[f]} characters.` }, message: 'Please check the highlighted fields.' }
    const cleaned = cleanText(value, f === 'message')
    if (cleaned) fields[f] = cleaned
  }
  const errors = validate(fields, variant as Variant)
  if (Object.keys(errors).length) return { ok: false, status: 422, errors, message: 'Please check the highlighted fields.' }

  const page = typeof raw.page === 'string' && /^\/[\w\-/.]{0,200}$/.test(raw.page) ? raw.page : '/'
  const bot = typeof raw[HONEYPOT] === 'string' && (raw[HONEYPOT] as string).length > 0
  return { ok: true, enquiry: { variant: variant as Variant, page, fields }, bot }
}

export const subjects: Record<Variant, string> = {
  book: 'Appointment request',
  referral: 'Client referral',
  contact: 'Website enquiry',
  franchise: 'Franchise enquiry',
}

/** Plain-text summary used for the email body and the mailto fallback. */
export function summaryLines(fields: Partial<Record<Field, string>>, limitMessage?: number): string[] {
  return (Object.keys(labels) as (keyof typeof labels)[])
    .filter(k => fields[k])
    .map(k => {
      const v = fields[k]!
      return `${labels[k]}: ${limitMessage && k === 'message' && v.length > limitMessage ? v.slice(0, limitMessage) + '…' : v}`
    })
}

/** Escapes text for HTML email bodies. */
export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}
