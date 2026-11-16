'use client'

import { ArrowUpRight, Award, BadgeCheck, GraduationCap, Mic2 } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { GlowCard } from './glow-card'
import { certs, community, education } from '@/lib/profile'

export function Certifications() {
  const featured = certs.filter((c) => c.featured || c.url)
  const rest = certs.filter((c) => !c.featured && !c.url)

  return (
    <section id="certifications" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" aria-hidden />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="CREDENTIALS"
          title={
            <>
              Validated <span className="text-gradient-cyan">expertise</span>.
            </>
          }
          subtitle={`${certs.length} certifications from Anthropic and AWS, plus formal education in computer science.`}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((c, i) => {
            const isAws = c.issuer.includes('Amazon') || c.issuer.includes('AWS')
            return (
              <Reveal key={c.title} delay={0.05 * i}>
                <GlowCard as="a" href={c.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-xl border ${isAws ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-cyan-400/30 bg-cyan-500/10 text-cyan-300'}`}>
                      <Award className="h-6 w-6" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified on Credly
                    </span>
                  </div>
                  <p className="mt-6 font-mono text-xs uppercase tracking-wider text-slate-400">{c.issuer}</p>
                  <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{c.title}</h3>
                  {c.description && <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.description}</p>}
                  {c.skills && (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {c.skills.map((s) => <li key={s} className="tech-tag">{s}</li>)}
                    </ul>
                  )}
                  <dl className="mt-auto flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-white/10 pt-5 font-mono text-xs">
                    <div><dt className="text-slate-500">Issued</dt><dd className="mt-0.5 text-slate-200">{c.issued}</dd></div>
                    {c.expires && <div><dt className="text-slate-500">Expires</dt><dd className="mt-0.5 text-slate-200">{c.expires}</dd></div>}
                    {c.score && <div><dt className="text-slate-500">Score</dt><dd className="mt-0.5 text-cyan-300">{c.score}</dd></div>}
                    {c.credentialId && <div><dt className="text-slate-500">Credential ID</dt><dd className="mt-0.5 text-slate-200">{c.credentialId}</dd></div>}
                    <span className="ml-auto inline-flex items-center gap-1 text-cyan-300 transition-transform group-hover:translate-x-0.5">View credential <ArrowUpRight className="h-4 w-4" /></span>
                  </dl>
                </GlowCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-5">
          <p className="code-comment mb-3 text-xs">{'// anthropic learning paths'}</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c) => (
              <GlowCard as="li" key={c.title} className="p-4">
                <p className="font-mono text-[11px] text-slate-500">{c.issuer} · {c.issued}</p>
                <p className="mt-1 text-sm font-semibold text-white">{c.title}</p>
                {c.credentialId && <p className="mt-2 font-mono text-[11px] text-slate-500">ID {c.credentialId}</p>}
              </GlowCard>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="code-comment mb-3 text-xs">{'// education'}</p>
            <div className="grid gap-4">
              {education.map((e) => (
                <GlowCard key={e.degree + e.school} className="flex gap-4 p-5 sm:p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-300"><GraduationCap className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-bold text-white">{e.degree} · {e.field}</h3>
                    <p className="text-sm text-slate-300">{e.school}</p>
                    <p className="mt-1 font-mono text-xs text-slate-500">{e.period}</p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="code-comment mb-3 text-xs">{'// community'}</p>
            <div className="grid gap-4">
              {community.map((c) => (
                <GlowCard key={c.title} className="flex gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"><Mic2 className="h-5 w-5" /></span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{c.detail}</p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
