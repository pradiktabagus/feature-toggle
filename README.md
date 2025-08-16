# 🚀 Feature Toggle Management System

A modern, full-stack feature toggle management system built with Next.js, TypeScript, and MongoDB. Manage feature flags with a beautiful UI, authentication, and real-time updates.

## ✨ Features

- 🔐 **Authentication**: Google & GitHub OAuth integration
- 🎛️ **Toggle Management**: Create, read, update, delete feature toggles
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS
- 🌙 **Dark Mode**: Full theme switching support
- 📱 **Responsive**: Mobile-first design
- 🔄 **Real-time**: Optimistic UI updates
- 📊 **JSON Editor**: CodeMirror integration for complex values
- 🛡️ **Type Safe**: Full TypeScript coverage
- 🗄️ **Database**: MongoDB with Prisma ORM

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI**: shadcn/ui + Tailwind CSS
- **Package Manager**: Bun
- **Deployment**: Vercel

## 📋 Prerequisites

### Required Services
1. **MongoDB Atlas** - Database hosting
2. **Google OAuth App** - Authentication provider
3. **GitHub OAuth App** - Authentication provider
4. **Vercel Account** - Deployment platform

### Development Tools
- Node.js 18+ or Bun
- Git

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/pradiktabagus/feature-toggle.git
cd feature-toggle
```

### 2. Install Dependencies
```bash
bun install
# or
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### 4. Database Setup
```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push
```

### 5. Run Development Server
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration Guide

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster
3. Get connection string
4. Add to `DATABASE_URL` in `.env.local`

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`

### GitHub OAuth Setup
1. Go to [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set Authorization callback URL:
   - Development: `http://localhost:3000/api/auth/callback/github`
   - Production: `https://your-domain.com/api/auth/callback/github`

## 📦 Available Scripts

```bash
# Development
bun dev              # Start development server
bun build            # Build for production
bun start            # Start production server

# Database
bun run db:generate  # Generate Prisma client
bun run db:push      # Push schema to database
bun run db:studio    # Open Prisma Studio

# Deployment
bun run deploy       # Deploy to Vercel
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**:
   ```bash
   bun add -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add GOOGLE_CLIENT_ID
   vercel env add GOOGLE_CLIENT_SECRET
   vercel env add GITHUB_ID
   vercel env add GITHUB_SECRET
   ```

4. **Update OAuth Callback URLs** with your Vercel domain

### Auto-Deploy Setup
Connect your GitHub repository to Vercel for automatic deployments on every push to main branch.

## 🎯 Usage

### Creating Feature Toggles
1. Login with Google or GitHub
2. Navigate to Toggle Features page
3. Click "Add Toggle"
4. Fill in toggle details:
   - Name: Feature name
   - Description: What this toggle controls
   - Type: boolean, string, number, or json
   - Value: Initial value
5. Save and manage your toggles

### API Endpoints
- `GET /api/toggles` - List all toggles
- `POST /api/toggles` - Create new toggle
- `PUT /api/toggles/[id]` - Update toggle
- `DELETE /api/toggles/[id]` - Delete toggle
- `GET /api/public/toggles/[key]` - Get toggle by key (public)

## 🔒 Security Features

- ✅ Authentication required for admin operations
- ✅ CSRF protection via NextAuth.js
- ✅ Input validation with Zod schemas
- ✅ Type-safe database operations
- ✅ Environment variable security

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/pradiktabagus/feature-toggle/issues) page
2. Create a new issue with detailed description
3. Include error logs and environment details

## 🎉 Demo

Live demo: [https://feature-toggle-one.vercel.app](https://feature-toggle-one.vercel.app)

---

**Built with ❤️ using Next.js and modern web technologies**
