# Render Deployment - Quick Checklist

Fast reference for deploying on Render.com

---

## 🚀 QUICK START (5 Steps)

### Step 1: Backend Setup [5 min]
- [ ] Go to https://render.com/dashboard
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Connect GitHub repository `Expense_management`
- [ ] Fill settings:
  - Name: `expense-management-backend`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `node backend/server.js`
  - Runtime: `node-18`

### Step 2: Backend Environment Variables [3 min]
- [ ] Click **"Add Environment Variable"** and add:
  ```
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000
  NODE_ENV=production
  CORS_ORIGIN=https://your-frontend-url.onrender.com
  ```
- [ ] Note: Update CORS_ORIGIN after frontend deployment

### Step 3: Deploy Backend [5 min]
- [ ] Click **"Create Web Service"**
- [ ] Wait for **"Live"** status ✅
- [ ] **Copy your backend URL** (like `https://expense-management-backend.onrender.com`)

### Step 4: Frontend Setup [3 min]
- [ ] Update `frontend/.env` locally:
  ```
  REACT_APP_API_URL=https://expense-management-backend.onrender.com/api
  ```
- [ ] Push to GitHub:
  ```bash
  git add frontend/.env
  git commit -m "Update API URL for Render"
  git push origin master
  ```

### Step 5: Deploy Frontend [8 min]
- [ ] Go to Render dashboard → **"New +"** → **"Static Site"**
- [ ] Connect GitHub repository
- [ ] Fill settings:
  - Name: `expense-management-frontend`
  - Build Command: `cd frontend && npm install && npm run build`
  - Publish Directory: `frontend/build`
- [ ] Click **"Create Static Site"**
- [ ] Wait for **"Live"** status ✅

---

## 🔧 After Deployment

### Update Backend CORS (Important!)
- [ ] Go back to backend service
- [ ] Update `CORS_ORIGIN` to your frontend URL
- [ ] Service auto-redeploys

### Test Application
- [ ] Open frontend URL in browser
- [ ] Test: Register → Login → Add Expense
- [ ] Check Logs for errors

---

## 📍 Your Deployed URLs

| Service | URL |
|---------|-----|
| Frontend | `https://expense-management-frontend.onrender.com` |
| Backend | `https://expense-management-backend.onrender.com` |
| API | `https://expense-management-backend.onrender.com/api` |

---

## ⚡ Free Tier Limits

| Feature | Limit |
|---------|-------|
| Build Minutes | 500/month |
| Storage | 1 GB |
| Inactivity | Spins down after 15 min idle |
| Cost | Free |

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank frontend | Check build logs, verify `frontend/build` exists |
| API errors | Verify `REACT_APP_API_URL`, check backend logs |
| CORS error | Update backend `CORS_ORIGIN` to match frontend URL |
| Connection failed | Check MongoDB URI, whitelist Render IPs |
| Slow startup | Free tier keeps services warm only on paid plans |

---

## 🔐 Security Reminders

- ✅ Never commit `.env` with real credentials
- ✅ Use Render environment variables for secrets
- ✅ Keep MongoDB whitelist updated
- ✅ Use HTTPS (automatic on Render)
- ✅ Restrict CORS to your frontend URL

---

## 📱 Monitor Your Deployment

**Backend Logs:**
- Service → Logs tab → See real-time requests

**Frontend Logs:**
- Service → Logs tab → See build process

**Application Logs:**
- Browser Console (F12) → Check for errors

---

## 🎯 Auto-Deployment

Every `git push` to `master` automatically:
1. Triggers Render build
2. Runs build commands
3. Deploys to live URL (1-2 min)

No manual redeploy needed!

---

## 💰 Upgrade Options

### Free Plan
- Best for: Testing, learning, prototyping
- Limitation: Services spin down after 15 min idle

### Standard Plan ($7/month)
- Keep services always running
- Better performance
- Ideal for projects

### Pro Plan ($25+/month)
- Multiple services
- Priority support
- Advanced features

---

## 🔗 Important Links

- **Render Dashboard**: https://render.com/dashboard
- **Documentation**: https://render.com/docs
- **GitHub Integration**: Already connected
- **MongoDB Atlas**: https://cloud.mongodb.com

---

**Ready to Deploy? Follow the 5 steps above! ✅**
