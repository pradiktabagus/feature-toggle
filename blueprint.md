# Project Blueprint: Toggle Feature System

## Overview

This project aims to develop a custom toggle feature system using Next.js, serving as an alternative to Firebase Remote Config to address potential usage limits. The system will also include a simple dashboard for monitoring toggle usage. The project adopts the Feature-Sliced Design (FSD) architecture for better code organization.

## Project Details

*   **Purpose:**
    *   To create a self-hosted toggle feature management system.
    *   To provide a dashboard for monitoring toggle feature usage with basic visualizations (e.g., simple graphs).
*   **Technology Stack:**
    *   **Fullstack:** Next.js (App Router) with API Routes
    *   **Frontend:** React, TypeScript
    *   **UI Components:** shadcn/ui, Radix UI, Tailwind CSS
    *   **Form Management:** react-hook-form with zod resolver
    *   **Form Validation:** zod with custom validation rules
    *   **Code Editor:** CodeMirror with JSON syntax highlighting
    *   **Table:** TanStack Table with sorting and filtering
    *   **API Communication:** Axios, Tanstack React Query
    *   **Database:** MongoDB with Prisma ORM
    *   **Authentication:** NextAuth.js with Google/GitHub SSO
    *   **Hosting:** Cloudflare Pages or Firebase Hosting
*   **Architecture:** Feature-Sliced Design (FSD)
*   **Key Features:**
    *   Creation, management, and toggling of features.
    *   Dashboard for monitoring toggle usage (including simple graphs).
    *   User authentication (initially via Firebase).
*   **Current Status:**
    *   ✅ FSD folder structure implemented
    *   ✅ shadcn/ui components integrated
    *   ✅ Toggle features page completed
    *   ✅ Create/Edit functionality implemented
    *   ✅ Form validation with zod
    *   ✅ JSON syntax highlighting
    *   ✅ Dynamic form inputs based on type

## Implemented Features (`/toggle-features`)

The toggle features page has been successfully implemented as the central hub for managing toggle features.

### Implemented Components

*   ✅ **Toggle Data Table:** Responsive data table displaying toggle features with columns for name, description, value, type, and last update.
*   ✅ **Generic Form Modal:** Single modal component supporting both create and edit modes with dynamic titles and buttons.
*   ✅ **Add Parameter Button:** Clean button component for triggering create modal.
*   ✅ **Row Actions Dropdown:** Dropdown menu with edit, duplicate, and delete actions for each table row.
*   ✅ **Dynamic Form Inputs:** 
    *   String: Text input with auto-quote wrapping
    *   Number: Numeric input with validation
    *   Boolean: Toggle switch component
    *   JSON: CodeMirror editor with syntax highlighting

### Architecture Implementation (FSD)

```
src/features/toggle/
├── model/                    # Business logic layer
│   ├── types.ts             # Domain types (ToggleData, CreateToggleData, ToggleFormMode)
│   ├── schemas.ts           # Zod validation schemas
│   ├── use-toggle-modal.ts  # Modal state management hook
│   ├── use-toggle-form.ts   # Generic form hook (create/edit)
│   ├── columns.tsx          # Dynamic table column definitions
│   └── index.ts             # Barrel exports
├── lib/                     # Pure functions layer
│   ├── utils.ts             # Helper functions (placeholders, defaults)
│   └── index.ts             # Barrel exports
└── ui/                      # Presentation layer
    ├── toggle-table.tsx     # Data table component
    ├── toggle-add-parameter.tsx # Add button component
    ├── toggle-action.tsx    # Row actions dropdown
    └── toggle-form-modal.tsx # Generic form modal
```

### API Endpoints (Next.js API Routes)

#### Management APIs (Admin Dashboard)
*   `GET /api/toggles`: Fetch a list of all toggle features
*   `POST /api/toggles`: Create a new toggle feature
*   `PUT /api/toggles/[id]`: Update an existing toggle feature
*   `DELETE /api/toggles/[id]`: Delete a toggle feature
*   `GET /api/toggles/[id]`: Get single toggle feature
*   `POST /api/toggles/[id]/duplicate`: Duplicate toggle feature

