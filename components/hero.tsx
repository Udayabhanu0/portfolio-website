'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Cpu, Download, Sparkles, Terminal } from 'lucide-react'
import type { MouseEvent } from 'react'

const techStack = [
  'Python',
  'FastAPI',
  'Django',
  'Next.js 16',
  'TypeScript',
  'RAG Pipelines',
  'Gemini 2.5 Flash',
  'WebSockets',
  'TensorFlow',
  'AWS Bedrock',
  'PostgreSQL',
  'Redis Caching',
  'Docker',
  'Neon Serverless',
]

export function Hero() {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}% ${mouseY}%, rgba(0, 242, 254, 0.08), rgba(99, 102, 241, 0.04) 40%, transparent 80%)`

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[96svh] flex-col justify-between overflow-hidden px-4 pb-0 pt-28 sm:px-6 sm:pt-36 lg:px-8"
    >
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: spotlight }}
        aria-hidden
      />

      {/* Neural Background Mesh Grid */}
      <div className="neural-grid pointer-events-none absolute inset-0 z-0 opacity-70" aria-hidden />

      {/* Ambient Top Glow Orbs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/15 via-indigo-500/10 to-transparent blur-[120px]"
        aria-hidden
      />

      {/* Main Content Hero Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-6 sm:py-10">
        {/* Availability & Stature Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md">
            <span className="pulse-emerald h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs font-medium text-emerald-300">
              Open to Software &amp; AI Roles
            </span>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md sm:inline-flex">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono text-xs text-slate-300">
              AWS Certified AI Practitioner
            </span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Architecting{' '}
            <span className="text-gradient-cyan">Intelligent Systems</span>
            <br />
            from Models to Scale.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Hi, I&apos;m <span className="font-semibold text-white">Udayabhanu Aich</span>. Full-Stack and AI Systems Engineer building real-time proctoring platforms, multi-turn voice assistants, and high-concurrency Python architectures that perform reliably under production load.
          </p>
        </motion.div>

        {/* CTA Actions Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center gap-3.5 sm:mt-10"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] hover:shadow-cyan-400/30"
          >
            <span>Explore Featured Systems</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <a
            href="/UDAYABHANU_AICH_RESUME.pdf"
            download="Udayabhanu_Aich_Resume.pdf"
            className="glass-card-hover inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-200"
          >
            <Download className="h-4 w-4 text-cyan-400" />
            <span>Download Resume</span>
          </a>

          <a
            href="#contact"
            className="glass-card-hover inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-200"
          >
            <span>Contact Me</span>
          </a>
        </motion.div>

        {/* Live Architecture Highlights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 grid gap-4 rounded-2xl border border-white/10 bg-[#11131b]/80 p-4 backdrop-blur-xl sm:grid-cols-3 sm:p-5"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-cyan-400">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Flagship System</p>
              <p className="text-sm font-semibold text-white">Code{'{'}X{'}'}Pro AI Assessment</p>
              <p className="text-xs text-slate-400">TensorFlow proctoring &amp; WebSocket streams</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t border-white/5 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400">AI Voice Assistant</p>
              <p className="text-sm font-semibold text-white">Call2Order Engine</p>
              <p className="text-xs text-slate-400">Twilio Voice + Gemini 2.5 Flash audio pipeline</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t border-white/5 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-500/10 text-emerald-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Production Core</p>
              <p className="text-sm font-semibold text-white">Scalable Architecture</p>
              <p className="text-xs text-slate-400">FastAPI, Django, PostgreSQL &amp; Docker</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee Technology Ticker */}
      <div className="relative -mx-4 mt-8 border-y border-white/10 bg-[#090a0f]/90 py-3.5 sm:-mx-6 lg:-mx-8">
        <div className="marquee flex overflow-hidden" aria-hidden>
          <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-mono text-xs tracking-wider text-slate-400"
              >
                <span>{tech}</span>
                <span className="text-cyan-400">✦</span>
              </span>
            ))}
          </div>
          <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-mono text-xs tracking-wider text-slate-400"
              >
                <span>{tech}</span>
                <span className="text-cyan-400">✦</span>
              </span>
            ))}
          </div>
        </div>

        <a
          href="#about"
          className="absolute -top-10 right-6 hidden items-center gap-1.5 font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400 sm:flex"
        >
          Scroll to explore <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
