import sql from './db'

const GITHUB_USERNAME = 'Manish10000'
const GITHUB_API_URL = 'https://api.github.com'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  private: boolean
}

interface GitHubUser {
  public_repos: number
  followers: number
  public_gists: number
}

/**
 * Fetch all public repositories from GitHub
 */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
    if (!response.ok) throw new Error('Failed to fetch repos')
    
    const repos: GitHubRepo[] = await response.json()
    // Filter only public repos
    return repos.filter(repo => !repo.private)
  } catch (error) {
    console.error('[v0] Error fetching GitHub repos:', error)
    throw error
  }
}

/**
 * Fetch user stats from GitHub
 */
export async function fetchGitHubUser(): Promise<GitHubUser> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`)
    if (!response.ok) throw new Error('Failed to fetch user')
    
    return await response.json()
  } catch (error) {
    console.error('[v0] Error fetching GitHub user:', error)
    throw error
  }
}

/**
 * Fetch commit count for a repository
 */
export async function fetchRepoCommits(repoName: string): Promise<number> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=1`
    )
    if (!response.ok) return 0
    
    const link = response.headers.get('link')
    if (!link) return response.json().then(arr => arr.length)
    
    const match = link.match(/&page=(\d+)>; rel="last"/)
    return match ? parseInt(match[1], 10) : 0
  } catch (error) {
    console.error(`[v0] Error fetching commits for ${repoName}:`, error)
    return 0
  }
}

/**
 * Sync GitHub data to database
 */
export async function syncGitHubData() {
  try {
    console.log('[v0] Starting GitHub sync...')
    
    const [repos, user] = await Promise.all([fetchGitHubRepos(), fetchGitHubUser()])
    
    // Calculate total stats
    let totalStars = 0
    let totalCommits = 0
    
    for (const repo of repos) {
      totalStars += repo.stargazers_count
      // Fetch commit count for each repo
      const commits = await fetchRepoCommits(repo.name)
      totalCommits += commits
    }
    
    // Upsert each repo into database
    for (const repo of repos) {
      const commits = await fetchRepoCommits(repo.name)
      
      await sql`
        INSERT INTO github_projects (
          repo_id, repo_name, description, url, stars, forks, language, is_visible, sort_order
        ) VALUES (
          ${repo.id}, ${repo.name}, ${repo.description}, ${repo.html_url},
          ${repo.stargazers_count}, ${repo.forks_count}, ${repo.language}, true, 0
        )
        ON CONFLICT (repo_id) DO UPDATE SET
          description = EXCLUDED.description,
          stars = EXCLUDED.stars,
          forks = EXCLUDED.forks,
          language = EXCLUDED.language,
          updated_at = CURRENT_TIMESTAMP
      `
    }
    
    // Update stats
    await sql`
      UPDATE github_stats SET
        total_repos = ${repos.length},
        total_stars = ${totalStars},
        total_commits = ${totalCommits},
        total_followers = ${user.followers},
        last_synced = CURRENT_TIMESTAMP
      WHERE id = 1
    `
    
    console.log('[v0] GitHub sync completed successfully')
    return { success: true, repos: repos.length, stars: totalStars }
  } catch (error) {
    console.error('[v0] Error syncing GitHub data:', error)
    throw error
  }
}

/**
 * Get all visible projects from database
 */
export async function getVisibleProjects() {
  try {
    const projects = await sql`
      SELECT * FROM github_projects
      WHERE is_visible = true
      ORDER BY is_featured DESC, sort_order ASC, updated_at DESC
    `
    return projects
  } catch (error) {
    console.error('[v0] Error fetching visible projects:', error)
    return []
  }
}

/**
 * Get all projects (admin view)
 */
export async function getAllProjects() {
  try {
    const projects = await sql`
      SELECT * FROM github_projects
      ORDER BY is_featured DESC, sort_order ASC, updated_at DESC
    `
    return projects
  } catch (error) {
    console.error('[v0] Error fetching all projects:', error)
    return []
  }
}

/**
 * Get GitHub stats
 */
export async function getGitHubStats() {
  try {
    const stats = await sql`SELECT * FROM github_stats WHERE id = 1`
    return stats[0]
  } catch (error) {
    console.error('[v0] Error fetching GitHub stats:', error)
    return null
  }
}
