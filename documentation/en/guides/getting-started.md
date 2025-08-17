# 🚀 Getting Started Guide

This guide will help you set up and run the Feature Toggle Management System locally and understand the project structure.

## 📋 Prerequisites

### Required Software
- **Node.js** 18+ or **Bun** (recommended)
- **Git** for version control
- **Code Editor** (VS Code recommended)

### Required Services
1. **MongoDB Atlas** - Database hosting
2. **Google OAuth App** - Authentication provider
3. **GitHub OAuth App** - Authentication provider  
4. **AWS Account** - S3 storage and CloudFront CDN
5. **Vercel Account** - Deployment platform (optional)

## ⚡ Quick Setup

### 1. Clone Repository
```bash
git clone https://github.com/pradiktabagus/feature-toggle.git
cd feature-toggle
```

### 2. Install Dependencies
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:
```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

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

# (Optional) Open Prisma Studio
bun run db:studio
```

### 5. Run Development Server
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Detailed Setup

### MongoDB Atlas Setup

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free account
   - Create new cluster

2. **Database Configuration**
   - Choose cloud provider and region
   - Select free tier (M0)
   - Create cluster

3. **Network Access**
   - Add IP address (0.0.0.0/0 for development)
   - Create database user
   - Get connection string

4. **Connection String**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### Google OAuth Setup

1. **Google Cloud Console**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project or select existing
   - Enable Google+ API

2. **OAuth Credentials**
   - Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://your-domain.com/api/auth/callback/google`

3. **Get Credentials**
   - Copy Client ID and Client Secret
   - Add to `.env.local`

### GitHub OAuth Setup

1. **GitHub Settings**
   - Go to [GitHub Settings → Developer settings](https://github.com/settings/developers)
   - Click "New OAuth App"

2. **Application Configuration**
   - Application name: Feature Toggle System
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL:
     - Development: `http://localhost:3000/api/auth/callback/github`
     - Production: `https://your-domain.com/api/auth/callback/github`

3. **Get Credentials**
   - Copy Client ID and Client Secret
   - Add to `.env.local`

### AWS Setup

1. **Create AWS Account**
   - Sign up at [AWS Console](https://aws.amazon.com/)
   - Get access keys from IAM

2. **S3 Bucket Setup**
   ```bash
   # Create S3 bucket
   aws s3 mb s3://your-bucket-name --region us-east-1
   
   # Set bucket policy for public read access
   aws s3api put-bucket-policy --bucket your-bucket-name --policy file://bucket-policy.json
   ```

3. **CloudFront Distribution**
   - Create CloudFront distribution
   - Origin: Your API domain
   - Cache behaviors: `/api/public/toggles/*`
   - Get distribution ID

4. **IAM Permissions**
   Use the policy from `aws-iam-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:GetObject",
           "s3:PutObject", 
           "s3:DeleteObject"
         ],
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       },
       {
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation"
         ],
         "Resource": "arn:aws:cloudfront::*:distribution/your-distribution-id"
       }
     ]
   }
   ```

## 📁 Project Structure

### High-Level Overview
```
feature-toggle/
├── src/                    # Source code
│   ├── app/               # Next.js App Router
│   ├── entities/          # Business entities (FSD)
│   ├── features/          # Business features (FSD)
│   ├── widgets/           # Complex UI blocks (FSD)
│   └── shared/            # Shared utilities (FSD)
├── prisma/                # Database schema
├── documentation/         # Project documentation
├── public/               # Static assets
└── configuration files
```

### FSD Architecture
The project follows **Feature-Sliced Design (FSD)** architecture:

```
src/
├── app/           # Application layer (Next.js)
├── widgets/       # Complex UI blocks
├── features/      # Business features
├── entities/      # Business entities
└── shared/        # Shared utilities
```

Learn more: [FSD Architecture Guide](../architecture/fsd-architecture.md)

## 🛠️ Available Scripts

### Development
```bash
bun dev              # Start development server
bun build            # Build for production
bun start            # Start production server
bun lint             # Run ESLint
bun type-check       # Run TypeScript check
```

### Database
```bash
bun run db:generate  # Generate Prisma client
bun run db:push      # Push schema to database
bun run db:studio    # Open Prisma Studio
bun run db:reset     # Reset database (development only)
```

### Testing
```bash
bun test             # Run tests
bun test:watch       # Run tests in watch mode
bun test:coverage    # Run tests with coverage
```

## 🎯 First Steps After Setup

### 1. Verify Installation
- [ ] Development server runs without errors
- [ ] Database connection works
- [ ] OAuth login works (Google/GitHub)
- [ ] Can create/view toggles

### 2. Explore the Application
1. **Login** with Google or GitHub
2. **Navigate** to Toggle Features page
3. **Create** a new toggle
4. **Test** the public API endpoint
5. **Check** cache headers in browser dev tools

### 3. Test Public API
```bash
# Test public API
curl http://localhost:3000/api/public/toggles

# Test specific toggle
curl http://localhost:3000/api/public/toggles/your-toggle-key
```

### 4. Understand the Codebase
1. Read [FSD Architecture Guide](../architecture/fsd-architecture.md)
2. Explore [Core Features](../features/core-features.md)
3. Check [API Documentation](../api/overview.md)

## 🔍 Troubleshooting

### Common Issues

#### Database Connection Error
```bash
Error: P1001: Can't reach database server
```
**Solution**: Check MongoDB Atlas network access and connection string

#### OAuth Error
```bash
Error: Invalid client_id
```
**Solution**: Verify OAuth credentials and callback URLs

#### Build Error
```bash
Module not found: Can't resolve '@/...'
```
**Solution**: Check TypeScript paths in `tsconfig.json`

#### Cache Not Working
```bash
X-Cache-Status: MISS (always)
```
**Solution**: Verify AWS credentials and CloudFront configuration

### Debug Mode
```bash
# Enable debug logging
DEBUG=* bun dev

# Check environment variables
bun run env-check
```

### Getting Help
1. Check [documentation](../README.md)
2. Review [API reference](../api/overview.md)
3. Look at existing code examples
4. Create issue with error details

## 🚀 Next Steps

### For Developers
1. **Learn FSD**: Read [FSD Architecture Guide](../architecture/fsd-architecture.md)
2. **Add Features**: Follow [Adding Features Guide](./adding-features.md)
3. **Follow Rules**: Check [FSD Development Rules](./fsd-rules.md)

### For API Users
1. **API Reference**: Read [API Documentation](../api/overview.md)
2. **Public API**: Check [Public API Guide](../api/public-api.md)
3. **Caching**: Understand [Caching System](../features/caching-system.md)

### For DevOps
1. **Deployment**: Set up production environment
2. **Monitoring**: Configure performance monitoring
3. **Scaling**: Plan for traffic growth

## 📚 Additional Resources

- [Project Blueprint](../../blueprint.md) - Development roadmap
- [Configuration Files](../architecture/project-structure.md) - File explanations
- [Tech Stack](../architecture/tech-stack.md) - Technologies used
- [Core Features](../features/core-features.md) - Feature documentation

---

**Need help?** Check the [documentation](../README.md) or create an issue with detailed information about your problem.