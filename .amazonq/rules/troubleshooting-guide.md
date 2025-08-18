# Troubleshooting Guide & Common Issues

## CloudFront Issues

### 502 Bad Gateway
- **Cause**: Origin pointing to Vercel instead of S3
- **Fix**: Change origin to `feature-toggle-files.s3.ap-southeast-1.amazonaws.com`
- **Verify**: Check Origins tab in CloudFront console

### Cache Not Working
- **Cause**: Missing S3 bucket policy or wrong cache keys
- **Fix**: Apply OAC policy, verify cache key format `public/toggles/{key}.json`
- **Debug**: Check `X-Cache-Source` header in API response

### Permission Denied
- **Cause**: Missing CloudFront invalidation permission
- **Fix**: Apply IAM policy from `aws-iam-policy.json`
- **Test**: Try creating/updating toggle, check console logs

## API Issues

### Toggle Not Found
- **Debug**: Check `/api/public/toggles` for available keys
- **Verify**: Ensure toggle is `isActive: true`
- **Cache**: Check if cached version exists in S3

### Slow Response Times
- **Cache Miss**: Normal for first request, should cache after
- **Database**: Check MongoDB Atlas connection
- **CloudFront**: Verify edge location serving request

## Development Issues

### Build Errors
- **TypeScript**: Fix type errors, avoid `any` types
- **Dependencies**: Run `bun install` to sync packages
- **Environment**: Verify all required env vars set

### Authentication Issues
- **OAuth**: Check callback URLs match environment
- **Session**: Verify NextAuth configuration
- **Database**: Ensure user model synced with Prisma

## Debugging Commands
```bash
# Check cache status
curl -I /api/public/toggles/your-key

# List available toggles
curl /api/public/toggles

# Test CloudFront direct
curl https://d338emydppt3j.cloudfront.net/public/toggles/your-key.json

# Check build
bun build

# Database connection
bun run db:studio
```