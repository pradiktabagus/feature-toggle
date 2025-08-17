import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { invalidateToggleCache, getCloudFrontUrl } from '@/entities/cache'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.S3_BUCKET_NAME!

export async function uploadToggleFile(key: string, content: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: content,
    ContentType: 'application/json',
  })
  
  const result = await s3Client.send(command)
  
  // Invalidate CloudFront cache
  try {
    await invalidateToggleCache(key)
  } catch (error) {
    console.warn('CloudFront invalidation failed:', error)
  }
  
  return result
}

export async function getToggleFile(key: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })
  
  const response = await s3Client.send(command)
  return await response.Body?.transformToString()
}

export async function deleteToggleFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })
  
  const result = await s3Client.send(command)
  
  // Invalidate CloudFront cache
  try {
    await invalidateToggleCache(key)
  } catch (error) {
    console.warn('CloudFront invalidation failed:', error)
  }
  
  return result
}

export async function getPresignedUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })
  
  return await getSignedUrl(s3Client, command, { expiresIn })
}

export function getPublicUrl(key: string): string {
  return getCloudFrontUrl(key)
}