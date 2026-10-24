import Image from 'next/image'
import chcMark from '@/assets/chc-mark.png'

// The CHC lockup: the supplied mark in a white disc beside the stacked wordmark.
export default function Logo({ size = 40, light = false, preload = false }: { size?: number; light?: boolean; preload?: boolean }) {
  const headingColor = light ? 'white' : '#27156F'
  return (
    <span className="flex items-center gap-2.5">
      <span
        style={{
          width: size, height: size, borderRadius: '50%', background: 'white', display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: size * 0.08, flexShrink: 0,
        }}
      >
        <Image src={chcMark} alt="" width={size} height={size} preload={preload} sizes={`${size}px`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </span>
      <span style={{ lineHeight: 1.2 }} className="block">
        <span className="sr-only">Complete Healthcare Connect</span>
        <span aria-hidden="true" style={{ display: 'block', fontSize: size * 0.26, fontWeight: 700, color: headingColor }}>Complete</span>
        <span aria-hidden="true" style={{ display: 'block', fontSize: size * 0.26, fontWeight: 700, color: headingColor }}>Healthcare</span>
        <span aria-hidden="true" style={{ display: 'block', fontSize: size * 0.22, fontWeight: 700, color: '#FF9D00', letterSpacing: '0.03em' }}>Connect</span>
      </span>
    </span>
  )
}
