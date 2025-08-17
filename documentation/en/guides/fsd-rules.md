# 📏 FSD Development Rules & Guidelines

This document outlines the strict rules and best practices for developing features using Feature-Sliced Design (FSD) architecture.

## 🚨 Mandatory Rules

### 1. **Layer Dependency Rules**

#### ✅ Allowed Dependencies
```
App Layer → Widgets → Features → Entities → Shared
```

#### ❌ Forbidden Dependencies
- **Shared** cannot import from any other layer
- **Entities** cannot import from Features, Widgets, or App
- **Features** cannot import from Widgets or App
- **Widgets** cannot import from App
- **No circular dependencies** between any layers

#### 🔍 Validation
```typescript
// ✅ Correct imports
// In features/toggle/
import { Button } from '@/shared/components/ui/button'        // ✅ Shared
import { useToggle } from '@/entities/toggle'                // ✅ Entity

// ❌ Wrong imports  
// In entities/toggle/
import { ToggleForm } from '@/features/toggle/ui/toggle-form' // ❌ Feature
import { ToggleWidget } from '@/widgets/toggle'              // ❌ Widget
```

### 2. **File Naming Conventions**

#### Entity Files
```
entities/[entity-name]/
├── model/
│   ├── [entity-name].ts           # Types and interfaces
│   ├── use-[entity-name].ts       # Main entity hook
│   └── [entity-name]-store.ts     # State management (if needed)
├── api/
│   ├── [entity-name]-api.ts       # API calls
│   └── [entity-name]-contracts.ts # API contracts
├── lib/
│   └── [entity-name]-helpers.ts   # Pure functions
└── index.ts                       # Public exports
```

#### Feature Files
```
features/[feature-name]/
├── model/
│   ├── use-[feature-name].ts      # Business logic hooks
│   ├── schemas.ts                 # Validation schemas
│   └── types.ts                   # Feature-specific types
├── ui/
│   ├── [feature-name]-form.tsx    # Form components
│   ├── [feature-name]-table.tsx   # Table components
│   └── [feature-name]-modal.tsx   # Modal components
└── index.ts                       # Feature exports
```

#### Widget Files
```
widgets/[widget-name]/
├── [widget-name]-widget.tsx       # Main widget component
├── components/                    # Widget-specific components
│   ├── [component-name].tsx
│   └── ...
└── index.ts                       # Widget exports
```

### 3. **Import/Export Rules**

#### Entity Exports
```typescript
// ✅ Correct entity index.ts
export type { Toggle, CreateToggleRequest } from './model/toggle'
export { useToggle, useToggleActions } from './model/use-toggle'
export { toggleApi } from './api/toggle-api'
export * from './lib/toggle-helpers'

// ❌ Don't export internal implementation details
export { ToggleStore } from './model/toggle-store' // ❌ Internal
```

#### Feature Exports
```typescript
// ✅ Correct feature index.ts
export { useToggleManagement } from './model/use-toggle-management'
export { toggleSchema } from './model/schemas'
export { ToggleForm, ToggleTable } from './ui'

// ❌ Don't export everything
export * from './model' // ❌ Too broad
export * from './ui'    // ❌ Too broad
```

### 4. **Business Logic Placement**

#### ✅ Correct Placement
```typescript
// Business logic in entities/[entity]/model/
export function useToggle() {
  const [toggles, setToggles] = useState([])
  
  const createToggle = async (data) => {
    // Core business logic here ✅
  }
  
  return { toggles, createToggle }
}

// Feature-specific logic in features/[feature]/model/
export function useToggleManagement() {
  const { createToggle } = useToggle()
  
  const handleFormSubmit = (data) => {
    // Feature-specific orchestration ✅
    return createToggle(data)
  }
  
  return { handleFormSubmit }
}
```

#### ❌ Wrong Placement
```typescript
// ❌ Don't put business logic in UI components
export function ToggleForm() {
  const handleSubmit = async (data) => {
    // Complex business logic here ❌
    const response = await fetch('/api/toggles', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    // More business logic ❌
  }
}
```

## 📋 Best Practices

### 1. **Entity Development**

#### Single Responsibility
```typescript
// ✅ Good: Each entity handles one domain
entities/toggle/     # Only toggle-related logic
entities/user/       # Only user-related logic
entities/cache/      # Only cache-related logic

// ❌ Bad: Mixed responsibilities
entities/toggle-user/ # ❌ Handles multiple domains
```

#### Pure Functions in Lib
```typescript
// entities/toggle/lib/toggle-helpers.ts
// ✅ Pure functions only
export function formatToggleValue(value: unknown, type: string): string {
  // No side effects, predictable output
}

// ❌ Don't put side effects in lib
export function saveToggleToDatabase(toggle: Toggle) { // ❌
  // Side effects belong in model layer
}
```

### 2. **Feature Development**

#### Feature Composition
```typescript
// ✅ Compose features from entities
export function useToggleManagement() {
  const { toggles } = useToggle()           // Entity
  const { user } = useCurrentUser()        // Entity
  const { syncCache } = useCache()         // Entity
  
  // Feature orchestration logic
  const createToggleWithCache = async (data) => {
    const toggle = await createToggle(data)
    await syncCache(toggle.key)
    return toggle
  }
  
  return { createToggleWithCache }
}
```

#### UI Component Structure
```typescript
// ✅ Clean UI components
export function ToggleForm() {
  const { handleSubmit } = useToggleManagement() // Business logic from model
  const form = useForm()                         // UI logic
  
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {/* UI only */}
    </form>
  )
}
```

### 3. **API Integration**

