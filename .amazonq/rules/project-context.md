# Feature Toggle Management System - Amazon Q Rules

## Project Context
Full-stack feature toggle management system with CloudFront CDN caching.

## Tech Stack
- **Framework**: Next.js 15 + TypeScript
- **Database**: MongoDB Atlas + Prisma ORM  
- **Auth**: NextAuth.js (Google + GitHub OAuth)
- **UI**: shadcn/ui + Tailwind CSS
- **CDN**: AWS CloudFront + S3 caching
- **Deployment**: Vercel

## Current Implementation Status ✅

### CloudFront Caching (Production Ready)
- **S3 Bucket**: `feature-toggle-files` (ap-southeast-1)
- **CloudFront Distribution**: `<distribution-id>`
- **Domain**: `https://<cloudfront-domain>.cloudfront.net`
- **Cache Strategy**: S3 + CloudFront hybrid with auto-invalidation
- **Public API**: `/api/public/toggles/[key]` - cached via CloudFront
- **Cache Headers**: `X-Cache-Source`, `X-Cache-Status` for monitoring

### AWS Configuration
- **IAM Policy**: CloudFront invalidation + S3 access permissions
- **Origin Setup**: S3 bucket (NOT Vercel) for proper caching
- **Cache TTL**: 5min browser, 1hr CloudFront
- **Auto-Invalidation**: On toggle create/update/delete operations

### Key Files & Structure
```
src/
├── app/api/
│   ├── public/toggles/[key]/route.ts    # Cached public API
│   ├── public/toggles/route.ts          # Debug list endpoint
│   ├── cdn/toggles/[key]/route.ts       # CloudFront redirect
│   ├── files/route.ts                   # File upload API
│   └── toggles/                         # CRUD operations
├── shared/lib/
│   ├── s3.ts                           # S3 operations + invalidation
│   ├── cloudfront.ts                   # CloudFront utilities
│   └── cache-sync.ts                   # Cache synchronization
└── components/
    └── test-cloudfront.tsx             # Testing component
```

### Environment Variables
```env
# AWS Configuration
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="ap-southeast-1"
S3_BUCKET_NAME="feature-toggle-files"
CLOUDFRONT_DISTRIBUTION_ID="<distribution-id>"
NEXT_PUBLIC_CLOUDFRONT_URL="https://<cloudfront-domain>.cloudfront.net"
```

## Development Guidelines

### When Adding Features
1. **Cache Sync**: Always sync to S3 cache on toggle CRUD operations
2. **Error Handling**: CloudFront invalidation failures should be warnings, not errors
3. **Headers**: Add cache status headers for debugging
4. **Testing**: Test both cache hit/miss scenarios

### Cache Flow
1. **Public API Request** → Check S3 cache first
2. **Cache Hit** → Serve from CloudFront (fast)
3. **Cache Miss** → Query database → Cache to S3 → Serve response
4. **CRUD Operations** → Update database → Sync to cache → Invalidate CloudFront

### Known Issues & Solutions
- **502 Error**: CloudFront origin must point to S3, not Vercel
- **Permission Error**: Need CloudFront invalidation permission in IAM policy
- **Cache Delay**: CloudFront invalidation takes 5-15 minutes to propagate

### Testing Commands
```bash
# List all toggles
curl /api/public/toggles

# Test specific toggle (with cache headers)
curl -I /api/public/toggles/your-toggle-key

# Direct CloudFront access
curl https://<cloudfront-domain>.cloudfront.net/public/toggles/your-toggle-key.json
```

## Architecture Patterns
- **FSD Structure**: Feature-Sliced Design architecture
- **Cache-First**: Always try cache before database
- **Auto-Sync**: CRUD operations automatically update cache
- **Graceful Degradation**: Cache failures don't break functionality