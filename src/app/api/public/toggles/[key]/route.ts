import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import { getToggleFile, uploadToggleFile } from '@/shared/lib/s3'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  const cacheKey = `public/toggles/${key}.json`
  
  // Cache configuration from environment (in seconds)
  const BROWSER_CACHE = parseInt(process.env.BROWSER_CACHE_SECONDS || '300')    // Default: 5 minutes
  const CLOUDFRONT_CACHE = parseInt(process.env.CLOUDFRONT_CACHE_SECONDS || '3600') // Default: 1 hour
  
  // Detect CloudFront cache status
  const xCache = request.headers.get('x-cache')
  const cfCacheStatus = request.headers.get('cloudfront-cache-status')
  const cfViewerCountry = request.headers.get('cloudfront-viewer-country')
  const cfForwardedProto = request.headers.get('cloudfront-forwarded-proto')
  
  const isFromCloudFront = cfViewerCountry !== null || cfForwardedProto !== null
  
  let cloudFrontHit = 'UNKNOWN'
  if (xCache) {
    if (xCache.toLowerCase().includes('hit')) cloudFrontHit = 'HIT'
    else if (xCache.toLowerCase().includes('miss')) cloudFrontHit = 'MISS'
  } else if (cfCacheStatus) {
    if (cfCacheStatus.toLowerCase().includes('hit')) cloudFrontHit = 'HIT'
    else if (cfCacheStatus.toLowerCase().includes('miss')) cloudFrontHit = 'MISS'
  }
  
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
          'Cache-Control': `public, max-age=${BROWSER_CACHE}, s-maxage=${CLOUDFRONT_CACHE}`,
          'CDN-Cache-Control': `max-age=${CLOUDFRONT_CACHE}`,
          'X-Cache-Source': 'S3-Cache',
          'X-Cache-Status': 'HIT',
          'X-CloudFront-Hit': isFromCloudFront ? 'true' : 'false',
          'X-CloudFront-Cache': isFromCloudFront ? cloudFrontHit : 'N/A',
          'X-Debug-Headers': JSON.stringify({
            'x-cache': xCache,
            'cf-cache-status': cfCacheStatus,
            'cf-viewer-country': cfViewerCountry,
            'cf-forwarded-proto': cfForwardedProto
          })
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
        'Cache-Control': `public, max-age=${BROWSER_CACHE}, s-maxage=${CLOUDFRONT_CACHE}`,
        'CDN-Cache-Control': `max-age=${CLOUDFRONT_CACHE}`,
        'X-Cache-Source': 'Database',
        'X-Cache-Status': 'MISS',
        'X-CloudFront-Hit': isFromCloudFront ? 'true' : 'false',
        'X-CloudFront-Cache': isFromCloudFront ? cloudFrontHit : 'N/A',
        'X-Debug-Headers': JSON.stringify({
          'x-cache': xCache,
          'cf-cache-status': cfCacheStatus,
          'cf-viewer-country': cfViewerCountry,
          'cf-forwarded-proto': cfForwardedProto
        })
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