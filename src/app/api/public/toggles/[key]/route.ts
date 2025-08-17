import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import { getToggleFile, uploadToggleFile } from '@/shared/lib/s3'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  const cacheKey = `public/toggles/${key}.json`
  
  // Detect CloudFront cache status
  const cloudFrontCacheStatus = request.headers.get('x-cache') || request.headers.get('cloudfront-cache-status')
  const isFromCloudFront = request.headers.get('cloudfront-viewer-country') !== null ||
                          request.headers.get('x-forwarded-for') !== null ||
                          request.headers.get('cloudfront-forwarded-proto') !== null
  const cloudFrontHit = cloudFrontCacheStatus?.includes('Hit') ? 'HIT' : 
                       cloudFrontCacheStatus?.includes('Miss') ? 'MISS' : 'UNKNOWN'
  
  try {
    // Try to get from CloudFront cache first
    let cachedData: string | undefined
    try {
      cachedData = await getToggleFile(cacheKey)
    } catch (error) {
      // Cache miss, continue to database
    }

    if (cachedData) {
      const data = JSON.parse(cachedData)
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=3600',
          'CDN-Cache-Control': 'max-age=3600',
          'X-Cache-Source': 'S3-Cache',
          'X-Cache-Status': 'HIT',
          'X-CloudFront-Hit': isFromCloudFront ? 'true' : 'false',
          'X-CloudFront-Cache': isFromCloudFront ? cloudFrontHit : 'N/A'
        }
      })
    }

    // Fallback to database
    const toggle = await prisma.toggle.findFirst({
      where: { 
        key: key,
        isActive: true
      },
      select: {
        key: true,
        name: true,
        value: true,
        type: true,
        isActive: true
      }
    })

    let response
    if (!toggle) {
      response = {
        enabled: false,
        value: null,
        message: 'Toggle not found or inactive'
      }
    } else {
      let parsedValue = toggle.value
      try {
        const valueStr = String(toggle.value)
        if (toggle.type === 'JSON') {
          parsedValue = JSON.parse(valueStr)
        } else if (toggle.type === 'BOOLEAN') {
          parsedValue = valueStr === 'true' || toggle.value === true
        } else if (toggle.type === 'NUMBER') {
          parsedValue = Number(valueStr)
        }
      } catch (error) {
        console.error('Failed to parse toggle value:', error)
      }

      response = {
        enabled: true,
        key: toggle.key,
        name: toggle.name,
        value: parsedValue,
        type: toggle.type
      }
    }

    // Cache the response
    try {
      await uploadToggleFile(cacheKey, JSON.stringify(response))
    } catch (error) {
      console.warn('Failed to cache toggle:', error)
    }

    return NextResponse.json(response, {
      status: toggle ? 200 : 404,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
        'CDN-Cache-Control': 'max-age=3600',
        'X-Cache-Source': 'Database',
        'X-Cache-Status': 'MISS',
        'X-CloudFront-Hit': isFromCloudFront ? 'true' : 'false',
        'X-CloudFront-Cache': isFromCloudFront ? cloudFrontHit : 'N/A'
      }
    })
  } catch (error) {
    console.error('Public API error:', error)
    return NextResponse.json({
      enabled: false,
      value: null,
      message: 'Internal server error'
    }, { status: 500 })
  }
}