#### Entity API Layer
```typescript
// entities/toggle/api/toggle-api.ts
// ✅ Entity-specific API calls
export const toggleApi = {
  getAll: () => api.get('/api/toggles'),
  create: (data: CreateToggleRequest) => api.post('/api/toggles', data),
  update: (id: string, data: UpdateToggleRequest) => 
    api.put(`/api/toggles/${id}`, data)
}

// ❌ Don't mix different entities
export const mixedApi = {
  getToggles: () => api.get('/api/toggles'),
  getUsers: () => api.get('/api/users'),     // ❌ Different entity
  getAnalytics: () => api.get('/api/analytics') // ❌ Different entity
}
```

#### Error Handling
```typescript
// ✅ Consistent error handling
export function useToggle() {
  const [error, setError] = useState<string | null>(null)
  
  const createToggle = async (data) => {
    try {
      setError(null)
      return await toggleApi.create(data)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }
  
  return { createToggle, error }
}
```

## 🔧 Code Quality Rules

### 1. **TypeScript Requirements**

#### Strict Typing
```typescript
// ✅ Proper typing
interface Toggle {
  id: string
  name: string
  value: unknown  // Use unknown for dynamic values
  type: 'BOOLEAN' | 'STRING' | 'NUMBER' | 'JSON'
}

// ❌ Avoid any
interface Toggle {
  id: string
  name: string
  value: any      // ❌ Use unknown instead
}
```

#### Generic Types
```typescript
// ✅ Use generics for reusable types
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Usage
const response: ApiResponse<Toggle[]> = await toggleApi.getAll()
```

### 2. **Performance Rules**

#### Memoization
```typescript
// ✅ Memoize expensive computations
export function useToggleStats() {
  const { toggles } = useToggle()
  
  const stats = useMemo(() => {
    return calculateToggleStats(toggles) // Expensive calculation
  }, [toggles])
  
  return { stats }
}
```

#### Lazy Loading
```typescript
// ✅ Lazy load heavy components
const ToggleAnalytics = lazy(() => import('./toggle-analytics'))

export function ToggleWidget() {
  return (
    <Suspense fallback={<Loading />}>
      <ToggleAnalytics />
    </Suspense>
  )
}
```

### 3. **Testing Rules**

#### Test Structure
```typescript
// entities/toggle/__tests__/use-toggle.test.ts
describe('useToggle', () => {
  describe('createToggle', () => {
    it('should create toggle successfully', () => {
      // Test implementation
    })
    
    it('should handle validation errors', () => {
      // Test error cases
    })
  })
})
```

#### Mock External Dependencies
```typescript
// ✅ Mock external dependencies
jest.mock('@/shared/lib/prisma', () => ({
  prisma: {
    toggle: {
      create: jest.fn(),
      findMany: jest.fn()
    }
  }
}))
```

## 🚫 Anti-Patterns

### 1. **God Components**
```typescript
// ❌ Don't create components that do everything
export function ToggleEverything() {
  // Handles forms ❌
  // Handles tables ❌  
  // Handles modals ❌
  // Handles API calls ❌
  // 500+ lines of code ❌
}

// ✅ Split into focused components
export function ToggleForm() { /* Form only */ }
export function ToggleTable() { /* Table only */ }
export function ToggleModal() { /* Modal only */ }
```

### 2. **Prop Drilling**
```typescript
// ❌ Don't pass props through many levels
<ToggleWidget>
  <ToggleList toggles={toggles}>
    <ToggleItem toggle={toggle} onUpdate={onUpdate}>
      <ToggleActions onUpdate={onUpdate} /> {/* ❌ Prop drilling */}
    </ToggleItem>
  </ToggleList>
</ToggleWidget>

// ✅ Use context or state management
const ToggleContext = createContext()

<ToggleProvider>
  <ToggleWidget>
    <ToggleList>
      <ToggleItem>
        <ToggleActions /> {/* ✅ Gets data from context */}
      </ToggleItem>
    </ToggleList>
  </ToggleWidget>
</ToggleProvider>
```

### 3. **Mixed Concerns**
```typescript
// ❌ Don't mix UI and business logic
export function ToggleForm() {
  const [toggles, setToggles] = useState([])
  
  // Business logic mixed with UI ❌
  const handleSubmit = async (data) => {
    const response = await fetch('/api/toggles', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const newToggle = await response.json()
    setToggles(prev => [...prev, newToggle])
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}

// ✅ Separate concerns
export function ToggleForm() {
  const { handleSubmit } = useToggleManagement() // Business logic
  
  return <form onSubmit={handleSubmit}>...</form> // UI only
}
```

## 📊 Validation Checklist

Before submitting code, ensure:

### Architecture Compliance
- [ ] No forbidden layer dependencies
- [ ] Proper file naming conventions
- [ ] Correct import/export patterns
- [ ] Business logic in appropriate layers

### Code Quality
- [ ] TypeScript strict mode compliance
- [ ] No `any` types (use `unknown` instead)
- [ ] Proper error handling
- [ ] Performance optimizations applied

### Testing
- [ ] Unit tests for business logic
- [ ] Component tests for UI
- [ ] Integration tests for API
- [ ] Mocked external dependencies

### Documentation
- [ ] JSDoc comments for public APIs
- [ ] README updated if needed
- [ ] Architecture documentation updated

## 🛠️ Tools & Automation

### ESLint Rules
```json
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "import/no-cycle": "error",
    "boundaries/element-types": "error"
  }
}
```

### Pre-commit Hooks
```bash
# Validate FSD structure before commit
npm run validate-fsd
npm run lint
npm run type-check
npm run test
```

## 📚 Resources

- [FSD Official Documentation](https://feature-sliced.design/)
- [Adding New Features Guide](./adding-features.md)
- [Project Structure](../architecture/project-structure.md)
- [API Guidelines](../api/overview.md)