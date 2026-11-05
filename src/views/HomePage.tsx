'use client'

import { useState, useEffect, useRef, useCallback, type JSX, type KeyboardEvent } from 'react'
import Image, { type StaticImageData } from 'next/image'
import niisqLogo from '@/assets/niisq-logo.png'
import { Icons } from '@/components/Icons'
import Link from '@/components/Link'
import { useSiteUi } from '@/ui-context'
import { social, videoTestimonials } from '@/content/site'

// ─── Hero slider ─────────────────────────────────────────────────────────────

// Slide content from the business (Oct 2026), standardised: three eyebrow labels,
// a three-line heading (the last line, in orange, is the outcome), a one-sentence
// summary, a "Your… Your… Our…" promise and an "Explore …" button. Slides follow a
// care journey: rehabilitation, children, disability, supported living, ageing,
// hospital to home, then care anywhere.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=900&h=1100&fit=crop&auto=format`

const heroSlides: {
  tab: string
  badge: string
  heading: [string, string, string]
  body: string
  primaryCta: string
  primaryTo?: string
  img: string
  imgAlt: string
  imgBg: string
  panel: string
  trust: string[]
}[] = [
  {
    tab: 'Allied health',
    badge: 'Allied Health · Injury Rehabilitation · Return to Work',
    heading: ['Recover stronger.', 'Move better.', 'Do what you love.'],
    body: 'Physiotherapy, occupational therapy, speech pathology and podiatry for sports and workplace injuries, car accidents, whiplash and chronic conditions, including WorkCover Queensland.',
    primaryCta: 'Explore Allied Health',
    primaryTo: '/allied-health-services/',
    img: unsplash('photo-1709880754472-be89c13abc52'),
    imgAlt: 'Physiotherapist working with a client during a rehabilitation session',
    imgBg: '#d4e4f7',
    panel: '#E8F0FF',
    trust: ['Your recovery', 'Your goals', 'Our expertise'],
  },
  {
    tab: 'Paediatrics',
    badge: 'Paediatric Therapy · Early Intervention · Autism & ADHD',
    heading: ['Early support.', 'Brighter futures.', 'Lasting impact.'],
    body: 'Occupational therapy, speech pathology and physiotherapy helping children with autism, ADHD, developmental delays and cerebral palsy build communication, movement and everyday skills.',
    primaryCta: 'Explore Paediatric Therapy',
    primaryTo: '/early-intervention/',
    img: unsplash('photo-1758273241260-f49172d876e3'),
    imgAlt: 'Therapist playing with a young child during a therapy session',
    imgBg: '#f7ecd4',
    panel: '#FFF8E8',
    trust: ['Every child', 'Every milestone', 'Every possibility'],
  },
  {
    tab: 'Disability',
    badge: 'Disability Support · Community Nursing · Rehabilitation',
    heading: ['Personalised care.', 'Every ability.', 'Better lives.'],
    body: 'Registered NDIS and NIISQ provider delivering disability support, allied health, community nursing and in-home care across South East Queensland, plus DVA Community Nursing for veterans.',
    primaryCta: 'Explore Disability Services',
    primaryTo: '/ndis-services/',
    img: unsplash('photo-1764006145420-df3006edf060'),
    imgAlt: 'Healthcare professional with a client in a wheelchair',
    imgBg: '#ddd4f7',
    panel: '#F0EDFF',
    trust: ['Your goals', 'Your choice', 'Our support'],
  },
  {
    tab: 'Supported living',
    badge: 'Supported Living · SIL, SDA & ILO · 24/7 Support',
    heading: ['Call it home.', '24/7 support.', 'Room to thrive.'],
    body: 'Supported Independent Living (SIL) in Logan, Specialist Disability Accommodation (SDA) in Marsden and Individualised Living Options (ILO), backed by allied health professionals and nurses.',
    primaryCta: 'Explore Supported Living',
    primaryTo: '/housing-living-support/',
    img: unsplash('photo-1756312177451-aeb00d6e179a'),
    imgAlt: 'Woman in wheelchair smiling outdoors near supported accommodation',
    imgBg: '#d4e4f7',
    panel: '#E8F0FF',
    trust: ['Your home', 'Your choice', 'Our team'],
  },
  {
    tab: 'Aged care',
    badge: 'Aged Care · Support at Home · Restorative Care',
    heading: ['Regain strength.', 'Stay independent.', 'Live well at home.'],
    body: 'Nursing, allied health and in-home support for older Australians through Support at Home, the Commonwealth Home Support Programme (CHSP), Transition Care, respite and DVA nursing.',
    primaryCta: 'Explore Aged Care',
    primaryTo: '/aged-care-services/',
    img: unsplash('photo-1773227055624-07b515ba87c5'),
    imgAlt: 'Caregiver assisting elderly woman with walker at home',
    imgBg: '#f0eddf',
    panel: '#F5F2EC',
    trust: ['Your comfort', 'Your independence', 'Our commitment'],
  },
  {
    tab: 'Hospital to home',
    badge: 'Maintenance in the Home · Hospital Discharge · Transitional Care',
    heading: ['Leaving hospital.', 'Recover at home.', 'Fully supported.'],
    body: 'Medically supervised care for patients leaving hospital, with medical oversight, nursing, personal care and transport across Greater Brisbane while longer-term care is arranged.',
    primaryCta: 'Explore Hospital to Home',
    primaryTo: '/maintenance-in-the-home/',
    img: unsplash('photo-1765896387387-0538bc9f997e'),
    imgAlt: 'Healthcare worker smiling warmly with elderly patient',
    imgBg: '#ddd4f7',
    panel: '#F0EDFF',
    trust: ['Your recovery', 'Your home', 'Our continuity of care'],
  },
  {
    tab: 'Telehealth',
    badge: 'Telehealth · OT, Speech & Medical · Australia-wide',
    heading: ['Wherever you live.', 'Expert care.', 'No long journeys.'],
    body: 'Occupational therapy, speech pathology and medical consultations by telehealth for children and adults across Australia, including assessments, therapy and NDIS support.',
    primaryCta: 'Explore Telehealth',
    primaryTo: '/allied-health-services/#therapy-options',
    img: unsplash('photo-1773227059784-c1e36cc8c8c9'),
    imgAlt: 'Two women enjoying time together at home',
    imgBg: '#e4f0d4',
    panel: '#E8F5E8',
    trust: ['Your location', 'Your goals', 'Our care, Australia-wide'],
  },
]

// Third line uses a deeper brand orange: #FF9D00 is 2:1 on the cream hero, #C76E00 meets 3:1 for large text.
const headingColors = ['text-[#1a1238]', 'text-[#27156F]', 'text-[#C76E00]']

const heroPrimaryCls =
  'flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-7 py-4 rounded-xl text-base transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02]'

