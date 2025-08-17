import { prisma } from '@/shared/lib/prisma'
import { uploadToggleFile, deleteToggleFile } from '@/shared/lib/s3'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'

const cloudfront = new CloudFrontClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

async function invalidateCloudFront(paths: string[]) {
  if (!process.env.CLOUDFRONT_DISTRIBUTION_ID) return
  
  try {
    await cloudfront.send(new CreateInvalidationCommand({
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        Paths: {
          Quantity: paths.length,
          Items: paths,
        },
        CallerReference: `invalidation-${Date.now()}`,
      },
    }))
  } catch (error) {
    console.error('CloudFront invalidation failed:', error)
  }
}

export async function syncToggleToCache(toggleKey: string) {
  try {
    const toggle = await prisma.toggle.findFirst({
      where: { 
        key: toggleKey,
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

    const cacheKey = `public/toggles/${toggleKey}.json`

    if (!toggle) {
      try {
        await deleteToggleFile(cacheKey)
      } catch (error) {
        // File might not exist, ignore
      }
      return
    }

    // Parse value based on type
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

    const response = {
      enabled: true,
      key: toggle.key,
      name: toggle.name,
      value: parsedValue,
      type: toggle.type,
      cached: new Date().toISOString()
    }

    await uploadToggleFile(cacheKey, JSON.stringify(response))
    
    // Invalidate CloudFront cache
    await invalidateCloudFront([`/api/public/toggles/${toggleKey}`])
  } catch (error) {
    console.error('Failed to sync toggle to cache:', error)
  }
}

export async function removeToggleFromCache(toggleKey: string) {
  try {
    const cacheKey = `public/toggles/${toggleKey}.json`
    await deleteToggleFile(cacheKey)
    
    // Invalidate CloudFront cache
    await invalidateCloudFront([`/api/public/toggles/${toggleKey}`])
  } catch (error) {
    // File might not exist, ignore
  }
}