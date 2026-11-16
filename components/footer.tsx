'use client'

import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Featured Systems', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/Manish10000', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/udayabhanuaich', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:manish.7750944@gmail.com', label: 'Email' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 bg-[#08090d] px-4 pt-16 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 font-mono text-xs font-bold text-black">
                UA
              </div>
              <p className="text-base font-bold text-white">Udayabhanu Aich</p>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Full-Stack &amp; AI Systems Engineer building scalable Python architectures, real-time WebSockets, and production machine learning applications.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 transition-all hover:bg-cyan-500/20"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row text-xs text-slate-500 font-mono">
          <p>&copy; {currentYear} Udayabhanu Aich. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>All Systems Operational</span>
            </span>
            <span>•</span>
            <a href="/admin/login" className="hover:text-cyan-400 transition-colors">
              Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
