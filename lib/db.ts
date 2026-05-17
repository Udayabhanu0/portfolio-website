import { neon } from '@neondatabase/serverless'

let sql: any = null

// Lazy initialization to avoid requiring DATABASE_URL at build time
function initializeDb() {
  if (!sql) {
    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) {
      // Only throw at runtime, not during build
      throw new Error('DATABASE_URL environment variable is required')
    }
    sql = neon(dbUrl)
  }
  return sql
}

// Create a proxy that initializes on first use
const dbProxy = new Proxy(
  function () {},
  {
    get(target, prop) {
      return initializeDb()[prop]
    },
    apply(target, thisArg, args) {
      return initializeDb()(...args)
    },
  }
)

export default dbProxy as any

// Type definitions
export interface GitHubProject {
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
  created_at: string
  updated_at: string
}

export interface GitHubStats {
  id: number
  total_repos: number
  total_stars: number
  total_commits: number
  total_followers: number
  last_synced: string
}

export interface SyncSettings {
  id: number
  auto_sync_enabled: boolean
  sync_time: string
  last_manual_sync: string | null
  last_auto_sync: string | null
}
