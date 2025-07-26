# ShopMe Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Deploy Backend (Heroku)
```bash
cd shopme-backend
heroku create shopme-backend-[your-name]
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a shopme-backend-[your-name]
git push heroku main
```

### 2. Set Backend Environment Variables
```bash
heroku config:set DATABASE_URL="postgresql://neondb_owner:npg_E4ZLIY7KtbXW@ep-aged-term-a1mp04ca-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
heroku config:set JWT_SECRET="pizza-secret-key-2024"
```

### 3. Update Frontend API URLs
Replace `shopme-backend.herokuapp.com` in `src/utils/api.js` with your actual Heroku URL

### 4. Build Frontend
```bash
cd shopme-frontend
npm run build
```

### 5. Deploy to Netlify
1. Go to netlify.com
2. Drag & drop the `build` folder
3. Site is live!

## 🔧 Environment Variables

### Backend (Heroku):
- DATABASE_URL: Your Neon PostgreSQL URL
- JWT_SECRET: pizza-secret-key-2024

### Frontend (Netlify):
- No environment variables needed (API URL is in code)

## 🎯 Admin Access
- URL: https://your-site.netlify.app/admin/login
- Email: admin@shopme.com
- Password: admin123

## ✅ Features Ready for Production:
- ✅ User authentication
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Order management
- ✅ Admin dashboard
- ✅ Database integration
- ✅ Responsive design

Your ShopMe ecommerce platform is ready to go live!