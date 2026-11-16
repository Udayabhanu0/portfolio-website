import type { ReactNode } from 'react'
import { Reveal } from './reveal'

export function SectionHeading({
  tag,
  title,
  subtitle,
  children,
  align = 'left',
}: {
  tag?: string
  title?: ReactNode
  subtitle?: string
  children?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={`mb-12 sm:mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      {tag && (
        <div className={`mb-3 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-cyan-300">
            <span className="text-cyan-500/70">$</span>
            {tag.toLowerCase().replace(/&amp;/g, '&').replace(/ /g, '_')}
            <span className="caret !h-3 !w-1.5" />
          </span>
        </div>
      )}

      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title || children}
      </h2>

      {subtitle && (
        <p className={`mt-3 max-w-2xl text-base text-slate-400 sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
