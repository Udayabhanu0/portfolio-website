'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    name: 'Languages & Frameworks',
    skills: ['Python', 'TypeScript', 'Django', 'FastAPI', 'React.js', 'Next.js'],
  },
  {
    name: 'Frontend',
    skills: ['HTML', 'CSS', 'React.js', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'Databases & Backend',
    skills: ['PostgreSQL', 'MySQL', 'FAISS', 'RAG Pipelines', 'WebSockets'],
  },
  {
    name: 'Cloud & AI/ML',
    skills: ['AWS (S3, Bedrock, SageMaker)', 'Docker', 'LLMs', 'Prompt Engineering', 'TensorFlow'],
  },
]

export function Skills() {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="glow-text-cyan">Skills</span>
              <span className="text-white ml-3">&amp; Expertise</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="glass border-glow p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{category.name}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 glass-hover p-8 rounded-lg text-center border-glow"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The tech landscape evolves constantly. I&apos;m committed to staying at the forefront of
              innovation, regularly exploring new tools, frameworks, and methodologies to deliver
              the best solutions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
