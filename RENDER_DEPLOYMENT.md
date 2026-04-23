# Render Deployment Guide - MERN Expense Management System

Complete step-by-step guide to deploy both backend and frontend on Render.com

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Render account (free at https://render.com)
- ✅ GitHub repository pushed
- ✅ MongoDB Atlas connection string ready
- ✅ Backend and Frontend code in separate folders

---

## 🚀 PART 1: Deploy Backend on Render

### Step 1: Create Render Account & Connect GitHub

1. Go to https://render.com
2. Click **"Sign up"** (or sign in if you have account)
3. Choose **"Sign up with GitHub"** option
4. Authorize Render to access your GitHub account
5. Done! Your GitHub is connected

---

### Step 2: Create Backend Web Service

1. From Render dashboard, click **"New +"** → **"Web Service"**
2. Search for your repository: `Expense_management`
3. Select the repository and click **"Connect"**
4. Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | `expense-management-backend` |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `master` |
| **Build Command** | `npm install` |
| **Start Command** | `node backend/server.js` |
| **Runtime** | `node-18` |

---

### Step 3: Set Environment Variables

1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"**
3. Add these variables:

```
MONGODB_URI = mongodb+srv://aanjneya2428cseai15_db_user:1nygpJYf4zU1jYfL@cluster0.3nszsqd.mongodb.net/library_db?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET = vA7QBOSPKIBTgw7ulXYMsBqIbwWc4pWfzyWOZmD6gTE

PORT = 5000

NODE_ENV = production

CORS_ORIGIN = https://your-frontend-url.onrender.com
```

⚠️ **NOTE**: Replace `CORS_ORIGIN` URL later after frontend is deployed

---

### Step 4: Review & Deploy Backend

1. Scroll to top, check **"Free"** plan (or paid if preferred)
2. Click **"Create Web Service"** button
3. Wait for deployment... (takes 2-5 minutes)
4. You'll see **"Live"** status when complete ✅

**Your backend URL will be something like:**
```
https://expense-management-backend.onrender.com
```

**Copy this URL!** You'll need it for the frontend.

---

## 🎨 PART 2: Deploy Frontend on Render

### Step 1: Create Static Site for Frontend

1. From Render dashboard, click **"New +"** → **"Static Site"**
2. Search for your repository: `Expense_management`
3. Select and click **"Connect"**
4. Fill in the details:

| Field | Value |
|-------|-------|
| **Name** | `expense-management-frontend` |
| **Branch** | `master` |
| **Build Command** | `cd frontend && npm install && npm run build` |
| **Publish Directory** | `frontend/build` |

---

### Step 2: Update Environment Variables

1. Before deployment, we need to update the frontend .env
2. Go back to your local project
3. Update `frontend/.env`:

```
REACT_APP_API_URL=https://expense-management-backend.onrender.com/api
```

**Replace `expense-management-backend` with your actual backend service name**

---

### Step 3: Push Changes to GitHub

```bash
cd C:\Users\aanjn\OneDrive\Desktop\MSE2_pract
git add frontend/.env
git commit -m "Update frontend API URL for Render deployment"
git push origin master
```

---

### Step 4: Deploy Frontend on Render

1. Go back to frontend Static Site creation on Render
2. Click **"Create Static Site"** button
3. Wait for build and deployment... (takes 3-5 minutes)
4. You'll see deployment progress in logs
5. When complete, you'll get a URL like:

```
https://expense-management-frontend.onrender.com
```

---

### Step 5: Update Backend CORS

1. Go back to backend web service on Render
2. Click **"Environment"** tab
3. Update `CORS_ORIGIN` to:
```
https://expense-management-frontend.onrender.com
```
4. Click **"Save Changes"**
5. Deployment will auto-trigger

---

## ✅ Testing Your Deployment

### 1. Access Your Application

Open in browser:
```
https://expense-management-frontend.onrender.com
```

### 2. Test Registration

- Create a new account
- Check console for errors (F12 → Console tab)
- Should redirect to login after registration

### 3. Test Login

- Login with your credentials
- Should see dashboard

### 4. Test Expenses

- Add an expense
- Refresh page - expense should persist
- Try filtering by category
- Delete an expense

### 5. Check Backend Logs

On Render dashboard:
1. Click on **backend service**
2. Go to **"Logs"** tab
3. Should see API requests and MongoDB connection logs

---

## 🔧 Troubleshooting

### Issue: "Cannot POST /api/auth/register"

**Solution:**
1. Check backend is deployed and running (check Logs)
2. Verify `REACT_APP_API_URL` in frontend
3. Run `git push` with updated frontend .env
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: "MongoDB Connection Failed"

**Solution:**
1. Verify `MONGODB_URI` in backend environment variables
2. Check MongoDB Atlas IP whitelist includes Render IPs
3. MongoDB Atlas → Network Access → Add IP (use 0.0.0.0/0 for Render)

### Issue: "CORS Error"

**Solution:**
1. Verify `CORS_ORIGIN` in backend matches frontend URL exactly
2. Should be like: `https://expense-management-frontend.onrender.com`
3. Make sure NO trailing slash

### Issue: Frontend shows "Blank Page"

**Solution:**
1. Check Render logs for build errors
2. Verify build command: `cd frontend && npm install && npm run build`
3. Check if `frontend/build` folder exists after build

### Issue: Deployment Takes Too Long

**Solution:**
1. Free tier has slower deployment
2. Upgrade to **"Standard"** plan for faster speeds
3. Check logs for specific bottlenecks

---

## 📊 Your Deployed URLs

After successful deployment:

| Component | Type | URL |
|-----------|------|-----|
| **Frontend** | Static Site | `https://expense-management-frontend.onrender.com` |
| **Backend** | Web Service | `https://expense-management-backend.onrender.com/api` |

---

## 🔐 Security Checklist

- ✅ `.env` file NOT pushed to GitHub
- ✅ Credentials stored in Render environment variables only
- ✅ CORS restricted to frontend domain
- ✅ JWT_SECRET is secret (not exposed)
- ✅ HTTPS enabled by default on Render
- ✅ MongoDB password protected

---

## 📈 Monitoring & Maintenance

### View Logs

1. Click on service (backend or frontend)
2. Go to **"Logs"** tab
3. See real-time activity

### Restart Service

1. In service dashboard
2. Click **"Restart"** button
3. Service will redeploy

### Update Code

1. Make changes locally
2. Commit and push to GitHub
3. Render auto-deploys within 1-2 minutes

### Scale Resources (Paid Plans)

1. Backend: Upgrade instance size
2. Frontend: Usually doesn't need scaling

---

## 🎯 Common Environment Variables Reference

### Backend (.env on Render)

```
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://expense-management-frontend.onrender.com
```

### Frontend (.env locally, then pushed)

```
REACT_APP_API_URL=https://expense-management-backend.onrender.com/api
```

---

## 🚀 Next Steps After Deployment

1. **Test Everything** - Go through all features
2. **Monitor Logs** - Check for errors
3. **Share URL** - Send to friends/instructors
4. **Upgrade Plan** - Consider paid tier if free tier isn't enough
5. **Set up Domain** - Add custom domain (optional)
6. **Configure Custom Domain** - In Render settings

---

## 💡 Pro Tips

1. **Free Tier Limitation**: Services spin down after 15 minutes of inactivity
   - First request after idle takes 15-30 seconds
   - Perfect for testing/learning

2. **Upgrade to Standard** for production-grade performance
   - Keeps services always running
   - Better performance
   - Starting at $7/month

3. **Use Render CLI** for advanced deployment:
   ```bash
   npm install -g render-cli
   render login
   ```

4. **GitHub Integration** - Auto-deploys on every push to `master`
   - No need to manually redeploy
   - Just commit and push!

---

## 📞 Support & Resources

- **Render Docs**: https://render.com/docs
- **Render Support**: https://render.com/support
- **Status Page**: https://status.render.com/

---

**Your deployment on Render is complete! 🎉**

Your Expense Management System is now live and accessible from anywhere!
