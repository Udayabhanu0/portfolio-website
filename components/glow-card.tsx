'use client'

import type { CSSProperties, MouseEvent, ReactNode } from 'react'

/** Card with a pointer-tracking spotlight and edge highlight (see .glow-card in globals.css). */
export function GlowCard({
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'a' | 'article' | 'li'
  href?: string
  target?: string
  rel?: string
}) {
  function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const Comp = Tag as any
  return (
    <Comp
      onMouseMove={onMove}
      className={`glow-card relative overflow-hidden rounded-2xl ${className}`}
      style={{ '--mx': '50%', '--my': '50%' } as CSSProperties}
      {...rest}
    >
      {children}
    </Comp>
  )
}
