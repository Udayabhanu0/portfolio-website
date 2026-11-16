'use client'

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Featured Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 25 })

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500"
        aria-hidden
      />

      {/* Floating Island Navigation Header */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          aria-label="Primary"
          className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#090a0f]/80 px-4 py-2 shadow-2xl backdrop-blur-xl sm:px-6"
        >
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-sm font-semibold tracking-tight transition-opacity hover:opacity-90"
            aria-label="Udayabhanu Aich — Home"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 font-mono text-xs font-bold text-black shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              UA
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-[#090a0f] bg-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white transition-colors group-hover:text-cyan-400">
                Udayabhanu Aich
              </span>
              <span className="hidden font-mono text-[10px] text-slate-400 sm:inline">
                AI & Systems Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const on = active === link.href.slice(1)
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-current={on ? 'true' : undefined}
                    className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      on
                        ? 'text-cyan-300'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-cyan-400/30 bg-cyan-500/10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions Cluster */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/Manish10000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-white sm:flex"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/udayabhanuaich"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-white sm:flex"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 px-4 py-1.5 text-xs font-medium text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] sm:inline-flex"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white md:hidden"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#090a0f]/95 px-6 pb-12 pt-28 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Navigation
              </p>
              <ul className="space-y-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-2xl font-medium text-slate-200 transition-colors hover:text-cyan-400"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 py-3 text-sm font-semibold text-black shadow-lg"
              >
                Let&apos;s Connect
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <div className="flex justify-center gap-4 pt-2">
                <a
                  href="https://github.com/Manish10000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href="https://linkedin.com/in/udayabhanuaich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
