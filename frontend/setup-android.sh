#!/bin/bash

echo "🚀 Setting up Tamil Nadu Weather App for Android Build"
echo "====================================================="

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the frontend directory."
    exit 1
fi

# Check Node.js version
print_info "Checking Node.js version..."
NODE_VERSION=$(node --version 2>/dev/null || echo "not installed")
if [[ $NODE_VERSION == "not installed" ]]; then
    print_error "Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi
print_status "Node.js version: $NODE_VERSION"

# Check npm/yarn
print_info "Checking package manager..."
if command -v yarn &> /dev/null; then
    PKG_MANAGER="yarn"
    print_status "Using Yarn as package manager"
elif command -v npm &> /dev/null; then
    PKG_MANAGER="npm"
    print_status "Using npm as package manager"
else
    print_error "Neither npm nor yarn found. Please install Node.js."
    exit 1
fi

# Install dependencies
print_info "Installing project dependencies..."
if [ "$PKG_MANAGER" = "yarn" ]; then
    yarn install
else
    npm install
fi

if [ $? -eq 0 ]; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Build React production version
print_info "Building React production version..."
if [ "$PKG_MANAGER" = "yarn" ]; then
    yarn build
else
    npm run build
fi

if [ $? -eq 0 ]; then
    print_status "React build completed successfully"
else
    print_error "React build failed"
    exit 1
fi

# Check Capacitor CLI
print_info "Checking Capacitor CLI..."
if ! command -v npx &> /dev/null; then
    print_error "npx not found. Please ensure Node.js is properly installed."
    exit 1
fi

# Sync Capacitor
print_info "Syncing Capacitor project..."
npx cap sync android

if [ $? -eq 0 ]; then
    print_status "Capacitor sync completed"
else
    print_error "Capacitor sync failed"
    exit 1
fi

# Check Android environment
print_info "Checking Android development environment..."

# Check for Android Studio
ANDROID_STUDIO_FOUND=false
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if [ -d "/Applications/Android Studio.app" ]; then
        ANDROID_STUDIO_FOUND=true
        print_status "Android Studio found (macOS)"
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v android-studio &> /dev/null; then
        ANDROID_STUDIO_FOUND=true
        print_status "Android Studio found (Linux)"
    fi
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows
    if [ -d "$PROGRAMFILES/Android/Android Studio" ] || [ -d "$LOCALAPPDATA/Google/AndroidStudio" ]; then
        ANDROID_STUDIO_FOUND=true
        print_status "Android Studio found (Windows)"
    fi
fi

if [ "$ANDROID_STUDIO_FOUND" = false ]; then
    print_warning "Android Studio not detected. Please install from: https://developer.android.com/studio"
fi

# Check ANDROID_HOME
if [ -z "$ANDROID_HOME" ]; then
    print_warning "ANDROID_HOME environment variable not set"
    print_info "Please set ANDROID_HOME to your Android SDK path"
    print_info "Example: export ANDROID_HOME=/Users/yourname/Library/Android/sdk"
else
    print_status "ANDROID_HOME: $ANDROID_HOME"
fi

# Check Java
print_info "Checking Java installation..."
JAVA_VERSION=$(java -version 2>&1 | head -n 1)
if [[ $JAVA_VERSION == *"java version"* ]] || [[ $JAVA_VERSION == *"openjdk version"* ]]; then
    print_status "Java found: $JAVA_VERSION"
else
    print_warning "Java not found or not in PATH"
    print_info "Please install Java JDK 11+ from: https://adoptium.net/"
fi

# Create build info file
cat > build-info.txt << EOF
Tamil Nadu Weather App - Build Information
==========================================

App Name: Vaannilai Seithigal (வானிலை செய்திகள்)
Package ID: com.tamilnadu.weather
Version: 1.0.0
Target SDK: 33 (Android 13)
Min SDK: 24 (Android 7.0)

Setup completed: $(date)
Node.js version: $NODE_VERSION
Package manager: $PKG_MANAGER

Next Steps:
1. Run ./build-apk.sh to build APK
2. Or run: npx cap open android
3. Then build in Android Studio

For Play Store submission:
- Create signed release APK
- Save keystore file securely
- Use content from PLAY_STORE_LISTING.md
EOF

print_status "Build information saved to build-info.txt"

echo ""
echo "🎉 Setup Complete!"
echo "=================="
print_status "Project dependencies installed"
print_status "React production build ready"
print_status "Capacitor Android project synced"

echo ""
print_info "Next steps:"
echo "  1. Run: ./build-apk.sh (automated build)"
echo "  2. Or run: npx cap open android (manual build)"
echo "  3. Then build APK in Android Studio"

echo ""
print_info "For troubleshooting, check:"
echo "  - BUILD_INSTRUCTIONS.md"
echo "  - BUILD_PACKAGE_COMPLETE.md"
echo "  - build-info.txt"

echo ""
print_status "Ready to build your Tamil Nadu Weather App! 🚀"