#### Public APIs (External Applications)
*   `GET /api/public/toggles`: Get all active toggles (cached)
*   `GET /api/public/toggles/[key]`: Get specific toggle by key (cached)
*   `GET /api/public/toggles/bulk`: Get multiple toggles by keys (cached)
*   `POST /api/public/toggles/evaluate`: Evaluate toggle with context (cached)

### Data Structures

#### Frontend Types
*   **ToggleData:** Main entity with id, name, description, value, type, update fields
*   **CreateToggleData:** Form data type for create/edit operations
*   **ToggleFormMode:** Type-safe mode enum ('create' | 'edit')
*   **Type System:** Support for String, Number, Boolean, and JSON value types

#### Backend Entities (Planned)

**Prisma + MongoDB Implementation:**
*   **Prisma Schema:** Type-safe document schema with JSON support
*   **Generated Types:** Auto-generated TypeScript types
*   **Prisma Client:** Type-safe database client
*   **Database Push:** Schema synchronization (no migrations)
*   **API DTOs:** Data transfer objects for API communication
*   **Validation Schemas:** Server-side validation with zod


## Technical Decisions

### Database Choice: MongoDB + Prisma
**Primary Choice:** **Prisma + MongoDB** for modern development experience

#### Option A: MongoDB + Mongoose
**Pros:**
*   ✅ **Flexible Schema:** Toggle values can be any JSON structure
*   ✅ **Document-based:** Perfect for dynamic toggle configurations
*   ✅ **Simpler Setup:** No schema migrations needed
*   ✅ **JSON Native:** Direct JSON storage without transformation
*   ✅ **Lightweight:** Less overhead for simple CRUD
*   ✅ **Mature Ecosystem:** Well-established patterns

**Cons:**
*   ❌ **No Type Generation:** Manual type definitions
*   ❌ **Query Builder:** Less sophisticated than Prisma
*   ❌ **Schema Validation:** Runtime validation only

#### Option B: PostgreSQL + Prisma
**Pros:**
*   ✅ **Type Safety:** Full TypeScript integration
*   ✅ **Schema Management:** Automatic migrations
*   ✅ **Query Builder:** Type-safe database queries
*   ✅ **Developer Experience:** Excellent tooling and IntelliSense
*   ✅ **Relational Data:** Better for complex relationships
*   ✅ **ACID Compliance:** Strong consistency guarantees

**Cons:**
*   ❌ **JSON Handling:** More complex for dynamic JSON structures
*   ❌ **Schema Rigidity:** Requires predefined schema
*   ❌ **Setup Complexity:** More configuration needed
*   ❌ **Migration Overhead:** Schema changes require migrations

#### Option C: MongoDB + Prisma (Best of Both Worlds)
**Pros:**
*   ✅ **Type Safety:** Full TypeScript integration like PostgreSQL
*   ✅ **Flexible Schema:** Document-based like native MongoDB
*   ✅ **Developer Experience:** Prisma tooling + MongoDB flexibility
*   ✅ **JSON Native:** Direct JSON storage with type safety
*   ✅ **Query Builder:** Type-safe queries for MongoDB
*   ✅ **Auto-generated Types:** No manual type definitions
*   ✅ **Modern Tooling:** Prisma Studio, introspection, etc.

**Cons:**
*   ❌ **Newer Feature:** Less mature than Prisma + PostgreSQL
*   ❌ **Limited Relations:** MongoDB limitations for complex joins
*   ❌ **Learning Curve:** Need to understand both Prisma and MongoDB concepts
*   ❌ **Community:** Smaller community compared to Prisma + PostgreSQL

### Authentication Options Analysis

#### Option A: NextAuth.js (Recommended)
**Pros:**
*   ✅ **Multiple Providers:** Google, GitHub, Discord, etc.
*   ✅ **Built-in Security:** CSRF protection, secure cookies
*   ✅ **Next.js Integration:** Native App Router support
*   ✅ **Database Sessions:** Works with Prisma + MongoDB
*   ✅ **TypeScript Support:** Full type safety
*   ✅ **Customizable:** Custom sign-in pages, callbacks
*   ✅ **JWT + Sessions:** Flexible token management

