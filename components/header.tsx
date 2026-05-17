'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ProfileImage } from './profile-modal'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.header
      className="fixed top-0 w-full z-50 border-b border-cyan-400/10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 glass pointer-events-none" />

      <nav className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <ProfileImage
            imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Udayabhanu%20aich-9ekLvu1Thze2RDQoHXedcdMLNowa1T.jpg"
            altText="Udayabhanu Aich"
            name="Udayabhanu Aich"
            className="w-10 h-10 rounded-full overflow-hidden"
            imgClassName="w-full h-full object-cover"
          />
          <span className="text-white font-bold text-lg hidden sm:inline">Udayabhanu</span>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="hidden md:inline-block px-6 py-2 rounded-lg text-sm font-medium text-cyan-400 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          Get in touch
        </motion.a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile navigation */}
      <motion.div
        className="md:hidden absolute top-full left-0 right-0 glass border-b border-cyan-400/10"
        initial={{ opacity: 0, height: 0 }}
        animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block w-full text-center px-4 py-2 rounded-lg text-sm font-medium text-cyan-400 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-300 mt-4"
            onClick={() => setIsOpen(false)}
          >
            Get in touch
          </a>
        </div>
      </motion.div>
    </motion.header>
  )
}
