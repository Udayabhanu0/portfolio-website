import { NextRequest, NextResponse } from 'next/server'
import { syncGitHubData } from '@/lib/github'
import sql from '@/lib/db'

/**
 * This endpoint should be called by a cron service at 12:01 AM daily
 * Can be triggered by:
 * - Vercel Cron (Enterprise)
 * - External services like EasyCron, cron-job.org, etc.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a trusted source
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.CRON_SECRET

    // For development/testing, allow requests without token
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('[v0] Running scheduled GitHub sync...')

    // Run the sync
    const result = await syncGitHubData()

    // Update last auto sync time
    await sql`
      UPDATE sync_settings SET last_auto_sync = CURRENT_TIMESTAMP WHERE id = 1
    `

    return NextResponse.json({
      success: true,
      message: 'Scheduled sync completed successfully',
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] Scheduled sync error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to run scheduled sync',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Allow status checks without authentication
  try {
    const settings = await sql`SELECT * FROM sync_settings WHERE id = 1`
    const stats = await sql`SELECT * FROM github_stats WHERE id = 1`

    return NextResponse.json({
      sync_enabled: settings[0]?.auto_sync_enabled,
      sync_time: settings[0]?.sync_time,
      last_auto_sync: settings[0]?.last_auto_sync,
      last_manual_sync: settings[0]?.last_manual_sync,
      github_stats: stats[0],
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sync status' },
      { status: 500 }
    )
  }
}
