# Architecture Patterns & Best Practices

## Feature-Sliced Design (FSD) Structure
```
src/
├── app/                    # Next.js App Router
├── entities/              # Business entities (User, Toggle)
├── features/              # Business features (toggle management)
├── widgets/               # UI widgets (toggle-features, auth)
├── shared/                # Shared utilities
│   ├── api/              # API utilities
│   ├── components/ui/    # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities (prisma, s3, cloudfront)
│   └── types/            # TypeScript types
```

## API Design Patterns
- **RESTful**: Use standard HTTP methods (GET, POST, PUT, DELETE)
- **Response Format**: Consistent `ApiResponse` type with success/error structure
- **Error Handling**: Return appropriate HTTP status codes
- **Validation**: Use Zod schemas for input validation
- **Authentication**: Use `getServerSession()` for protected routes
- **Caching**: Implement cache-first strategy for public APIs

## Database Patterns
- **Prisma ORM**: Use Prisma for all database operations
- **Relationships**: Define proper relations in schema
- **Queries**: Use `select` to limit returned fields
- **Transactions**: Use Prisma transactions for multi-step operations
- **Soft Deletes**: Use `isActive` flag instead of hard deletes

## Caching Architecture
```
External App → CloudFront Edge → S3 Cache → Database (fallback)
                    ↓
Admin UI → Next.js API → Database → Cache Sync → CloudFront Invalidation
```

## Component Patterns
- **Server Components**: Default for data fetching
- **Client Components**: Only when needed (`'use client'`)
- **Composition**: Prefer composition over inheritance
- **Props**: Use TypeScript interfaces for props
- **State**: Use Zustand for global state, useState for local

## Error Handling Strategy
- **API Errors**: Return structured error responses
- **UI Errors**: Show user-friendly messages via toast
- **Cache Errors**: Log warnings, don't block functionality
- **Network Errors**: Implement retry logic where appropriate
- **Validation Errors**: Show field-specific error messages

## Performance Optimization
- **Caching**: CloudFront + S3 for public APIs
- **Code Splitting**: Automatic via Next.js
- **Image Optimization**: Use Next.js Image component
- **Bundle Analysis**: Regular bundle size monitoring
- **Database**: Optimize queries, use proper indexes

## Security Implementation
- **Authentication**: NextAuth.js with OAuth providers
- **Authorization**: Role-based access control
- **Input Sanitization**: Validate all inputs with Zod
- **CORS**: Proper CORS configuration
- **Rate Limiting**: Via CloudFront and API design