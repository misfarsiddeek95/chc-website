'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Icons } from '@/components/Icons'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ChatPanel from '@/components/ChatPanel'
import BookModal, { type ModalType } from '@/components/BookModal'
import { SiteUiContext } from '@/ui-context'

/**
 * Everything around the page content: skip link, header, footer, the floating chat
 * button, the chat panel and the booking dialog. Pages open the dialog and chat
 * through useSiteUi().
 */
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [modal, setModal] = useState<ModalType>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [shellPath, setShellPath] = useState(pathname)
  const mainRef = useRef<HTMLElement>(null)
  const lastPath = useRef(pathname)

  // A link inside the dialog (e.g. the privacy policy) changes the page: close the dialog.
  if (shellPath !== pathname) {
    setShellPath(pathname)
    setModal(null)
  }

  const openBook = useCallback(() => setModal('book'), [])
  // Referral buttons lead to the Referrals page, which explains the process and links the secure forms.
  const openReferral = useCallback(() => router.push('/referrals/'), [router])
  const closeModal = useCallback(() => setModal(null), [])
  const openChat = useCallback(() => setChatOpen(true), [])
  const closeChat = useCallback(() => setChatOpen(false), [])
  const ui = useMemo(() => ({ openBook, openChat, openReferral }), [openBook, openChat, openReferral])

  // After client-side navigation, move focus to the new page so keyboard and
  // screen-reader users start at the top of the content (not on the old link).
  useEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    if (!window.location.hash) mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <SiteUiContext.Provider value={ui}>
      <div className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:bg-[#27156F] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <SiteHeader onBook={openBook} />
        <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter onBook={openBook} />

        <button
          type="button"
          onClick={() => setChatOpen(prev => !prev)}
          className="fixed bottom-5 right-5 z-[140] flex items-center gap-2.5 bg-[#27156F] hover:bg-[#3820A0] text-white font-semibold px-5 py-3.5 rounded-full shadow-xl shadow-purple-900/30 transition-all hover:scale-105"
          aria-label={chatOpen ? 'Close chat' : 'Open chat'}
          aria-expanded={chatOpen}
          aria-controls="chat-panel"
        >
          <Icons.Chat />
          <span className="text-sm">Chat with us</span>
          {!chatOpen && (
            <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-green-400 absolute -top-0.5 -right-0.5 animate-pulse" />
          )}
        </button>

        <ChatPanel open={chatOpen} onClose={closeChat} onBook={openBook} onReferral={openReferral} />
        <BookModal type={modal} onClose={closeModal} />
      </div>
    </SiteUiContext.Provider>
  )
}
