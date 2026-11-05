'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from '@/components/Link'

/**
 * Google Analytics 4 with Consent Mode v2 and a cookie banner.
 *
 * - Off unless NEXT_PUBLIC_GA_ID is set (MOCK "G-XXXXXXXXXX" in .env.example).
 * - Nothing from Google loads until the visitor accepts. "Decline" is remembered.
 * - The banner is a small bar, not a full-screen popup (no intrusive interstitial).
 * - Conversion events: form submissions (generate_lead), phone, WhatsApp and email
 *   clicks, CTA clicks (any element with data-track), and visits referred by AI
 *   assistants (ai_referral) such as ChatGPT, Perplexity, Gemini, Copilot and Claude.
 * - "Cookie settings" in the footer reopens the banner (event chc:cookie-settings).
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''
const STORAGE_KEY = 'chc-consent' // 'granted' | 'denied'
const AI_REFERRERS = /(^|\.)(chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai|you\.com)$/

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Gtag }
}

function readConsent(): string | null {
  try { return window.localStorage.getItem(STORAGE_KEY) } catch { return null }
}
function saveConsent(v: 'granted' | 'denied') {
  try { window.localStorage.setItem(STORAGE_KEY, v) } catch { /* private mode: ask again next visit */ }
}

/** Sends a GA4 event if analytics is running; otherwise does nothing. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', event, params)
}

function loadGa() {
  if (!GA_ID || window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' })
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(s)

  // AI assistant referrals (GEO tracking).
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : ''
    if (AI_REFERRERS.test(host)) window.gtag('event', 'ai_referral', { ai_source: host })
  } catch { /* no referrer */ }
}

export default function Analytics() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (!GA_ID) return
    const c = readConsent()
    // The banner appears shortly after load, so it never delays the page's main content.
    let timer: number | undefined
    if (c === 'granted') loadGa()
    else if (c !== 'denied') timer = window.setTimeout(() => setShowBanner(true), 800)
    const reopen = () => setShowBanner(true)
    window.addEventListener('chc:cookie-settings', reopen)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('chc:cookie-settings', reopen)
    }
  }, [])

  // Conversion clicks, delegated so no component needs to know about analytics.
  useEffect(() => {
    if (!GA_ID) return
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest('a, button')
      if (!el) return
      const href = el.getAttribute('href') ?? ''
      const custom = el.getAttribute('data-track')
      if (custom) track(custom, { link_url: href || undefined })
      else if (href.startsWith('tel:')) track('call_click', { phone: href.slice(4) })
      else if (href.startsWith('mailto:')) track('email_click')
      else if (href.includes('wa.me/')) track('whatsapp_click')
      else if (/book appointment|book an appointment|request a call back/i.test(el.textContent ?? '')) track('cta_click', { cta: el.textContent?.trim().slice(0, 60) })
    }
    const onLead = (e: Event) => track('generate_lead', { form_type: (e as CustomEvent).detail?.type })
    document.addEventListener('click', onClick)
    window.addEventListener('chc:enquiry-sent', onLead)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('chc:enquiry-sent', onLead)
    }
  }, [])

  const choose = useCallback((v: 'granted' | 'denied') => {
    saveConsent(v)
    setShowBanner(false)
    if (v === 'granted') loadGa()
    else if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' })
  }, [])

  if (!GA_ID || !showBanner) return null
  return (
    <div role="region" aria-label="Cookie choices" className="fixed inset-x-3 bottom-3 md:left-5 md:right-auto md:max-w-md z-[160] rounded-2xl bg-white border border-purple-100 shadow-2xl p-5">
      <p className="text-sm text-gray-700 leading-relaxed">
        We’d like to use analytics cookies to understand how people use our website, so we can improve it. No advertising cookies.{' '}
        <Link to="/cookie-policy/" className="text-[#27156F] font-semibold underline">Cookie policy</Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose('granted')} className="flex-1 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold py-3 rounded-xl text-sm">Accept</button>
        <button type="button" onClick={() => choose('denied')} className="flex-1 border-2 border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white font-semibold py-2.5 rounded-xl text-sm">Decline</button>
      </div>
    </div>
  )
}
