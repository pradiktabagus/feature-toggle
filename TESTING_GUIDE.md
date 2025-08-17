# CloudFront Testing Guide

## 1. Local Testing (Recommended First)

### Start Development Server
```bash
bun dev
# Server runs on http://localhost:3000
```

### Test Cache Flow
```bash
# 1. Create toggle via UI
# Go to http://localhost:3000 → login → create toggle

# 2. Test public API (should cache to S3)
curl http://localhost:3000/api/public/toggles/your-toggle-key

# 3. Check S3 bucket for cached file
# AWS S3 Console → feature-toggle-files → public/toggles/

# 4. Test CloudFront direct access
curl https://d338emydppt3j.cloudfront.net/public/toggles/your-toggle-key.json
```

## 2. Production Testing (After Local Works)

### Deploy to Vercel
```bash
bun run deploy
# or
vercel --prod
```

### Test Production Flow
```bash
# 1. Production public API
curl https://feature-toggle-one.vercel.app/api/public/toggles/your-toggle-key

# 2. CloudFront cached version
curl https://d338emydppt3j.cloudfront.net/public/toggles/your-toggle-key.json

# 3. CDN redirect endpoint
curl -I https://feature-toggle-one.vercel.app/api/cdn/toggles/your-toggle-key
```

## 3. Testing Checklist

### ✅ Cache Creation
- [ ] Create toggle via UI
- [ ] Check S3 bucket has `public/toggles/{key}.json`
- [ ] CloudFront serves file correctly

### ✅ Cache Updates
- [ ] Update toggle value
- [ ] Verify S3 file updated
- [ ] CloudFront serves new value (may take 5-15 min)

### ✅ Cache Deletion
- [ ] Delete toggle
- [ ] S3 file removed
- [ ] CloudFront returns 404

## 4. Debug Commands

```bash
# List all active toggles
curl http://localhost:3000/api/public/toggles

# Check specific toggle
curl http://localhost:3000/api/public/toggles/TOGGLE_KEY_HERE

# Test CloudFront direct
curl https://d338emydppt3j.cloudfront.net/public/toggles/TOGGLE_KEY_HERE.json
```

## Recommended Testing Order:
1. **Local first** - verify S3 caching works
2. **CloudFront fix** - ensure origin points to S3
3. **Production deploy** - only after local testing passes