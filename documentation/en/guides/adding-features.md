# 🚀 Adding New Features Guide

This guide provides step-by-step instructions for adding new features to the Feature Toggle Management System following FSD (Feature-Sliced Design) principles.

## 📋 Prerequisites

Before adding a new feature, ensure you understand:
1. [FSD Architecture](../architecture/fsd-architecture.md)
2. [FSD Development Rules](./fsd-rules.md)
3. [Project Structure](../architecture/project-structure.md)

## 🎯 Feature Development Process

### Step 1: Plan the Feature

#### 1.1 Define Feature Scope
```markdown
Feature Name: [feature-name]
Description: [What does this feature do?]
Entities Needed: [Which business entities are involved?]
UI Components: [What UI components are needed?]
API Endpoints: [What API endpoints are required?]
```

#### 1.2 Identify Dependencies
- Which existing entities will be used?
- Which shared components are needed?
- What new entities need to be created?

### Step 2: Create Entities (if needed)

#### 2.1 Entity Structure
```bash
# Create entity directory
mkdir -p src/entities/[entity-name]/{model,api,lib}
```

#### 2.2 Entity Implementation
```typescript
// src/entities/[entity-name]/model/[entity-name].ts
export interface EntityName {
  id: string
  // ... other properties
}

export type CreateEntityRequest = Omit<EntityName, 'id'>
export type UpdateEntityRequest = Partial<CreateEntityRequest>
```

#### 2.3 Entity Hooks
```typescript
// src/entities/[entity-name]/model/use-[entity-name].ts
import { useState, useEffect } from 'react'

export function useEntityName() {
  const [data, setData] = useState<EntityName[]>([])
  const [loading, setLoading] = useState(false)
  
  // Implementation
  
  return { data, loading, /* other methods */ }
}
```

#### 2.4 Entity API
```typescript
// src/entities/[entity-name]/api/[entity-name]-api.ts
import { api } from '@/shared/api'

export const entityNameApi = {
  getAll: () => api.get('/api/entity-name'),
  getById: (id: string) => api.get(`/api/entity-name/${id}`),
  create: (data: CreateEntityRequest) => api.post('/api/entity-name', data),
  update: (id: string, data: UpdateEntityRequest) => 
    api.put(`/api/entity-name/${id}`, data),
  delete: (id: string) => api.delete(`/api/entity-name/${id}`)
}
```

#### 2.5 Entity Index
```typescript
// src/entities/[entity-name]/index.ts
export type { EntityName, CreateEntityRequest, UpdateEntityRequest } from './model/[entity-name]'
export { useEntityName } from './model/use-[entity-name]'
export { entityNameApi } from './api/[entity-name]-api'
export * from './lib/[entity-name]-helpers'
```

### Step 3: Create Feature

#### 3.1 Feature Structure
```bash
# Create feature directory
mkdir -p src/features/[feature-name]/{model,ui}
```

#### 3.2 Feature Business Logic
```typescript
// src/features/[feature-name]/model/use-[feature-name].ts
import { useEntityName } from '@/entities/[entity-name]'

export function useFeatureName() {
  const { data, loading } = useEntityName()
  
  const handleAction = () => {
    // Feature-specific business logic
  }
  
  return {
    data,
    loading,
    handleAction
  }
}
```

#### 3.3 Feature Schemas
```typescript
// src/features/[feature-name]/model/schemas.ts
import { z } from 'zod'

export const featureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  // ... other fields
})

export type FeatureFormData = z.infer<typeof featureSchema>
```

#### 3.4 Feature UI Components
```typescript
// src/features/[feature-name]/ui/[feature-name]-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/ui/button'
import { featureSchema, type FeatureFormData } from '../model/schemas'

export function FeatureNameForm() {
  const form = useForm<FeatureFormData>({
    resolver: zodResolver(featureSchema)
  })
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form implementation */}
    </form>
  )
}
```

#### 3.5 Feature Index
```typescript
// src/features/[feature-name]/index.ts
export { useFeatureName } from './model/use-[feature-name]'
export { featureSchema, type FeatureFormData } from './model/schemas'
export { FeatureNameForm } from './ui/[feature-name]-form'
export { FeatureNameTable } from './ui/[feature-name]-table'
```

### Step 4: Create API Endpoints

#### 4.1 API Route Structure
```bash
# Create API routes
mkdir -p src/app/api/[entity-name]
touch src/app/api/[entity-name]/route.ts
mkdir -p src/app/api/[entity-name]/[id]
touch src/app/api/[entity-name]/[id]/route.ts
```

#### 4.2 API Implementation
```typescript
// src/app/api/[entity-name]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/shared/lib/auth'
import { prisma } from '@/shared/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await prisma.entityName.findMany()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Implementation
}
```

