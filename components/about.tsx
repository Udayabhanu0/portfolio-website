'use client'

import { motion } from 'framer-motion'
import { ProfileImage } from './profile-modal'

export function About() {
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
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-[#0a0a15]/50 to-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="text-white">About</span>
              <span className="glow-text-cyan ml-3">Me</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mt-4 rounded-full" />
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
       

            {/* Text content */}
            <motion.div variants={itemVariants} className="space-y-6 md:order-1">
              <p className="text-gray-300 text-lg leading-relaxed">
                I&apos;m a fullstack and AI engineer with expertise in building scalable Python-based systems and AI-powered applications using FastAPI, Django, and modern LLM technologies. Experienced in building real-time systems, RAG pipelines, AI proctoring solutions, and automated assessment platforms.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Currently working at SmallDay IT Services as a Software Developer, where I architected and delivered an end-to-end AI assessment platform that converts job descriptions into structured technical tests. I focus on scalable architecture, performance optimization, and maintainable production systems.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                AWS Certified AI Practitioner with Master&apos;s degree in Computer Applications (MCA). Passionate about leveraging AI and modern technologies to solve real-world problems and create intelligent, user-centric solutions.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-hover p-6 rounded-lg">
                <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
                <div className="text-gray-400">Years of Experience</div>
              </div>

              <div className="glass-hover p-6 rounded-lg">
                <div className="text-3xl font-bold text-cyan-400 mb-2">20+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>

              <div className="glass-hover p-6 rounded-lg">
                <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
                <div className="text-gray-400">Technologies Mastered</div>
              </div>

              <div className="glass-hover p-6 rounded-lg">
                <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
