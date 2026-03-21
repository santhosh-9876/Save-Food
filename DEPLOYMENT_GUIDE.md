# 🚀 BiteShare Deployment Guide (Vercel + Render)

## Overview
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Django + PostgreSQL)

---

## 📋 Part 1: Deploy Backend on Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create PostgreSQL Database
1. Click "New +" → "PostgreSQL"
2. Name: `biteshare-db`
3. Database: `biteshare`
4. User: `biteshare_user`
5. Region: Choose closest to you
6. Plan: **Free**
7. Click "Create Database"
8. **Save the Internal Database URL** (you'll need this)

### Step 3: Deploy Django Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `Save-Food`
3. Configure:
   - **Name**: `biteshare-api`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend-drf`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn SaveFood.wsgi:application`
   - **Plan**: **Free**

### Step 4: Add Environment Variables
Click "Environment" tab and add:

```
SECRET_KEY=your-secret-key-here-generate-a-new-one
DEBUG=False
DATABASE_URL=<paste-your-internal-database-url-from-step-2>
```

To generate SECRET_KEY, run in Python:
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. **Copy your backend URL**: `https://biteshare-api.onrender.com`

### Step 6: Test Backend
Visit: `https://biteshare-api.onrender.com/food/donor/`
You should see JSON response (empty array is fine)

---

## 📋 Part 2: Deploy Frontend on Vercel

### Step 1: Update Backend URL
1. Open `frontend-react/SaveFood/.env.production`
2. Replace with your Render URL:
```
VITE_BACKEND_BASE_API=https://biteshare-api.onrender.com
```

### Step 2: Commit Changes
```bash
git add .
git commit -m "Configure for production deployment"
git push origin main
```

### Step 3: Deploy on Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import `Save-Food` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend-react/SaveFood`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 4: Add Environment Variable
1. Go to "Environment Variables"
2. Add:
   - **Key**: `VITE_BACKEND_BASE_API`
   - **Value**: `https://biteshare-api.onrender.com` (your Render URL)
   - **Environment**: Production

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. **Copy your frontend URL**: `https://your-app.vercel.app`

---

## 🔧 Part 3: Final Configuration

### Update Django CORS Settings
1. Go to Render dashboard → Your web service
2. Environment → Add variable:
```
ALLOWED_HOSTS=biteshare-api.onrender.com
```

3. In your code, update `backend-drf/SaveFood/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-app.vercel.app",  # Your Vercel URL
]
```

4. Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Render will auto-deploy the changes.

---

## ✅ Testing Your Deployment

### Test Backend
1. Visit: `https://biteshare-api.onrender.com/food/donor/`
2. Should see JSON response

### Test Frontend
1. Visit: `https://your-app.vercel.app`
2. Try to register/login
3. Try to donate food
4. Check if everything works!

---

## 🐛 Troubleshooting

### Backend Issues
- **500 Error**: Check Render logs (Dashboard → Logs)
- **Database Error**: Verify DATABASE_URL is correct
- **Static Files**: Run `python manage.py collectstatic`

### Frontend Issues
- **API Not Working**: Check browser console for CORS errors
- **Environment Variable**: Redeploy after adding env vars
- **Build Failed**: Check Vercel build logs

### CORS Errors
- Update `CORS_ALLOWED_ORIGINS` in Django settings
- Redeploy backend on Render

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render: Spins down after 15 min inactivity (first request takes 30s)
   - Vercel: 100GB bandwidth/month

2. **Custom Domain** (Optional):
   - Vercel: Settings → Domains → Add
   - Render: Settings → Custom Domain

3. **Database Backups**:
   - Render free tier: No automatic backups
   - Export data regularly

---

## 🎉 Your URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://biteshare-api.onrender.com`
- **Admin Panel**: `https://biteshare-api.onrender.com/admin/`

---

## 🔄 Future Updates

To update your app:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Both Vercel and Render will auto-deploy! 🚀
