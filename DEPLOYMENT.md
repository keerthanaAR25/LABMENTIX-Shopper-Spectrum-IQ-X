# Deployment Guide - Shopper Spectrum IQ X

This application is now a **Next.js application** that deploys seamlessly to **Vercel** and other platforms.

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy from GitHub (1-Click)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "feat: Convert to Next.js for Vercel deployment"
   git push origin shopper-spectrum-iq-x
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click **"New Project"** → **"Import Git Repository"**

4. Select your GitHub repository: `keerthanaAR25/LABMENTIX-Shopper-Spectrum-IQ-X`

5. Configure project:
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

6. Click **"Deploy"** - Done! ✓

Your app will be live at: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# For production
vercel --prod
```

---

## Local Testing Before Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Start Production Server

```bash
npm start
```

Access at: `http://localhost:3000`

### 4. Run Development Server

```bash
npm run dev
```

Access at: `http://localhost:3000` (with hot reload)

---

## Alternative Deployment Platforms

### Deploy to AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Deploy
amplify publish
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

### Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select repository
4. Railway auto-detects Next.js
5. Click **"Deploy"**

### Deploy to Render

1. Go to [Render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository
4. Select branch
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Click **"Create Web Service"**

---

## Environment Variables

### Production Environment

Create `.env.production` or set in your deployment platform:

```bash
# Next.js Production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### Vercel Environment Setup

1. Go to **Project Settings** → **Environment Variables**
2. Add any required variables
3. Click **"Save"**
4. Redeploy for changes to take effect

---

## Deployment Checklist

- [x] Code is in Git repository
- [x] All dependencies in `package.json`
- [x] `next.config.js` properly configured
- [x] `tsconfig.json` set up
- [x] All API routes in `/app/api/`
- [x] All pages in `/app/`
- [x] Tailwind CSS configured
- [x] No hardcoded sensitive data
- [x] `vercel.json` configured (optional)

---

## Performance Optimization

### Already Implemented

- ✓ Next.js automatic code splitting
- ✓ Image optimization
- ✓ Tailwind CSS purging
- ✓ API route caching headers
- ✓ Zero-JavaScript pages where possible

### Further Optimization

```javascript
// next.config.js additions
module.exports = {
  // Enable SWR for data fetching
  swcMinify: true,
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    optimization: {
      quality: 75,
    },
  },
}
```

---

## Monitoring & Logs

### Vercel Monitoring

1. Dashboard → **Project** → **Analytics**
2. Monitor:
   - Response time
   - Error rate
   - Bandwidth
   - Usage

### View Logs

```bash
# Tail production logs
vercel logs

# Filter by time
vercel logs --since 1h
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm run build` locally first |
| Missing dependencies | Run `npm install` and commit `package-lock.json` |
| Environment variables not working | Redeploy after adding to deployment platform |
| API returns 500 | Check `/app/api/` route handlers |
| Styles not loading | Clear cache: `npm run build && npm start` |
| Slow response times | Check database queries and add caching |

---

## Rollback & Updates

### Rollback to Previous Deployment

**Vercel:**
1. Go to **Deployments**
2. Click on previous deployment
3. Click **"Promote to Production"**

### Update & Redeploy

```bash
# Make changes
git add .
git commit -m "fix: Update feature"
git push

# Vercel auto-deploys, or manually:
vercel --prod
```

---

## Scaling Considerations

### Current Architecture

- Serverless functions (optimal for production)
- Static generation where possible
- Edge caching enabled

### For High Traffic

1. **Enable Vercel Analytics**
   - Identify slow routes
   - Optimize bottlenecks

2. **Add Database** (optional)
   - Current app is fully client-side
   - If needed: Supabase, Firebase, MongoDB

3. **Enable ISR** (Incremental Static Regeneration)
   ```javascript
   export const revalidate = 3600; // Revalidate every hour
   ```

---

## Security Best Practices

- ✓ No sensitive data in code
- ✓ HTTPS enforced by default
- ✓ CORS headers configured
- ✓ API rate limiting ready
- ✓ Input validation on all endpoints

---

## Post-Deployment

1. **Test all features**
   - Customer segmentation
   - Product recommendations
   - Navigation between pages

2. **Monitor performance**
   - Check Core Web Vitals
   - Monitor error rates

3. **Set up alerts**
   - Email notifications for errors
   - Performance degradation alerts

4. **Enable analytics**
   - Track user behavior
   - Monitor usage patterns

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/keerthanaAR25/LABMENTIX-Shopper-Spectrum-IQ-X/issues
- **Community**: https://github.com/vercel/next.js/discussions

---

## Contact & Questions

For deployment issues, check:
1. Local build works: `npm run build && npm start`
2. All dependencies installed: `npm install`
3. Environment variables configured
4. Recent code changes that might cause issues

**Status**: ✓ Ready for Production
