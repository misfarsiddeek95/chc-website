'use client'

import type { ReactNode } from 'react'
import { useSiteUi } from '@/ui-context'

/**
 * A button that opens the booking dialog or the chat panel. It is the only client
 * code a page needs for these actions, so the rest of the page can stay a Server
 * Component (rendered to HTML, no JavaScript sent for it).
 */
export function ActionButton({ action, className, children }: { action: 'book' | 'chat'; className?: string; children: ReactNode }) {
  const { openBook, openChat } = useSiteUi()
  return (
    <button type="button" onClick={action === 'book' ? openBook : openChat} className={className}>
      {children}
    </button>
  )
}
