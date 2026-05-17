'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

interface Certification {
  title: string
  issuer: string
  issuedDate: string
  expiryDate: string
  credentialUrl: string
  icon?: string
}

const certifications: Certification[] = [
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issuedDate: 'Jan 2026',
    expiryDate: 'Jan 2029',
    credentialUrl: 'https://www.credly.com/badges/01e34951-d9f1-48d9-af6a-db1d413f8da3/linked_in_profile',
  },
]

export function Certifications() {
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

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Certifications</span>
              <span className="glow-text-cyan ml-3">&amp; Awards</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full" />
          </motion.div>

          {/* Certifications grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <motion.a
                key={cert.title}
                variants={itemVariants}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-hover border-glow p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 group-hover:border-orange-500/50 transition-colors">
                    <Award className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-cyan-400 mt-1">{cert.issuer}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Issued:</span>
                    <span className="text-gray-300 font-medium">{cert.issuedDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Expires:</span>
                    <span className="text-gray-300 font-medium">{cert.expiryDate}</span>
                  </div>
                </div>

                {/* Credential link */}
                <div className="mt-4 pt-4 border-t border-cyan-400/10">
                  <span className="text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center">
                    View Credential →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
