# Development Standards & Guidelines

## Code Quality Rules
- **TypeScript**: Strict mode, no `any` types unless absolutely necessary
- **ESLint**: Follow Next.js recommended rules
- **File Structure**: Use Feature-Sliced Design (FSD) architecture
- **Imports**: Use absolute imports with `@/` prefix
- **Components**: Use shadcn/ui components, avoid custom styling
- **Error Handling**: Always handle errors gracefully, log to console

## Pull Request Guidelines
- **Title**: Use conventional commits format: `feat:`, `fix:`, `docs:`, `refactor:`
- **Description**: Include what changed, why, and testing steps
- **Files**: Keep PRs focused, max 10 files changed
- **Testing**: Test locally before PR, include cache testing for API changes
- **Breaking Changes**: Document any breaking changes clearly

## Issue Creation Standards
- **Bug Reports**: Include steps to reproduce, expected vs actual behavior
- **Feature Requests**: Include user story, acceptance criteria, technical approach
- **Labels**: Use appropriate labels: `bug`, `enhancement`, `documentation`, `cache`, `aws`
- **Priority**: Mark as `high`, `medium`, `low` priority
- **Assignee**: Assign to appropriate team member

## Tech Stack Constraints
- **Framework**: Next.js 15 only, no other React frameworks
- **Database**: MongoDB Atlas with Prisma ORM only
- **UI**: shadcn/ui + Tailwind CSS, no other UI libraries
- **Auth**: NextAuth.js only, no custom auth solutions
- **CDN**: AWS CloudFront + S3, no other CDN providers
- **Deployment**: Vercel only for application hosting
- **Package Manager**: Bun preferred, npm as fallback

## Cache Implementation Rules
- **Always**: Sync cache on CRUD operations via `cache-sync.ts`
- **Headers**: Include `X-Cache-Source` and `X-Cache-Status` for debugging
- **Error Handling**: Cache failures should be warnings, not blocking errors
- **Testing**: Test both cache hit and miss scenarios
- **Invalidation**: Use CloudFront invalidation, handle permission errors gracefully

## AWS Resource Naming
- **S3 Bucket**: `feature-toggle-files` (existing)
- **CloudFront**: `E18PZOVM8J99OL` (existing)
- **Cache Keys**: `public/toggles/{key}.json` format
- **IAM Policies**: Descriptive names like `FeatureToggleCloudFrontPolicy`

## Security Guidelines
- **Environment Variables**: Never commit secrets, use `.env.local`
- **API Keys**: Rotate regularly, use least privilege principle
- **CORS**: Configure properly for CloudFront domains
- **Input Validation**: Use Zod schemas for all API inputs
- **Authentication**: Protect all admin APIs, public APIs read-only