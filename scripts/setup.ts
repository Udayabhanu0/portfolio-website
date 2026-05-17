/**
 * Setup script to initialize admin user and sync GitHub data
 * Run with: npx ts-node scripts/setup.ts
 */

import sql from '@/lib/db'
import { syncGitHubData } from '@/lib/github'
import bcrypt from 'bcryptjs'

async function setup() {
  try {
    console.log('[v0] Starting setup...')

    // Check if admin user exists
    const adminUsers = await sql`SELECT * FROM admin_users WHERE email = 'admin@portfolio.dev'`

    if (adminUsers.length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('changeme123', 10)
      await sql`
        INSERT INTO admin_users (email, password_hash)
        VALUES ('admin@portfolio.dev', ${hashedPassword})
      `
      console.log('[v0] Created admin user: admin@portfolio.dev / changeme123')
    } else {
      console.log('[v0] Admin user already exists')
    }

    // Sync GitHub data
    console.log('[v0] Syncing GitHub data...')
    const result = await syncGitHubData()
    console.log('[v0] GitHub sync completed:', result)

    console.log('[v0] Setup complete!')
    console.log('[v0] Remember to:')
    console.log('[v0] 1. Change the admin password after first login')
    console.log('[v0] 2. Visit /admin to manage your projects')
  } catch (error) {
    console.error('[v0] Setup error:', error)
    process.exit(1)
  }
}

setup()
