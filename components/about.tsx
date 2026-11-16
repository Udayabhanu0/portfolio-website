'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ProfileImage } from './profile-modal'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { GlowCard } from './glow-card'
import { aboutParagraphs, impact, profile } from '@/lib/profile'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" aria-hidden />
      <div className="mx-auto max-w-6xl" ref={ref}>
        <SectionHeading
          tag="ABOUT"
          title={
            <>
              Engineer at the edge of <span className="text-gradient-cyan">backend &amp; AI</span>.
            </>
          }
          subtitle="Scalable systems, LLM pipelines and real-time products — built to hold up in production."
        />

        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          <Reveal>
            <motion.div style={{ y: imgY }}>
              <GlowCard className="p-5">
                <ProfileImage
                  imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Udayabhanu%20aich-9ekLvu1Thze2RDQoHXedcdMLNowa1T.jpg"
                  altText="Portrait of Udayabhanu Aich"
                  name={profile.name}
                  className="aspect-[4/5] w-full !mb-4 overflow-hidden rounded-xl border border-white/10"
                  imgClassName="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="space-y-2 border-t border-white/10 pt-4 font-mono text-xs">
                  <p className="text-base font-bold text-white font-sans">{profile.name}</p>
                  <p className="text-slate-400">Software Engineer @ <span className="text-slate-200">SmallDay® IT Services</span></p>
                  <p className="text-slate-500">{profile.location}</p>
                </div>
              </GlowCard>
            </motion.div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                {aboutParagraphs.map((p, i) => (
                  <p key={i} className={i > 0 ? 'text-slate-400' : ''}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <GlowCard className="p-5 font-mono text-[13px] leading-relaxed">
                <p><span className="tok-kw">const</span> <span className="tok-fn">education</span> <span className="text-slate-500">=</span> <span className="text-slate-500">[</span></p>
                <p className="pl-5"><span className="tok-str">&quot;MCA — IGIT Sarang (2021–2023)&quot;</span><span className="text-slate-500">,</span></p>
                <p className="pl-5"><span className="tok-str">&quot;Bachelor’s, Chemistry — Utkal University&quot;</span></p>
                <p><span className="text-slate-500">]</span></p>
              </GlowCard>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {impact.map((s) => (
                  <GlowCard key={s.label} className="p-4">
                    <dt className="text-3xl font-extrabold text-cyan-400 sm:text-4xl">{s.value}</dt>
                    <dd className="mt-1 font-mono text-xs font-semibold text-white">{s.label}</dd>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{s.detail}</p>
                  </GlowCard>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
