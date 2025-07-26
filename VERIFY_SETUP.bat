@echo off
echo ========================================
echo ShopMe Project Setup Verification
echo ========================================
echo.

echo Checking Backend Dependencies...
cd shopme-backend
if exist node_modules (
    echo ✅ Backend node_modules exists
) else (
    echo ❌ Backend node_modules missing - run: npm install
)

echo.
echo Checking Frontend Dependencies...
cd ..\shopme-frontend
if exist node_modules (
    echo ✅ Frontend node_modules exists
) else (
    echo ❌ Frontend node_modules missing - run: npm install
)

echo.
echo Checking Environment Files...
cd ..
if exist shopme-backend\.env (
    echo ✅ Backend .env exists
) else (
    echo ❌ Backend .env missing
)

if exist shopme-frontend\.env (
    echo ✅ Frontend .env exists
) else (
    echo ❌ Frontend .env missing
)

echo.
echo ========================================
echo Setup Complete! You can now run:
echo 1. Double-click START_BACKEND.bat
echo 2. Double-click START_FRONTEND.bat
echo ========================================
pause