**Cons:**
*   ❌ **Learning Curve:** Configuration complexity
*   ❌ **Bundle Size:** Adds some overhead

#### Option B: Firebase Authentication
**Pros:**
*   ✅ **Easy Setup:** Minimal configuration
*   ✅ **Multiple Providers:** Google, GitHub, Twitter, etc.
*   ✅ **Real-time:** Built-in user state management
*   ✅ **Security Rules:** Fine-grained access control

**Cons:**
*   ❌ **Vendor Lock-in:** Firebase ecosystem dependency
*   ❌ **Cost:** Can be expensive at scale
*   ❌ **Limited Customization:** Less flexible than NextAuth

#### Option C: Clerk (Modern Alternative)
**Pros:**
*   ✅ **Developer Experience:** Excellent DX and UI components
*   ✅ **Multiple Providers:** Google, GitHub, Discord, etc.
*   ✅ **Built-in UI:** Pre-built auth components
*   ✅ **Organizations:** Team management features
*   ✅ **Webhooks:** Real-time user events

**Cons:**
*   ❌ **Cost:** Paid service after free tier
*   ❌ **Vendor Lock-in:** Third-party dependency

#### Option D: Supabase Auth
**Pros:**
*   ✅ **Open Source:** Self-hostable
*   ✅ **Multiple Providers:** Google, GitHub, Discord, etc.
*   ✅ **Row Level Security:** Database-level permissions
*   ✅ **Real-time:** Built-in subscriptions

**Cons:**
*   ❌ **Additional Service:** Another service to manage
*   ❌ **Learning Curve:** Supabase-specific patterns

### Recommended Authentication Stack

#### Primary Choice: NextAuth.js + Google/GitHub SSO
```typescript
// Configuration Example
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
}
```

#### Benefits for Toggle System:
*   🎯 **Developer-Friendly:** Perfect for internal tools
*   🎯 **No Extra Cost:** Free for any scale
*   🎯 **Prisma Integration:** Works seamlessly with our database
*   🎯 **Secure by Default:** Industry best practices
*   🎯 **Customizable:** Can add role-based access later

### Caching Strategy Analysis

#### Option A: Redis (Recommended for Production)
**Pros:**
*   ✅ **High Performance:** Sub-millisecond response times
*   ✅ **Distributed:** Multiple app instances can share cache
*   ✅ **TTL Support:** Automatic cache expiration
*   ✅ **Pub/Sub:** Real-time cache invalidation
*   ✅ **Data Structures:** Lists, sets, hashes for complex caching
*   ✅ **Persistence:** Optional data persistence
*   ✅ **Clustering:** High availability and scaling

**Cons:**
*   ❌ **Additional Service:** Requires Redis server/cloud
*   ❌ **Memory Usage:** Stores data in RAM
*   ❌ **Cost:** Redis Cloud pricing for production

#### Option B: AWS CloudFront + Lambda@Edge
**Pros:**
*   ✅ **Global CDN:** 400+ edge locations worldwide
*   ✅ **Edge Computing:** Lambda@Edge for dynamic caching
*   ✅ **Cost Effective:** 1TB free data transfer/month
*   ✅ **High Performance:** Sub-10ms response times
*   ✅ **Flexible:** Custom caching rules and TTL
*   ✅ **AWS Integration:** Works with any backend

**Cons:**
*   ❌ **Complexity:** More configuration required
*   ❌ **Learning Curve:** AWS-specific knowledge needed
*   ❌ **Cold Start:** Lambda@Edge initialization time



#### Option C: Upstash Redis (Serverless)
**Pros:**
*   ✅ **Serverless:** Pay-per-request pricing
*   ✅ **Global:** Multi-region replication
*   ✅ **Free Tier:** 10,000 requests/day free
*   ✅ **Redis Compatible:** Full Redis API support
*   ✅ **Edge Caching:** Built-in edge locations

