# Deployment Guide

## Prerequisites

1. **Database Setup**
   - MongoDB Atlas account (free tier: 512MB)
   - Create cluster and get connection string
   - Update `DATABASE_URL` in environment variables

2. **Authentication Setup**
   - Google OAuth: Create project in Google Cloud Console
   - GitHub OAuth: Create OAuth app in GitHub Settings
   - Update OAuth credentials in environment variables

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add GOOGLE_CLIENT_ID
   vercel env add GOOGLE_CLIENT_SECRET
   vercel env add GITHUB_ID
   vercel env add GITHUB_SECRET
   ```

### Option 2: Cloudflare Pages

1. **Install Wrangler CLI**
   ```bash
   npm i -g wrangler
   ```

2. **Build for Static Export**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   wrangler pages deploy out
   ```

4. **Set Environment Variables in Cloudflare Dashboard**

### Option 3: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm i -g firebase-tools
   ```

2. **Build for Static Export**
   ```bash
   npm run build
   npm run export
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

### Option 4: Docker

1. **Build Image**
   ```bash
   docker build -t feature-toggle .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your-db-url" \
     -e NEXTAUTH_URL="your-domain" \
     -e NEXTAUTH_SECRET="your-secret" \
     feature-toggle
   ```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URL`: MongoDB connection string
- `NEXTAUTH_URL`: Your domain URL
- `NEXTAUTH_SECRET`: Random secret key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GITHUB_ID`: GitHub OAuth app ID
- `GITHUB_SECRET`: GitHub OAuth app secret

## Post-Deployment

1. **Database Migration**
   ```bash
   npx prisma db push
   ```

2. **Test Authentication**
   - Visit `/auth/signin`
   - Test Google and GitHub login

3. **Test Toggle Features**
   - Create a test toggle
   - Verify CRUD operations
   - Test API endpoints

## Monitoring

- Check application logs in your hosting platform
- Monitor database usage in MongoDB Atlas
- Set up alerts for errors and performance issues

## Scaling Considerations

- **Free Tier Limits**:
  - Vercel: 100GB bandwidth/month
  - Cloudflare: Unlimited requests
  - Firebase: 10GB storage, 360MB/day transfer
  - MongoDB Atlas: 512MB storage

- **Upgrade Path**:
  - Vercel Pro: $20/month
  - Cloudflare Pro: $20/month
  - Firebase Blaze: Pay-as-you-go
  - MongoDB Atlas: $9/month (M2)