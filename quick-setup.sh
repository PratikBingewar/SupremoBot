#!/bin/bash

# S.A.R.A. Mobile App - Quick Setup Script
echo "🚀 S.A.R.A. Mobile App Setup Starting..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java not found. Please install Java JDK first:"
    echo "   https://www.oracle.com/java/technologies/downloads/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Java version: $(java --version | head -1)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build web application
echo "🏗️ Building web application..."
npm run build

# Check if build was successful
if [ ! -d "dist/public" ]; then
    echo "❌ Build failed. dist/public directory not found."
    exit 1
fi

# Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync android

# Verify Android project exists
if [ ! -d "android" ]; then
    echo "❌ Android project not found. Capacitor sync may have failed."
    exit 1
fi

echo "✅ Setup completed successfully!"
echo ""
echo "📱 Next steps:"
echo "1. Install Android Studio: https://developer.android.com/studio"
echo "2. Open Android project: npx cap open android"
echo "3. Build APK in Android Studio: Build → Build APK"
echo "4. Find APK at: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "🎉 Your S.A.R.A. mobile app is ready to build!"