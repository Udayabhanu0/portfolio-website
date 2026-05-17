'use client'

import { motion } from 'framer-motion'

interface Experience {
  role: string
  company: string
  period: string
  subtitle?: string
  description: string
  technologies?: string[]
  achievements: string[]
}

const experiences: Experience[] = [
  {
    role: 'Project: Code{X}Pro',
    company: 'SmallDay IT Services',
    period: '2023 - 2024',
    subtitle: 'An online assessment platform',
    description:
      'End-to-end AI-driven assessment platform that converts Job Descriptions into structured technical tests. Designed and implemented JD parsing pipelines, skill extraction, competency mapping, AI-based question generation, validation workflows, and admin approval systems. Architected with face recognition, gaze detection, and real-time proctoring dashboards using WebSockets for live monitoring. Reduced manual assessment creation effort and improved assessment scalability.',
    technologies: [
      'Django',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Gemini API',
      'TensorFlow',
      'WebSockets',
      'Server-Sent Events (SSE)',
      'Razorpay Payment',
      'JMeter',
      'AWS S3',
      'Docker',
      'Redis Caching',
      'Role-Based Access Control',
    ],
    achievements: [
      'AI-Driven Assessment & Job Description Mapping System',
      'JD Parsing & Skill Extraction (Gemini API)',
      'AI-Powered Question Generation & Competency Mapping',
      'Face Recognition & Gaze Detection (TensorFlow)',
      'Multi-Person Detection for Proctoring',
      'Real-time Proctoring Dashboard (WebSockets)',
      'Live Event Streaming & Monitoring',
      'Admin Review & Approval Workflows',
      'Real-Time Analytics Dashboard (SSE)',
      'Role-Based Access Control (RBAC)',
      'Real-time Notifications & Caching',
      'Multi-User Monitoring (Low Latency)',
      'Razorpay Payment Gateway Integration',
      'Order Creation & Payment Verification',
      'Refund & Webhook Handling',
      'Transaction Monitoring & Fraud Prevention',
      'API Key Management & Rotation',
      'API Usage Analytics & IP Tracking',
      'Quota Management & Developer Onboarding',
      'Load Testing (JMeter) - MCQ, Coding, Proctored',
      'API Performance Optimization & Query Tuning',
      'Caching Strategies & Concurrency Tuning',
      'AI-Powered Question Validation Systems',
      'Code-Diff Judging (Python difflib)',
      'Assessment Validation & Automated Evaluation',
    ],
  },
  {
    role: 'Project: Call2Order - AI Voice Assistant',
    company: 'SmallDay IT Services',
    period: '2024',
    description:
      'Built a two-way AI phone-call assistant using Twilio Voice and Google Gemini 2.5 Flash. Implemented real-time WebSocket event streams, multi-turn conversation handling, live transcription, and text-to-speech playback for seamless automated ordering and customer service interactions.',
    achievements: [
      'Twilio Voice API Integration',
      'Real-time Transcription & TTS',
      'Multi-turn Conversation Flow',
      'WebSocket Event Streaming',
      'Gemini 2.5 Flash Integration',
      'TwiML Generation & Webhooks',
    ],
  },
]

export function Experience() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
              <span className="text-white">Professional</span>
              <span className="glow-text-cyan ml-3">Experience</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full" />
          </motion.div>

          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                variants={itemVariants}
                className="relative glass border-glow p-6 rounded-lg"
              >
                {/* Timeline dot */}
                <div className="absolute -left-12 top-8 w-6 h-6 rounded-full bg-cyan-400 border-4 border-background hidden lg:block" />

                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute -left-8 top-16 w-0.5 h-20 bg-gradient-to-b from-cyan-400/50 to-transparent hidden lg:block" />
                )}

                {/* Company and period */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    {exp.subtitle && <p className="text-sm text-cyan-300 italic">{exp.subtitle}</p>}
                    <p className="text-cyan-400 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{exp.period}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4 leading-relaxed">{exp.description}</p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-cyan-400/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Key Achievements</p>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="text-sm text-gray-300 flex items-start">
                          <span className="text-cyan-400 mr-2 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-2 py-1 rounded text-xs bg-cyan-400/15 text-cyan-300 border border-cyan-400/25 hover:border-cyan-400/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
