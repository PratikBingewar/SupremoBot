@echo off
echo 🚀 S.A.R.A. Mobile App Setup Starting...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first:
    echo    https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Java is installed
java --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java not found. Please install Java JDK first:
    echo    https://www.oracle.com/java/technologies/downloads/
    pause
    exit /b 1
)

echo ✅ Node.js and Java are installed

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build web application
echo 🏗️ Building web application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

REM Sync with Capacitor
echo 🔄 Syncing with Capacitor...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ❌ Capacitor sync failed
    pause
    exit /b 1
)

echo ✅ Setup completed successfully!
echo.
echo 📱 Next steps:
echo 1. Install Android Studio: https://developer.android.com/studio
echo 2. Open Android project: npx cap open android
echo 3. Build APK in Android Studio: Build → Build APK
echo 4. Find APK at: android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo 🎉 Your S.A.R.A. mobile app is ready to build!
pause