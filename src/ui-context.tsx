import { createContext, useContext } from 'react'
import { forms } from '@/content/site'

// Site-wide actions any page can trigger: the booking dialog, the chat panel
// and the professional referral form.
export type SiteUi = {
  openBook: () => void
  openChat: () => void
  openReferral: () => void
}

export const SiteUiContext = createContext<SiteUi>({
  openBook: () => {},
  openChat: () => {},
  openReferral: () => {
    if (typeof window !== 'undefined') window.open(forms.referral, '_blank', 'noopener,noreferrer')
  },
})

export function useSiteUi() {
  return useContext(SiteUiContext)
}
