'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import type { AnchorHTMLAttributes } from 'react'

/** "/about-us" → "/about-us/", "/" → "/". Query and hash are dropped. */
export function normalisePath(pathname: string): string {
  let p = pathname.split('#')[0].split('?')[0] || '/'
  if (!p.startsWith('/')) p = '/' + p
  if (p !== '/' && !p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p += '/'
  return p
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }

/**
 * Site link. Internal paths use next/link (prefetching, client-side navigation) and
 * get aria-current="page" when they point at the current page; anything else
 * (external URLs, mailto:, tel:) renders a plain <a>.
 */
export default function Link({ to, children, ...rest }: LinkProps) {
  const pathname = usePathname()
  const isInternal = to.startsWith('/') && !to.startsWith('//')

  if (!isInternal) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    )
  }

  const current = !to.includes('#') && normalisePath(to) === normalisePath(pathname ?? '/')
  return (
    <NextLink href={to} aria-current={current ? 'page' : undefined} {...rest}>
      {children}
    </NextLink>
  )
}
