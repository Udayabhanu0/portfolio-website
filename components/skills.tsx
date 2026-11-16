'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { GlowCard } from './glow-card'
import { skillGroups } from '@/lib/profile'

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].key)
  const group = skillGroups.find((g) => g.key === active) ?? skillGroups[0]
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0)

  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="SKILLS"
          title={
            <>
              The <span className="text-gradient-cyan">stack</span> I ship with.
            </>
          }
          subtitle={`${total} skills across Claude & AI, backend, frontend, cloud and engineering practice.`}
        />

        <Reveal>
          <GlowCard className="p-0">
            <div className="flex flex-wrap gap-1 border-b border-white/10 bg-white/[0.02] p-2" role="tablist" aria-label="Skill categories">
              {skillGroups.map((g) => {
                const on = g.key === active
                return (
                  <button
                    key={g.key}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(g.key)}
                    className={`relative rounded-lg px-3.5 py-2 font-mono text-xs transition-colors ${on ? 'text-cyan-200' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    {on && <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-lg border border-cyan-400/30 bg-cyan-400/10" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <span className="relative">{g.file}</span>
                  </button>
                )
              })}
            </div>

            <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_2fr]" role="tabpanel">
              <div>
                <p className="code-comment text-xs">{`// ${group.file}`}</p>
                <h3 className="mt-2 text-2xl font-bold text-white">{group.title}</h3>
                <p className="mt-2 font-mono text-xs text-slate-500">{group.skills.length} items</p>
              </div>
              <motion.ul key={group.key} className="flex flex-wrap content-start gap-2" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.03 } } }}>
                {group.skills.map((s) => (
                  <motion.li
                    key={s}
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                    className="tech-tag !text-[13px] !px-3 !py-1.5"
                  >
                    {s}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  )
}