**Cons:**
*   ❌ **Request Limits:** Free tier limitations
*   ❌ **Vendor Lock-in:** Upstash-specific
*   ❌ **Cost Scaling:** Can get expensive at scale

#### Option D: In-Memory Caching (Node.js)
**Pros:**
*   ✅ **Zero Cost:** No external dependencies
*   ✅ **Ultra Fast:** Direct memory access
*   ✅ **Simple Implementation:** Built-in Map/LRU cache
*   ✅ **No Network Latency:** Local cache access

**Cons:**
*   ❌ **Single Instance:** Not shared across app instances
*   ❌ **Memory Limits:** Limited by server RAM
*   ❌ **No Persistence:** Lost on server restart
*   ❌ **Scaling Issues:** Each instance has separate cache

### Free Tier Comparison

#### AWS CloudFront (Most Generous)
*   ✅ **1TB Data Transfer:** Per month forever
*   ✅ **10M HTTP Requests:** Per month forever
*   ✅ **2M CloudFront Function Invocations:** Per month
*   ✅ **No Time Limit:** Permanent free tier
*   💰 **Cost after free tier:** $0.085/GB + $0.0075/10K requests

#### Upstash Redis
*   ✅ **10,000 Requests:** Per day
*   ✅ **256MB Storage:** Included
*   ✅ **Global Replication:** Included
*   ❌ **Daily Limit:** Resets every 24 hours
*   💰 **Cost after free tier:** $0.2/100K requests



#### Redis Cloud
*   ✅ **30MB Storage:** Free tier
*   ✅ **30 Connections:** Concurrent
*   ❌ **Very Limited:** Not suitable for production
*   💰 **Cost after free tier:** $5/month minimum

#### MongoDB Atlas (Database)
*   ✅ **512MB Storage:** Free tier
*   ✅ **Shared Cluster:** M0 tier
*   ✅ **No Time Limit:** Permanent free tier
*   💰 **Cost after free tier:** $9/month (M2 dedicated)

### Recommended Free Tier Architecture

#### Option A: CloudFront + In-Memory (Best Free Option)
```typescript
// Layer 1: CloudFront CDN (1TB free/month)
// Cache-Control: public, max-age=300, s-maxage=60

// Layer 2: In-Memory Cache (Zero cost)
const cache = new Map();
const getCachedToggle = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < 300000) { // 5 min TTL
    return cached.data;
  }
  return null;
};

// Layer 3: MongoDB Atlas (512MB free)
// Optimized with proper indexing
```

#### Option B: CloudFront + Upstash (Scalable Free)
```typescript
// Layer 1: CloudFront CDN (1TB free/month)
// Layer 2: Upstash Redis (10K requests/day free)
// Layer 3: MongoDB Atlas (512MB free)

// Perfect for moderate traffic with room to scale
```

#### Cost Projection for Toggle System
```
Scenario: 1M API calls/month

Option A (CloudFront + In-Memory + Cloudflare):
- CloudFront: FREE (under 1TB + 10M requests)
- Cloudflare Pages: FREE (unlimited requests)
- MongoDB: FREE (under 512MB)
- Total: $0/month

Option B (CloudFront + Upstash + Firebase):
- CloudFront: FREE
- Upstash: $60/month (300K requests/day)
- MongoDB: FREE
- Firebase Hosting: FREE (10GB storage)
- Total: $60/month

Option C (All Premium):
- CloudFront: $10/month
- Redis Cloud: $15/month
- MongoDB: $9/month
- Firebase Hosting: FREE
- Total: $34/month
```

#### Cache Invalidation Strategy
```typescript
// When toggle is updated
const updateToggle = async (id: string, data: UpdateToggleData) => {
  // 1. Update database
  const updated = await prisma.toggle.update({ where: { id }, data });
  
  // 2. Invalidate Redis cache
  await redis.del(`toggle:${updated.key}`);
  await redis.del('toggles:all');
  
  // 3. Trigger edge cache revalidation
  await revalidateTag('toggles');
  
  return updated;
};
```

