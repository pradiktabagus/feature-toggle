import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { cache } from '@/shared/lib/cache'
import { ApiResponse } from '@/shared/types/api-response'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { keys } = await request.json()
    
    // Clear in-memory cache
    if (keys && Array.isArray(keys)) {
      keys.forEach(key => cache.delete(`toggle:${key}`))
    } else {
      cache.clear()
    }

    const response: ApiResponse = {
      success: true,
      message: 'Cache purged successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Cache purge error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Cache purge failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}