const heroStats = [
  { value: '30+', label: 'Clinicians', tone: 'light', pos: '-left-4 md:-left-8 top-16', delay: '0s', icon: 'users' },
  { value: '50+', label: 'Support Workers', tone: 'brand', pos: '-right-3 md:-right-6 top-[38%]', delay: '-1.5s', icon: 'userplus' },
  { value: '10K+', label: 'Clients Supported', tone: 'accent', pos: '-left-4 md:-left-8 bottom-[22%]', delay: '-3s', icon: 'heart' },
  { value: '5', label: 'Locations', tone: 'light', pos: '-right-3 md:-right-6 bottom-10', delay: '-4.5s', icon: 'pin' },
] as const

function StatIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'users') return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  if (name === 'userplus') return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
  if (name === 'heart') return <svg {...common}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  return <svg {...common}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
}

/**
 * True while the element is at least partly on screen. Auto-advancing sections use
 * it to stop changing (and changing height) while the visitor reads further down.
 */
function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, inView] as const
}

/**
 * Homepage hero carousel. Slides advance when the timer bar fills (6s); it pauses on
 * hover, focus, with the pause button or while scrolled out of view, and never
 * auto-advances for people who prefer reduced motion (the timer animation is turned
 * off). Swipe and ←/→ keys work.
 */
