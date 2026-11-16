'use client'

import { ArrowUpRight, Bot, Code2, ExternalLink, Eye, GitFork, Github, Sparkles, Star, Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

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

// Fallback high-impact projects for when DB is loading or empty
const fallbackProjects: Project[] = [
  {
    id: 101,
    repo_id: 1001,
    repo_name: 'CodeXPro-Assessment-Engine',
    description: 'Enterprise AI-driven online assessment platform with automated JD parsing, Gemini question generation, and real-time proctoring.',
    url: 'https://github.com/Manish10000',
    stars: 12,
    forks: 4,
    language: 'Python',
    is_visible: true,
    is_featured: true,
    sort_order: 1,
  },
  {
    id: 102,
    repo_id: 1002,
    repo_name: 'Call2Order-Voice-Assistant',
    description: 'Real-time two-way AI phone assistant using Twilio Voice API, Gemini 2.5 Flash, WebSockets, and live audio transcription streaming.',
    url: 'https://github.com/Manish10000',
    stars: 8,
    forks: 2,
    language: 'Python',
    is_visible: true,
    is_featured: true,
    sort_order: 2,
  },
  {
    id: 103,
    repo_id: 1003,
    repo_name: 'RAG-FastAPI-Bedrock',
    description: 'High-throughput Retrieval-Augmented Generation pipeline leveraging FAISS vector indices, AWS Bedrock embeddings, and async FastAPI endpoints.',
    url: 'https://github.com/Manish10000',
    stars: 15,
    forks: 5,
    language: 'Python',
    is_visible: true,
    is_featured: true,
    sort_order: 3,
  },
  {
    id: 104,
    repo_id: 1004,
    repo_name: 'ai-portfolio-platform',
    description: 'Next.js 16 full-stack portfolio with Neon PostgreSQL auto-sync, admin management portal, and real-time GitHub stats integration.',
    url: 'https://github.com/Udayabhanu0/portfolio-website',
    stars: 7,
    forks: 3,
    language: 'TypeScript',
    is_visible: true,
    is_featured: false,
    sort_order: 4,
  },
]

const flagshipSystems = [
  {
    title: 'Code{X}Pro — AI Assessment & Proctoring Platform',
    badge: 'Enterprise Production System',
    role: 'Lead Architecture & Backend Development',
    company: 'SmallDay IT Services',
    description:
      'Engineered an end-to-end assessment platform that converts arbitrary Job Descriptions into evaluated technical exams. Implemented JD parsing with Gemini API, question generation, and a real-time computer vision proctoring engine with face recognition and gaze anomaly detection.',
    architecture: [
      'JD Parsing & Competency Mapping (Gemini 2.5 Flash)',
      'TensorFlow Vision Engine (Face & Gaze Deviation)',
      'Real-Time WebSocket & SSE Proctoring Stream',
      'Automated Code-Diff Evaluation (Python difflib)',
      'Razorpay Payment Gateway & Webhook Handlers',
    ],
    tech: ['Python', 'FastAPI', 'Django', 'TensorFlow', 'PostgreSQL', 'WebSockets', 'Razorpay', 'Docker'],
  },
  {
    title: 'Call2Order — AI Voice Phone Assistant',
    badge: 'Real-Time Voice Architecture',
    role: 'Lead Engineer',
    company: 'SmallDay IT Services',
    description:
      'Architected a low-latency two-way voice assistant over telephone lines. Integrates Twilio Voice streams with Google Gemini 2.5 Flash for multi-turn conversational dialogue, live speech-to-text, context tracking, and real-time audio playback.',
    architecture: [
      'Twilio Media Streams over Bi-directional WebSockets',
      'Gemini 2.5 Flash Audio Streaming & Intent Classification',
      'Real-time Speech Synthesis & Low Latency Buffer (<250ms)',
      'Stateful Multi-Turn Conversation Management',
    ],
    tech: ['Python', 'Twilio Voice', 'Gemini 2.5 Flash', 'WebSockets', 'TwiML', 'FastAPI'],
  },
]

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/admin/projects', {
          next: { revalidate: 3600 },
        })
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          const visible = data
            .filter((p: Project) => p.is_visible && p.description && p.description.trim().length > 0)
            .sort((a: Project, b: Project) => {
              if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
              return b.stars - a.stars
            })
          setProjects(visible.length > 0 ? visible : fallbackProjects)
        } else {
          setProjects(fallbackProjects)
        }
      } catch (error) {
        console.error('[v0] Error loading projects:', error)
        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[140px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="PRODUCTION ARCHITECTURE"
          title={
            <>
              Featured <span className="text-gradient-cyan">Systems &amp; Work</span>.
            </>
          }
          subtitle="Enterprise platforms, computer vision proctoring pipelines, and open-source systems built for resilience."
        />

        {/* Part 1: Flagship Systems Deep-Dive */}
        <div className="space-y-8 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="uppercase tracking-wider">Enterprise Flagships</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {flagshipSystems.map((sys, idx) => (
              <Reveal key={sys.title} delay={0.1 * idx}>
                <div className="glass-card-hover group flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        {sys.badge}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {sys.company}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors sm:text-2xl">
                      {sys.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {sys.description}
                    </p>

                    <div className="mt-6 border-t border-white/5 pt-4">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                        Core Innovations
                      </p>
                      <ul className="space-y-1.5">
                        {sys.architecture.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {sys.tech.map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Part 2: GitHub Repository Ecosystem */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <Github className="h-4 w-4 text-cyan-400" />
              <span className="uppercase tracking-wider">GitHub Repositories &amp; Open Source</span>
            </div>

            <a
              href="https://github.com/Manish10000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Browse full archive @Manish10000</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-xl border border-white/5 bg-[#11131b]/60" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal key={project.id || i} delay={Math.min(i * 0.04, 0.25)}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card-hover group flex h-full flex-col justify-between rounded-xl p-5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-cyan-400" />
                          <h4 className="font-mono text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                            {project.repo_name}
                          </h4>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform group-hover:text-cyan-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-slate-400 line-clamp-3">
                        {project.description || 'Production repository with clean modular architecture and unit tests.'}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        <span>{project.language || 'Python'}</span>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="inline-flex items-center gap-1 hover:text-white transition-colors">
                          <Star className="h-3 w-3 text-amber-400" /> {project.stars}
                        </span>
                        <span className="inline-flex items-center gap-1 hover:text-white transition-colors">
                          <GitFork className="h-3 w-3 text-slate-400" /> {project.forks}
                        </span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
