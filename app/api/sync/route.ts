import { syncGitHubData } from '@/lib/github'
import sql from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET - Trigger sync and return status
export async function GET(request: NextRequest) {
  try {
    console.log('[v0] Sync triggered via GET')
    
    // Perform the sync
    const result = await syncGitHubData()
    
    // Update last sync time
    try {
      await sql`
        UPDATE sync_settings SET last_manual_sync = CURRENT_TIMESTAMP WHERE id = 1
      `
    } catch (e) {
      console.log('[v0] Could not update sync_settings timestamp, continuing anyway')
    }
    
    return NextResponse.json({
      success: true,
      message: 'GitHub sync completed successfully',
      timestamp: new Date().toISOString(),
      details: result,
    })
  } catch (error) {
    console.error('[v0] Sync error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to sync GitHub data',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// POST - Alternative trigger for sync
export async function POST(request: NextRequest) {
  return GET(request)
}
