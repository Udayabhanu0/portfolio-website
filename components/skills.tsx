'use client'

import { useState } from 'react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { Bot, Code2, Cpu, Database, Globe, Layers, Server, Terminal } from 'lucide-react'

interface SkillItem {
  name: string
  category: 'ai' | 'backend' | 'frontend' | 'cloud'
  note?: string
  level?: 'Core' | 'Advanced' | 'Production'
}

const skillsList: SkillItem[] = [
  // AI & ML
  { name: 'Gemini API & Flash 2.5', category: 'ai', note: 'Multi-turn voice & reasoning', level: 'Production' },
  { name: 'RAG Pipelines & Vector Search', category: 'ai', note: 'Document retrieval & context', level: 'Production' },
  { name: 'TensorFlow & Keras', category: 'ai', note: 'Face & gaze proctoring vision', level: 'Advanced' },
  { name: 'FAISS & Embeddings', category: 'ai', note: 'High-speed vector indexing', level: 'Advanced' },
  { name: 'AWS Bedrock & SageMaker', category: 'ai', note: 'Model deployment & fine-tuning', level: 'Production' },
  { name: 'Prompt Engineering', category: 'ai', note: 'Structured JSON output & safety', level: 'Core' },

  // Backend
  { name: 'Python (3.10+)', category: 'backend', note: 'Primary backend language', level: 'Core' },
  { name: 'FastAPI', category: 'backend', note: 'Async REST APIs & microservices', level: 'Production' },
  { name: 'Django & Django REST', category: 'backend', note: 'Full-featured enterprise APIs', level: 'Production' },
  { name: 'WebSockets & SSE', category: 'backend', note: 'Real-time telemetry & events', level: 'Production' },
  { name: 'Redis & In-Memory State', category: 'backend', note: 'Session caching & broker', level: 'Advanced' },
  { name: 'Twilio Voice Integration', category: 'backend', note: 'Telephony & live audio streams', level: 'Production' },

  // Frontend
  { name: 'TypeScript', category: 'frontend', note: 'Type-safe fullstack development', level: 'Core' },
  { name: 'Next.js 16 (App Router)', category: 'frontend', note: 'Server components & ISR caching', level: 'Production' },
  { name: 'React 19', category: 'frontend', note: 'Modern UI & hooks architecture', level: 'Core' },
  { name: 'Tailwind CSS v4', category: 'frontend', note: 'Utility styling & animations', level: 'Core' },
  { name: 'Framer Motion', category: 'frontend', note: 'Fluid physics-based transitions', level: 'Advanced' },

  // Cloud & DB
  { name: 'PostgreSQL & Neon DB', category: 'cloud', note: 'Relational data & serverless PG', level: 'Core' },
  { name: 'Docker & Containerization', category: 'cloud', note: 'Reproducible microservices', level: 'Production' },
  { name: 'AWS S3 & Cloud Architecture', category: 'cloud', note: 'Asset hosting & presigned URLs', level: 'Production' },
  { name: 'Razorpay Gateway & Webhooks', category: 'cloud', note: 'Secure transactions & orders', level: 'Production' },
  { name: 'JMeter Load Testing', category: 'cloud', note: 'Concurrency tuning & profiling', level: 'Advanced' },
]

const categories = [
  { id: 'all', label: 'All Disciplines', icon: Layers },
  { id: 'ai', label: 'AI, LLMs & Vision', icon: Bot },
  { id: 'backend', label: 'Backend & WebSockets', icon: Server },
  { id: 'frontend', label: 'Frontend & UI', icon: Globe },
  { id: 'cloud', label: 'Cloud, DB & DevOps', icon: Database },
]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredSkills =
    activeCategory === 'all'
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative border-y border-white/5 bg-[#0b0d13]/60 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background Neural Grid */}
      <div className="neural-grid-subtle pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          tag="CORE CAPABILITIES"
          title={
            <>
              Engineered for{' '}
              <span className="text-gradient-cyan">Reliability &amp; Scale</span>.
            </>
          }
          subtitle="A comprehensive toolkit refined across enterprise assessment engines, AI voice assistants, and high-concurrency systems."
        />

        {/* Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-medium transition-all ${
                  isActive
                    ? 'border border-cyan-400/40 bg-cyan-500/15 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'border border-white/10 bg-[#11131b]/80 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, index) => (
            <Reveal key={skill.name} delay={Math.min(index * 0.03, 0.3)}>
              <div className="glass-card-hover group relative flex h-full flex-col justify-between rounded-xl p-4 sm:p-5">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    {skill.level && (
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-slate-400">
                        {skill.level}
                      </span>
                    )}
                  </div>

                  {skill.note && (
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {skill.note}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80 group-hover:scale-125 transition-transform" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    {skill.category}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Architectural Insight Callout Card */}
        <Reveal delay={0.2} className="mt-12">
          <div className="glass-card rounded-2xl border-cyan-400/20 p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400">
                  <Terminal className="h-4 w-4" />
                  <span>ARCHITECTURE INSIGHT</span>
                </div>
                <h4 className="text-lg font-bold text-white sm:text-xl">
                  Full-Lifecycle Engineering from Conception to Load Testing
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  I don&apos;t just string together APIs. I build end-to-end solutions: defining database schemas in Neon PostgreSQL, handling async tasks with Redis, streaming real-time events over WebSockets, and verifying throughput with JMeter load tests.
                </p>
              </div>

              <a
                href="#projects"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/20"
              >
                <span>View Shipped Systems</span>
                <span className="text-cyan-400">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
