import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'

const cloudFrontClient = new CloudFrontClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID!
const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_URL!

export async function invalidateCloudFrontCache(paths: string[]) {
  const command = new CreateInvalidationCommand({
    DistributionId: DISTRIBUTION_ID,
    InvalidationBatch: {
      Paths: {
        Quantity: paths.length,
        Items: paths,
      },
      CallerReference: Date.now().toString(),
    },
  })

  return await cloudFrontClient.send(command)
}

export function getCloudFrontUrl(key: string): string {
  return `${CLOUDFRONT_DOMAIN}/${key}`
}

export async function invalidateToggleCache(toggleKey: string) {
  const paths = [`/${toggleKey}`, `/${toggleKey}/*`]
  return await invalidateCloudFrontCache(paths)
}