import type React from 'react'
import Image from 'next/image'
import { Icons } from '@/components/Icons'
import Link from '@/components/Link'
import { contact } from '@/content/site'
import { ActionButton } from '@/components/SiteActions'

// Building blocks for inner pages. Every value matches the homepage
// (src/views/HomePage.tsx): same colours, radii, type scale and spacing.

export type Crumb = { label: string; to?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={`${i}-${c.label}`} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gray-400"><Icons.ChevronRight /></span>}
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="hover:text-[#27156F] hover:underline">{c.label}</Link>
            ) : (
              <span aria-current="page" className="text-[#27156F] font-medium">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Small orange label above headings. #9e5c00 keeps 4.5:1 on light grounds; brand orange on purple. */
export function Eyebrow({ children, className = '', light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'text-[#FF9D00]' : 'text-[#9e5c00]'} text-sm font-semibold tracking-widest uppercase mb-3 ${className}`}>{children}</p>
}

export function SectionHeader({
  eyebrow, title, intro, center = false, light = false, as: H = 'h2',
}: {
  eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode; center?: boolean; light?: boolean; as?: 'h2' | 'h3'
}) {
  return (
    <div data-reveal className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-10 md:mb-12`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <H className={`font-display text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-[#1a1238]'}`}>{title}</H>
      {intro && <p className={`text-lg leading-relaxed ${light ? 'text-white/75' : 'text-gray-600'}`}>{intro}</p>}
    </div>
  )
}

const sectionBg = {
  white: 'bg-white',
  cream: 'bg-[#FAFAF7]',
  lavender: 'bg-[#F0EDFF]',
  warm: 'bg-[#F5F2EC]',
  brand: 'bg-[#27156F] text-white',
} as const
export type SectionTone = keyof typeof sectionBg

export function Section({
  tone = 'white', id, children, className = '', labelledBy,
}: { tone?: SectionTone; id?: string; children: React.ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 md:py-24 ${sectionBg[tone]} ${tone === 'brand' ? 'relative overflow-hidden' : ''} ${className}`}>
      {tone === 'brand' && (
        <div aria-hidden="true" className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      )}
      <div className="relative max-w-7xl mx-auto px-6">{children}</div>
    </section>
  )
}

const primaryCls = 'inline-flex items-center justify-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-7 py-4 rounded-xl text-base transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02]'
const outlineCls = 'inline-flex items-center justify-center gap-2 border-2 border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white font-semibold px-7 py-4 rounded-xl text-base transition-all'

/**
 * Book / chat buttons. `true` (from a Server Component) renders a small client button
 * that opens the shared dialog; a function (from a Client Component) is called directly.
 */
type Action = (() => void) | true

function BookCta({ action, label }: { action: Action; label: React.ReactNode }) {
  return action === true
    ? <ActionButton action="book" className={primaryCls}>{label}<Icons.ArrowRight /></ActionButton>
    : <PrimaryButton onClick={action}>{label}<Icons.ArrowRight /></PrimaryButton>
}

function ChatCta({ action }: { action: Action }) {
  return action === true
    ? <ActionButton action="chat" className={outlineCls}><Icons.Chat />Chat with Our Team</ActionButton>
    : <OutlineButton onClick={action}><Icons.Chat />Chat with Our Team</OutlineButton>
}

export function PrimaryButton({ children, onClick, className = '', type = 'button' }: { children: React.ReactNode; onClick?: () => void; className?: string; type?: 'button' | 'submit' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-7 py-4 rounded-xl text-base transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] ${className}`}
    >
      {children}
    </button>
  )
}

/** A link styled like PrimaryButton (internal paths, #anchors, mailto: or tel:). */
export function PrimaryLink({ children, href, className = '' }: { children: React.ReactNode; href: string; className?: string }) {
  const cls = `inline-flex items-center justify-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-7 py-4 rounded-xl text-base transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] ${className}`
  return href.startsWith('/') ? <Link to={href} className={cls}>{children}</Link> : <a href={href} className={cls}>{children}</a>
}