### Step 5: Create Widget (if needed)

#### 5.1 Widget Structure
```bash
# Create widget directory
mkdir -p src/widgets/[widget-name]
```

#### 5.2 Widget Implementation
```typescript
// src/widgets/[widget-name]/[widget-name]-widget.tsx
import { FeatureNameForm } from '@/features/[feature-name]'
import { FeatureNameTable } from '@/features/[feature-name]'

export function WidgetNameWidget() {
  return (
    <div className="space-y-6">
      <FeatureNameForm />
      <FeatureNameTable />
    </div>
  )
}
```

### Step 6: Add Database Schema (if needed)

#### 6.1 Update Prisma Schema
```prisma
// prisma/schema.prisma
model EntityName {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  @@map("entity_names")
}
```

#### 6.2 Generate and Push Schema
```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push
```

### Step 7: Add to App Router

#### 7.1 Create Page
```typescript
// src/app/(private)/[feature-name]/page.tsx
import { WidgetNameWidget } from '@/widgets/[widget-name]'

export default function FeatureNamePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Feature Name</h1>
      <WidgetNameWidget />
    </div>
  )
}
```

#### 7.2 Update Navigation
```typescript
// Update navigation in shared/components/nav-main.tsx
const items = [
  // ... existing items
  {
    title: "Feature Name",
    url: "/feature-name",
    icon: IconName,
  }
]
```

## 🔍 Example: Adding Rollout Feature

### Step 1: Plan
```markdown
Feature Name: rollout
Description: Percentage-based feature rollouts
Entities Needed: rollout
UI Components: RolloutForm, RolloutTable, RolloutControls
API Endpoints: /api/rollouts, /api/rollouts/[id]
```

### Step 2: Create Rollout Entity
```bash
mkdir -p src/entities/rollout/{model,api,lib}
```

```typescript
// src/entities/rollout/model/rollout.ts
export interface Rollout {
  id: string
  toggleId: string
  percentage: number
  strategy: 'PERCENTAGE' | 'USER_BASED' | 'GEOGRAPHIC'
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### Step 3: Create Rollout Feature
```bash
mkdir -p src/features/rollout/{model,ui}
```

```typescript
// src/features/rollout/model/use-rollout.ts
import { useRollout } from '@/entities/rollout'

export function useRolloutManagement() {
  const { data, loading } = useRollout()
  
  const updatePercentage = (id: string, percentage: number) => {
    // Implementation
  }
  
  return { data, loading, updatePercentage }
}
```

### Step 4: Continue with remaining steps...

## ✅ Checklist

Before submitting your feature:

### Code Quality
- [ ] Follows FSD architecture principles
- [ ] No circular dependencies
- [ ] Proper TypeScript types
- [ ] Error handling implemented
- [ ] Loading states handled

### Testing
- [ ] Unit tests for business logic
- [ ] Integration tests for API endpoints
- [ ] Component tests for UI
- [ ] E2E tests for critical flows

### Documentation
- [ ] Feature documented in `/documentation/features/`
- [ ] API endpoints documented in `/documentation/api/`
- [ ] Updated main README if needed

### Performance
- [ ] No unnecessary re-renders
- [ ] Proper data fetching strategies
- [ ] Optimized bundle size
- [ ] Caching implemented where appropriate

## 🚨 Common Mistakes

### ❌ Wrong Layer Dependencies
```typescript
// ❌ Don't import features in entities
// src/entities/toggle/model/toggle.ts
import { ToggleForm } from '@/features/toggle/ui/toggle-form'

// ✅ Correct: entities only use shared
import { api } from '@/shared/api'
```

### ❌ Business Logic in UI
```typescript
// ❌ Don't put business logic in UI components
export function ToggleForm() {
  const handleSubmit = async (data) => {
    // Complex business logic here ❌
  }
}

// ✅ Correct: business logic in model layer
export function ToggleForm() {
  const { handleSubmit } = useToggleActions() // ✅
}
```

### ❌ Direct Database Access in Features
```typescript
// ❌ Don't access database directly in features
import { prisma } from '@/shared/lib/prisma'

// ✅ Correct: use entity APIs
import { toggleApi } from '@/entities/toggle'
```

## 📚 Next Steps

After adding your feature:
1. Update [Core Features](../features/core-features.md) documentation
2. Add API documentation in [API Reference](../api/overview.md)
3. Update [Project Structure](../architecture/project-structure.md) if needed
4. Consider adding to the [Blueprint](../../blueprint.md) roadmap

## 🤝 Getting Help

If you need help:
1. Review [FSD Development Rules](./fsd-rules.md)
2. Check existing implementations in the codebase
3. Ask questions in team discussions
4. Create an issue with specific questions