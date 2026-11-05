'use client'

import { useEffect, useRef } from 'react'
import { Icons } from '@/components/Icons'
import EnquiryForm from '@/components/EnquiryForm'
import { zanda } from '@/content/site'

export type ModalType = 'book' | 'referral' | null

const FOCUSABLE = ['button:not([disabled])', 'a[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]']
  .map(sel => `${sel}:not([tabindex="-1"])`)
  .join(', ')

// Booking / referral dialog. Esc and the backdrop close it; focus moves into the
// dialog on open, is kept inside while open, and returns to the opener on close.
export default function BookModal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!type) return
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('input:not([tabindex="-1"])')?.focus())
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus()
    }
  }, [type, onClose])

  if (!type) return null
  const isReferral = type === 'referral'
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      // Close only when the press starts on the backdrop, so selecting text in the
      // form and releasing outside it doesn't throw the visitor's input away.
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 max-h-[92vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <Icons.X />
        </button>
        <div className="mb-6">
          <h2 id="book-modal-title" className="font-display text-2xl font-bold text-[#27156F] mb-1">
            {isReferral ? 'Refer a Client' : 'Book an Appointment'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isReferral
              ? 'Complete the form below and our team will be in touch within one business day.'
              : 'Fill in your details and we will confirm your appointment shortly.'}
          </p>
        </div>
        {!isReferral && (
          <a href={zanda.booking} target="_blank" rel="noopener noreferrer" className="mb-5 flex items-center justify-between gap-3 rounded-xl border-2 border-[#27156F] px-4 py-3 text-[#27156F] hover:bg-[#27156F] hover:text-white transition-colors">
            <span>
              <span className="block font-semibold text-sm">Book online now</span>
              <span className="block text-xs opacity-80">Choose a clinician and time in our booking system</span>
            </span>
            <Icons.ExternalLink /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {!isReferral && <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">Or request a call back</p>}
        <EnquiryForm variant={isReferral ? 'referral' : 'book'} compact />
      </div>
    </div>
  )
}
