# Deployment Guidelines & Environment Management

## Environment Setup
- **Development**: `http://localhost:3000` with local `.env.local`
- **Production**: Vercel deployment with environment variables
- **CloudFront**: Global CDN for production API caching

## Pre-Deployment Checklist
- [ ] All tests passing locally
- [ ] Cache functionality tested (hit/miss scenarios)
- [ ] Environment variables configured in Vercel
- [ ] AWS permissions verified (S3 + CloudFront)
- [ ] Database migrations applied
- [ ] No console errors in production build

## Deployment Process
1. **Local Testing**: `bun dev` and test all features
2. **Build Check**: `bun build` to verify production build
3. **Deploy**: `bun run deploy` or auto-deploy via GitHub
4. **Post-Deploy**: Test CloudFront cache and public API
5. **Monitor**: Check cache hit rates and error logs

## Environment Variables Management
- **Never commit**: `.env.local` to version control
- **Vercel Config**: Set all required env vars in dashboard
- **AWS Credentials**: Use least privilege IAM policies
- **Secrets Rotation**: Regular rotation of API keys

## Rollback Strategy
- **Vercel**: Use previous deployment rollback
- **Database**: Prisma migration rollback if needed
- **Cache**: Clear CloudFront cache if corrupted
- **Monitoring**: Check error rates post-deployment

## Performance Monitoring
- **Cache Hit Rate**: Target >80% for public API
- **Response Time**: <50ms cached, <500ms uncached
- **Error Rate**: <0.1% for production APIs
- **CloudFront**: Monitor via AWS Console