# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Feature Toggle Management System** built with Next.js 15+ using the App Router. The project serves as a self-hosted alternative to Firebase Remote Config, providing toggle feature management with a dashboard for monitoring usage. The architecture follows **Feature-Sliced Design (FSD)** principles for clean code organization.

## Technology Stack

- **Frontend**: Next.js 15+ (App Router), React 19
- **UI Framework**: shadcn/ui with Tailwind CSS 4
- **TypeScript**: Full TypeScript support
- **Form Management**: react-hook-form + zod validation
- **Data Tables**: @tanstack/react-table
- **Icons**: @tabler/icons-react, lucide-react
- **Development Environment**: Firebase Studio with Google IDX
- **Package Manager**: Bun (primary), npm/yarn supported

## Development Commands

### Primary Commands
```bash
# Development server (uses Turbopack)
bun dev
# or npm run dev

# Build for production
bun run build

# Start production server
bun start

# Lint code
bun run lint
```

### Testing & Quality
```bash
# Run linter with auto-fix
npm run lint -- --fix

# TypeScript type checking
npx tsc --noEmit
```

### shadcn/ui Commands
```bash
# Add shadcn/ui components (use 'bun x' not 'bunx')
bun x shadcn@latest add button
bun x shadcn@latest add card dialog sheet

# Alternative: use npx
npx shadcn@latest add button

# Check project info
bun x shadcn@latest info
```

## Architecture & Project Structure

### Feature-Sliced Design (FSD) Implementation

The project uses FSD architecture with the following structure:

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (private)/         # Protected routes with sidebar layout
│   │   ├── dashboard/     # Dashboard page
│   │   ├── toggle-features/ # Toggle features management
│   │   └── layout.tsx     # Private layout with sidebar
│   ├── globals.css        # Global styles and Tailwind config
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Landing page
├── features/              # Feature-specific logic
│   └── toggle/           # Toggle feature domain
│       ├── model/        # Data types and table definitions
│       └── ui/           # Feature-specific UI components
├── shared/               # Shared utilities and components
│   ├── components/       # Reusable UI components
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
└── widgets/              # Complex UI compositions
    └── toggle-features/  # Toggle features page widget
```

### Key Architectural Patterns

1. **Server Components by Default**: Most components are React Server Components unless they need client-side interactivity
2. **Client Components**: Marked with `"use client"` directive for interactive components
3. **Type-Safe Data Tables**: Uses @tanstack/react-table with TypeScript definitions
4. **Component Composition**: Widgets compose features, features use shared components

### Path Aliases (tsconfig.json)

```typescript
"@/*": ["./src/*"]
"entities/*": ["./src/entities/*"]  
"features/*": ["./src/features/*"]
"shared/*": ["./src/shared/*"]
"widgets/*": ["./src/widgets/*"]
```

### shadcn/ui Configuration

- **Style**: new-york
- **Base Color**: zinc
- **Components Path**: `@/shared/components`
- **Utils Path**: `@/shared/lib/utils`
- **Icon Library**: lucide

## Key Features & Components

### Toggle Management System
- **ToggleTable**: Data table displaying toggle features with actions
- **ToggleAction**: Dropdown menu for edit/duplicate/delete operations  
- **Toggle Data Structure**: Name, description, JSON value, last update info
- **CRUD Operations**: Create, read, update, delete toggle features

### Dashboard & Navigation
- **AppSidebar**: Collapsible sidebar with navigation
- **Private Layout**: Protected routes with sidebar and header
- **Route Groups**: `(private)` for authenticated pages

### UI System
- **Tailwind CSS 4**: Latest version with CSS custom properties
- **Dark Mode Support**: Built-in theme switching
- **Responsive Design**: Mobile-first approach
- **Component Library**: Complete shadcn/ui implementation

## Development Guidelines

### When Adding New Features
1. Follow FSD structure: create in appropriate `features/` directory
2. Use TypeScript for all new code
3. Implement Server Components unless client interactivity needed
4. Add `"use client"` directive only when necessary
5. Use shared UI components from `@/shared/components/ui`

### Data Fetching Patterns
- **Server Components**: Use `async/await` directly in components
- **Client Components**: Use React hooks for state management
- **Server Actions**: Use `"use server"` directive for mutations

### Styling Conventions  
- Use Tailwind CSS classes
- Follow shadcn/ui design patterns
- Leverage CSS custom properties for theming
- Ensure responsive design with mobile-first approach

### Form Handling
- Use `react-hook-form` with `zod` validation
- Implement Server Actions for form submissions
- Follow type-safe patterns with TypeScript

## Important Development Notes

### Firebase Studio Environment
- Development server runs automatically in Firebase Studio
- DO NOT run `next dev` manually - it's handled by the environment
- Use the preview server for real-time feedback
- Environment configured via `.idx/dev.nix`

### Package Management
- Primary: Bun (configured in dev.nix)
- Fallback: npm/yarn supported
- Lock file: `bun.lockb`

### Type Safety
- Strict TypeScript configuration
- All components should be properly typed
- Use proper TypeScript patterns for React components
- Leverage Next.js built-in TypeScript support

### Key Files to Understand
- `blueprint.md`: Project planning and architecture decisions
- `GEMINI.md`: AI development guidelines (complementary to this file)
- `components.json`: shadcn/ui configuration
- `.idx/dev.nix`: Development environment setup

## Future Considerations

The project is planned to evolve with:
- MongoDB integration for persistent storage
- Custom authentication system (currently planning Firebase Auth)
- API endpoints for CRUD operations (`/api/toggles`)
- Rate limiting and security enhancements
- Advanced dashboard visualizations
