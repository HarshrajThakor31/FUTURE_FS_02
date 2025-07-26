@echo off
echo ========================================
echo Deploying ShopMe to Vercel
echo ========================================

echo.
echo Deploying Backend...
cd shopme-backend
call vercel --prod
if %errorlevel% neq 0 (
    echo ❌ Backend deployment failed
    pause
    exit /b 1
)

echo.
echo Deploying Frontend...
cd ..\shopme-frontend
call vercel --prod
if %errorlevel% neq 0 (
    echo ❌ Frontend deployment failed
    pause
    exit /b 1
)

echo.
echo ✅ Deployment Complete!
echo Check your Vercel dashboard for URLs
pause