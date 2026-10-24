'use client'

import React, { useId, useRef, useState } from 'react'
import { Icons } from '@/components/Icons'
import Link from '@/components/Link'
import { contact } from '@/content/site'

// One form for bookings, referrals and general enquiries.
// Delivery: if NEXT_PUBLIC_FORM_ENDPOINT is set at build time, the form POSTs JSON
// there (any form backend: Formspree, Make, Power Automate, a CRM webhook…). Without
// an endpoint it opens the visitor's email app with the details filled in, so the
// form always reaches the team. See README.md › Forms.

export const serviceOptions = [
  'Physiotherapy',
  'Occupational Therapy',
  'Speech Pathology',
  'Podiatry',
  'NDIS Disability Services',
  'Home & Community Support',
  'Aged Care Services',
  'Supported Accommodation (SIL / STA)',
  'Early Intervention',
  'Maintenance in the Home',
  'Community Nursing',
  'Not sure — help me choose',
]

const regions = [
  'South East Queensland',
  'North Queensland',
  'New South Wales',
  'Victoria',
  'South Australia',
  'Other / telehealth',
]

type Variant = 'book' | 'referral' | 'contact'

type Values = Record<string, string>
type Errors = Partial<Record<string, string>>

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || ''
const REQUEST_TIMEOUT_MS = 15000
/** Hidden field that people never see or fill in; bots that fill every field are ignored. */
const HONEYPOT = 'website'

const maxLengths: Record<string, number> = {
  firstName: 60, lastName: 60, phone: 30, email: 120, organisation: 120, ndisNumber: 20, message: 2000,
}

function validate(values: Values, variant: Variant): Errors {
  const e: Errors = {}
  if (!values.firstName?.trim()) e.firstName = 'Enter your first name.'
  if (!values.lastName?.trim()) e.lastName = 'Enter your last name.'
  const digits = (values.phone || '').replace(/[^\d]/g, '')
  if (digits.length < 8 || digits.length > 15) e.phone = 'Enter a phone number we can call, e.g. 0412 345 678.'
  if (variant === 'contact' || values.email?.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email?.trim() || '')) e.email = 'Enter an email address like name@example.com.'
  }
  // Checked in on-screen order, so focus goes to the first field with a problem.
  if (variant === 'referral' && !values.organisation?.trim()) e.organisation = 'Enter your organisation or practice.'
  if (values.ndisNumber?.trim() && !/^\d{9}$/.test(values.ndisNumber.replace(/\s/g, ''))) {
    e.ndisNumber = 'NDIS numbers have 9 digits. Leave this blank if you’re not sure.'
  }
  if (variant === 'contact' && !values.message?.trim()) e.message = 'Tell us briefly how we can help.'
  if (!values.consent) e.consent = 'Please agree so our team can contact you.'
  return e
}

const labels: Record<string, string> = {
  firstName: 'First name', lastName: 'Last name', phone: 'Phone', email: 'Email', organisation: 'Organisation',
  service: 'Service', region: 'Location', ndisNumber: 'NDIS number', message: 'Message',
}

/** Trimmed copy of the visible fields only (no honeypot, no empty values). */
function clean(values: Values): Values {
  const out: Values = {}
  for (const [k, v] of Object.entries(values)) {
    if (k === HONEYPOT) continue
    const t = v.trim()
    if (t) out[k] = t
  }
  return out
}

// mailto: links over ~2,000 characters fail in some email apps, so long messages are shortened.
const MAILTO_MESSAGE_LIMIT = 1200

function toMailto(values: Values, variant: Variant) {
  const subject =
    variant === 'book' ? 'Appointment request' : variant === 'referral' ? 'Client referral' : 'Website enquiry'
  const body = Object.keys(labels)
    .filter(k => values[k])
    .map(k => {
      const v = k === 'message' && values[k].length > MAILTO_MESSAGE_LIMIT ? values[k].slice(0, MAILTO_MESSAGE_LIMIT) + '…' : values[k]
      return `${labels[k]}: ${v}`
    })
    .join('\n')
  return `mailto:${contact.email}?subject=${encodeURIComponent(`${subject} — ${values.firstName} ${values.lastName}`)}&body=${encodeURIComponent(body)}`
}

const inputCls =
  'w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#27156F] aria-[invalid=true]:border-red-600'

