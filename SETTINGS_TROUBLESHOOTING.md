# 🔧 Settings Troubleshooting Guide

## Current Status Check

Your Tamil Nadu Weather App should have:
- ✅ **User icon** in top-right corner (next to search icon)
- ✅ **Real weather data active** (25°C Madurai confirmed)
- ✅ **Live weather alerts** (Northeast Monsoon, Heat Wave warnings)

## Step-by-Step Testing

### **Step 1: Locate User Menu**
- Look for **user icon** (👤) in top-right corner of the app
- Should be visible on both desktop and mobile
- Next to search icon (🔍)

### **Step 2: Test User Menu**
1. **Click/tap user icon**
2. **Should see dropdown** with 3 options:
   - Settings ⚙️
   - My Locations 📍  
   - Weather Alerts 🔔

### **Step 3: Test Settings Modal**
1. **Click "Settings"** from dropdown
2. **Should open modal** with:
   - My Locations section (with "Add" button)
   - Weather Alerts toggles (4 different alert types)
   - App info at bottom

### **Step 4: Test My Locations**
1. **Click "Add"** in My Locations section
2. **Should show input box** with "Search Tamil Nadu cities..."
3. **Type city name** (e.g., "Chennai", "Trichy")
4. **Should show dropdown** with matching cities
5. **Click city** to add it to favorites

## Common Issues & Solutions

### **Issue 1: User Icon Not Visible**
**Symptoms:** Can't find user icon in header
**Solution:** 
- Try refreshing the page (F5 or pull down on mobile)
- Clear browser cache
- Try different browser

### **Issue 2: Dropdown Doesn't Open**
**Symptoms:** User icon visible but clicking doesn't show menu
**Solution:**
- Make sure JavaScript is enabled
- Try clicking directly on the icon (not around it)
- Check if there are browser console errors

### **Issue 3: Settings Modal Doesn't Open**
**Symptoms:** Dropdown appears but clicking Settings/My Locations does nothing
**Solution:**
- Clear browser localStorage: `localStorage.clear()`
- Refresh the page
- Try again

### **Issue 4: Can't Add Locations**
**Symptoms:** Settings opens but Add Location doesn't work
**Solution:**
- Make sure you're typing exact Tamil Nadu city names
- Try these test cities: Chennai, Madurai, Coimbatore, Salem, Trichy
- Check if autocomplete dropdown appears

## Manual Testing Commands

If you're comfortable with browser developer tools:

### **Open Browser Console** (F12 → Console tab):

```javascript
// Check if settings are saved
console.log("My Locations:", localStorage.getItem('myLocations'));
console.log("Alert Settings:", localStorage.getItem('alertSettings'));

// Reset settings to default
localStorage.removeItem('myLocations');
localStorage.removeItem('alertSettings');
console.log("Settings cleared - refresh page");

// Manually add test location
localStorage.setItem('myLocations', '["Chennai", "Madurai"]');
console.log("Test locations added - refresh page");
```

## Expected Behavior

### **Working My Locations:**
- Can add Tamil Nadu cities from searchable dropdown
- Locations saved automatically (persist after page refresh)
- Can click saved location to switch weather view
- Can remove locations with trash icon

### **Working Weather Alerts:**
- 4 toggle switches for different alert types:
  - General Weather Alerts (blue toggle)
  - Severe Weather Alerts (orange toggle)  
  - Rain Alerts (blue toggle)
  - Temperature Alerts (red toggle)
- Toggles save automatically
- Settings persist after page refresh

## Device-Specific Notes

### **Desktop/Laptop:**
- User icon always visible in top-right
- Header navigation visible (Current Weather, Hourly, Daily, etc.)
- Full settings modal experience

### **Mobile:**
- User icon in top-right (smaller but visible)
- Header navigation hidden (only bottom tabs visible)
- Settings modal takes full screen

## What to Report

If settings still don't work, please share:

1. **Device type:** iPhone, Android, Desktop Chrome, etc.
2. **Where it fails:** Can't find user icon, dropdown doesn't open, modal doesn't open, etc.
3. **Browser:** Chrome, Safari, Firefox, etc.
4. **Screenshot** of what you see when trying to access settings

## Quick Fix Commands

Try these in browser console (F12):

```javascript
// Force open settings (if modal exists but button doesn't work)
document.querySelector('[data-testid="settings-modal"]')?.style.display = 'block';

// Check if React component is loaded
console.log("React components loaded:", !!window.React);

// Check for JavaScript errors
console.log("Check above for any red error messages");
```

This will help identify exactly where the issue is occurring!