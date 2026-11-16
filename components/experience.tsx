'use client'

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, ChevronDown, GitCommitHorizontal } from 'lucide-react'
import { useRef, useState } from 'react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { GlowCard } from './glow-card'
import { builds, role } from '@/lib/profile'

export function Experience() {
  const [open, setOpen] = useState<string | null>('codexpro')
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <section id="experience" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          tag="EXPERIENCE"
          title={
            <>
              Where I&apos;ve <span className="text-gradient-cyan">shipped</span>.
            </>
          }
          subtitle="Professional role and the products I build — at work and on the side."
        />

        <div ref={ref} className="relative pl-6 sm:pl-10">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-white/10 sm:left-[15px]" aria-hidden />
          <motion.div className="absolute left-[7px] top-2 w-px origin-top bg-gradient-to-b from-cyan-400 to-indigo-400 sm:left-[15px]" style={{ scaleY: line, bottom: 0 }} aria-hidden />

          {/* Current role */}
          <Reveal>
            <div className="relative mb-10">
              <span className="absolute -left-6 top-6 grid h-4 w-4 place-items-center rounded-full border border-cyan-400 bg-background sm:-left-10 sm:h-8 sm:w-8">
                <Briefcase className="hidden h-4 w-4 text-cyan-300 sm:block" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 sm:hidden" />
              </span>
              <GlowCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="code-comment text-xs">{'// current role'}</p>
                    <h3 className="mt-1 text-2xl font-bold text-white">{role.title}</h3>
                    <p className="text-cyan-300">{role.company} <span className="text-slate-500">· {role.type}</span></p>
                  </div>
                  <div className="text-right font-mono text-xs text-slate-400">
                    <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                      <span className="pulse-emerald h-1.5 w-1.5 rounded-full bg-emerald-400" /> {role.period}
                    </p>
                    <p className="mt-2">{role.location} · {role.mode}</p>
                  </div>
                </div>

                <ul className="mt-6 grid gap-3">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                      <span className="mt-1 font-mono text-cyan-400">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {role.tech.map((t) => <li key={t} className="tech-tag">{t}</li>)}
                </ul>
              </GlowCard>
            </div>
          </Reveal>

          <p className="code-comment mb-4 text-xs">{'// products & projects'}</p>

          {builds.map((b, i) => {
            const isOpen = open === b.id
            return (
              <Reveal key={b.id} delay={0.04 * i}>
                <div className="relative mb-4">
                  <span className="absolute -left-6 top-6 text-cyan-400 sm:-left-10 sm:top-5" aria-hidden>
                    <GitCommitHorizontal className="h-4 w-4 sm:h-8 sm:w-8" />
                  </span>
                  <GlowCard className="p-0">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : b.id)}
                      aria-expanded={isOpen}
                      aria-controls={`b-${b.id}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                    >
                      <span>
                        <span className="block font-mono text-[11px] text-slate-500">{b.period}</span>
                        <span className="mt-1 block text-lg font-bold text-white sm:text-xl">{b.name}</span>
                        <span className="block text-sm text-slate-400">{b.tagline}</span>
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`b-${b.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/10 p-5 sm:p-6">
                            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{b.summary}</p>
                            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                              {b.points.map((p) => (
                                <div key={p.title}>
                                  <dt className="font-mono text-xs font-semibold text-cyan-300">{p.title}</dt>
                                  <dd className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</dd>
                                </div>
                              ))}
                            </dl>
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {b.tech.map((t) => <li key={t} className="tech-tag">{t}</li>)}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlowCard>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