export function OutlineButton({ children, onClick, to, href, light = false }: { children: React.ReactNode; onClick?: () => void; to?: string; href?: string; light?: boolean }) {
  const cls = light
    ? 'inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-[#27156F] font-semibold px-7 py-4 rounded-xl text-base transition-all'
    : 'inline-flex items-center justify-center gap-2 border-2 border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white font-semibold px-7 py-4 rounded-xl text-base transition-all'
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button type="button" onClick={onClick} className={cls}>{children}</button>
}

export function TextLink({ to, children, light = false }: { to: string; children: React.ReactNode; light?: boolean }) {
  const external = !to.startsWith('/')
  const cls = `inline-flex items-center gap-1 text-sm font-semibold transition-colors group ${light ? 'text-white hover:text-[#FFBE55]' : 'text-[#27156F] hover:text-[#9e5c00]'}`
  const inner = <>{children}<span className="transition-transform group-hover:translate-x-1">{external ? <Icons.ExternalLink /> : <Icons.ArrowRight />}</span></>
  return external
    ? <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>{inner}<span className="sr-only"> (opens in a new tab)</span></a>
    : <Link to={to} className={cls}>{inner}</Link>
}

/** Inner-page hero: breadcrumb, badge, H1, intro, CTAs and an image (or a tinted panel). */
export function PageHero({
  crumbs, badge, title, intro, img, imgAlt, tint = '#ddd4f7', onBook, onChat, primaryLabel = 'Book an Appointment', aside, actions,
}: {
  crumbs: Crumb[]; badge?: string; title: React.ReactNode; intro: React.ReactNode; img?: string; imgAlt?: string; tint?: string
  onBook?: Action; onChat?: Action; primaryLabel?: string; aside?: React.ReactNode
  /** Custom call-to-action buttons or links, used instead of the book/chat pair. */
  actions?: React.ReactNode
}) {
  return (
    <section className="relative bg-[#FAFAF7] overflow-hidden">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-[#F0EDFF] hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-16 md:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-8 md:mt-10">
          <div className="space-y-6">
            {badge && (
              <p className="inline-flex items-center gap-2 bg-[#27156F]/8 text-[#27156F] text-xs font-semibold px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#FF9D00] inline-block flex-shrink-0" aria-hidden="true" />
                {badge}
              </p>
            )}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-[#1a1238]">{title}</h1>
            <div className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">{intro}</div>
            {actions ? (
              <div className="flex flex-wrap gap-3 pt-1">{actions}</div>
            ) : (onBook || onChat) && (
              <div className="flex flex-wrap gap-3 pt-1">
                {onBook && <BookCta action={onBook} label={primaryLabel} />}
                {onChat && <ChatCta action={onChat} />}
              </div>
            )}
          </div>
          <div className="relative">
            {aside ?? (
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-purple-200" style={{ backgroundColor: tint }}>
                {img ? (
                  <Image src={img} alt={imgAlt ?? ''} width={800} height={600} preload sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                    <Image src="/brand/chc-mark.png" alt="" width={160} height={130} className="w-40 opacity-90 mix-blend-multiply" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export type CardItem = { title: string; body?: React.ReactNode; items?: string[]; to?: string; linkLabel?: string; tag?: string }

export function CardGrid({ cards, columns = 3 }: { cards: CardItem[]; columns?: 2 | 3 | 4 }) {
  const cols = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
  return (
    <ul className={`grid grid-cols-1 ${cols} gap-6`}>
      {cards.map(c => (
        <li key={c.title} data-reveal className="service-card bg-white rounded-2xl border border-gray-100 p-6 md:p-7 flex flex-col" style={{ boxShadow: '0 2px 16px rgba(39,21,111,0.06)' }}>
          {c.tag && <p className="eyebrow text-[#9e5c00] text-xs font-semibold tracking-widest uppercase mb-2">{c.tag}</p>}
          <h3 className="font-display text-lg md:text-xl font-bold text-[#1a1238] mb-2">{c.title}</h3>
          {c.body && <div className="text-gray-600 text-sm leading-relaxed mb-4">{c.body}</div>}
          {c.items && (
            <ul className="flex flex-wrap gap-1.5 mb-4">
              {c.items.map(i => <li key={i} className="text-xs bg-[#27156F]/6 text-[#27156F] font-medium px-2.5 py-1 rounded-full">{i}</li>)}
            </ul>
          )}
          {c.to && <div className="mt-auto pt-1"><TextLink to={c.to}>{c.linkLabel ?? `Explore ${c.title}`}</TextLink></div>}
        </li>
      ))}
    </ul>
  )
}

export function CheckGrid({ items, columns = 2, tone = 'lavender' }: { items: string[]; columns?: 1 | 2 | 3; tone?: 'lavender' | 'plain' }) {
  const cols = columns === 1 ? '' : columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
  return (
    <ul className={`grid grid-cols-1 ${cols} gap-3`}>
      {items.map(d => (
        <li key={d} data-reveal className={`flex items-start gap-3 bg-white rounded-xl px-5 py-4 border shadow-sm ${tone === 'lavender' ? 'border-purple-100' : 'border-gray-100'}`}>
          <span className="w-6 h-6 mt-px rounded-full bg-[#27156F]/10 text-[#27156F] flex items-center justify-center flex-shrink-0"><Icons.Check /></span>
          <span className="text-[#1a1238] font-medium text-sm leading-relaxed">{d}</span>
        </li>
      ))}
    </ul>
  )
}

export function PillList({ items }: { items: string[] }) {
  return (
    <ul data-reveal className="flex flex-wrap gap-2.5">
      {items.map(s => (
        <li key={s} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00] flex-shrink-0" aria-hidden="true" />
          {s}
        </li>
      ))}
    </ul>
  )
}

export function Steps({ steps, light = false }: { steps: { title: string; body: React.ReactNode }[]; light?: boolean }) {
  return (
    <ol className={`grid grid-cols-1 sm:grid-cols-2 ${steps.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
      {steps.map((s, i) => (
        <li key={s.title} data-reveal className={`rounded-2xl p-6 ${light ? 'bg-white/8 border border-white/10' : 'bg-white border border-purple-100 shadow-sm'}`}>
          <span className={`w-11 h-11 rounded-xl font-display font-bold flex items-center justify-center mb-5 ${light ? 'bg-[#FF9D00]/20 text-[#FF9D00]' : 'bg-[#27156F] text-white'}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className={`font-display text-lg font-bold mb-2 ${light ? 'text-white' : 'text-[#1a1238]'}`}>{s.title}</h3>
          <div className={`text-sm leading-relaxed ${light ? 'text-white/75' : 'text-gray-600'}`}>{s.body}</div>
        </li>
      ))}
    </ol>
  )
}

/** Notice for content the business still has to confirm. Visible in the build so nothing ships unnoticed. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-[#FFF4E0] border border-[#FFBE55] text-[#7a4a00] text-xs font-semibold px-2 py-0.5 rounded">
      {children}
    </span>
  )
}

export function Callout({ children, icon = 'info' }: { children: React.ReactNode; icon?: 'info' | 'alert' }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white border border-purple-100 p-5 text-sm text-gray-700 leading-relaxed shadow-sm">
      <span className="text-[#27156F] flex-shrink-0 mt-0.5">{icon === 'info' ? <Icons.Info /> : <Icons.AlertCircle />}</span>
      <div>{children}</div>
    </div>
  )
}

/** Closing conversion band used at the end of every inner page. */
export function CtaBand({
  title = 'Ready to get started?', body, onBook = true, onChat = true,
}: { title?: string; body?: React.ReactNode; onBook?: Action; onChat?: Action }) {
  return (
    <section aria-labelledby="cta-title" className="py-20 md:py-24 bg-[#FAFAF7] relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 20% 50%, #EEE9FF 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #FFF4E0 0%, transparent 50%)' }} />
      <div data-reveal className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 id="cta-title" className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mb-5 leading-tight">{title}</h2>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          {body ?? <>Whether you know the service you need or want to talk through your options, our team is here to help. Call <a href={contact.phoneHref} className="text-[#27156F] font-semibold underline">{contact.phone}</a>.</>}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <BookCta action={onBook} label="Book an Appointment" />
          <ChatCta action={onChat} />
        </div>
      </div>
    </section>
  )
}

export function FundingChips({ schemes }: { schemes: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {schemes.map(s => (
        <span key={s} className="text-sm font-medium px-3.5 py-1.5 rounded-full bg-white border border-purple-100 text-[#27156F]">{s}</span>
      ))}
      <TextLink to="/funding-schemes/">How funding works</TextLink>
    </div>
  )
}