export default function EnquiryForm({
  variant = 'contact',
  defaultService = '',
  submitLabel,
  compact = false,
}: {
  variant?: Variant
  defaultService?: string
  submitLabel?: string
  compact?: boolean
}) {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const [values, setValues] = useState<Values>({ service: defaultService })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'mailto' | 'error'>('idle')
  const summaryRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const set = (name: string) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = ev.target.type === 'checkbox' ? ((ev.target as HTMLInputElement).checked ? 'yes' : '') : ev.target.value
    setValues(prev => ({ ...prev, [name]: v }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (status === 'submitting') return // Enter pressed again while sending
    setStatus('idle')
    const found = validate(values, variant)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    // A filled-in honeypot means a bot: show success and send nothing.
    if (values[HONEYPOT]) {
      setStatus('sent')
      return
    }
    const data = clean(values)
    if (!ENDPOINT) {
      window.location.href = toMailto(data, variant)
      setStatus('mailto')
      return
    }
    setStatus('submitting')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ type: variant, ...data, page: window.location.pathname }),
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
      requestAnimationFrame(() => summaryRef.current?.focus())
    } finally {
      window.clearTimeout(timeout)
    }
  }

  if (status === 'sent' || status === 'mailto') {
    return <FormSuccess sent={status === 'sent'} onReset={() => { setValues({ service: defaultService }); setErrors({}); setStatus('idle') }} />
  }

  const field = (name: string, label: string, el: React.ReactElement, hint?: string) => (
    <div>
      <label htmlFor={id(name)} className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
      {React.cloneElement(el as React.ReactElement<Record<string, unknown>>, {
        id: id(name),
        name,
        value: values[name] || '',
        onChange: set(name),
        ...(maxLengths[name] ? { maxLength: maxLengths[name] } : {}),
        'aria-invalid': errors[name] ? true : undefined,
        'aria-describedby': [hint ? id(name + '-hint') : '', errors[name] ? id(name + '-err') : ''].filter(Boolean).join(' ') || undefined,
        className: inputCls + ' ' + (errors[name] ? 'border-red-600' : 'border-gray-300'),
      })}
      {hint && <p id={id(name + '-hint')} className="text-xs text-gray-500 mt-1">{hint}</p>}
      {errors[name] && (
        <p id={id(name + '-err')} className="text-xs text-red-700 mt-1 flex items-center gap-1">
          <Icons.AlertCircle /> {errors[name]}
        </p>
      )}
    </div>
  )

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative space-y-4 text-left" aria-busy={status === 'submitting'}>
      {/* Honeypot: hidden from people and assistive technology. Kept first so the
          space-y spacing of the visible fields is unchanged. */}
      <div aria-hidden="true" className="absolute -left-[10000px] w-px h-px overflow-hidden">
        <label htmlFor={id(HONEYPOT)}>Leave this field empty</label>
        <input id={id(HONEYPOT)} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" value={values[HONEYPOT] || ''} onChange={set(HONEYPOT)} />
      </div>
      {(status === 'error' || errorCount > 0) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {status === 'error'
            ? <>Sorry, we couldn’t send your request just now. Please try again, or call us on <a className="font-semibold underline" href={contact.phoneHref}>{contact.phone}</a>.</>
            : `Please fix ${errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`} below.`}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {field('firstName', 'First name', <input autoComplete="given-name" />)}
        {field('lastName', 'Last name', <input autoComplete="family-name" />)}
      </div>
      <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-2'} gap-3`}>
        {field('phone', 'Phone', <input type="tel" autoComplete="tel" inputMode="tel" />)}
        {field('email', variant === 'contact' ? 'Email' : 'Email (optional)', <input type="email" autoComplete="email" />)}
      </div>
      {variant === 'referral' && field('organisation', 'Organisation', <input autoComplete="organization" placeholder="Hospital, GP practice or agency" />)}
      <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-2'} gap-3`}>
        {field(
          'service',
          'Service needed',
          <select>
            <option value="">Select a service…</option>
            {serviceOptions.map(o => <option key={o}>{o}</option>)}
          </select>,
        )}
        {!compact && field(
          'region',
          'Your location',
          <select>
            <option value="">Select a region…</option>
            {regions.map(o => <option key={o}>{o}</option>)}
          </select>,
        )}
      </div>
      {!compact && field('ndisNumber', 'NDIS number (if you have one)', <input inputMode="numeric" />)}
      {(variant === 'contact' || !compact) && field('message', variant === 'contact' ? 'How can we help?' : 'Anything we should know? (optional)', <textarea rows={4} />)}
      <div>
        <label className="flex items-start gap-2.5 text-sm text-gray-600">
          <input
            type="checkbox"
            name="consent"
            checked={!!values.consent}
            onChange={set('consent')}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? id('consent-err') : undefined}
            className="mt-1 h-4 w-4 accent-[#27156F]"
          />
          <span>
            I agree to Complete Healthcare Connect contacting me about this request. See our{' '}
            <Link to="/privacy-policy/" className="text-[#27156F] underline">privacy policy</Link>.
          </span>
        </label>
        {errors.consent && <p id={id('consent-err')} className="text-xs text-red-700 mt-1">{errors.consent}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#FF9D00] hover:bg-[#e88e00] disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {status === 'submitting'
          ? 'Sending…'
          : submitLabel ?? (variant === 'book' ? 'Request Appointment' : variant === 'referral' ? 'Submit Referral' : 'Send Enquiry')}
      </button>
      <p className="text-center text-xs text-gray-500">
        Prefer to talk? Call <a href={contact.phoneHref} className="text-[#27156F] font-medium hover:underline">{contact.phone}</a>.
        In an emergency, call 000.
      </p>
    </form>
  )
}

/** Shown after a form is sent (or handed to the email app). */
export function FormSuccess({ sent, onReset }: { sent: boolean; onReset: () => void }) {
  return (
    <div role="status" className="rounded-2xl bg-[#F0EDFF] p-6 text-left">
        <div className="flex items-center gap-2 text-[#27156F] mb-2">
          <Icons.CheckCircle />
          <p className="font-display text-lg font-bold">
            {sent ? 'Thank you — your request is with our team.' : 'Almost done — send the email to finish.'}
          </p>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {sent
            ? 'We aim to contact you within one business day. If you need us sooner, please call '
            : 'Your email app should have opened with your details filled in. If it didn’t, email us at '}
          {sent ? (
            <a className="font-semibold text-[#27156F] underline" href={contact.phoneHref}>{contact.phone}</a>
          ) : (
            <a className="font-semibold text-[#27156F] underline" href={`mailto:${contact.email}`}>{contact.email}</a>
          )}
          .
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 text-sm font-semibold text-[#27156F] hover:text-[#FF9D00]"
        >
          Edit or send another request
        </button>
      </div>
  )
}
