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
- ☁️ **CloudFront CDN**: Global edge caching for public API
- 🚀 **S3 Integration**: File storage and cache management
- ⚡ **Auto-Invalidation**: Instant cache updates on toggle changes
- 📈 **Cache Analytics**: CloudFront hit/miss monitoring

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI**: shadcn/ui + Tailwind CSS
- **Package Manager**: Bun
- **Deployment**: Vercel
- **CDN**: AWS CloudFront
- **Storage**: AWS S3
- **Cache**: CloudFront + S3 hybrid caching

## 📋 Prerequisites

### Required Services
1. **MongoDB Atlas** - Database hosting
2. **Google OAuth App** - Authentication provider
3. **GitHub OAuth App** - Authentication provider
4. **Vercel Account** - Deployment platform
5. **AWS Account** - S3 storage and CloudFront CDN
6. **AWS S3 Bucket** - File storage and caching
7. **AWS CloudFront Distribution** - Global CDN

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

# AWS Configuration
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-s3-bucket-name"

# CloudFront Configuration
CLOUDFRONT_DISTRIBUTION_ID="your-cloudfront-distribution-id"

# Cache Configuration (in seconds)
BROWSER_CACHE_SECONDS=300      # Browser cache: 5 minutes
CLOUDFRONT_CACHE_SECONDS=3600  # CloudFront cache: 1 hour
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

## 📄 Configuration Files

### Core Configuration
- **`package.json`** - Dependencies, scripts, and project metadata
- **`tsconfig.json`** - TypeScript compiler configuration
- **`next.config.ts`** - Next.js framework configuration
- **`tailwind.config.ts`** - Tailwind CSS styling configuration
- **`prisma/schema.prisma`** - Database schema and ORM configuration

### UI & Components
- **`components.json`** - shadcn/ui component library configuration
  - Defines component paths and aliases
  - Sets up Tailwind integration
  - Configures icon library (Lucide)

### Deployment & Infrastructure
- **`vercel.json`** - Vercel deployment configuration
  - Sets API function timeout (30s)
  - Optimizes serverless function performance
- **`aws-iam-policy.json`** - AWS IAM permissions template
  - S3 bucket access (read/write/delete)
  - CloudFront invalidation permissions
  - Use this to create IAM policy in AWS Console

### Environment Files
- **`.env.local`** - Local development environment variables
- **`.env.example`** - Template for required environment variables
- **`.gitignore`** - Files and folders excluded from Git

### Development Tools
- **`.eslintrc.json`** - Code linting rules and configuration
- **`bun.lockb`** - Dependency lock file for Bun package manager

## 🔧 Setup Guide

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

### AWS Setup
1. Create AWS account and get access keys
2. Create S3 bucket for file storage
3. Create CloudFront distribution pointing to your API
4. Set up IAM permissions for S3 and CloudFront access
5. Configure CloudFront to cache `/api/public/toggles/*` paths

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
- `GET /api/toggles` - List all toggles (admin)
- `POST /api/toggles` - Create new toggle (admin)
- `PUT /api/toggles/[id]` - Update toggle (admin)
- `DELETE /api/toggles/[id]` - Delete toggle (admin)
- `GET /api/public/toggles/[key]` - Get toggle by key (public, cached)
- `POST /api/files` - Upload files to S3 (admin)

### Caching Strategy
- **Public API**: Cached via CloudFront + S3 hybrid
- **Auto-Invalidation**: Cache cleared on toggle updates
- **Cache Headers**: Configurable via environment variables
- **Monitoring**: CloudFront hit/miss tracking in response headers

## 🔒 Security Features

- ✅ Authentication required for admin operations
- ✅ CSRF protection via NextAuth.js
- ✅ Input validation with Zod schemas
- ✅ Type-safe database operations
- ✅ Environment variable security
- ✅ AWS IAM permissions for S3/CloudFront
- ✅ Public API rate limiting via CloudFront
- ✅ Secure file uploads to S3

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
# Trigger CI
