# Feature Toggle Setup Guide

## Step 1: Project Setup ✅ COMPLETED

### Dependencies Installed:
- **Database**: Prisma + MongoDB
- **Authentication**: NextAuth.js with Google/GitHub
- **UI**: Radix UI + Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Code Editor**: CodeMirror for JSON editing

### Project Structure Created:
```
src/
├── features/toggle/          # Feature-Sliced Design
│   ├── model/               # State management & hooks
│   ├── lib/                 # Pure functions
│   └── ui/                  # Components
├── shared/
│   ├── components/ui/       # Reusable UI components
│   ├── lib/                 # Shared utilities
│   └── types/               # TypeScript types
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   └── toggles/         # Toggle CRUD APIs
│   └── providers.tsx        # Context providers
```

### Database Schema:
- User management with NextAuth integration
- Toggle entity with JSON value support
- Role-based access control ready

## Next Steps:

### Step 2: Environment Setup
1. Copy `.env.local` and fill in your credentials:
   - MongoDB connection string
   - Google OAuth credentials
   - GitHub OAuth credentials
   - NextAuth secret

### Step 3: Database Setup
```bash
# Push schema to MongoDB
bunx prisma db push

# Open Prisma Studio (optional)
bunx prisma studio
```

### Step 4: OAuth Setup
1. **Google OAuth**: Create project in Google Cloud Console
2. **GitHub OAuth**: Create OAuth app in GitHub Settings

### Step 5: Run Development Server
```bash
bun dev
```

## Commands Available:
- `bun dev` - Start development server
- `bun build` - Build for production
- `bunx prisma generate` - Generate Prisma client
- `bunx prisma db push` - Push schema to database
- `bunx prisma studio` - Open database GUI