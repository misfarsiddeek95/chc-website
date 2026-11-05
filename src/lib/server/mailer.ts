// Sends enquiries to the admin inbox through Resend's HTTP API (no SDK needed).
// Any provider with an HTTP API can replace this one function.

import { escapeHtml, labels, subjects, summaryLines, type Enquiry } from '@/lib/enquiry'

export function mailerConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM)
}

export async function sendEnquiryEmail(e: Enquiry): Promise<void> {
  const to = process.env.ENQUIRY_TO || 'admin@chcconnect.com.au'
  const name = `${e.fields.firstName ?? ''} ${e.fields.lastName ?? ''}`.trim()
  // Fields are already cleaned of control characters, so no header injection via the subject.
  const subject = `${subjects[e.variant]} — ${name}`.slice(0, 150)
  const text = [...summaryLines(e.fields), '', `Sent from: ${e.page}`].join('\n')
  const rows = (Object.keys(labels) as (keyof typeof labels)[])
    .filter(k => e.fields[k])
    .map(k => `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(labels[k])}</th><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(e.fields[k]!)}</td></tr>`)
    .join('')
  const html = `<h2 style="font-family:sans-serif">${escapeHtml(subjects[e.variant])}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table><p style="font-family:sans-serif;color:#666;font-size:12px">Sent from ${escapeHtml(e.page)}</p>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM,
      to: [to],
      subject,
      text,
      html,
      // Replies go to the person who sent the form, when they gave an email.
      ...(e.fields.email ? { reply_to: e.fields.email } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`)
}
