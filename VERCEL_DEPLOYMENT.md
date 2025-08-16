# 🚀 Vercel Deployment Guide - Complete Setup

## 🎯 Why Vercel?

Vercel adalah pilihan terbaik untuk aplikasi Next.js full-stack karena:
- ✅ **Zero Configuration**: Deploy langsung tanpa setup kompleks
- ✅ **Full Next.js Support**: API routes, middleware, semua fitur supported
- ✅ **Serverless Functions**: Auto-scaling untuk API endpoints
- ✅ **Global CDN**: Edge network untuk performa optimal
- ✅ **Free Tier**: 100GB bandwidth, unlimited requests
- ✅ **Database Integration**: Optimal untuk MongoDB connections

## 📋 Prerequisites

### 1. **Vercel Account**
- Sign up at [vercel.com](https://vercel.com)
- Connect GitHub account
- Verify email address

### 2. **GitHub Repository**
- Push code to GitHub repository
- Repository bisa private atau public

### 3. **Environment Variables Ready**
- MongoDB Atlas connection string
- Google OAuth credentials
- GitHub OAuth credentials
- NextAuth secret

## 🛠️ Deployment Steps

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy from Local (Quick Start)
```bash
# Di root directory project
vercel

# Follow prompts:
# ? Set up and deploy "~/feature-toggle"? [Y/n] y
# ? Which scope do you want to deploy to? [your-username]
# ? Link to existing project? [y/N] n
# ? What's your project's name? feature-toggle
# ? In which directory is your code located? ./
```

### Step 4: Set Environment Variables
```bash
# Set production environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add GITHUB_ID
vercel env add GITHUB_SECRET
```

### Step 5: Deploy to Production
```bash
vercel --prod
```

## 🔧 Environment Variables

### Required Variables
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### Setting via Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable for Production environment

## 🔗 GitHub Integration (Recommended)

### Step 1: Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub
4. Select your repository
5. Configure project settings

### Step 2: Build Settings
Vercel auto-detects Next.js projects, but verify:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: (leave empty)
- **Install Command**: `npm install`

### Step 3: Environment Variables
Add all required environment variables in project settings

### Step 4: Deploy
- Push to main branch triggers automatic deployment
- Pull requests create preview deployments

## 🚀 Deployment Commands

### One-time Setup
```bash
# Clone and setup
git clone https://github.com/your-username/feature-toggle.git
cd feature-toggle
npm install

# Deploy
vercel --prod
```

### Continuous Deployment
```bash
# Push changes
git add .
git commit -m "Update feature"
git push origin main

# Automatic deployment triggered
```

### Manual Deployment
```bash
# Deploy current state
vercel --prod

# Deploy specific branch
vercel --prod --target production
```

## 📊 Vercel Features

### Performance
- **Edge Network**: 40+ regions globally
- **Automatic Optimization**: Image, font, and asset optimization
- **Serverless Functions**: 0-cold start for API routes
- **Caching**: Intelligent caching strategies

### Developer Experience
- **Preview Deployments**: Every PR gets unique URL
- **Real-time Logs**: Function execution logs
- **Analytics**: Traffic and performance metrics
- **Monitoring**: Error tracking and alerts

### Security
- **HTTPS by Default**: Automatic SSL certificates
- **DDoS Protection**: Built-in security
- **Environment Isolation**: Secure variable management
- **CORS Handling**: Automatic CORS configuration

## 💰 Pricing

### Free Tier (Hobby)
- **Bandwidth**: 100GB/month
- **Function Executions**: 100GB-hours/month
- **Build Minutes**: 6,000 minutes/month
- **Projects**: Unlimited
- **Team Members**: 1

### Pro Tier ($20/month)
- **Bandwidth**: 1TB/month
- **Function Executions**: 1,000GB-hours/month
- **Build Minutes**: 24,000 minutes/month
- **Team Members**: Unlimited
- **Advanced Analytics**: Included

## 🔍 Post-Deployment Checklist

### 1. Test Authentication
```bash
# Visit your app
https://your-app.vercel.app

# Test login flows
- Google OAuth
- GitHub OAuth
- Session persistence
```

### 2. Test API Endpoints
```bash
# Test toggle CRUD
curl https://your-app.vercel.app/api/toggles
curl https://your-app.vercel.app/api/public/toggles/test-key
```

### 3. Database Connection
- Verify MongoDB Atlas connection
- Test toggle creation/updates
- Check data persistence

### 4. Performance Testing
- Run Lighthouse audit
- Check Core Web Vitals
- Test mobile responsiveness

## 🔧 Troubleshooting

### Build Errors
```bash
# Check build logs in Vercel dashboard
# Or via CLI
vercel logs [deployment-url]
```

### Function Errors
```bash
# View function logs
vercel logs --follow
```

### Environment Variable Issues
- Verify all variables are set in Vercel dashboard
- Check variable names match exactly
- Redeploy after adding new variables

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0 for Vercel)
- Check connection string format
- Test connection locally first

## 🎯 Custom Domain Setup

### Step 1: Add Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records

### Step 2: DNS Configuration
```
Type: CNAME
Name: www (or @)
Value: cname.vercel-dns.com
```

### Step 3: SSL Certificate
- Automatic SSL certificate provisioning
- HTTPS redirect enabled by default

## 📈 Monitoring & Analytics

### Built-in Analytics
- Page views and unique visitors
- Top pages and referrers
- Core Web Vitals scores
- Function execution metrics

### Error Monitoring
- Real-time error tracking
- Function timeout alerts
- Build failure notifications

## 🚀 Quick Deploy Script

Create `deploy.sh`:
```bash
#!/bin/bash
echo "🚀 Deploying to Vercel..."

# Build and test locally
npm run build
npm run lint

# Deploy to production
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Visit: https://your-app.vercel.app"
```

---

## 🎉 Ready to Deploy!

Your Next.js feature toggle app is perfectly configured for Vercel deployment. The platform will handle:
- ✅ Automatic builds on git push
- ✅ Serverless function scaling
- ✅ Global CDN distribution
- ✅ SSL certificate management
- ✅ Environment variable security

**Next step**: Run `vercel --prod` and your app will be live in minutes!