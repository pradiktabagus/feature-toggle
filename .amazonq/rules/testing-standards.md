# Testing Standards & Guidelines

## Testing Strategy
- **Unit Tests**: Jest + Testing Library for components and utilities
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Critical user flows with Playwright
- **Cache Tests**: CloudFront hit/miss scenarios mandatory

## Test File Structure
```
src/
├── __tests__/           # Global test utilities
├── app/api/__tests__/   # API route tests
├── shared/lib/__tests__/ # Utility function tests
└── components/__tests__/ # Component tests
```

## Required Test Coverage
- **API Routes**: All CRUD operations + cache scenarios
- **Cache Functions**: S3 operations, CloudFront invalidation
- **Components**: User interactions and error states
- **Utilities**: Pure functions and data transformations

## Test Naming Convention
- **Files**: `*.test.ts` or `*.test.tsx`
- **Describe blocks**: Feature or component name
- **Test cases**: "should [expected behavior] when [condition]"

## Cache Testing Requirements
- Test cache HIT and MISS scenarios
- Verify cache headers (`X-Cache-Source`, `X-Cache-Status`)
- Test CloudFront invalidation (mock in tests)
- Validate S3 file operations

## Mock Standards
- **Database**: Mock Prisma client
- **AWS Services**: Mock S3 and CloudFront clients
- **External APIs**: Mock fetch calls
- **Authentication**: Mock NextAuth sessions