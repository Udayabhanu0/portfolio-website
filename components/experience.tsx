'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, ChevronDown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  summary: string
  domains: {
    category: string
    items: string[]
  }[]
  tech: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 'codexpro',
    role: 'Software Developer — Code{X}Pro Platform',
    company: 'SmallDay IT Services',
    period: '2023 – 2024',
    location: 'India',
    summary:
      'Architected and delivered Code{X}Pro, an end-to-end AI assessment and proctoring platform. Built automated Job Description parsing pipelines, competency mapping, AI question synthesis, and a live computer vision proctoring engine with WebSockets that cut assessment creation time and scaled concurrent test sessions.',
    domains: [
      {
        category: 'AI Synthesis & Competency Modeling',
        items: [
          'Engineered JD parsing & skill extraction pipelines utilizing Gemini 2.5 Flash',
          'Automated AI-powered question generation, validation, and difficulty calibration',
          'Constructed algorithmic code-diff grading engine using Python difflib',
        ],
      },
      {
        category: 'Computer Vision & Real-Time Telemetry',
        items: [
          'Implemented TensorFlow facial recognition and gaze deviation monitoring',
          'Integrated multi-person anomaly detection for remote exam integrity',
          'Delivered sub-100ms real-time proctoring telemetry via WebSocket event streams',
          'Built Server-Sent Events (SSE) live analytics dashboard for proctor oversight',
        ],
      },
      {
        category: 'Fintech, Security & Concurrency',
        items: [
          'Integrated Razorpay Payment Gateway with webhook verification and refund management',
          'Architected Granular Role-Based Access Control (RBAC) and API key rotation',
          'Executed JMeter stress testing to optimize Redis caching and connection pooling',
        ],
      },
    ],
    tech: ['Python', 'FastAPI', 'Django', 'TensorFlow', 'PostgreSQL', 'WebSockets', 'SSE', 'Razorpay', 'Redis', 'Docker'],
  },
  {
    id: 'call2order',
    role: 'AI Engineer — Call2Order Voice Assistant',
    company: 'SmallDay IT Services',
    period: '2024',
    location: 'India',
    summary:
      'Engineered a real-time two-way voice assistant operating directly over telephone lines. Coupled Twilio Voice with Google Gemini 2.5 Flash for natural multi-turn ordering, live transcription, and low-latency audio response streaming.',
    domains: [
      {
        category: 'Telephony & Voice Architecture',
        items: [
          'Bi-directional Twilio Media Streams mapped to Python WebSocket listeners',
          'Sub-250ms latency audio buffer with streaming Text-To-Speech (TTS)',
          'Contextual multi-turn dialogue management with state tracking',
          'Dynamic TwiML generation and webhook error recovery',
        ],
      },
    ],
    tech: ['Python', 'FastAPI', 'Twilio Voice', 'Gemini 2.5 Flash', 'WebSockets', 'TwiML', 'AsyncIO'],
  },
]

export function Experience() {
  const [expandedId, setExpandedId] = useState<string>('codexpro')

  return (
    <section id="experience" className="relative border-y border-white/5 bg-[#0b0d13]/60 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background Neural Grid */}
      <div className="neural-grid-subtle pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          tag="TRACK RECORD"
          title={
            <>
              Where I&apos;ve <span className="text-gradient-cyan">Built &amp; Shipped</span>.
            </>
          }
          subtitle="Real-world production platforms handling thousands of live assessment sessions, payment streams, and voice interactions."
        />

        {/* Timeline Container */}
        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id
            return (
              <Reveal key={exp.id} delay={0.1 * index}>
                <div
                  className={`glass-card-hover rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-cyan-400/30 bg-[#141724]/90 shadow-xl shadow-cyan-500/5'
                      : 'border-white/10'
                  }`}
                >
                  {/* Timeline Header Button */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                    className="flex w-full flex-col justify-between gap-4 p-6 text-left sm:p-8 sm:flex-row sm:items-center"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400">
                          <Briefcase className="h-3.5 w-3.5" />
                          <span>{exp.company}</span>
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="font-mono text-xs text-slate-400">{exp.location}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-300">
                        {exp.period}
                      </span>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-180 text-cyan-400 border-cyan-400/40 bg-cyan-500/10' : ''
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </button>

                  {/* Summary Always Visible */}
                  <div className="px-6 pb-6 text-sm leading-relaxed text-slate-300 sm:px-8 sm:pb-8">
                    <p>{exp.summary}</p>

                    {/* Expandable Technical Deep-Dive */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 space-y-6 border-t border-white/5 pt-6">
                            {/* Domain Breakdown */}
                            <div className="grid gap-6 md:grid-cols-3">
                              {exp.domains.map((domain) => (
                                <div key={domain.category} className="space-y-2.5">
                                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
                                    {domain.category}
                                  </h4>
                                  <ul className="space-y-2">
                                    {domain.items.map((item) => (
                                      <li key={item} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack Pills */}
                            <div className="border-t border-white/5 pt-4">
                              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                                Technologies Deployed
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.tech.map((t) => (
                                  <span key={t} className="tech-tag">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
