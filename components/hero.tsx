'use client'

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'
import { profile, yearsOfExperience } from '@/lib/profile'

const techStack = [
  'Python', 'FastAPI', 'Django', 'Next.js', 'TypeScript', 'Claude Agent SDK', 'MCP', 'RAG Pipelines',
  'Gemini API', 'WebSockets', 'TensorFlow', 'AWS Bedrock', 'PostgreSQL', 'Redis', 'Docker Swarm',
]

const terminalLines = [
  { t: 'cmd', v: 'whoami' },
  { t: 'out', v: 'udayabhanu-aich · software & ai engineer' },
  { t: 'cmd', v: 'cat profile.json' },
  { t: 'json', v: '' },
]

function Terminal() {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? 99 : 0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setShown((n) => (n < 12 ? n + 1 : n)), 420)
    return () => clearInterval(id)
  }, [reduce])

  const yrs = yearsOfExperience()
  const json: [string, string, string][] = [
    ['role', `"Software Engineer"`, 'str'],
    ['company', `"SmallDay® IT Services"`, 'str'],
    ['experience', `"${yrs}+ years"`, 'str'],
    ['focus', `["AI systems", "Python backends", "real-time"]`, 'str'],
    ['certified', `["Claude Architect", "AWS AI Practitioner"]`, 'str'],
    ['ccaF_score', '903', 'num'],
    ['status', `"open_to_opportunities"`, 'str'],
  ]

  return (
    <div className="scanlines relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d14]/90 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-slate-500">~/portfolio — zsh</span>
      </div>
      <div className="min-h-[310px] space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <p className={shown >= 1 ? '' : 'invisible'}><span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span> <span className="text-slate-100">whoami</span></p>
        <p className={`text-slate-400 ${shown >= 2 ? '' : 'invisible'}`}>udayabhanu-aich · software &amp; ai engineer</p>
        <p className={shown >= 3 ? '' : 'invisible'}><span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span> <span className="text-slate-100">cat profile.json</span></p>
        <div className={shown >= 4 ? '' : 'invisible'}>
          <p className="text-slate-400">{'{'}</p>
          {json.map(([k, v, kind], i) => (
            <p key={k} className={`pl-5 ${shown >= 5 + i ? '' : 'invisible'}`}>
              <span className="tok-key">&quot;{k}&quot;</span>
              <span className="text-slate-500">: </span>
              <span className={kind === 'num' ? 'tok-num' : 'tok-str'}>{v}</span>
              {i < json.length - 1 && <span className="text-slate-500">,</span>}
            </p>
          ))}
          <p className="text-slate-400">{'}'}</p>
        </div>
        <p className={shown >= 12 ? '' : 'invisible'}><span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span> <span className="caret" /></p>
      </div>
    </div>
  )
}

export function Hero() {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}% ${mouseY}%, rgba(0, 242, 254, 0.09), rgba(99, 102, 241, 0.04) 40%, transparent 80%)`
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 700], [0, 140])
  const copyY = useTransform(scrollY, [0, 600], [0, -50])
  const copyO = useTransform(scrollY, [0, 500], [1, 0.25])

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[96svh] flex-col justify-between overflow-hidden px-4 pb-0 pt-28 sm:px-6 sm:pt-32 lg:px-8"
    >
      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} aria-hidden />
      <motion.div className="neural-grid pointer-events-none absolute inset-0 z-0 opacity-70" style={{ y: gridY }} aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/15 via-indigo-500/10 to-transparent blur-[120px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 py-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <motion.div style={{ y: copyY, opacity: copyO }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="pulse-emerald h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs font-medium text-emerald-300">Open to opportunities</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-mono text-xs text-slate-300">Bhubaneswar, India</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-[4.1rem] lg:leading-[1.05]"
          >
            <span className="code-comment block text-sm font-normal tracking-normal sm:text-base">{'// hello, world — I’m'}</span>
            Udayabhanu <span className="text-gradient-cyan">Aich</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            Software &amp; AI engineer building scalable Python backends, real-time proctoring systems and LLM-powered
            products. <span className="text-white">Claude Certified Architect</span> and{' '}
            <span className="text-white">AWS Certified AI Practitioner</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              View my work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/UDAYABHANU_AICH_RESUME.pdf"
              download="Udayabhanu_Aich_Resume.pdf"
              className="glass-card-hover inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-200"
            >
              <Download className="h-4 w-4 text-cyan-400" /> Resume
            </a>
            <a href={`mailto:${profile.email}`} className="glass-card-hover inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-200">
              Contact
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Terminal />
        </motion.div>
      </div>

      <div className="relative -mx-4 mt-8 border-y border-white/10 bg-[#090a0f]/90 py-3.5 sm:-mx-6 lg:-mx-8">
        <div className="marquee flex overflow-hidden" aria-hidden>
          {[0, 1].map((k) => (
            <div key={k} className="marquee-track flex shrink-0 items-center gap-8 pr-8">
              {[...techStack, ...techStack].map((tech, i) => (
                <span key={i} className="flex items-center gap-8 font-mono text-xs tracking-wider text-slate-400">
                  <span>{tech}</span>
                  <span className="text-cyan-400">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <a
          href="#about"
          className="absolute -top-10 right-6 hidden items-center gap-1.5 font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400 sm:flex"
        >
          scroll <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
