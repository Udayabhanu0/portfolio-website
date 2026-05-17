'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Project {
  id: number
  repo_id: number
  repo_name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: string | null
  is_visible: boolean
  is_featured: boolean
  sort_order: number
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/admin/projects', {
          next: { revalidate: 3600 }, // Cache for 1 hour
        })
        const data = await response.json()
        // Filter: only visible projects with descriptions, sort by stars (descending) then featured
        const visible = data
          .filter((p: Project) => p.is_visible && p.description && p.description.trim().length > 0)
          .sort((a: Project, b: Project) => {
            // Sort by featured first, then by stars descending
            if (a.is_featured !== b.is_featured) {
              return a.is_featured ? -1 : 1
            }
            return b.stars - a.stars
          })
        setProjects(visible)
      } catch (error) {
        console.error('[v0] Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-[#0a0a15]/50 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Featured</span>
              <span className="glow-text-cyan ml-3">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mt-4 rounded-full" />
          </motion.div>

          {/* Projects grid */}
          {loading ? (
            <div className="text-center text-cyan-400">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-gray-400">No projects yet. Check back soon!</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group glass-hover border-glow p-6 rounded-lg h-full flex flex-col"
                >
                  {/* Featured badge */}
                  {project.is_featured && (
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Project header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex-1">{project.repo_name}</h3>
                    <div className="flex gap-2 ml-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400/50 hover:text-cyan-400 transition-colors"
                        aria-label="GitHub link"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                    {project.description || 'No description available'}
                  </p>

                  {/* Stars and Language */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-t border-cyan-400/10">
                    <span className="text-xs text-gray-400">⭐ {project.stars} stars</span>
                    {project.language && (
                      <span className="px-2 py-1 rounded text-xs bg-cyan-400/10 text-cyan-300">
                        {project.language}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* View GitHub profile button */}
          {!loading && projects.length > 0 && (
            <motion.div variants={itemVariants} className="mt-12 text-center">
              <a
                href="https://github.com/Manish10000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block glass-hover px-8 py-3 rounded-lg font-medium text-cyan-400 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300"
              >
                View More on GitHub
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
