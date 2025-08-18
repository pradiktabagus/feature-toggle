# 🤝 Contributing to Feature Toggle Management System

Thank you for your interest in contributing! This guide will help you get started with contributing to the Feature Toggle Management System.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [FSD Architecture Guidelines](#fsd-architecture-guidelines)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## 🚀 Getting Started

### Prerequisites
1. Read the [Getting Started Guide](./documentation/en/guides/getting-started.md)
2. Understand [FSD Architecture](./documentation/en/architecture/fsd-architecture.md)
3. Review [FSD Development Rules](./documentation/en/guides/fsd-rules.md)

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/pradiktabagus/feature-toggle.git
cd feature-toggle

# Install dependencies
bun install

# Setup environment
cp .env.example .env.local
# Fill in your environment variables

# Setup database
bun run db:generate
bun run db:push

# Start development server
bun dev
```

## 🔄 Development Process

### 1. Choose an Issue
- Browse [open issues](https://github.com/pradiktabagus/feature-toggle/issues)
- Look for issues labeled `good first issue` for beginners
- Check the project board for current priorities
- Comment on the issue to get assigned

### 2. Create a Branch
```bash
# Create feature branch
git checkout -b feature/issue-number-short-description

# Examples:
git checkout -b feature/123-rollout-entity
git checkout -b bugfix/456-cache-invalidation
git checkout -b task/789-update-docs
```

### 3. Follow FSD Architecture
Ensure your changes follow the FSD layer structure:
```
src/
├── app/           # Next.js App Router
├── widgets/       # Complex UI blocks  
├── features/      # Business features
├── entities/      # Business entities
└── shared/        # Shared utilities
```

### 4. Development Guidelines

#### Entity Development
```typescript
// entities/[entity-name]/
├── model/           # Business logic and types
├── api/             # API calls
├── lib/             # Pure functions
└── index.ts         # Public exports
```

#### Feature Development  
```typescript
// features/[feature-name]/
├── model/           # Feature business logic
├── ui/              # Feature UI components
└── index.ts         # Feature exports
```

#### Widget Development
```typescript
// widgets/[widget-name]/
├── [widget-name].tsx    # Main widget
├── components/          # Widget components
└── index.ts             # Widget exports
```

## 🏗️ FSD Architecture Guidelines

### Dependency Rules
```
✅ Allowed: App → Widgets → Features → Entities → Shared
❌ Forbidden: Any reverse dependencies
```

### Import Examples
```typescript
// ✅ Correct imports
// In features/toggle/
import { Button } from '@/shared/components/ui/button'
import { useToggle } from '@/entities/toggle'

// ❌ Wrong imports
// In entities/toggle/
import { ToggleForm } from '@/features/toggle/ui/toggle-form' // ❌
```

### Layer Responsibilities
- **Entities**: Business logic, data models, API calls
- **Features**: Use cases, feature-specific logic
- **Widgets**: Complex UI compositions
- **Shared**: Pure utilities, UI components
- **App**: Routing, global configuration

## 📏 Code Standards

### TypeScript
- Use strict TypeScript configuration
- Avoid `any` types (use `unknown` instead)
- Provide proper type annotations
- Use generics for reusable types

```typescript
// ✅ Good
interface Toggle {
  id: string
  value: unknown  // Use unknown for dynamic values
}

// ❌ Bad
interface Toggle {
  id: string
  value: any      // Avoid any
}
```

### Code Quality
- Follow ESLint rules
- Use meaningful variable names
- Write self-documenting code
- Add JSDoc for public APIs
- Handle errors gracefully

### Testing
- Write unit tests for business logic
- Add integration tests for API endpoints
- Include component tests for UI
- Maintain >80% test coverage

```typescript
// Example test structure
describe('useToggle', () => {
  describe('createToggle', () => {
    it('should create toggle successfully', () => {
      // Test implementation
    })
  })
})
```

## 🔀 Pull Request Process

### 1. Before Creating PR
- [ ] Code follows FSD architecture
- [ ] All tests pass
- [ ] ESLint passes without errors
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or documented)

### 2. PR Template
Use the provided PR template and fill out:
- Description of changes
- Related issues
- FSD architecture compliance
- Testing information
- Performance impact
- Documentation updates

### 3. PR Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Architecture review** for FSD compliance
4. **Testing verification**
5. **Documentation review**

### 4. Merge Requirements
- [ ] All CI checks pass
- [ ] At least 1 approving review
- [ ] No merge conflicts
- [ ] Branch is up to date with main

## 📝 Issue Guidelines

### Creating Issues

#### Feature Requests
Use the **🚀 Feature Request** template:
- Specify phase (2, 3, 4, or 5)
- Define acceptance criteria
- List affected FSD layers
- Provide technical requirements

#### Bug Reports
Use the **🐛 Bug Report** template:
- Include reproduction steps
- Specify environment details
- Add error messages/logs
- Attach screenshots if applicable

#### Tasks
Use the **📋 Task** template:
- Define clear objectives
- List files to be modified
- Specify dependencies
- Set acceptance criteria

### Issue Labels
- **Phase**: `phase-2`, `phase-3`, `phase-4`, `phase-5`
- **Priority**: `priority-high`, `priority-medium`, `priority-low`
- **Type**: `enhancement`, `bug`, `task`, `documentation`
- **Component**: `entities`, `features`, `widgets`, `shared`, `api`, `ui`

## 🎯 Contribution Areas

### High Priority (Phase 2)
- **Rollout Management**: Percentage-based rollouts
- **User Targeting**: Rule-based user targeting  
- **Scheduled Toggles**: Time-based activation
- **Bulk Operations**: Mass toggle management

### Medium Priority (Phase 3)
- **Analytics Dashboard**: Usage tracking and metrics
- **Performance Monitoring**: Real-time monitoring
- **Error Tracking**: Comprehensive error logging

### Documentation
- **API Documentation**: Endpoint documentation
- **Architecture Guides**: FSD implementation guides
- **Tutorials**: Step-by-step tutorials
- **Examples**: Code examples and use cases

### Testing
- **Unit Tests**: Business logic testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full workflow testing
- **Performance Tests**: Load and stress testing

## 🔍 Code Review Guidelines

### For Contributors
- **Self-review** your code before submitting
- **Test thoroughly** on different scenarios
- **Document** complex logic with comments
- **Follow** the PR template completely
- **Respond** to review feedback promptly

### For Reviewers
- **Check FSD compliance** first
- **Verify** business logic correctness
- **Test** the changes locally
- **Review** documentation updates
- **Provide constructive** feedback

## 🚨 Common Mistakes to Avoid

### Architecture Violations
```typescript
// ❌ Don't import features in entities
import { ToggleForm } from '@/features/toggle/ui/toggle-form'

// ❌ Don't put business logic in UI components
export function ToggleForm() {
  const handleSubmit = async (data) => {
    // Complex business logic here ❌
  }
}

// ❌ Don't access database directly in features
import { prisma } from '@/shared/lib/prisma'
```

### Code Quality Issues
- Using `any` types instead of proper typing
- Missing error handling
- Inconsistent naming conventions
- Lack of input validation
- Missing tests for new features

## 📚 Resources

### Documentation
- [FSD Architecture Guide](./documentation/en/architecture/fsd-architecture.md)
- [Adding New Features](./documentation/en/guides/adding-features.md)
- [FSD Development Rules](./documentation/en/guides/fsd-rules.md)
- [API Overview](./documentation/en/api/overview.md)

### External Resources
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🤝 Community

### Getting Help
- **GitHub Discussions**: Ask questions and discuss ideas
- **Issues**: Report bugs and request features
- **Documentation**: Check comprehensive guides
- **Code Examples**: Review existing implementations

### Communication
- Be respectful and constructive
- Follow the code of conduct
- Help other contributors
- Share knowledge and best practices

## 📞 Contact

For questions or support:
- Create an issue for bugs or feature requests
- Use GitHub Discussions for general questions
- Check documentation before asking
- Provide detailed information when reporting issues

---

Thank you for contributing to the Feature Toggle Management System! Your contributions help make this project better for everyone. 🚀