# 🌐 Cloudflare Pages Deployment Guide

## 📋 Prerequisites

### 1. **Cloudflare Account**
- Sign up at [cloudflare.com](https://cloudflare.com)
- Verify email address
- Access to Cloudflare Dashboard

### 2. **Domain (Optional)**
- Custom domain for production
- Or use `*.pages.dev` subdomain (free)

### 3. **GitHub Repository**
- Push code to GitHub repository
- Repository must be public or have Cloudflare access

## 🛠️ Setup Steps

### Step 1: Install Wrangler CLI
```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare
```bash
wrangler login
```

### Step 3: Configure Next.js for Static Export
Update `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

### Step 4: Update Package.json Scripts
```json
{
  "scripts": {
    "build:cloudflare": "next build",
    "deploy:cloudflare": "npm run build:cloudflare && wrangler pages deploy out"
  }
}
```

### Step 5: Create Cloudflare Pages Project

#### Option A: Via Dashboard (Recommended)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click "Pages" in sidebar
3. Click "Create a project"
4. Connect to GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/`

#### Option B: Via CLI
```bash
wrangler pages project create feature-toggle
```

### Step 6: Set Environment Variables

In Cloudflare Dashboard → Pages → Settings → Environment Variables:

```env
DATABASE_URL = "mongodb+srv://username:password@cluster.mongodb.net/database"
NEXTAUTH_URL = "https://your-domain.pages.dev"
NEXTAUTH_SECRET = "your-secret-key-here"
GOOGLE_CLIENT_ID = "your-google-client-id"
GOOGLE_CLIENT_SECRET = "your-google-client-secret"
GITHUB_ID = "your-github-client-id"
GITHUB_SECRET = "your-github-client-secret"
```

### Step 7: Deploy
```bash
npm run deploy:cloudflare
```

## ⚠️ Important Considerations

### API Routes Limitation
Cloudflare Pages doesn't support Next.js API routes directly. We need to use Cloudflare Functions:

1. **Move API routes** to `functions/api/` directory
2. **Convert to Cloudflare Functions** format
3. **Use Cloudflare Workers** for server-side logic

### Alternative: Hybrid Approach
- **Frontend**: Cloudflare Pages (static)
- **Backend**: Vercel/Railway (API routes)
- **Database**: MongoDB Atlas

## 🔧 Cloudflare Functions Setup

Create `functions/api/toggles.ts`:
```typescript
export async function onRequest(context) {
  const { request, env } = context;
  
  // Handle API logic here
  // Access env variables via env.DATABASE_URL
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

## 🚀 Deployment Commands

### Development
```bash
wrangler pages dev out
```

### Production
```bash
wrangler pages deploy out --project-name feature-toggle
```

### With Custom Domain
```bash
wrangler pages deploy out --project-name feature-toggle --compatibility-date 2024-01-15
```

## 📊 Performance Benefits

- **Global CDN**: 300+ edge locations
- **Fast Cold Starts**: < 10ms response time
- **Free Tier**: 100,000 requests/day
- **Automatic HTTPS**: SSL certificates included
- **DDoS Protection**: Built-in security

## 🔍 Monitoring

- **Analytics**: Built-in traffic analytics
- **Real User Monitoring**: Core Web Vitals
- **Error Tracking**: Function logs and errors
- **Performance**: Response time metrics

## 💰 Cost Structure

### Free Tier
- 500 builds/month
- 100,000 requests/day
- 20,000 functions invocations/day
- Unlimited bandwidth

### Paid Plans
- Pro: $20/month
- Business: $200/month
- Enterprise: Custom pricing

## 🔧 Troubleshooting

### Build Failures
```bash
# Check build logs
wrangler pages deployment list
wrangler pages deployment tail
```

### Function Errors
```bash
# View function logs
wrangler pages functions logs
```

### Environment Issues
- Verify all environment variables are set
- Check variable names match exactly
- Ensure no trailing spaces in values

## 📝 Next Steps After Deployment

1. **Test Authentication**: Verify Google/GitHub OAuth
2. **Database Connection**: Test MongoDB connectivity
3. **API Endpoints**: Verify all CRUD operations
4. **Performance**: Run Lighthouse audit
5. **Custom Domain**: Configure DNS if using custom domain

---

**Note**: Due to API routes limitation, consider using Vercel for full-stack deployment or implement Cloudflare Functions for API logic.