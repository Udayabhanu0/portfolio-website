'use client'

import { ArrowUpRight, Check, Copy, Github, Globe, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const EMAIL = 'manish.7750944@gmail.com'

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    handle: '@Manish10000',
    href: 'https://github.com/Manish10000',
    description: 'Explore 24+ open-source repositories and contributions',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'in/udayabhanuaich',
    href: 'https://linkedin.com/in/udayabhanuaich',
    description: 'Connect professionally and view career history',
  },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" className="relative border-t border-white/5 bg-[#0b0d13]/60 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background Neural Grid */}
      <div className="neural-grid-subtle pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      {/* Ambient Glow Center */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          tag="GET IN TOUCH"
          title={
            <>
              Let&apos;s Build Something <span className="text-gradient-cyan">Extraordinary</span>.
            </>
          }
          subtitle="Whether you have an ambitious platform to build, a backend to optimize, or an engineering role to discuss — let's connect."
        />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Main Email & Message Card */}
          <Reveal>
            <div className="glass-card-hover rounded-2xl p-6 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Direct Communication</span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                  Have an opportunity or project?
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
                  I&apos;m actively seeking high-impact software engineering and AI systems roles where I can contribute to core backend architecture, ML pipelines, and resilient web platforms.
                </p>

                {/* Big Interactive Email Box */}
                <div className="mt-8 rounded-xl border border-white/10 bg-[#090a0f]/80 p-4 sm:p-5">
                  <span className="block font-mono text-xs uppercase tracking-wider text-slate-500">
                    Primary Email
                  </span>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <span className="font-mono text-base font-semibold text-cyan-300 sm:text-lg break-all">
                      {EMAIL}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono text-xs font-medium text-slate-300 transition-all hover:border-cyan-400 hover:text-white"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-cyan-400" />}
                        <span>{copied ? 'Copied to clipboard!' : 'Copy'}</span>
                      </button>

                      <a
                        href={`mailto:${EMAIL}?subject=Engineering%20Opportunity`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 px-3.5 py-2 font-mono text-xs font-semibold text-black transition-transform hover:scale-105"
                      >
                        <span>Send Mail</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/5 pt-6 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Response Time: &lt; 24 Hours</span>
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  <span>India (UTC +5:30)</span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Social Profiles & Availability Card */}
          <div className="space-y-4">
            {socialLinks.map((social, i) => {
              const Icon = social.icon
              return (
                <Reveal key={social.label} delay={0.1 * i + 0.1}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card-hover group flex items-start justify-between rounded-xl p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {social.label}
                          </h4>
                          <span className="font-mono text-xs text-slate-500">{social.handle}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">
                          {social.description}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400" />
                  </a>
                </Reveal>
              )
            })}

            {/* Work Model Card */}
            <Reveal delay={0.3}>
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-300">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span>Work Modes &amp; Relocation</span>
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Available for remote software developer and AI engineer positions globally, as well as on-site / hybrid arrangements in top tech hubs.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
