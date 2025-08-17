import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import { cache } from '@/shared/lib/cache'
import { ApiResponse } from '@/shared/types/api-response'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params
    
    // Check cache first
    const cacheKey = `toggle:${key}`
    const cachedToggle = cache.get(cacheKey)
    
    if (cachedToggle) {
      return NextResponse.json(cachedToggle)
    }

    const toggle = await prisma.toggle.findUnique({
      where: { key },
      select: {
        key: true,
        name: true,
        value: true,
        type: true,
        isActive: true
      }
    })

    if (!toggle) {
      const response: ApiResponse = {
        success: false,
        message: 'Toggle not found',
        error: { code: 'NOT_FOUND' }
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse = {
      success: true,
      message: 'Toggle retrieved successfully',
      data: toggle
    }
    
    // Cache for 5 minutes
    cache.set(cacheKey, response, 5 * 60 * 1000)
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300', // 5 minutes
        'CDN-Cache-Control': 'max-age=300',
        'Vercel-CDN-Cache-Control': 'max-age=300'
      }
    })
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: 'Failed to fetch toggle',
      error: {
        code: 'FETCH_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}