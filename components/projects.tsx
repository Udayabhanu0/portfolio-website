'use client'

import { ArrowUpRight, Github, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { GlowCard } from './glow-card'
import { builds, profile } from '@/lib/profile'

interface Project {
  id: number
  repo_id: number
  repo_name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: string | null
  is_visible: boolean
  is_featured: boolean
  sort_order: number
}

const flagships = builds.slice(0, 3)

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/admin/projects')
        const data = await response.json()
        if (Array.isArray(data)) {
          setProjects(
            data
              .filter((p: Project) => p.is_visible && p.description && p.description.trim().length > 0)
              .sort((a: Project, b: Project) =>
                a.is_featured !== b.is_featured ? (a.is_featured ? -1 : 1) : b.stars - a.stars,
              ),
          )
        }
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="PROJECTS"
          title={
            <>
              Featured <span className="text-gradient-cyan">systems</span>.
            </>
          }
          subtitle="Production platforms and open-source builds — AI pipelines, real-time services and developer tools."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {flagships.map((b, i) => (
            <Reveal key={b.id} delay={0.06 * i}>
              <GlowCard className="flex h-full flex-col p-6">
                <p className="font-mono text-[11px] text-cyan-300">{String(i + 1).padStart(2, '0')} / {b.period}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{b.name}</h3>
                <p className="text-sm text-slate-400">{b.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{b.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {b.tech.slice(0, 7).map((t) => (
                    <li key={t} className="tech-tag">{t}</li>
                  ))}
                </ul>
                {b.href && (
                  <a
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-xs text-cyan-300 hover:text-cyan-200"
                  >
                    <Github className="h-4 w-4" /> source on GitHub <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Reveal>
            <p className="code-comment mb-4 text-xs">{'// github repositories'}</p>
          </Reveal>

          {loading ? (
            <div className="grid gap-3" role="status" aria-label="Loading repositories">
              {[0, 1].map((i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/[0.03]" />)}
            </div>
          ) : projects.length === 0 ? (
            <Reveal>
              <GlowCard className="p-8 text-center">
                <p className="text-lg font-semibold text-white">More on GitHub</p>
                <p className="mt-1 text-sm text-slate-400">Browse every repository and open-source build.</p>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-400 px-5 py-3 text-sm font-semibold text-black">
                  <Github className="h-4 w-4" /> github.com/Manish10000
                </a>
              </GlowCard>
            </Reveal>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 0.05}>
                  <GlowCard as="a" href={p.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-mono text-base font-semibold text-white">{p.repo_name}</h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
                    <div className="mt-4 flex items-center gap-3 font-mono text-xs text-slate-400">
                      {p.language && <span className="tech-tag">{p.language}</span>}
                      <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" aria-hidden /> {p.stars}<span className="sr-only"> stars</span></span>
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
            </ul>
          )}

          {!loading && projects.length > 0 && (
            <Reveal className="mt-8">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="glass-card-hover inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-slate-200">
                <Github className="h-4 w-4 text-cyan-400" /> View more on GitHub
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