#### Performance Targets (Free Tier)
*   **CloudFront Edge:** < 10ms (cache hit)
*   **API Response:** < 50ms (in-memory cache hit)
*   **Database Query:** < 100ms (cache miss)
*   **Cache Hit Ratio:** > 90% (CloudFront + In-Memory)
*   **Global Availability:** 99.9% (CloudFront SLA)

#### Scaling Strategy
```
Traffic Level → Recommended Architecture

< 100K requests/month:
- CloudFront + In-Memory + MongoDB Free + Cloudflare Pages
- Cost: $0/month (100% Free)

100K - 1M requests/month:
- CloudFront + Upstash + MongoDB Free + Firebase Hosting
- Cost: $60/month

> 1M requests/month:
- CloudFront + Redis Cloud + MongoDB Atlas + Firebase Hosting
- Cost: $34/month
```

### Hosting Options Analysis

#### Cloudflare Pages + Workers
*   ✅ **Performance:** Global edge network
*   ✅ **Cost:** Generous free tier
*   ✅ **Integration:** Works well with Next.js
*   ❌ **Complexity:** Requires Workers for API routes

#### Firebase Hosting + Functions
*   ✅ **Simplicity:** Easy deployment
*   ✅ **Integration:** Built-in auth and database options
*   ✅ **Scaling:** Automatic scaling
*   ❌ **Vendor Lock-in:** Firebase ecosystem dependency



### Chosen Architecture: Hybrid MongoDB + S3 Approach

```
Toggle System Architecture (Hybrid - 100% Free Tier)
├── CloudFront CDN (1TB free/month)
│   ├── Global Edge Locations (400+)
│   ├── Cache-Control Headers
│   └── Custom TTL Rules
├── Next.js Fullstack App
│   ├── Frontend (React + shadcn/ui)
│   ├── Admin API Routes (/api/toggles/*)
│   ├── Public API Routes (/api/public/toggles/*)
│   └── In-Memory Cache Layer (LRU)
├── Data Storage (Hybrid):
│   ├── MongoDB Atlas (512MB free)
│   │   ├── User Management (NextAuth)
│   │   ├── Activity Logs
│   │   ├── Toggle Metadata
│   │   └── Prisma ORM
│   └── AWS S3 (5GB free)
│       ├── Toggle JSON Files
│       ├── Environment Configs
│       ├── Version History
│       └── Backup Files
├── Hosting Options:
│   ├── Cloudflare Pages (FREE unlimited)
│   └── Firebase Hosting (FREE 10GB)
└── Entities Layer (FSD)

Total Cost: $0/month (100% Free Tier)
```

#### Hybrid Architecture Benefits:

**MongoDB for Structured Data:**
*   🎯 **User Management:** NextAuth sessions, profiles, roles
*   🎯 **Activity Tracking:** User actions, audit logs, analytics
*   🎯 **Toggle Metadata:** Created by, updated at, permissions
*   🎯 **Relational Queries:** Complex user-toggle relationships

**S3 for Toggle Files:**
*   🎯 **Ultra Fast Access:** Direct file serving via CloudFront
*   🎯 **Version Control:** Built-in S3 versioning for toggle history
*   🎯 **Environment Separation:** Different files per environment
*   🎯 **Backup Strategy:** Automatic backup with S3 lifecycle
*   🎯 **Git-like Workflow:** JSON files can be version controlled

#### Data Flow Strategy:
```typescript
// 1. Admin creates/updates toggle via UI
POST /api/toggles → {
  // Update MongoDB metadata
  await prisma.toggle.create({
    name: "feature-x",
    createdBy: userId,
    environments: ["dev", "prod"]
  });
  
  // Update S3 JSON files
  await s3.putObject({
    Bucket: "toggles",
    Key: "toggles.json",
    Body: JSON.stringify(updatedToggles)
  });
  
  // Log activity
  await prisma.activity.create({
    userId,
    action: "TOGGLE_CREATED",
    toggleId: toggle.id
  });
}

// 2. External apps fetch toggles
GET /api/public/toggles → {
  // Serve directly from S3 via CloudFront
  // Ultra fast, no database queries
  return s3JsonFile;
}

// 3. Admin dashboard shows analytics
GET /api/dashboard → {
  // Query MongoDB for user activities
  const activities = await prisma.activity.findMany();
  const users = await prisma.user.findMany();
  return { activities, users, stats };
}
```

