# 📱 Complete APK Build Guide - S.A.R.A. Mobile App

## 🖥️ Environment Setup (Step by Step)

### Step 1: Install Node.js
1. **Download Node.js**: Go to https://nodejs.org/
2. **Choose Version**: Download LTS version (Long Term Support)
3. **Install**: Run the installer and follow setup wizard
4. **Verify Installation**:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install Java Development Kit (JDK)
1. **Download JDK**: Go to https://www.oracle.com/java/technologies/downloads/
2. **Choose Version**: Download JDK 17 or higher
3. **Install JDK**: Run installer and complete setup
4. **Set JAVA_HOME Environment Variable**:
   - **Windows**: 
     - Open System Properties → Advanced → Environment Variables
     - Add new variable: `JAVA_HOME` = `C:\Program Files\Java\jdk-17`
     - Add to PATH: `%JAVA_HOME%\bin`
   - **Mac**: Add to ~/.bash_profile:
     ```bash
     export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
     export PATH=$JAVA_HOME/bin:$PATH
     ```
   - **Linux**: Add to ~/.bashrc:
     ```bash
     export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
     export PATH=$JAVA_HOME/bin:$PATH
     ```
5. **Verify Installation**:
   ```bash
   java --version
   javac --version
   ```

### Step 3: Install Android Studio
1. **Download Android Studio**: Go to https://developer.android.com/studio
2. **Install Android Studio**: Run installer with default settings
3. **First Launch Setup**:
   - Open Android Studio
   - Follow setup wizard
   - Install Android SDK (API 30 or higher recommended)
   - Install Android SDK Build-Tools
   - Install Android Emulator (optional but recommended)
4. **Set Android Environment Variables**:
   - **Windows**: Add to PATH:
     ```
     C:\Users\[USERNAME]\AppData\Local\Android\Sdk\platform-tools
     C:\Users\[USERNAME]\AppData\Local\Android\Sdk\tools
     ```
   - **Mac/Linux**: Add to ~/.bash_profile or ~/.bashrc:
     ```bash
     export ANDROID_HOME=$HOME/Android/Sdk
     export PATH=$ANDROID_HOME/platform-tools:$PATH
     export PATH=$ANDROID_HOME/tools:$PATH
     ```

### Step 4: Verify Android Setup
```bash
adb --version
```

## 📁 Project Setup

### Step 5: Download S.A.R.A. Project
1. **Download from Replit**: Export all project files
2. **Create New Folder**: `mkdir sara-mobile-app`
3. **Extract Files**: Copy all files to the new folder
4. **Navigate to Project**: `cd sara-mobile-app`

### Step 6: Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Capacitor CLI globally (optional)
npm install -g @capacitor/cli

# Verify Capacitor installation
npx cap --version
```

### Step 7: Build Web Assets
```bash
# Build the React web application
npm run build

# Verify build completed
ls -la dist/public/
```

## 🔧 Capacitor & Android Setup

### Step 8: Initialize Capacitor (Already Done)
The project already has Capacitor configured, but here's how it was set up:
```bash
# This was already done in your project:
# npx cap init "S.A.R.A. - Supremo Traders" "com.supremotraders.sara" --web-dir=dist/public
# npx cap add android
```

### Step 9: Sync Web Assets to Android
```bash
# Sync built web assets to Android project
npx cap sync android

# Verify sync completed
ls -la android/app/src/main/assets/
```

### Step 10: Configure Android Project
1. **Open Android Project**:
   ```bash
   npx cap open android
   ```
2. **Android Studio Opens**: Wait for Gradle sync to complete
3. **Check App Configuration**:
   - App name: "S.A.R.A. - Supremo Traders"
   - Package name: "com.supremotraders.sara"
   - Target SDK: 33 or higher

## 🏗️ Building the APK

### Method 1: Using Android Studio (Recommended)

#### Step 11: Build APK in Android Studio
1. **Open Project**: Android Studio should show your project
2. **Wait for Gradle Sync**: Let Android Studio finish syncing
3. **Select Build Variant**: 
   - View → Tool Windows → Build Variants
   - Select "debug" for testing APK
4. **Build APK**:
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Wait for build to complete
5. **Locate APK**:
   - Click "locate" in the build notification
   - Or find at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Method 2: Using Command Line

#### Step 12: Build APK via Gradle
```bash
# Navigate to Android directory
cd android

# Make gradlew executable (Mac/Linux only)
chmod +x gradlew

# Build debug APK
./gradlew assembleDebug

# For Windows, use:
# gradlew.bat assembleDebug

# Find APK at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## 📲 Testing & Installation

### Step 13: Test APK on Device
1. **Enable Developer Options** on Android device:
   - Settings → About Phone → Tap "Build Number" 7 times
2. **Enable USB Debugging**:
   - Settings → Developer Options → USB Debugging
3. **Install APK**:
   ```bash
   # Via ADB
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   
   # Or copy APK to device and install manually
   ```

### Step 14: Test App Features
- **Login**: Use Admin/Admin credentials
- **Dashboard**: Check all sections load properly
- **Chat Interface**: Test S.A.R.A. responses
- **Web Link**: Verify "Open Web App" button works
- **Navigation**: Test all screens and back buttons

## 🚀 Production Build (Optional)

### Step 15: Generate Signed APK for Play Store
1. **Generate Keystore**:
   ```bash
   keytool -genkey -v -keystore sara-app-key.keystore -alias sara-key -keyalg RSA -keysize 2048 -validity 10000
   ```
2. **Configure Signing** in Android Studio:
   - Build → Generate Signed Bundle/APK
   - Choose APK
   - Create or use existing keystore
   - Build release APK
3. **Upload to Play Store**: Follow Google Play Console guidelines

## 📋 Project Structure Summary
```
sara-mobile-app/
├── android/                    # Native Android project
│   ├── app/
│   │   ├── build/outputs/apk/  # Built APK files
│   │   └── src/main/
├── client/src/                 # React web app source
├── dist/public/               # Built web assets
├── capacitor.config.ts        # Capacitor configuration
├── package.json              # Node.js dependencies
└── BUILD-GUIDES/             # Documentation
```

## ✅ Success Checklist
- [ ] Node.js installed and verified
- [ ] Java JDK installed and JAVA_HOME set
- [ ] Android Studio installed with SDK
- [ ] Project dependencies installed
- [ ] Web assets built successfully
- [ ] Capacitor sync completed
- [ ] Android project opens in Android Studio
- [ ] APK builds without errors
- [ ] APK installs and runs on device
- [ ] All app features work correctly

## 🆘 Troubleshooting

### Common Issues:
1. **Gradle Sync Failed**: Update Android Studio and SDK
2. **JAVA_HOME not found**: Verify environment variable setup
3. **Build Tools Missing**: Install via SDK Manager in Android Studio
4. **APK Install Failed**: Enable "Unknown Sources" on device
5. **App Crashes**: Check device logs with `adb logcat`

### Build Error Solutions:
- **Clean Build**: Build → Clean Project → Rebuild Project
- **Invalidate Caches**: File → Invalidate Caches and Restart
- **Update Gradle**: Use latest Gradle version in project

Your S.A.R.A. mobile app will have all features:
- Persistent login system
- AI chat interface
- Dashboard with company information
- Integrated web app link
- Mobile-optimized responsive design
- Native Android performance