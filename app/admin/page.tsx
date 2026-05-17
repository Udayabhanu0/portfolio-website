'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { RefreshCw, Eye, EyeOff, Star, LogOut } from 'lucide-react'

// Disable prerendering for this page since it uses useSession
export const dynamic = 'force-dynamic'

interface Project {
  id: number
  repo_id: number
  repo_name: string
  description: string | null
  stars: number
  forks: number
  language: string | null
  is_visible: boolean
  is_featured: boolean
  sort_order: number
  updated_at: string
}

function AdminDashboardContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      loadProjects()
      loadStats()
    }
  }, [status, router])

  async function loadProjects() {
    try {
      const response = await fetch('/api/admin/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('[v0] Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadStats() {
    try {
      const response = await fetch('/api/sync')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('[v0] Error loading stats:', error)
    }
  }

  async function handleSync() {
    setSyncing(true)
    try {
      const response = await fetch('/api/sync', { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        await loadProjects()
        await loadStats()
      }
    } catch (error) {
      console.error('[v0] Error syncing:', error)
    } finally {
      setSyncing(false)
    }
  }

  async function toggleVisibility(id: number, currentVisibility: boolean) {
    try {
      await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          is_visible: !currentVisibility,
        }),
      })
      loadProjects()
    } catch (error) {
      console.error('[v0] Error updating project:', error)
    }
  }

  async function toggleFeatured(id: number, currentFeatured: boolean) {
    try {
      await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          is_featured: !currentFeatured,
        }),
      })
      loadProjects()
    } catch (error) {
      console.error('[v0] Error updating project:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-cyan-400/20 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold glow-text-cyan">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 rounded-lg transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Refresh GitHub'}
              </button>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        {stats && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass rounded-lg p-4 border border-cyan-400/20">
                <p className="text-gray-400 text-sm">Total Repos</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.total_repos}</p>
              </div>
              <div className="glass rounded-lg p-4 border border-cyan-400/20">
                <p className="text-gray-400 text-sm">Total Stars</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.total_stars}</p>
              </div>
              <div className="glass rounded-lg p-4 border border-cyan-400/20">
                <p className="text-gray-400 text-sm">Total Commits</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.total_commits}</p>
              </div>
              <div className="glass rounded-lg p-4 border border-cyan-400/20">
                <p className="text-gray-400 text-sm">Last Synced</p>
                <p className="text-sm text-cyan-400">
                  {new Date(stats.last_synced).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Projects Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-white mb-6">Projects ({projects.length})</h2>
          <div className="glass rounded-lg border border-cyan-400/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-400/20">
                    <th className="text-left px-4 py-3 text-gray-300 font-medium">Project</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-medium">Stars</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-medium">Language</th>
                    <th className="text-center px-4 py-3 text-gray-300 font-medium">Visible</th>
                    <th className="text-center px-4 py-3 text-gray-300 font-medium">Featured</th>
                    <th className="text-left px-4 py-3 text-gray-300 font-medium">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-t border-cyan-400/10 hover:bg-cyan-400/5 transition-colors">
                      <td className="px-4 py-3">
                        <a
                          href={`https://github.com/Manish10000/${project.repo_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 font-medium"
                        >
                          {project.repo_name}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{project.stars}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{project.language || 'N/A'}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleVisibility(project.id, project.is_visible)}
                          className="p-2 hover:bg-cyan-500/20 rounded transition-colors"
                        >
                          {project.is_visible ? (
                            <Eye className="w-5 h-5 text-cyan-400" />
                          ) : (
                            <EyeOff className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleFeatured(project.id, project.is_featured)}
                          className="p-2 hover:bg-cyan-500/20 rounded transition-colors"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              project.is_featured ? 'fill-cyan-400 text-cyan-400' : 'text-gray-500'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-sm">
                        {new Date(project.updated_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-cyan-400">Loading...</div></div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}
