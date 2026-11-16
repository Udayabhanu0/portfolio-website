'use client'

import { ProfileImage } from './profile-modal'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { CheckCircle2, Cpu, Database, Server, ShieldCheck } from 'lucide-react'

const stats = [
  { value: '5+', label: 'Years Experience', detail: 'Full-stack & AI development' },
  { value: '24+', label: 'Projects Shipped', detail: 'Production & GitHub repos' },
  { value: '<100ms', label: 'WebSocket Latency', detail: 'Real-time proctoring streams' },
  { value: '100%', label: 'AWS Certified', detail: 'AWS Certified AI Practitioner' },
]

const coreCompetencies = [
  {
    icon: Cpu,
    title: 'AI & LLM Integration',
    desc: 'Gemini 2.5 Flash, RAG pipelines, prompt engineering, and real-time audio voice assistants with Twilio.',
  },
  {
    icon: Server,
    title: 'High-Concurrency Backends',
    desc: 'FastAPI, Django, WebSockets, Server-Sent Events (SSE), and Redis for scalable real-time state.',
  },
  {
    icon: Database,
    title: 'Data & Computer Vision',
    desc: 'Neon PostgreSQL, FAISS vector storage, TensorFlow face/gaze proctoring, and automated code-diff evaluation.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Production Scale',
    desc: 'RBAC permission systems, Razorpay payment processing, JMeter load testing, and Dockerized microservices.',
  },
]

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background Subtle Glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="ENGINEERING PROFILE"
          title={
            <>
              Systems Engineer specializing in{' '}
              <span className="text-gradient-cyan">Scalable AI Architecture</span>.
            </>
          }
          subtitle="Building resilient, full-stack software and machine learning pipelines that solve tangible engineering challenges."
        />

        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          {/* Left Column: Portrait & Quick Bio Card */}
          <Reveal>
            <div className="glass-card rounded-2xl p-5">
              <ProfileImage
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Udayabhanu%20aich-9ekLvu1Thze2RDQoHXedcdMLNowa1T.jpg"
                altText="Portrait of Udayabhanu Aich"
                name="Udayabhanu Aich"
                className="aspect-[4/5] w-full !mb-4 overflow-hidden rounded-xl border border-white/10"
                imgClassName="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />

              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Udayabhanu Aich</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    MCA
                  </span>
                </div>
                <p className="font-mono text-xs text-slate-400">
                  Software Developer @ <span className="text-slate-200">SmallDay IT Services</span>
                </p>
                <p className="font-mono text-xs text-slate-500">
                  India • Open to Global &amp; Remote Teams
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Narrative & Technical Foundations */}
          <div className="flex flex-col justify-between space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                <p>
                  I am a passionate software engineer with a Master&apos;s in Computer Applications (MCA) and official credential as an <strong className="text-white font-semibold">AWS Certified AI Practitioner</strong>. My focus centers on architecting end-to-end Python services and AI-driven platforms that handle demanding real-time workloads.
                </p>
                <p className="text-slate-400">
                  At <span className="text-white font-medium">SmallDay IT Services</span>, I engineered the core architecture of <span className="text-cyan-300 font-medium">Code{'{'}X{'}'}Pro</span>, an enterprise online assessment system that translates raw job descriptions into evaluated technical assessments. My responsibilities spanned automated JD skill extraction, TensorFlow-powered multi-person &amp; gaze proctoring, live WebSocket monitoring streams, and secure payment processing.
                </p>
              </div>
            </Reveal>

            {/* Core Competencies Grid */}
            <Reveal delay={0.2}>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {coreCompetencies.map((comp) => {
                  const Icon = comp.icon
                  return (
                    <div
                      key={comp.title}
                      className="glass-card-hover rounded-xl p-4 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-cyan-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">{comp.title}</h4>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        {comp.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Reveal>

            {/* Performance Stats Strip */}
            <Reveal delay={0.3}>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="glass-card rounded-xl p-4 text-center sm:text-left"
                  >
                    <dt className="text-3xl font-extrabold text-cyan-400 sm:text-4xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1 font-mono text-xs font-semibold text-white">
                      {s.label}
                    </dd>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {s.detail}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
