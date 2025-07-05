# 🚀 Surfer Video Downloader - Deployment Guide

## Overview
This guide will help you deploy the Surfer video downloader app to production. The app consists of:
- **Frontend**: React app (deploy to Vercel/Netlify)
- **Backend**: Node.js/Express API (deploy to Railway/Render)

## 🎯 Quick Deploy Options

### Option 1: Vercel + Railway (Recommended)
- **Frontend**: Vercel (free tier)
- **Backend**: Railway (free tier)

### Option 2: Netlify + Render
- **Frontend**: Netlify (free tier)
- **Backend**: Render (free tier)

### Option 3: All-in-One Railway
- Deploy both frontend and backend on Railway

---

## 📋 Pre-Deployment Checklist

### ✅ Backend Requirements
- [ ] Node.js 18+ support
- [ ] yt-dlp installed on server
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] File storage configured

### ✅ Frontend Requirements
- [ ] Environment variables set
- [ ] API URL configured
- [ ] Build process working
- [ ] Static files optimized

---

## 🚀 Deployment Steps

### Step 1: Deploy Backend (Railway)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Clone your repo
   git clone <your-repo-url>
   cd Surfer/backend
   
   # Railway will auto-detect Node.js
   # Push to GitHub and connect to Railway
   ```

3. **Configure Environment Variables**
   - In Railway dashboard, go to your backend service
   - Add environment variables:
     ```
     PORT=5000
     NODE_ENV=production
     ```

4. **Install yt-dlp on Railway**
   - Railway uses Ubuntu, so yt-dlp needs to be installed
   - Add this to your `package.json` scripts:
     ```json
     "postinstall": "curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && chmod a+rx /usr/local/bin/yt-dlp"
     ```

5. **Update Backend Code**
   - Change yt-dlp path in `backend/src/app.js`:
     ```javascript
     // Change from:
     execFile('/Users/macejaita/Library/Python/3.9/bin/yt-dlp', ...)
     
     // To:
     execFile('yt-dlp', ...)
     ```

### Step 2: Deploy Frontend (Vercel)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   cd Surfer/frontend
   
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure Environment Variables**
   - In Vercel dashboard, go to your project
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-url.railway.app
     ```

### Step 3: Test Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```

2. **Test Frontend**
   - Visit your Vercel URL
   - Try downloading a video

---

## 🔧 Alternative Deployment Options

### Render (Backend Alternative)
1. Go to [render.com](https://render.com)
2. Connect GitHub repo
3. Create new Web Service
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables

### Netlify (Frontend Alternative)
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repo
3. Set build command: `cd frontend && npm run build`
4. Set publish directory: `frontend/dist`
5. Add environment variables

---

## 🛠️ Troubleshooting

### Common Issues

1. **Backend CORS Errors**
   - Ensure CORS is configured for your frontend domain
   - Update `app.use(cors())` with specific origin

2. **yt-dlp Not Found**
   - Ensure yt-dlp is installed on the server
   - Use absolute path or add to PATH

3. **File Download Issues**
   - Check file permissions on server
   - Ensure download directory exists

4. **Environment Variables**
   - Double-check all environment variables are set
   - Restart services after changing env vars

### Debug Commands

```bash
# Check backend logs
railway logs

# Check frontend build
vercel logs

# Test API endpoints
curl -X GET https://your-backend-url.railway.app/api/health
```

---

## 📊 Monitoring & Maintenance

### Health Checks
- Backend: `/api/health`
- Frontend: Vercel/Netlify dashboard

### Logs
- Railway: Built-in log viewer
- Vercel: Function logs in dashboard

### Scaling
- Railway: Auto-scales based on usage
- Vercel: Global CDN, auto-scales

---

## 🔒 Security Considerations

1. **Rate Limiting**
   - Add rate limiting to prevent abuse
   - Consider using Express Rate Limit

2. **File Cleanup**
   - Implement automatic file cleanup
   - Set up cron jobs for old files

3. **CORS Configuration**
   - Only allow your frontend domain
   - Don't use `cors()` without parameters in production

---

## 💰 Cost Optimization

### Free Tier Limits
- **Railway**: $5/month free tier
- **Vercel**: 100GB bandwidth/month
- **Render**: 750 hours/month

### Optimization Tips
1. Implement file cleanup
2. Add caching headers
3. Compress responses
4. Use CDN for static files

---

## 🎉 Success!

Once deployed, your Surfer video downloader will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app`

Users can now download videos from YouTube, Twitter, Instagram, TikTok, and more platforms!

---

## 📞 Support

If you encounter issues:
1. Check the logs in your deployment platform
2. Test endpoints manually with curl
3. Verify environment variables
4. Check file permissions and paths

Happy deploying! 🚀 