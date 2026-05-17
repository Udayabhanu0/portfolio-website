'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com',
      label: 'GitHub',
      color: 'hover:text-gray-300',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/udayabhanuaich',
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
    },
    {
      icon: Mail,
      href: 'mailto:manish.7750944@gmail.com',
      label: 'Email',
      color: 'hover:text-cyan-400',
    },
  ]

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-[#0a0a15]/50 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="glow-text-cyan">Let&apos;s</span>
              <span className="text-white ml-3">Connect</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Contact description */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              I&apos;m always interested in hearing about new projects and opportunities. Whether you have
              a question or just want to say hi, feel free to reach out!
            </p>
          </motion.div>

          {/* Email CTA */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <a
              href="mailto:manish.7750944@gmail.com"
              className="inline-block glass-hover px-8 py-3 rounded-lg font-medium text-cyan-400 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300"
            >
              Send me an email
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex justify-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className={`p-3 rounded-lg glass border border-gray-600/30 text-gray-400 transition-all duration-300 ${link.color}`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
