#!/bin/bash

echo "🏗️  Building Tamil Nadu Weather App APK"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

# Check if setup was run
if [ ! -f "build-info.txt" ]; then
    print_error "Setup not completed. Please run ./setup-android.sh first"
    exit 1
fi

# Build type selection
echo "Select build type:"
echo "1. Debug APK (quick, for testing)"
echo "2. Release APK (signed, for distribution)"
echo "3. Open Android Studio (manual build)"
read -p "Enter choice (1-3): " BUILD_CHOICE

case $BUILD_CHOICE in
    1)
        BUILD_TYPE="debug"
        print_info "Building debug APK..."
        ;;
    2)
        BUILD_TYPE="release"
        print_info "Building release APK (requires keystore)..."
        ;;
    3)
        print_info "Opening Android Studio..."
        npx cap open android
        exit 0
        ;;
    *)
        print_error "Invalid choice. Using debug build."
        BUILD_TYPE="debug"
        ;;
esac

# Check Android project exists
if [ ! -d "android" ]; then
    print_error "Android project not found. Run setup-android.sh first."
    exit 1
fi

# Navigate to android directory
cd android

print_info "Starting Gradle build process..."
print_warning "This may take 5-15 minutes depending on your system..."

# Clean previous builds
print_info "Cleaning previous builds..."
./gradlew clean

# Build APK
if [ "$BUILD_TYPE" = "debug" ]; then
    print_info "Building debug APK..."
    ./gradlew assembleDebug
    
    if [ $? -eq 0 ]; then
        APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
        if [ -f "$APK_PATH" ]; then
            APK_SIZE=$(ls -lh "$APK_PATH" | awk '{print $5}')
            print_status "Debug APK built successfully!"
            print_info "Location: android/$APK_PATH"
            print_info "Size: $APK_SIZE"
            
            # Copy to parent directory for easy access
            cp "$APK_PATH" "../vaannilai-seithigal-debug.apk"
            print_status "APK copied to: vaannilai-seithigal-debug.apk"
        else
            print_error "APK file not found after build"
            exit 1
        fi
    else
        print_error "Debug build failed"
        exit 1
    fi
    
elif [ "$BUILD_TYPE" = "release" ]; then
    print_info "Building release APK..."
    
    # Check for existing keystore
    KEYSTORE_PATH="app/vaannilai-release-key.keystore"
    
    if [ ! -f "$KEYSTORE_PATH" ]; then
        print_warning "No keystore found. Creating new keystore..."
        print_info "Please enter keystore details:"
        
        read -p "Enter keystore password: " -s KEYSTORE_PASS
        echo
        read -p "Enter key alias [vaannilai-key]: " KEY_ALIAS
        KEY_ALIAS=${KEY_ALIAS:-vaannilai-key}
        read -p "Enter key password [same as keystore]: " -s KEY_PASS
        KEY_PASS=${KEY_PASS:-$KEYSTORE_PASS}
        echo
        
        print_info "Creating keystore..."
        keytool -genkey -v -keystore "$KEYSTORE_PATH" \
            -alias "$KEY_ALIAS" \
            -keyalg RSA \
            -keysize 2048 \
            -validity 10000 \
            -storepass "$KEYSTORE_PASS" \
            -keypass "$KEY_PASS" \
            -dname "CN=Tamil Nadu Weather App, OU=Mobile Development, O=Vaannilai Seithigal, L=Tamil Nadu, S=TN, C=IN"
        
        if [ $? -eq 0 ]; then
            print_status "Keystore created successfully"
            print_warning "IMPORTANT: Save this keystore file and passwords securely!"
            print_warning "You'll need them for future app updates."
        else
            print_error "Failed to create keystore"
            exit 1
        fi
    fi
    
    # Create gradle.properties for signing
    cat > gradle.properties << EOF
# Signing configuration for release builds
VAANNILAI_KEYSTORE_FILE=vaannilai-release-key.keystore
VAANNILAI_KEYSTORE_PASSWORD=$KEYSTORE_PASS
VAANNILAI_KEY_ALIAS=$KEY_ALIAS
VAANNILAI_KEY_PASSWORD=$KEY_PASS
EOF
    
    print_info "Building signed release APK..."
    ./gradlew assembleRelease
    
    if [ $? -eq 0 ]; then
        APK_PATH="app/build/outputs/apk/release/app-release.apk"
        if [ -f "$APK_PATH" ]; then
            APK_SIZE=$(ls -lh "$APK_PATH" | awk '{print $5}')
            print_status "Release APK built successfully!"
            print_info "Location: android/$APK_PATH"
            print_info "Size: $APK_SIZE"
            
            # Copy to parent directory with version
            cp "$APK_PATH" "../vaannilai-seithigal-v1.0.0-release.apk"
            print_status "APK copied to: vaannilai-seithigal-v1.0.0-release.apk"
        else
            print_error "APK file not found after build"
            exit 1
        fi
    else
        print_error "Release build failed"
        exit 1
    fi
fi

# Go back to parent directory
cd ..

# Generate build summary
cat > apk-build-summary.txt << EOF
Tamil Nadu Weather App - APK Build Summary
=========================================

Build completed: $(date)
Build type: $BUILD_TYPE
APK location: $(pwd)/vaannilai-seithigal-$BUILD_TYPE*.apk

App Details:
- Name: Vaannilai Seithigal (வானிலை செய்திகள்)
- Package: com.tamilnadu.weather
- Version: 1.0.0
- Target SDK: 33 (Android 13)
- Min SDK: 24 (Android 7.0)

Features:
✅ Real-time Tamil Nadu weather data
✅ 37 districts coverage
✅ Tamil language interface
✅ Weather alerts and forecasts
✅ Hourly/daily weather
✅ Interactive radar and satellite
✅ PWA capabilities

Next Steps:
1. Test APK: ./test-apk.sh
2. Install on device for testing
3. Create Play Store listing
4. Submit for review

For Play Store submission:
- Use RELEASE APK only
- Keep keystore file safe
- Use content from PLAY_STORE_LISTING.md
EOF

print_status "Build summary saved to apk-build-summary.txt"

echo ""
echo "🎉 APK Build Complete!"
echo "====================="
print_status "APK ready for testing and distribution"

if [ "$BUILD_TYPE" = "debug" ]; then
    print_info "Debug APK: vaannilai-seithigal-debug.apk"
    print_warning "Debug APK is for testing only - not for Play Store"
elif [ "$BUILD_TYPE" = "release" ]; then
    print_info "Release APK: vaannilai-seithigal-v1.0.0-release.apk"
    print_status "Release APK is ready for Play Store submission!"
fi

echo ""
print_info "Next steps:"
echo "  1. Run: ./test-apk.sh (validate APK)"
echo "  2. Install APK on your device"
echo "  3. Test all features thoroughly"
echo "  4. Create Play Store developer account"
echo "  5. Submit to Play Store for review"

echo ""
print_warning "Remember:"
echo "  - Save your keystore file securely"
echo "  - Test APK on multiple devices"
echo "  - Take screenshots for Play Store"

echo ""
print_status "Your Tamil Nadu Weather App is ready for launch! 🚀"