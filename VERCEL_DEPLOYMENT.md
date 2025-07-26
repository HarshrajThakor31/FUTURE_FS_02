# ShopMe Vercel Deployment Guide

## 🚀 Deploy to Vercel (Both Frontend & Backend)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy Backend
```bash
cd shopme-backend
vercel
# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: shopme-backend
# - Directory: ./
# - Override settings? N
```

### 3. Set Backend Environment Variables
```bash
vercel env add DATABASE_URL
# Paste: postgresql://neondb_owner:npg_E4ZLIY7KtbXW@ep-aged-term-a1mp04ca-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

vercel env add JWT_SECRET
# Paste: pizza-secret-key-2024
```

### 4. Update Frontend API URL
In `shopme-frontend/src/utils/api.js`, replace `shopme-backend.vercel.app` with your actual Vercel backend URL

### 5. Deploy Frontend
```bash
cd ../shopme-frontend
vercel
# Follow same prompts for frontend
```

## 🔗 Your Live URLs:
- **Frontend**: https://shopme-frontend.vercel.app
- **Backend**: https://shopme-backend.vercel.app
- **Admin**: https://shopme-frontend.vercel.app/admin/login

## 🎯 Admin Credentials:
- Email: admin@shopme.com
- Password: admin123

## ✅ Ready Features:
- Full ecommerce platform
- Admin dashboard
- Order management
- User authentication
- Product catalog
- Shopping cart

Your ShopMe platform is now live on Vercel!