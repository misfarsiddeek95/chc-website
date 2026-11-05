'use client'

import { useEffect, useState } from 'react'
import { contact } from '@/content/site'

/**
 * Floating WhatsApp button (with a gentle pop/pulse) and a Back to Top button.
 * Both are 48×48px targets with accessible names; motion is switched off for
 * people who prefer reduced motion (globals.css). Nothing here blocks rendering:
 * the component is small and has no third-party script.
 */
export default function FloatingButtons({ chatOpen = false }: { chatOpen?: boolean }) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // Move keyboard focus to the top of the page too, so the next Tab starts there.
    document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
  }

  const waHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`
    : ''

  return (
    <aside aria-label="Quick actions">
      {/* Hidden while the chat panel is open, which sits in the same corner. */}
      {waHref && !chatOpen && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (opens in a new tab)"
          data-track="whatsapp_click"
          className="wa-pop fixed bottom-[88px] right-5 z-[140] w-14 h-14 rounded-full bg-[#25D366] text-[#0b3d1f] flex items-center justify-center shadow-xl shadow-green-900/25 hover:scale-105 transition-transform"
        >
          <span aria-hidden="true" className="wa-pulse absolute inset-0 rounded-full bg-[#25D366]" />
          <svg aria-hidden="true" viewBox="0 0 24 24" className="relative w-7 h-7" fill="currentColor">
            <path d="M12.04 2C6.55 2 2.1 6.45 2.1 11.94c0 1.75.46 3.46 1.33 4.97L2 22l5.23-1.37a9.9 9.9 0 0 0 4.8 1.23h.01c5.49 0 9.94-4.45 9.94-9.94A9.9 9.9 0 0 0 12.04 2Zm0 18.18h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.55 3.7-8.25 8.25-8.25a8.25 8.25 0 0 1 8.24 8.26c0 4.55-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.76 6.76 0 0 1-3.38-2.95c-.26-.44.26-.41.73-1.36.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.24 3.75 1.57.68 2.19.74 2.98.62.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" />
          </svg>
        </a>
      )}
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={showTop ? undefined : true}
        className={`fixed bottom-5 left-5 z-[140] w-12 h-12 rounded-full bg-white text-[#27156F] border border-purple-100 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#27156F] hover:text-white ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
      </button>
    </aside>
  )
}
