# CloudFront Setup Guide

## Overview
CloudFront integration provides CDN caching for your S3 files, improving performance and reducing costs.

## Configuration Complete ✅

### Environment Variables
Your `.env.local` already contains:
```env
CLOUDFRONT_DISTRIBUTION_ID="E18PZOVM8J99OL"
CLOUDFRONT_DOMAIN="d338emydppt3j.cloudfront.net"
NEXT_PUBLIC_CLOUDFRONT_URL="https://d338emydppt3j.cloudfront.net"
```

### Features Implemented

1. **CloudFront Client** (`src/shared/lib/cloudfront.ts`)
   - Cache invalidation
   - URL generation
   - Toggle-specific cache management

2. **S3 Integration** (`src/shared/lib/s3.ts`)
   - Automatic cache invalidation on upload/delete
   - Public URL generation via CloudFront
   - Fallback error handling

3. **File Upload API** (`src/app/api/files/route.ts`)
   - Authenticated file uploads
   - CloudFront URL responses
   - UUID-based file naming

## Usage

### Public API with CloudFront Cache
```javascript
// External apps use this - cached via CloudFront
const response = await fetch('/api/public/toggles/my-toggle-key')
const toggle = await response.json()
// { enabled: true, key: 'my-toggle-key', value: true, type: 'BOOLEAN' }

// Direct CloudFront URL (fastest)
const directUrl = 'https://d338emydppt3j.cloudfront.net/public/toggles/my-toggle-key.json'
```

### CDN Redirect Endpoint
```javascript
// Redirects to CloudFront URL
fetch('/api/cdn/toggles/my-toggle-key') // → 302 to CloudFront
```

### Get Public URLs
```javascript
import { getPublicUrl } from '@/shared/lib/s3'

const url = getPublicUrl('toggles/my-file.json')
// Returns: https://d338emydppt3j.cloudfront.net/toggles/my-file.json
```

### Manual Cache Invalidation
```javascript
import { invalidateToggleCache } from '@/shared/lib/cloudfront'

await invalidateToggleCache('toggles/my-file.json')
```

## Benefits

- ⚡ **Fast Global Access**: CDN edge locations worldwide
- 💰 **Cost Reduction**: Reduced database hits and S3 costs
- 🔄 **Auto Cache Management**: Sync on CRUD operations
- 🛡️ **Security**: Public read, authenticated admin
- 📈 **Scalability**: Handle millions of toggle requests
- ⏱️ **Performance**: Cache-first with database fallback

## Next Steps

1. Test file upload via `/api/files` endpoint
2. Verify CloudFront URLs are accessible
3. Monitor cache hit rates in AWS Console
4. Consider adding custom domain if needed