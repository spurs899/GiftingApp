# GitHub Pages Deployment Guide

## Quick Setup

1. **Push your code to GitHub**
2. **Enable GitHub Pages in repository settings**:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"
3. **The workflow will automatically deploy!**

## What happens:

1. On push to `main`/`master`, GitHub Actions triggers
2. Installs Node.js and dependencies
3. Generates static data file
4. Builds Next.js static export
5. Deploys to GitHub Pages

## Access your site:

Your site will be available at:
```
https://YOUR_USERNAME.github.io/GiftingApp/
```

## Important Notes:

- **Demo Mode**: GitHub Pages version uses in-memory storage
- **No Persistence**: Changes reset on page refresh
- **Full UI**: Complete gifting flow works, just no persistence
- **For Production**: Deploy to Vercel/Netlify for full functionality

## Troubleshooting:

If deployment fails:
1. Check Actions tab for error logs
2. Ensure `basePath` in `next.config.ts` matches your repo name
3. Verify Pages is enabled in repository settings

## Local Testing of Static Build:

```bash
npm run build:static
npx serve out
```

Then open http://localhost:3000/GiftingApp/
