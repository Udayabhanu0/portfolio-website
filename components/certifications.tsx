'use client'

import { ArrowUpRight, Award, CheckCircle, GraduationCap, ShieldCheck } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

export function Certifications() {
  return (
    <section id="certifications" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background Subtle Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="CREDENTIALS &amp; EDUCATION"
          title={
            <>
              Validated <span className="text-gradient-cyan">Expertise</span>.
            </>
          }
          subtitle="Official industry certifications and academic postgraduate degrees in computer science."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {/* AWS Certification Spotlight Card */}
          <Reveal>
            <div className="glass-card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8">
              {/* Corner Ambient Glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-amber-500/10 via-cyan-500/10 to-transparent blur-2xl"
                aria-hidden
              />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-md">
                    <Award className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                    <CheckCircle className="h-3 w-3" />
                    Verified Active
                  </span>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-amber-400">
                    Amazon Web Services (AWS)
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    AWS Certified AI Practitioner
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    Certified in architecting AI/ML solutions, model selection, prompt design, AWS Bedrock integration, responsible AI frameworks, and secure cloud deployment.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/5 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-6 font-mono text-xs">
                    <div>
                      <span className="block text-slate-500">Issued</span>
                      <span className="font-semibold text-slate-200">Jan 2026</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Expires</span>
                      <span className="font-semibold text-slate-200">Jan 2029</span>
                    </div>
                  </div>

                  <a
                    href="https://www.credly.com/badges/01e34951-d9f1-48d9-af6a-db1d413f8da3/linked_in_profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3.5 py-2 font-mono text-xs font-semibold text-amber-300 transition-all hover:border-amber-400 hover:bg-amber-500/20"
                  >
                    <span>Verify Credly</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Academic Master's Degree Card */}
          <Reveal delay={0.1}>
            <div className="glass-card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8">
              {/* Corner Ambient Glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-transparent blur-2xl"
                aria-hidden
              />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-md">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 font-mono text-xs text-indigo-300">
                    <ShieldCheck className="h-3 w-3" />
                    Postgraduate
                  </span>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-indigo-400">
                    Higher Education Degree
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    Master of Computer Applications (MCA)
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    Rigorous graduate training encompassing Advanced Algorithms, Relational Database Management Systems, Distributed Computing, Object-Oriented Software Design, and Artificial Intelligence foundations.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/5 pt-5">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>Specialization: Software Engineering &amp; AI</span>
                  <span className="text-slate-300">Completed</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