export function Hero({ onBook, onChat, initialSlide = 0 }: { onBook: () => void; onChat: () => void; initialSlide?: number }) {
  const [active, setActive] = useState(initialSlide)
  const [paused, setPaused] = useState(false)
  const [holding, setHolding] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = heroSlides.length
  const go = useCallback((i: number) => setActive(((i % count) + count) % count), [count])
  const next = useCallback(() => go(active + 1), [go, active])
  const prev = useCallback(() => go(active - 1), [go, active])
  const slide = heroSlides[active]
  const [sectionRef, inView] = useInView<HTMLElement>()
  const running = !paused && !holding && inView

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative bg-[#FAFAF7] overflow-hidden"
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHolding(false) }}
      onKeyDown={e => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev() }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
        touchX.current = null
      }}
    >
      {/* Colour panel behind the image changes with each slide */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-full md:w-[46%] hidden md:block transition-colors duration-700" style={{ backgroundColor: slide.panel }}>
        <svg className="absolute -right-24 -top-24 w-[520px] h-[520px] text-[#27156F]/10 arc-spin" viewBox="0 0 520 520" fill="none">
          <circle cx="260" cy="260" r="250" stroke="currentColor" strokeWidth="2" />
          <circle cx="260" cy="260" r="190" stroke="currentColor" strokeWidth="2" strokeDasharray="3 12" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-16 w-full">
        <div className="grid md:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <div key={active} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${count}: ${slide.tab}`} className="space-y-7 md:min-h-[830px] lg:min-h-0">
              <p className="hero-in inline-flex items-center gap-2 bg-[#27156F]/8 text-[#27156F] text-xs font-semibold px-4 py-2 rounded-full">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#FF9D00] inline-block flex-shrink-0" />
                {slide.badge}
              </p>
              <h1 className="font-display text-4xl md:text-5xl xl:text-[56px] font-bold leading-[1.08]">
                {slide.heading.map((line, i) => (
                  <span key={i} className={`hero-in block ${headingColors[i]} ${i === 2 ? 'font-extrabold relative w-fit' : ''}`} style={{ animationDelay: `${80 + i * 90}ms` }}>
                    {line}
                    {i === 2 && (
                      <svg aria-hidden="true" className="hero-swoosh absolute left-0 -bottom-2 w-full h-3 text-[#FF9D00]/45" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                        <path d="M2 9C40 3 120 1 198 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                ))}
              </h1>
              <p className="hero-in text-gray-600 text-lg leading-relaxed max-w-lg" style={{ animationDelay: '380ms' }}>{slide.body}</p>
              <div className="hero-in flex flex-wrap gap-3" style={{ animationDelay: '460ms' }}>
                {/* Slides that lead to a page use a real link (crawlable, can be opened in a new tab); a slide without a page opens the booking dialog. */}
                {slide.primaryTo ? (
                  <Link to={slide.primaryTo} className={heroPrimaryCls}>
                    {slide.primaryCta}
                    <Icons.ArrowRight />
                  </Link>
                ) : (
                  <button type="button" onClick={onBook} className={heroPrimaryCls}>
                    {slide.primaryCta}
                    <Icons.ArrowRight />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onChat}
                  className="flex items-center gap-2 border-2 border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white font-semibold px-7 py-4 rounded-xl text-base transition-all"
                >
                  <Icons.Chat />
                  Chat with Our Team
                </button>
              </div>
              <ul className="hero-in flex flex-wrap gap-x-5 gap-y-2" style={{ animationDelay: '540ms' }}>
                {slide.trust.map(item => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-gray-600">
                    <span className="text-[#27156F]"><Icons.Check /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide tabs with timer bars */}
            <div className="mt-10 flex items-end gap-4">
              <div className="grid grid-cols-7 gap-2 flex-1 max-w-lg">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.tab}
                    type="button"
                    data-slide={i}
                    onClick={() => go(i)}
                    aria-label={`Show slide ${i + 1}: ${s.tab}`}
                    aria-current={i === active ? 'true' : undefined}
                    className="text-left group"
                  >
                    <span className={`flex items-baseline gap-2 transition-colors ${i === active ? 'text-[#27156F]' : 'text-gray-500 group-hover:text-[#27156F]'}`}>
                      <span className="font-display text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="mt-2 block h-1 rounded-full bg-[#27156F]/12 overflow-hidden">
                      {i === active && (
                        <span
                          key={`bar-${active}`}
                          className="hero-progress"
                          style={{ animationPlayState: running ? 'running' : 'paused' }}
                          onAnimationEnd={next}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={prev} aria-label="Previous slide" className="w-12 h-12 md:w-10 md:h-10 rounded-full border-2 border-[#27156F]/20 flex items-center justify-center text-[#27156F] hover:bg-[#27156F] hover:text-white hover:border-[#27156F] transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button type="button" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} className="w-12 h-12 md:w-10 md:h-10 rounded-full border-2 border-[#27156F]/20 flex items-center justify-center text-[#27156F] hover:bg-[#27156F] hover:text-white hover:border-[#27156F] transition-all">
                  {paused
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="4.5" height="16" rx="1"/><rect x="14.5" y="4" width="4.5" height="16" rx="1"/></svg>}
                </button>
                <button type="button" onClick={next} aria-label="Next slide" className="w-12 h-12 md:w-10 md:h-10 rounded-full border-2 border-[#27156F]/20 flex items-center justify-center text-[#27156F] hover:bg-[#27156F] hover:text-white hover:border-[#27156F] transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
            <p className="sr-only" aria-live={running ? 'off' : 'polite'}>Slide {active + 1} of {count}: {slide.tab}</p>
          </div>

          {/* Image in an arch frame, with floating stats */}
          <div className="relative mx-auto w-full max-w-[500px]">
            <div
              className="relative aspect-[4/5] overflow-hidden shadow-2xl shadow-purple-200 transition-colors duration-700"
              style={{ borderRadius: '999px 999px 32px 32px', backgroundColor: slide.imgBg }}
            >
              {heroSlides.map((s, i) => (
                <Image
                  key={s.img}
                  src={s.img}
                  alt={i === active ? s.imgAlt : ''}
                  aria-hidden={i === active ? undefined : true}
                  fill
                  sizes="(min-width: 768px) 500px, 100vw"
                  preload={i === 0}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === active ? 'opacity-100 hero-zoom' : 'opacity-0'}`}
                />
              ))}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#27156F]/25 via-transparent to-transparent" />
              <div aria-hidden="true" className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/35 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {active + 1} / {count}
              </div>
            </div>
            {heroStats.map(s => (
              <div
                key={s.label}
                aria-hidden="true"
                className={`hero-float absolute ${s.pos} rounded-2xl shadow-xl px-5 py-4 hidden md:block`}
                style={{
                  animationDelay: s.delay,
                  backdropFilter: 'blur(8px)',
                  background: s.tone === 'brand' ? 'rgba(39,21,111,0.8)' : s.tone === 'accent' ? 'rgba(255,157,0,0.85)' : 'rgba(255,255,255,0.85)',
                }}
              >
                <span className={`block mb-2 ${s.tone === 'light' ? 'text-[#27156F]' : s.tone === 'accent' ? 'text-[#1a1238]/80' : 'text-white/80'}`}><StatIcon name={s.icon} /></span>
                <div className={`font-display text-3xl font-bold ${s.tone === 'light' ? 'text-[#27156F]' : s.tone === 'accent' ? 'text-[#1a1238]' : 'text-white'}`}>{s.value}</div>
                <div className={`text-xs font-medium mt-0.5 ${s.tone === 'light' ? 'text-gray-600' : s.tone === 'accent' ? 'text-[#1a1238]' : 'text-white/90'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Services ribbon ─────────────────────────────────────────────────────────

const ribbonItems = [
  'Physiotherapy', 'Occupational Therapy', 'Speech Pathology', 'Podiatry', 'NDIS Support', 'Community Nursing',
  'Supported Accommodation', 'Early Intervention', 'Home & Community Care', 'Telehealth',
]

function ServicesRibbon() {
  return (
    <section aria-label="Our services at a glance" className="bg-[#27156F] text-white py-4 overflow-hidden">
      <ul className="sr-only">{ribbonItems.map(t => <li key={t}>{t}</li>)}</ul>
      <div aria-hidden="true" className="ribbon-track flex w-max items-center">
        {[...ribbonItems, ...ribbonItems].map((t, i) => (
          <span key={`${i}-${t}`} className="flex items-center gap-10 pr-10 text-sm md:text-base font-semibold tracking-wide whitespace-nowrap">
            {t}
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00]" />
          </span>
        ))}
      </div>
    </section>
  )
}

/** Decorative concentric arcs, echoing the arcs in the CHC mark. */
function Arcs({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`absolute pointer-events-none arc-spin ${className}`} viewBox="0 0 560 560" fill="none">
      <circle cx="280" cy="280" r="270" stroke="currentColor" strokeWidth="2" />
      <circle cx="280" cy="280" r="205" stroke="currentColor" strokeWidth="2" strokeDasharray="3 12" />
      <circle cx="280" cy="280" r="140" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────

const serviceGroups = [
  {
    id: 'disability-services',
    to: '/ndis-services/',
    title: 'Disability Services',
    tagline: 'NDIS support built around you.',
    desc: 'Person-centred NDIS services supporting independence, community participation and quality of life for people living with disability.',
    img: 'https://images.unsplash.com/photo-1764006145420-df3006edf060?w=600&h=400&fit=crop&auto=format',
    color: '#EEE9FF',
    subServices: ['NDIS Support Coordination', 'Community Participation', 'Daily Living Assistance', 'Behaviour Support'],
  },
  {
    id: 'aged-care',
    to: '/aged-care-services/',
    title: 'Aged Care Services',
    tagline: 'Compassionate care at home.',
    desc: 'In-home aged care support helping older Australians live safely, comfortably and independently in their own home.',
    img: 'https://images.unsplash.com/photo-1773227055624-07b515ba87c5?w=600&h=400&fit=crop&auto=format',
    color: '#FFF4E0',
    subServices: ['Community Nursing', 'Personal Care', 'Meal Preparation', 'Domestic Assistance'],
  },
  {
    id: 'early-intervention',
    to: '/early-intervention/',
    title: 'Early Intervention',
    tagline: 'Early support. Lasting impact.',
    desc: 'Specialist early childhood services helping children reach their full potential at home, in clinic and in the community.',
    img: 'https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=600&h=400&fit=crop&auto=format',
    color: '#FFF8E8',
    subServices: ['Developmental Assessment', 'Speech Pathology', 'Occupational Therapy', 'Physiotherapy'],
  },
  {
    id: 'accommodation',
    to: '/housing-living-support/',
    title: 'Supported Accommodation',
    tagline: 'A place to live. Support to thrive.',
    desc: 'Safe, supported SIL/SDA housing that promotes independence, wellbeing and quality of life for Australians living with disability.',
    img: 'https://images.unsplash.com/photo-1756312177451-aeb00d6e179a?w=600&h=400&fit=crop&auto=format',
    color: '#F0EDFF',
    subServices: ['SIL — Supported Independent Living', 'SDA — Specialist Disability Accommodation', 'ILO — Individualised Living Options', '24/7 Support'],
  },
  {
    id: 'maintenance',
    to: '/maintenance-in-the-home/',
    title: 'Maintenance in the Home',
    tagline: 'Medically supported care at home, on the way to where you need to be next.',
    desc: 'Clinically supervised transitional care for medically stable patients discharged from hospital, providing personal care, nursing, and medical oversight at home while a Support at Home package, NDIS funding, or Residential Aged Care placement is arranged.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
    color: '#E8F5E8',
    subServices: ['Personal Care & Daily Living Support', 'Registered Nurse Oversight', 'Medical Officer Review', 'Placement & Funding Coordination'],
  },
  {
    id: 'rehabilitation',
    to: '/allied-health-services/',
    title: 'Rehabilitation Services',
    tagline: 'Move better. Live stronger.',
    desc: 'Expert allied health clinicians delivering physiotherapy, occupational therapy, speech pathology and podiatry.',
    img: 'https://images.unsplash.com/photo-1709880754472-be89c13abc52?w=600&h=400&fit=crop&auto=format',
    color: '#E8F0FF',
    subServices: ['Physiotherapy', 'Occupational Therapy', 'Speech Pathology', 'Podiatry'],
  },
]

function Services({ onChat }: { onChat: () => void }) {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="text-center mb-14">
          <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Our Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mb-4">How can we help?</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Explore our services or tell us what support you’re looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceGroups.map(group => (
            <article
              key={group.id}
              data-reveal className="service-card group rounded-2xl overflow-hidden bg-white border border-gray-100 relative"
              style={{ boxShadow: '0 2px 16px rgba(39,21,111,0.06)' }}
            >
              <div className="h-44 overflow-hidden" style={{ backgroundColor: group.color }}>
                <Image
                  src={group.img}
                  alt=""
                  width={600}
                  height={400}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="service-img w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-[#1a1238] mb-1">{group.title}</h3>
                <p className="text-[#9e5c00] text-xs font-semibold mb-2">{group.tagline}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{group.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {group.subServices.map(s => (
                    <span key={s} className="text-xs bg-[#27156F]/6 text-[#27156F] font-medium px-2.5 py-1 rounded-full">{s}</span>
                  ))}
                </div>
                <Link
                  to={group.to}
                  className="flex items-center gap-1 text-[#27156F] text-sm font-semibold hover:text-[#9e5c00] transition-colors after:absolute after:inset-0"
                >
                  Learn more<span className="sr-only"> about {group.title}</span>
                  <span className="arrow-icon"><Icons.ArrowRight /></span>
                </Link>
              </div>
            </article>
          ))}

          {/* Not sure card */}
          <article
            data-reveal className="service-card group relative rounded-2xl overflow-hidden border-2 border-dashed border-[#27156F]/20 hover:border-[#27156F]/50"
            style={{ boxShadow: '0 2px 16px rgba(39,21,111,0.04)' }}
          >
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 text-center bg-[#FAFAF7]">
              <div aria-hidden="true" className="w-14 h-14 rounded-full bg-[#27156F]/8 flex items-center justify-center mb-4 text-2xl">💬</div>
              <h3 className="font-display text-xl font-bold text-[#1a1238] mb-2">Not sure which service?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">Our team can help you find the right support for your situation.</p>
              {/* The button's ::after covers the whole card, so the card is one large, keyboard-reachable target. */}
              <button type="button" onClick={onChat} className="flex items-center gap-1.5 text-[#27156F] font-semibold text-sm after:absolute after:inset-0">
                Chat with us <span className="arrow-icon"><Icons.ArrowRight /></span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

// ─── Home & Community Care ────────────────────────────────────────────────────

const homeCareServices = [
  'Community Nursing', 'Community Access & Transport', 'Meal Preparation',
  'Daily Living Activities', 'Medication Management', 'Domestic Assistance', 'Lawn & Garden Care',
]

function HomeCare() {
  return (
    <section id="homecare" className="py-20 md:py-28 bg-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div data-reveal className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#ddd4f7] shadow-xl shadow-purple-100">
              <Image
                src="https://images.unsplash.com/photo-1773227059784-c1e36cc8c8c9?w=700&h=875&fit=crop&auto=format"
                alt="Two elderly women enjoying time together at home"
                width={700}
                height={875}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 hidden md:block">
              <p className="text-[#27156F] font-display font-bold text-2xl">7</p>
              <p className="text-gray-500 text-xs font-medium mt-0.5">Support services</p>
              <p className="text-gray-600 text-xs">in your home</p>
            </div>
          </div>

          <div data-reveal className="space-y-7">
            <div>
              <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Home & Community Care</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] leading-tight mb-4">
                Support for<br />everyday life.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Practical, compassionate support that helps you live safely and independently at home and in your community — on your terms.
              </p>
            </div>

            <div data-reveal className="flex flex-wrap gap-2.5">
              {homeCareServices.map(s => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full hover:border-[#27156F] hover:text-[#27156F] transition-colors cursor-default"
                >
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#FF9D00] flex-shrink-0" />
                  {s}
                </span>
              ))}
            </div>

            <Link
              to="/home-community-support/"
              className="inline-flex items-center gap-2 bg-[#27156F] hover:bg-[#3820A0] text-white font-semibold px-7 py-4 rounded-xl text-sm transition-colors"
            >
              Explore Home & Community Care
              <Icons.ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Supported Accommodation ──────────────────────────────────────────────────

const accommodationTypes = [
  { label: 'Supported Independent Living · Logan', abbr: 'SIL' },
  { label: 'Specialist Disability Accommodation · Marsden', abbr: 'SDA' },
  { label: 'Individualised Living Options', abbr: 'ILO' },
  { label: '24-hour support where required and funded', abbr: '24/7' },
  { label: 'Registered nursing & clinical oversight', abbr: 'RN' },
  { label: 'Allied health professionals on hand', abbr: 'AH' },
]

function Accommodation() {
  return (
    <section id="accommodation" className="py-20 md:py-28 bg-[#27156F] text-white overflow-hidden relative">
      <Arcs className="-right-48 -top-48 w-[640px] h-[640px] text-white/10" />
      {/* Background texture */}
      <div aria-hidden="true" className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div data-reveal className="space-y-7 order-2 md:order-1">
            <div>
              <p className="eyebrow text-[#FF9D00] text-sm font-semibold tracking-widest uppercase mb-3">Supported Accommodation</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
                A place to call home.<br />24/7 support to thrive.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Supported Independent Living in Logan, Specialist Disability Accommodation and Individualised Living Options, with a dedicated 24-hour support team backed by allied health professionals and community nurses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {accommodationTypes.map(type => (
                <div key={type.abbr} data-reveal className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl p-4 hover:bg-white/12 transition-colors">
                  <span className="w-10 h-10 rounded-lg bg-[#FF9D00]/20 text-[#FFBE55] font-display font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {type.abbr}
                  </span>
                  <span className="text-sm text-white/80 font-medium">{type.label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/housing-living-support/"
              className="inline-flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-7 py-4 rounded-xl text-sm transition-colors"
            >
              Explore Supported Accommodation
              <Icons.ArrowRight />
            </Link>
          </div>

          <div className="order-1 md:order-2">
            <div data-reveal className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#3820A0] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1760992003987-efc5259bcfbf?w=700&h=875&fit=crop&auto=format"
                alt="Elderly woman in wheelchair outdoors with support worker"
                width={700}
                height={875}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Who We Help ─────────────────────────────────────────────────────────────

const audiences = [
  {
    label: 'Children & Early Intervention',
    icon: '👶',
    services: ['Speech Pathology', 'Occupational Therapy', 'Physiotherapy', 'Early Intervention'],
    desc: 'Specialist early support helping children develop the skills and confidence to thrive at home, school and in the community.',
  },
  {
    label: 'Adults',
    icon: '🧑',
    services: ['Physiotherapy', 'Occupational Therapy', 'Speech Pathology', 'Podiatry'],
    desc: 'Flexible allied health services for adults managing injury, chronic conditions, or looking to improve everyday function.',
  },
  {
    label: 'People Living with Disability',
    icon: '♿',
    services: ['NDIS Support', 'Supported Accommodation', 'Home & Community Care', 'Early Intervention'],
    desc: 'Person-centred NDIS registered services supporting independence, community participation and quality of life.',
  },
  {
    label: 'Older Australians',
    icon: '👴',
    services: ['Home & Community Care', 'Community Nursing', 'Podiatry', 'Physiotherapy'],
    desc: 'Compassionate in-home support helping older Australians live safely, comfortably and independently.',
  },
  {
    label: 'Hospital Discharge',
    icon: '🏥',
    services: ['Physiotherapy', 'Occupational Therapy', 'Community Nursing', 'Home & Community Care'],
    desc: 'Seamless transition support ensuring a safe, supported return home after hospital stay or surgery.',
  },
  {
    label: 'Veterans (DVA)',
    icon: '🎖️',
    services: ['Physiotherapy', 'Podiatry', 'Occupational Therapy', 'Community Nursing'],
    desc: 'Dedicated services for veterans and their families, with DVA-approved allied health and community support.',
  },
  {
    label: 'WorkCover / MV Claims',
    icon: '🔧',
    services: ['Physiotherapy', 'Occupational Therapy', 'Speech Pathology', 'Podiatry'],
    desc: 'Approved provider for WorkCover Queensland and motor vehicle insurance rehabilitation services.',
  },
  {
    label: 'Spinal / Brain / Stroke',
    icon: '🧠',
    services: ['Physiotherapy', 'Speech Pathology', 'Occupational Therapy', 'Community Nursing'],
    desc: 'Specialist rehabilitation and long-term support for people living with spinal cord injury, brain injury or stroke.',
  },
]

function WhoWeHelp({ onBook }: { onBook: () => void }) {
  const [active, setActive] = useState(0)

  return (
    <section id="who-we-help" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="text-center mb-12">
          <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Who We Help</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mb-4">Care designed around you.</h2>
          <p className="text-gray-500 text-lg">Select your situation to see relevant services.</p>
        </div>

        {/* Audience chips */}
        <div data-reveal className="flex flex-wrap gap-2 justify-center mb-10">
          {audiences.map((a, i) => (
            <button
              key={a.label}
              type="button"
              aria-pressed={active === i}
              aria-controls={`who-we-help-panel-${i}`}
              onClick={() => setActive(i)}
              className={`audience-chip px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                active === i
                  ? 'bg-[#27156F] text-white border-[#27156F]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#27156F] hover:text-[#27156F]'
              }`}
            >
              <span aria-hidden="true" className="mr-1.5">{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>

        {/* Detail panels: all are in the HTML (for search and AI crawlers); only the chosen one is shown. */}
        {audiences.map((a, i) => (
          <div
            key={a.label}
            id={`who-we-help-panel-${i}`}
            role="region"
            aria-label={a.label}
            hidden={active !== i}
            className={`${active === i ? 'fade-swap ' : ''}bg-[#FAFAF7] rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center`}
          >
            <div>
              <div aria-hidden="true" className="text-4xl mb-4">{a.icon}</div>
              <h3 className="font-display text-3xl font-bold text-[#1a1238] mb-4">{a.label}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{a.desc}</p>
              <button
                type="button"
                onClick={onBook}
                className="flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Book an Appointment
                <Icons.ArrowRight />
              </button>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-4">Relevant services</p>
              <ul className="space-y-3">
                {a.services.map(s => (
                  <li key={s} className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm">
                    <span className="text-[#27156F]"><Icons.Check /></span>
                    <span className="text-[#1a1238] font-medium text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Why Choose CHC ───────────────────────────────────────────────────────────

/**
 * Count-up phases. 'static' (server HTML, no JavaScript, reduced motion) shows the
 * real number; 'armed' shows 0 while the stats are still off-screen; 'running' counts up.
 */
type CountPhase = 'static' | 'armed' | 'running'

function useCountUp(target: number, duration: number, running: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!running) return
    let frame = 0
    let startTime: number | undefined
    const step = (timestamp: number) => {
      startTime ??= timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [running, target, duration])
  return count
}

// A fixed locale so the server-rendered HTML and the browser agree (10,000, not 10.000).
const formatNumber = (n: number) => n.toLocaleString('en-AU')

const stats = [
  // Confirmed by the business (Nov 2026). A client count was not confirmed, so it isn't shown.
  { value: 30, suffix: '+', label: 'Clinicians' },
  { value: 50, suffix: '+', label: 'Support Workers & Carers' },
  { value: 3, suffix: '', label: 'Clinics in SEQ' },
  { value: 5, suffix: '', label: 'States Served' },
]

const differentiators = [
  'Multidisciplinary healthcare team',
  'Mobile and clinic appointments',
  'Telehealth services available',
  'NDIS registered provider',
  'Person-centred support',
  'Multiple Queensland locations',
]

function StatItem({ value, suffix, label, phase }: { value: number; suffix: string; label: string; phase: CountPhase }) {
  const count = useCountUp(value, 1600, phase === 'running')
  const shown = phase === 'static' ? value : count
  return (
    <div className="text-center p-6">
      <div aria-hidden="true" className="font-display text-5xl md:text-6xl font-bold text-[#27156F] mb-2 tabular-nums">
        {formatNumber(shown)}{suffix}
      </div>
      <div className="text-gray-500 font-medium">
        <span className="sr-only">{formatNumber(value)}{suffix} </span>{label}
      </div>
    </div>
  )
}

function WhyChoose() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<CountPhase>('static')

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('running')
          observer.disconnect()
        } else {
          setPhase('armed')
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 md:py-28 bg-[#F0EDFF] relative overflow-hidden">
      <Arcs className="-right-64 top-1/3 w-[560px] h-[560px] text-[#27156F]/10" />
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="text-center mb-14">
          <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Why Choose CHC</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mb-4">
            Support that’s personal,<br />flexible and close to home.
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map(s => (
            <div key={s.label} data-reveal className="bg-white rounded-2xl shadow-sm border border-purple-100">
              <StatItem {...s} phase={phase} />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {differentiators.map(d => (
            <div key={d} data-reveal className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-purple-100 shadow-sm">
              <span className="w-6 h-6 rounded-full bg-[#27156F]/10 text-[#27156F] flex items-center justify-center flex-shrink-0">
                <Icons.Check />
              </span>
              <span className="text-[#1a1238] font-medium text-sm">{d}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/about-us/" className="inline-flex items-center gap-1.5 text-[#27156F] text-sm font-semibold hover:text-[#9e5c00] transition-colors">
            More about who we are<Icons.ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Funding Marquee ──────────────────────────────────────────────────────────

// Inline SVG logos for partners whose SVGs are blocked cross-origin
function LogoBulkBilling() {
  return (
    <svg width="160" height="110" viewBox="0 0 160 110" fill="none" role="img" aria-label="We are a Medicare Bulk Billing Practice">
      {/* Yellow border background */}
      <rect width="160" height="110" rx="4" fill="#F5C518" />
      {/* White inner */}
      <rect x="6" y="6" width="148" height="98" rx="2" fill="white" />
      {/* "We are a" */}
      <text x="12" y="30" fontFamily="Arial Black, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#0D4F2E">We are a</text>
      {/* Green Medicare bar */}
      <rect x="12" y="36" width="90" height="22" rx="2" fill="#007B3E" />
      <text x="57" y="52" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fontStyle="italic" fill="#F5C518">medicare</text>
      {/* Gold Bulk Billing Practice block */}
      <rect x="12" y="62" width="136" height="36" rx="2" fill="#F5C518" />
      <text x="80" y="77" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontSize="11" fontWeight="900" fill="#0D4F2E">Bulk Billing</text>
      <text x="80" y="91" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontSize="11" fontWeight="900" fill="#0D4F2E">Practice</text>
    </svg>
  )
}


function LogoCTP() {
  return (
    <svg width="130" height="50" viewBox="0 0 130 50" fill="none" role="img" aria-label="CTP Insurance">
      <text x="65" y="30" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontSize="26" fontWeight="900" fill="#6B3FA0">CTP</text>
      <text x="65" y="44" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="500" fill="#888" letterSpacing="1">Insurance</text>
    </svg>
  )
}

type FunderEntry =
  | { type: 'img'; name: string; url: string | StaticImageData; w: number }
  | { type: 'svg'; name: string; Logo: () => JSX.Element }

const funderLogos: FunderEntry[] = [
  {
    type: 'img',
    name: 'NDIS Registered Provider',
    url: 'https://completehealthcareconnect.com.au/wp-content/uploads/2023/09/2-2.png',
    w: 190,
  },
  {
    type: 'img',
    name: 'NIISQ Registered Provider',
    url: niisqLogo,
    w: 260,
  },
  { type: 'svg', name: 'Medicare Bulk Billing Practice', Logo: LogoBulkBilling },
  {
    type: 'img',
    name: 'WorkCover Queensland',
    url: 'https://completehealthcareconnect.com.au/wp-content/uploads/2023/09/workcover-queensland-1200px-logo-300x96.png',
    w: 160,
  },
  {
    type: 'img',
    name: 'DVA – Department of Veterans Affairs',
    url: 'https://completehealthcareconnect.com.au/wp-content/uploads/2023/09/dva-logo2.png',
    w: 140,
  },
  { type: 'svg', name: 'CTP Insurance', Logo: LogoCTP },
]

function FundingMarquee() {
  // The list is drawn twice so the marquee loops seamlessly; the copy is hidden from assistive technology.
  const doubled = [...funderLogos, ...funderLogos]
  return (
    <section id="funding" className="py-20 bg-white border-y border-gray-100">
      <div data-reveal className="max-w-7xl mx-auto px-6 text-center mb-10">
        <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Funding & Partnerships</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1238] mb-3">Funding & Partnerships</h2>
        <p className="text-gray-500 mb-4">Registered, approved and contracted across a range of funding schemes.</p>
        <Link to="/funding-schemes/" className="inline-flex items-center gap-1.5 text-[#27156F] text-sm font-semibold hover:text-[#9e5c00] transition-colors">
            How funding works<Icons.ArrowRight />
          </Link>
      </div>
      <div className="overflow-hidden relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10" style={{ background: 'linear-gradient(to left, white, transparent)' }} />
        <div className="flex items-center gap-14 marquee-track w-max py-4 px-8">
          {doubled.map((f, i) => (
            <div key={`${i}-${f.name}`} aria-hidden={i >= funderLogos.length ? true : undefined} className="flex-shrink-0 flex items-center justify-center h-20" title={f.name}>
              {f.type === 'img' ? (
                <Image src={f.url} alt={i >= funderLogos.length ? '' : f.name} width={f.w} height={64} sizes={`${f.w}px`} style={{ width: f.w, height: 'auto', maxHeight: 64, objectFit: 'contain' }} />
              ) : (
                <f.Logo />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Margaret T.',
    service: 'Home & Community Care',
    location: 'Logan', // MOCK suburb: confirm with the business
    text: "The team from CHC has been absolutely wonderful. They helped Mum regain her independence after her hip replacement. Genuinely caring, professional and always on time.",
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1773227059784-c1e36cc8c8c9?w=100&h=100&fit=crop&auto=format',
  },
  {
    name: 'James K.',
    service: 'Physiotherapy',
    location: 'Ipswich', // MOCK suburb
    text: "After my accident I thought I'd never be back to normal. The physio team at CHC were fantastic — patient, knowledgeable and really listened to what I needed.",
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1704475686860-ab71b444df6b?w=100&h=100&fit=crop&auto=format',
  },
  {
    name: 'Sarah L., Support Coordinator',
    service: 'NDIS / Supported Accommodation',
    location: 'North Lakes', // MOCK suburb
    text: "As a support coordinator I've worked with many providers. CHC stands out for their responsiveness, communication and genuine commitment to participants. Highly recommend.",
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=100&h=100&fit=crop&auto=format',
  },
]

/**
 * YouTube video shown as a thumbnail first, so no YouTube code or cookies load until the
 * visitor presses play (faster pages, privacy-friendly). Plays from youtube-nocookie.com.
 */
function VideoCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#1a1238] shadow-sm">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-0 bg-gradient-to-t from-[#1a1238]/70 to-transparent" />
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FF9D00] text-[#1a1238] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-7 h-7 ml-1" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <span className="absolute left-4 bottom-3 text-white text-sm font-semibold">Play video: {title}</span>
        </button>
      )}
    </div>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-20 md:py-28 bg-[#FAFAF7]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mb-12">Care that makes<br />a difference.</h2>

        {/* Every testimonial is in the HTML; only the chosen one is shown. */}
        {testimonials.map((t, ti) => (
        <figure key={t.name} hidden={active !== ti} data-reveal className={`${active === ti ? 'fade-swap ' : ''}bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-left relative`}>
          <div className="flex gap-1 mb-6" role="img" aria-label={`${t.stars} out of 5 stars`}>
            {Array.from({ length: t.stars }).map((_, i) => <Icons.Star key={i} />)}
          </div>
          <blockquote className="font-display text-xl md:text-2xl font-medium text-[#1a1238] leading-relaxed mb-8 italic">
            “{t.text}”
          </blockquote>
          <figcaption className="flex items-center gap-4">
            <Image
              src={t.avatar}
              alt=""
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-[#1a1238] text-sm">{t.name}</p>
              <p className="text-gray-600 text-xs">{t.service} · {t.location}</p>
            </div>
          </figcaption>
          <div aria-hidden="true" className="absolute top-8 right-8 text-[#27156F]/10 font-display text-8xl font-bold leading-none select-none">
            “
          </div>
        </figure>
        ))}

        <div className="flex gap-1 justify-center mt-5">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className="h-12 min-w-12 md:h-6 md:min-w-6 flex items-center justify-center"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              {/* 24px hit area around the small dot (WCAG 2.2 target size). */}
              <span aria-hidden="true" className={`block h-2.5 rounded-full transition-all ${active === i ? 'bg-[#27156F] w-8' : 'bg-gray-300 w-2.5'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Client video stories (shared with consent). */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <h3 className="font-display text-2xl font-bold text-[#1a1238] text-center mb-8">Hear it from our clients</h3>
        <ul className="grid md:grid-cols-3 gap-6">
          {videoTestimonials.map(v => <li key={v.id}><VideoCard id={v.id} title={v.title} /></li>)}
        </ul>
        <p className="text-center mt-6">
          <a href={social.find(x => x.label === 'YouTube')?.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27156F] underline underline-offset-4 hover:text-[#9e5c00]">
            More videos on our YouTube channel<span className="sr-only"> (opens in a new tab)</span> <Icons.ExternalLink />
          </a>
        </p>
      </div>
    </section>
  )
}

// ─── Referrals ────────────────────────────────────────────────────────────────

const referralAudiences = ['GPs', 'Hospitals', 'Case Managers', 'Support Coordinators', 'Insurers', 'Aged Care Providers']

function Referrals() {
  return (
    <section className="py-16 bg-[#27156F] relative overflow-hidden">
      <Arcs className="-left-56 -bottom-64 w-[560px] h-[560px] text-white/10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-[#FF9D00] text-sm font-semibold tracking-widest uppercase mb-3">Professional Referrals</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Referring a client?</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Make referrals simple with our dedicated healthcare team. We work closely with GPs, hospitals, case managers and support coordinators across Queensland.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {referralAudiences.map(a => (
                <span key={a} className="bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full border border-white/10">
                  {a}
                </span>
              ))}
            </div>
            <Link
              to="/referrals/"
              className="inline-flex items-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-8 py-4 rounded-xl text-base transition-colors shadow-lg shadow-orange-900/30"
            >
              Start a Referral
              <Icons.ArrowRight />
            </Link>
          </div>
          <div className="relative hidden md:block">
            <div className="rounded-3xl overflow-hidden aspect-video bg-[#3820A0]">
              <Image
                src="https://images.unsplash.com/photo-1764006145420-df3006edf060?w=700&h=400&fit=crop&auto=format"
                alt="Healthcare professional with patient in wheelchair"
                width={700}
                height={400}
                sizes="50vw"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Operational Forms ───────────────────────────────────────────────────────

const operationalForms = [
  {
    eyebrow: 'For participants & referrers',
    title: 'Submit NDIS Participant Referral',
    description: 'Refer an NDIS participant to CHC for allied health, disability support, accommodation or in-home care services.',
    href: 'https://completehealthcareconnect.com.au/ndis-referral-form/',
    action: 'Open participant referral form',
  },
  {
    eyebrow: 'For new & existing clients',
    title: 'NDIS Client Service Agreement',
    description: 'Complete the NDIS service agreement with participant details, support requirements, goals and selected CHC services.',
    href: 'https://completehealthcareconnect.com.au/ndis-service-agreement/',
    action: 'Open service agreement',
  },
]

function OperationalForms() {
  return (
    <section id="ndis-forms" className="py-20 md:py-28 bg-[#F0EDFF]">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="max-w-3xl mb-10">
          <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">NDIS Forms</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mb-4">Start your support online.</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our two essential NDIS forms are available here whenever you need them. Each secure form opens in a new tab so your progress is not interrupted.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {operationalForms.map((form, index) => (
            <article key={form.title} data-reveal className="bg-white rounded-3xl p-7 md:p-9 border border-purple-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="w-12 h-12 rounded-2xl bg-[#27156F] text-white font-display font-bold flex items-center justify-center">
                  0{index + 1}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#27156F] bg-[#27156F]/6 px-3 py-1.5 rounded-full">
                  <span aria-hidden="true" className="w-2 h-2 rounded-full bg-green-500" />
                  Secure online form
                </span>
              </div>
              <p className="eyebrow text-[#9e5c00] text-xs font-semibold tracking-widest uppercase mb-2">{form.eyebrow}</p>
              <h3 className="font-display text-2xl font-bold text-[#1a1238] mb-3">{form.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-8 flex-1">{form.description}</p>
              <a
                href={form.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-6 py-4 rounded-xl transition-colors"
              >
                <span>{form.action}<span className="sr-only"> (opens in a new tab)</span></span>
                <Icons.ExternalLink />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Locations ────────────────────────────────────────────────────────────────

// Brisbane lists the three clinics. There are no clinics in other states (business
// answer, Nov 2026): CHC provides in-home support and telehealth there.
type LocationItem = { name: string; area: string; to?: string }
const telehealth: LocationItem = { name: 'Telehealth', area: 'OT, speech pathology & medical consults' }

const locations: {
  name: string
  subtitle: string
  address: string
  services: string[]
  list: { eyebrow: string; title: string; note: string; items: LocationItem[] }
}[] = [
  {
    name: 'South East Queensland',
    subtitle: 'Brisbane Clinics',
    address: 'Logan Central · Booval (Ipswich) · North Lakes',
    services: ['Allied Health', 'NDIS', 'Home Care', 'Early Intervention'],
    list: {
      eyebrow: 'Visit us in Brisbane',
      title: 'Our three clinics',
      note: 'Clinic and mobile appointments available',
      items: [
        { name: 'Logan Central', area: 'Brisbane South', to: '/locations/logan-central/' },
        { name: 'Booval', area: 'Ipswich', to: '/locations/booval/' },
        { name: 'North Lakes', area: 'Brisbane North', to: '/locations/north-lakes/' },
      ],
    },
  },
  {
    name: 'Sydney',
    subtitle: 'New South Wales',
    address: 'Greater Sydney region',
    services: ['In-home support', 'NDIS', 'Telehealth'],
    list: {
      eyebrow: 'Serving New South Wales',
      title: 'Where we support you',
      note: 'No clinic here: in-home support and telehealth',
      items: [{ name: 'Sydney', area: 'Home & community services' }, { name: 'Greater Sydney', area: 'Home & community services' }, telehealth],
    },
  },
  {
    name: 'Melbourne',
    subtitle: 'Victoria',
    address: 'Greater Melbourne region',
    services: ['In-home support', 'NDIS', 'Telehealth'],
    list: {
      eyebrow: 'Serving Victoria',
      title: 'Where we support you',
      note: 'No clinic here: in-home support and telehealth',
      items: [{ name: 'Melbourne', area: 'Home & community services' }, { name: 'Greater Melbourne', area: 'Home & community services' }, telehealth],
    },
  },
  {
    name: 'Adelaide',
    subtitle: 'South Australia',
    address: 'Greater Adelaide region',
    services: ['In-home support', 'NDIS', 'Telehealth'],
    list: {
      eyebrow: 'Serving South Australia',
      title: 'Where we support you',
      note: 'No clinic here: in-home support and telehealth',
      items: [{ name: 'Adelaide', area: 'Home & community services' }, { name: 'Surrounding suburbs', area: 'Home & community services' }, telehealth],
    },
  },
  {
    name: 'Perth',
    subtitle: 'Western Australia',
    address: 'Greater Perth region',
    services: ['In-home support', 'NDIS', 'Telehealth'],
    list: {
      eyebrow: 'Serving Western Australia',
      title: 'Where we support you',
      note: 'No clinic here: in-home support and telehealth',
      items: [{ name: 'Perth', area: 'Home & community services' }, { name: 'Surrounding suburbs', area: 'Home & community services' }, telehealth],
    },
  },
  {
    name: 'Townsville',
    subtitle: 'North Queensland',
    address: 'Townsville & surrounds',
    services: ['In-home support', 'NDIS', 'Telehealth'],
    list: {
      eyebrow: 'Serving North Queensland',
      title: 'Where we support you',
      note: 'No clinic here: in-home support and telehealth',
      items: [{ name: 'Townsville', area: 'Home & community services' }, { name: 'Cairns', area: 'Home & community services' }, telehealth],
    },
  },
]

const LOCATION_INTERVAL_MS = 6000

/**
 * City tabs with an auto-advancing card, as in the design. The rotation pauses while
 * the pointer or keyboard focus is inside the section or it is scrolled out of view,
 * restarts its 6s count after a manual choice, and is off for people who prefer
 * reduced motion. Arrow keys, Home and End move between the tabs.
 */
export function Locations({ onBook, initialIndex = 0 }: { onBook: () => void; initialIndex?: number }) {
  const [active, setActive] = useState(initialIndex)
  const [holding, setHolding] = useState(false)
  const [sectionRef, inView] = useInView<HTMLElement>()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const count = locations.length

  useEffect(() => {
    if (holding || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // `active` is a dependency so a manual choice restarts the full interval.
    const timer = window.setTimeout(() => setActive(current => (current + 1) % count), LOCATION_INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [active, holding, inView, count])

  const show = (index: number) => setActive(((index % count) + count) % count)
  const showPrevious = () => show(active - 1)
  const showNext = () => show(active + 1)

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const target =
      e.key === 'ArrowRight' ? active + 1 :
      e.key === 'ArrowLeft' ? active - 1 :
      e.key === 'Home' ? 0 :
      e.key === 'End' ? count - 1 : null
    if (target === null) return
    e.preventDefault()
    const index = ((target % count) + count) % count
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  return (
    <section
      ref={sectionRef}
      id="locations"
      aria-labelledby="locations-title"
      className="py-20 md:py-28 bg-white"
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHolding(false) }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal className="text-center mb-12">
          <p className="eyebrow text-[#9e5c00] text-sm font-semibold tracking-widest uppercase mb-3">Our Locations</p>
          <h2 id="locations-title" className="font-display text-4xl md:text-5xl font-bold text-[#1a1238] mb-4">Our services across Australia.</h2>
          <p className="text-gray-500 text-lg">Choose a city to explore the services available in your area.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-6" role="tablist" aria-label="Service locations">
          {locations.map((item, index) => (
            <button
              key={item.name}
              ref={el => { tabRefs.current[index] = el }}
              type="button"
              role="tab"
              id={`location-tab-${index}`}
              aria-selected={active === index}
              aria-controls={`location-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => show(index)}
              onKeyDown={onTabKey}
              className={`flex-shrink-0 px-5 py-3 rounded-full text-sm font-semibold border transition-colors ${
                active === index
                  ? 'bg-[#27156F] border-[#27156F] text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-[#27156F] hover:text-[#27156F]'
              }`}
            >
              {item.name === 'South East Queensland' ? 'Brisbane' : item.name}
            </button>
          ))}
        </div>

        {locations.map((location, li) => (
        <div key={location.name} id={`location-panel-${li}`} role="tabpanel" aria-labelledby={`location-tab-${li}`} hidden={active !== li}>
          <div className="bg-[#27156F] text-white rounded-3xl p-7 md:p-10 overflow-hidden relative">
            <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF9D00]/10 translate-x-1/3 -translate-y-1/3" />
            <div className={`${active === li ? 'fade-swap ' : ''}relative grid lg:grid-cols-[1fr_auto] gap-8 items-start`}>
              <div>
                <div aria-hidden="true" className="w-11 h-11 rounded-xl bg-white/15 text-white flex items-center justify-center mb-5">
                  <Icons.MapPin />
                </div>
                <p className="eyebrow text-[#FF9D00] text-xs font-semibold uppercase tracking-widest mb-2">{location.subtitle}</p>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">{location.name}</h3>
                <p className="text-white/70 mb-5">{location.address}</p>
                <ul className="flex flex-wrap gap-2" aria-label={`Services in ${location.name}`}>
                  {location.services.map(service => (
                    <li key={service} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/12 text-white">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex lg:flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={onBook}
                  className="bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap"
                >
                  Book an Appointment
                </button>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={showPrevious} aria-label="Previous city" className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="rotate-180"><Icons.ArrowRight /></span>
                  </button>
                  <span className="text-white/60 text-xs font-semibold px-1">{li + 1} / {count}</span>
                  <button type="button" onClick={showNext} aria-label="Next city" className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Icons.ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <p className="eyebrow text-[#9e5c00] text-xs font-semibold uppercase tracking-widest mb-1">{location.list.eyebrow}</p>
                <h3 className="font-display text-2xl font-bold text-[#1a1238]">{location.list.title}</h3>
              </div>
              <p className="hidden md:block text-gray-500 text-sm">{location.list.note}</p>
            </div>
            <ul className="grid md:grid-cols-3 gap-4">
              {location.list.items.map((item, index) => (
                <li key={item.name} className="rounded-2xl border border-gray-100 bg-[#FAFAF7] p-5 flex items-center gap-4">
                  <span aria-hidden="true" className="w-10 h-10 rounded-xl bg-[#27156F]/8 text-[#27156F] flex items-center justify-center font-display font-bold text-sm">
                    0{index + 1}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-[#1a1238]">{item.to ? <Link to={item.to} className="hover:underline">{item.name}</Link> : item.name}</h4>
                    <p className="text-gray-500 text-sm">{item.area}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        ))}
        <div className="mt-8">
          <Link to="/locations/" className="inline-flex items-center gap-1.5 text-[#27156F] text-sm font-semibold hover:text-[#9e5c00] transition-colors">
            All clinic addresses and directions<Icons.ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}


// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA({ onBook, onChat }: { onBook: () => void; onChat: () => void }) {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAF7] relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-40">
        <div style={{
          background: 'radial-gradient(ellipse at 20% 50%, #EEE9FF 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #FFF4E0 0%, transparent 50%)',
          width: '100%', height: '100%',
        }} />
      </div>
      <div data-reveal className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-[#1a1238] mb-5 leading-tight">
          Ready to get started?
        </h2>
        <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you know the service you need or simply want to talk through your options, our team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onBook}
            className="flex items-center justify-center gap-2 bg-[#FF9D00] hover:bg-[#e88e00] text-[#1a1238] font-semibold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02]"
          >
            Book an Appointment
            <Icons.ArrowRight />
          </button>
          <button
            type="button"
            onClick={onChat}
            className="flex items-center justify-center gap-2 border-2 border-[#27156F] text-[#27156F] hover:bg-[#27156F] hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition-all"
          >
            <Icons.Chat />
            Chat with Our Team
          </button>
          <Link
            to="/referrals/"
            className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-[#27156F] hover:text-[#27156F] font-semibold px-8 py-4 rounded-xl text-base transition-all"
          >
            Refer a Client
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { openBook, openChat } = useSiteUi()
  return (
    <>
      <Hero onBook={openBook} onChat={openChat} />
      <ServicesRibbon />
      <Services onChat={openChat} />
      <HomeCare />
      <Accommodation />
      <WhoWeHelp onBook={openBook} />
      <WhyChoose />
      <FundingMarquee />
      <Testimonials />
      <Referrals />
      <OperationalForms />
      <Locations onBook={openBook} />
      <FinalCTA onBook={openBook} onChat={openChat} />
    </>
  )
}
