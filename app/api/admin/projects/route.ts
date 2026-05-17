import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

// GET all projects (admin)
export async function GET(request: NextRequest) {
  try {
    const projects = await sql`
      SELECT * FROM github_projects
      ORDER BY is_featured DESC, sort_order ASC, updated_at DESC
    `
    
    // Cache response for 1 hour (3600 seconds)
    const response = NextResponse.json(projects)
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    return response
  } catch (error) {
    console.error('[v0] Error fetching projects:', error)
    // Return empty array instead of error object to maintain consistency
    // The frontend expects an array, not an error object
    return NextResponse.json([])
  }
}

// UPDATE project visibility, featured status, and sort order
export async function PATCH(request: NextRequest) {
  try {
    const { id, is_visible, is_featured, sort_order } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const updates: string[] = []
    const values: (boolean | number)[] = [id]

    if (is_visible !== undefined) {
      updates.push(`is_visible = $${updates.length + 2}`)
      values.push(is_visible)
    }
    if (is_featured !== undefined) {
      updates.push(`is_featured = $${updates.length + 2}`)
      values.push(is_featured)
    }
    if (sort_order !== undefined) {
      updates.push(`sort_order = $${updates.length + 2}`)
      values.push(sort_order)
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)

    const query = `UPDATE github_projects SET ${updates.join(', ')} WHERE id = $1`
    
    await sql(query, values)

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
    })
  } catch (error) {
    console.error('[v0] Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}
