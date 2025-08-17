import { NextRequest, NextResponse } from 'next/server'
import { getPublicUrl } from '@/shared/lib/s3'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  
  // Redirect to CloudFront URL
  const cloudFrontUrl = getPublicUrl(`public/toggles/${key}.json`)
  
  return NextResponse.redirect(cloudFrontUrl, 302)
}