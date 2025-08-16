# 🚀 Cloudflare Pages Setup - Step by Step

## ⚠️ Important Note

Cloudflare Pages memiliki keterbatasan dengan Next.js API routes. Untuk aplikasi full-stack seperti ini, ada 2 opsi:

### Option 1: Hybrid Deployment (Recommended)
- **Frontend**: Cloudflare Pages (static)
- **Backend**: Vercel/Railway (API routes)
- **Database**: MongoDB Atlas

### Option 2: Full Cloudflare (Advanced)
- **Frontend**: Cloudflare Pages
- **Backend**: Cloudflare Functions (manual conversion)
- **Database**: MongoDB Atlas

## 🎯 Recommended: Hybrid Deployment

### Step 1: Deploy Backend ke Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy API only
vercel --prod
```

### Step 2: Update Frontend untuk External API
Update `src/shared/api/client.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api.vercel.app';
```

### Step 3: Build untuk Static Export
```bash
# Update next.config.ts untuk static export
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_API_URL: 'https://your-api.vercel.app'
  }
};

# Build
npm run build
```

### Step 4: Deploy ke Cloudflare Pages

#### Via GitHub (Recommended)
1. Push code ke GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Pages → Create a project → Connect to Git
4. Select repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Environment variables**: Set frontend env vars

#### Via CLI
```bash
# Install Wrangler
npm i -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy out --project-name feature-toggle
```

## 🔧 Environment Variables

### Backend (Vercel)
```env
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_URL="https://your-api.vercel.app"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
```

### Frontend (Cloudflare Pages)
```env
NEXT_PUBLIC_API_URL="https://your-api.vercel.app"
```

## 🚀 Quick Start Commands

### 1. Deploy Backend
```bash
# Deploy API to Vercel
vercel --prod

# Note the deployment URL
```

### 2. Update Frontend Config
```bash
# Update API URL in code
export NEXT_PUBLIC_API_URL="https://your-api.vercel.app"

# Build for static export
npm run build
```

### 3. Deploy Frontend
```bash
# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name feature-toggle
```

## 📊 Benefits of Hybrid Approach

### Cloudflare Pages (Frontend)
- ✅ **Global CDN**: 300+ edge locations
- ✅ **Free Tier**: 100,000 requests/day
- ✅ **Fast Loading**: Static assets cached globally
- ✅ **DDoS Protection**: Built-in security

### Vercel (Backend)
- ✅ **Serverless Functions**: Auto-scaling API routes
- ✅ **Database Connections**: Optimized for MongoDB
- ✅ **Authentication**: NextAuth.js works perfectly
- ✅ **Free Tier**: 100GB bandwidth/month

## 🔍 Testing Deployment

### 1. Test Backend
```bash
curl https://your-api.vercel.app/api/toggles
```

### 2. Test Frontend
```bash
# Visit your Cloudflare Pages URL
https://feature-toggle.pages.dev
```

### 3. Test Integration
- Login with Google/GitHub
- Create a toggle
- Verify CRUD operations

## 💰 Cost Comparison

### Hybrid (Cloudflare + Vercel)
- **Cloudflare Pages**: FREE (100K requests/day)
- **Vercel**: FREE (100GB bandwidth/month)
- **MongoDB Atlas**: FREE (512MB storage)
- **Total**: $0/month

### Alternative: Full Vercel
- **Vercel**: FREE tier covers everything
- **MongoDB Atlas**: FREE (512MB storage)
- **Total**: $0/month

## 🎯 Recommendation

**Use Vercel for full-stack deployment** - it's simpler and more reliable for Next.js applications with API routes.

Cloudflare Pages is excellent for static sites, but requires additional complexity for full-stack apps.

---

**Next Step**: Deploy to Vercel instead for the best developer experience!