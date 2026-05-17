'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Download } from 'lucide-react'

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/10 via-transparent to-transparent pointer-events-none"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />

      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-px opacity-5 pointer-events-none">
        {Array.from({ length: 120 }).map((_, i) => (
          <div key={i} className="border border-cyan-400" />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name/Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Udayabhanu</span>
            <br />
            <span className="glow-text-cyan">Aich</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            Full-Stack Developer &amp; AI Enthusiast
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Building intelligent applications that bridge the gap between design and functionality.
            Specialized in modern web technologies, AI integration, and scalable architectures.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16 flex-wrap">
          <a
            href="#projects"
            className="glass-hover px-6 sm:px-8 py-3 rounded-lg font-medium text-cyan-400 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 text-sm sm:text-base"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 sm:px-8 py-3 rounded-lg font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30 transition-all duration-300 text-sm sm:text-base"
          >
            Get In Touch
          </a>
          <a
            href="/UDAYABHANU_AICH_RESUME.pdf"
            download="Udayabhanu_Aich_Resume.pdf"
            className="px-6 sm:px-8 py-3 rounded-lg font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300 text-sm sm:text-base flex items-center gap-2 justify-center"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-cyan-400/50" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 rounded-full border border-cyan-400/20 pointer-events-none"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full border border-blue-400/20 pointer-events-none"
        animate={{
          x: [0, -20, 0],
          y: [0, -30, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </section>
  )
}
