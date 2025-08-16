# 🚀 Deployment Guide - Secure Version

## ⚠️ Security Notice
This guide contains placeholder values. Replace with your actual credentials during deployment.

## 🎯 Vercel Deployment Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login & Deploy
```bash
vercel login
vercel --prod
```

### 3. Set Environment Variables
Use your actual values from `.env.local`:

```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL  
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add GITHUB_ID
vercel env add GITHUB_SECRET
```

## 📋 Environment Variables Template

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

## ✅ Ready to Deploy

Your application is configured and ready for Vercel deployment!

```bash
vercel --prod
```

## 🔒 Security Best Practices

1. Never commit `.env.local` or files with real credentials
2. Use Vercel dashboard to set environment variables
3. Rotate secrets if accidentally exposed
4. Use `.env.example` for templates only