'use client'

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { usePathname } from 'next/navigation'
import { Icons } from '@/components/Icons'
import Logo from '@/components/Logo'
import Link, { normalisePath } from '@/components/Link'
import { contact, mainNav, social } from '@/content/site'

// Top contact bar + sticky navigation. "Services", "Resources" and "About" open
// dropdowns (click or keyboard; Esc, an outside click or moving focus away closes
// them); on small screens everything collapses into one menu.
export default function SiteHeader({ onBook }: { onBook: () => void }) {
  const path = normalisePath(usePathname() ?? '/')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [menuPath, setMenuPath] = useState(path)
  const navRef = useRef<HTMLElement>(null)

  // Close menus when the page changes (adjusting state during render, as React recommends).
  if (menuPath !== path) {
    setMenuPath(path)
    setOpenMenu(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close dropdowns on outside click, when focus leaves the nav, and on Esc.
  useEffect(() => {
    const onOutside = (e: Event) => { if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpenMenu(null); setMobileOpen(false) } }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('focusin', onOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('focusin', onOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  // Choosing a link closes the menus, including a link to the page already open.
  const closeOnLink = (e: ReactMouseEvent) => {
    if ((e.target as Element).closest('a')) { setOpenMenu(null); setMobileOpen(false) }
  }

  const isActive = (to?: string, items?: { to: string }[]) =>
    (to && path.startsWith(to)) || (items?.some(i => path.startsWith(i.to)) ?? false)

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#27156F] text-white/80 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={contact.phoneHref} className="flex items-center gap-1.5 hover:text-white transition-colors font-bold text-sm text-white">
              <Icons.Phone /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Icons.Mail /> {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="opacity-70">Follow us:</span>
            {social.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="hover:text-white transition-colors">
                {s.label === 'Facebook' ? <Icons.Facebook /> : s.label === 'Instagram' ? <Icons.Instagram /> : <Icons.YouTube />}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50">
      <nav
        ref={navRef}
        aria-label="Main"
        onClick={closeOnLink}
        className={`bg-white transition-all duration-300 ${scrolled ? 'nav-scrolled py-2' : 'py-3 border-b border-gray-100'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <Link to="/" aria-label="Complete Healthcare Connect home">
            <Logo size={scrolled ? 34 : 38} preload />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0 xl:gap-1">
            {mainNav.map(group => (
              <li key={group.label} className="relative">
                {group.items ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={openMenu === group.label}
                      aria-controls={`menu-${group.label}`}
                      onClick={() => setOpenMenu(m => (m === group.label ? null : group.label))}
                      className={`flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap hover:text-[#27156F] hover:bg-[#27156F]/5 ${isActive(undefined, group.items) ? 'text-[#27156F]' : 'text-gray-700'}`}
                    >
                      {group.label}
                      <span className={`transition-transform ${openMenu === group.label ? 'rotate-180' : ''}`}><Icons.ChevronDown /></span>
                    </button>
                    <div
                      id={`menu-${group.label}`}
                      hidden={openMenu !== group.label}
                      className={`absolute left-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 ${group.items.length > 4 ? 'w-[560px] grid grid-cols-2 gap-1' : 'w-72'}`}
                    >
                      {group.items.map(item => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block rounded-xl px-4 py-3 hover:bg-[#F0EDFF] transition-colors aria-[current=page]:bg-[#F0EDFF]"
                        >
                          <span className="block text-sm font-semibold text-[#1a1238]">{item.label}</span>
                          {item.description && <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={group.to!}
                    className={`block px-2 xl:px-3 py-2 text-sm font-medium rounded-lg hover:text-[#27156F] hover:bg-[#27156F]/5 transition-all whitespace-nowrap ${isActive(group.to) ? 'text-[#27156F]' : 'text-gray-700'}`}
                  >
                    {group.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="hidden md:flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-white font-semibold px-4 xl:px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm shadow-orange-200 whitespace-nowrap"
            >
              Book Appointment
            </button>
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600 hover:text-[#27156F]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && <MobileMenu onBook={() => { setMobileOpen(false); onBook() }} />}
      </nav>
      </header>
    </>
  )
}

/** Small-screen menu, shown under the nav bar when the menu button is pressed. */
export function MobileMenu({ onBook }: { onBook: () => void }) {
  return (
    <div id="mobile-menu" className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 max-h-[calc(100vh-64px)] overflow-y-auto">
      {mainNav.map(group =>
        group.items ? (
          <div key={group.label} className="py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase py-2">{group.label}</p>
            {group.items.map(item => (
              <Link key={item.to} to={item.to} className="block py-2.5 pl-3 text-sm font-medium text-gray-700 hover:text-[#27156F]">
                {item.label}
              </Link>
            ))}
          </div>
        ) : (
          <Link key={group.label} to={group.to!} className="block py-3 text-sm font-medium text-gray-700 hover:text-[#27156F] border-b border-gray-100">
            {group.label}
          </Link>
        ),
      )}
      <button
        type="button"
        onClick={onBook}
        className="w-full mt-4 bg-[#FF9D00] hover:bg-[#e88e00] text-white font-semibold py-3 rounded-xl text-sm transition-colors"
      >
        Book an Appointment
      </button>
      <a href={contact.phoneHref} className="flex items-center justify-center gap-2 mt-2 text-[#27156F] font-medium text-sm py-2">
        <Icons.Phone /> {contact.phone}
      </a>
    </div>
  )
}