#### File Structure Strategy:
```
// MongoDB Collections
users: { id, email, name, role, createdAt }
accounts: { userId, provider, providerAccountId } // NextAuth
sessions: { userId, sessionToken, expires } // NextAuth
toggle_metadata: { id, name, createdBy, environments, s3Key }
activities: { userId, action, toggleId, timestamp, details }

// S3 Bucket Structure
s3://toggle-bucket/
├── environments/
│   ├── dev.json        # Dev environment toggles
│   ├── staging.json    # Staging environment toggles
│   └── prod.json       # Production environment toggles
├── versions/
│   ├── 2024-01-15/
│   │   ├── dev.json
│   │   └── prod.json
│   └── 2024-01-14/
└── master.json      # All toggles master file
```

#### Performance Benefits:
*   🎯 **Blazing Fast Toggles:** S3 + CloudFront = ~5ms globally
*   🎯 **Rich Analytics:** MongoDB queries for user insights
*   🎯 **Version History:** S3 versioning for toggle rollbacks
*   🎯 **Backup Strategy:** Automatic S3 lifecycle policies
*   🎯 **Cost Effective:** Maximize both free tiers
*   🎯 **Scalable:** Each service scales independentlyect for dynamic toggle configurations
*   🎯 **Scalable:** Easy to extend with relations and complex queries
*   🎯 **Production Ready:** Battle-tested in modern applications

## Current Implementation Status

### ✅ Completed Features

*   **Create Toggle Parameters:** Full form with validation and type-specific inputs
*   **Edit Toggle Parameters:** Pre-populated form with existing data
*   **Data Table:** Responsive table with sorting, filtering, and actions
*   **Form Validation:** Zod schema with type-specific value validation
*   **UI Components:** Complete set of form inputs for different data types
*   **Modal Management:** Generic modal supporting both create and edit modes
*   **FSD Architecture:** Clean separation of concerns across model, lib, and ui layers

### 🔄 Next Steps

#### Phase 0: Authentication Setup
*   🎯 **NextAuth.js Setup:** Install and configure NextAuth
*   🎯 **Provider Configuration:** Setup Google + GitHub OAuth
*   🎯 **Prisma Adapter:** Configure database sessions
*   🎯 **Auth UI:** Create sign-in/sign-out components
*   🎯 **Route Protection:** Secure toggle management pages

#### Phase 1: Hybrid Database Setup
*   🎯 **Prisma + MongoDB:** User management and activity tracking
*   🎯 **AWS S3 Setup:** Toggle file storage and versioning
*   🎯 **Schema Definition:** Prisma schema for users + metadata only
*   🎯 **S3 Integration:** AWS SDK for toggle file operations
*   🎯 **Entities Layer:** Separate entities for DB and file operations

#### Phase 1.5: Hybrid API Implementation
*   🎯 **Admin APIs:** MongoDB for CRUD + S3 for file updates
*   🎯 **Public APIs:** Direct S3 serving via CloudFront
*   🎯 **Sync Strategy:** Keep MongoDB metadata in sync with S3 files
*   🎯 **Activity Logging:** Track all toggle changes in MongoDB
*   🎯 **Version Control:** S3 versioning + backup strategy

#### Phase 2: Enhanced Features
*   Implement duplicate functionality
*   Add delete confirmation dialog
*   Add search and filtering capabilities
*   Implement bulk operations
*   Add loading states and error handling

#### Phase 3: Deployment
*   🎯 **Hosting Research:** Cloudflare vs Firebase comparison
*   🎯 **Database Hosting:** MongoDB Atlas setup
*   🎯 **Environment Setup:** Production configuration
*   🎯 **CI/CD Pipeline:** Automated deployment