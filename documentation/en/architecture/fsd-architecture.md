# 🏗️ Feature-Sliced Design (FSD) Architecture

## Overview

This project implements **Feature-Sliced Design (FSD)**, a modern architectural methodology for frontend applications that provides clear separation of concerns and scalable code organization.

## 📚 FSD Layers

### 1. **App Layer** (`src/app/`)
**Purpose**: Application initialization and routing  
**Responsibility**: Next.js App Router, global providers, and application-level configuration

```
src/app/
├── (private)/          # Protected routes
│   ├── dashboard/      # Dashboard page
│   └── toggle-features/ # Toggle management page
├── api/                # API routes
│   ├── auth/           # Authentication endpoints
│   ├── toggles/        # Toggle CRUD endpoints
│   └── public/         # Public API endpoints
├── auth/               # Authentication pages
├── layout.tsx          # Root layout
├── page.tsx            # Home page
└── providers.tsx       # Global providers
```

### 2. **Widgets Layer** (`src/widgets/`)
**Purpose**: Complex UI blocks that combine multiple features  
**Responsibility**: High-level UI components with business logic

```
src/widgets/
├── auth/
│   ├── auth-guard.tsx      # Route protection
│   ├── login-widget.tsx    # Login form widget
│   └── protected-route.tsx # Protected route wrapper
└── toggle-features/
    └── index.tsx           # Toggle management widget
```

### 3. **Features Layer** (`src/features/`)
**Purpose**: Business features and use cases  
**Responsibility**: Feature-specific logic and UI components

```
src/features/
└── toggle/
    ├── model/              # Business logic
    │   ├── schemas.ts      # Validation schemas
    │   ├── types.ts        # Feature types
    │   ├── use-toggle-actions.ts
    │   ├── use-toggle-management.ts
    │   └── use-toggle-modal.ts
    └── ui/                 # Feature UI components
        ├── toggle-table.tsx
        ├── toggle-form-modal.tsx
        ├── toggle-action.tsx
        └── json-viewer-modal.tsx
```

### 4. **Entities Layer** (`src/entities/`)
**Purpose**: Business entities and domain logic  
**Responsibility**: Core business models and operations

```
src/entities/
├── toggle/
│   ├── model/
│   │   ├── toggle.ts       # Toggle entity model
│   │   └── use-toggles.ts  # Toggle hooks
│   ├── api/                # Toggle-specific API
│   ├── lib/                # Toggle utilities
│   └── index.ts            # Entity exports
├── user/
│   ├── model/
│   │   └── use-current-user.ts
│   └── api/
├── cache/                  # Cache entity
│   ├── lib/
│   │   ├── cache-sync.ts   # Cache synchronization
│   │   └── cloudfront.ts   # CloudFront operations
│   └── index.ts
└── export/                 # Export entity
    ├── lib/
    │   └── auto-export.ts  # Auto export functionality
    └── index.ts
```

### 5. **Shared Layer** (`src/shared/`)
**Purpose**: Reusable utilities and components  
**Responsibility**: Pure functions, UI components, and common utilities

```
src/shared/
├── components/
│   ├── ui/                 # Design system components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   └── ...
│   └── layout/             # Layout components
│       ├── app-sidebar.tsx
│       ├── site-header.tsx
│       └── nav-*.tsx
├── lib/
│   ├── utils.ts            # Pure utilities
│   ├── auth.ts             # Auth configuration
│   ├── prisma.ts           # Database connection
│   └── s3.ts               # S3 client
├── hooks/
│   ├── use-mobile.ts
│   └── use-theme.ts
├── types/
│   ├── api-response.ts
│   └── common.ts
└── api/
    ├── client.ts           # HTTP client
    └── types.ts            # API types
```

## 🔄 Dependency Rules

### ✅ Allowed Dependencies
```
App → Widgets → Features → Entities → Shared
```

### ❌ Forbidden Dependencies
- **Shared** cannot import from any other layer
- **Entities** cannot import from Features, Widgets, or App
- **Features** cannot import from Widgets or App
- **Widgets** cannot import from App

### 📝 Import Examples

```typescript
// ✅ Correct imports
// In features/toggle/
import { Button } from '@/shared/components/ui/button'
import { useToggle } from '@/entities/toggle'

// In widgets/toggle-features/
import { ToggleTable } from '@/features/toggle/ui/toggle-table'
import { useCurrentUser } from '@/entities/user'

// In app/toggle-features/
import { ToggleFeaturesWidget } from '@/widgets/toggle-features'

// ❌ Wrong imports
// In entities/toggle/
import { ToggleTable } from '@/features/toggle/ui/toggle-table' // ❌

// In shared/components/
import { useToggle } from '@/entities/toggle' // ❌
```

## 🎯 Benefits of FSD Architecture

### 1. **Scalability**
- Easy to add new features without affecting existing code
- Clear boundaries between different parts of the application
- Predictable file organization

### 2. **Maintainability**
- Single responsibility for each layer
- Easy to locate and modify specific functionality
- Reduced coupling between components

### 3. **Testability**
- Each layer can be tested independently
- Clear separation of business logic and UI
- Easy to mock dependencies

### 4. **Team Collaboration**
- Clear ownership of different layers
- Reduced merge conflicts
- Consistent code organization

## 🔧 Implementation Guidelines

### Entity Development
```typescript
// entities/[entity-name]/
├── model/           # Business logic and state
├── api/             # Entity-specific API calls
├── lib/             # Pure functions and utilities
└── index.ts         # Public exports
```

### Feature Development
```typescript
// features/[feature-name]/
├── model/           # Feature business logic
├── ui/              # Feature UI components
└── index.ts         # Feature exports
```

### Widget Development
```typescript
// widgets/[widget-name]/
├── [widget-name].tsx    # Main widget component
├── components/          # Widget-specific components
└── index.ts             # Widget exports
```

## 📊 Current Architecture Status

### ✅ Implemented
- **Entities**: toggle, user, cache, export
- **Features**: toggle management
- **Widgets**: auth, toggle-features
- **Shared**: UI components, utilities, API client

### 🚧 In Development
- **Entities**: rollout, targeting, analytics
- **Features**: rollout management, user targeting
- **Widgets**: analytics dashboard, rollout controls

### 📋 Planned
- **Features**: scheduled toggles, bulk operations
- **Widgets**: advanced analytics, monitoring dashboard
- **Entities**: audit, notification, template

## 🔍 Architecture Validation

### Dependency Check
```bash
# Check for circular dependencies
npm run check-deps

# Validate FSD structure
npm run validate-fsd
```

### Layer Compliance
- **Entities**: ✅ 90% compliant
- **Features**: ✅ 85% compliant  
- **Widgets**: ✅ 95% compliant
- **Shared**: ✅ 100% compliant

## 📚 Further Reading

- [FSD Official Documentation](https://feature-sliced.design/)
- [Adding New Features Guide](../guides/adding-features.md)
- [FSD Development Rules](../guides/fsd-rules.md)
- [Project Structure](./project-structure.md)