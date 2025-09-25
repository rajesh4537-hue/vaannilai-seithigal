// Test script to check which weather APIs are accessible
// Run this to test different weather API services

const testWeatherAPIs = async () => {
  console.log('🧪 Testing Weather API Services...\n');

  // Test 1: IndianAPI.in
  try {
    const response = await fetch('https://weather.indianapi.in/india/cities');
    console.log('✅ IndianAPI.in - Accessible');
    console.log('   📍 Best for: Tamil Nadu specific data');
    console.log('   🆓 Free tier: 1,000 calls/day');
    console.log('   🔗 Register at: https://weather.indianapi.in\n');
  } catch (error) {
    console.log('❌ IndianAPI.in - Not accessible');
    console.log('   Error:', error.message, '\n');
  }

  // Test 2: OpenWeatherMap
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=demo');
    console.log('✅ OpenWeatherMap - Accessible');
    console.log('   📍 Best for: Global coverage with Indian cities');
    console.log('   🆓 Free tier: 1,000 calls/day');
    console.log('   🔗 Register at: https://openweathermap.org/api\n');
  } catch (error) {
    console.log('❌ OpenWeatherMap - Not accessible');
    console.log('   Error:', error.message, '\n');
  }

  // Test 3: WeatherAPI.com
  try {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=demo&q=Chennai');
    console.log('✅ WeatherAPI.com - Accessible');
    console.log('   📍 Best for: Very generous free tier');
    console.log('   🆓 Free tier: 1 million calls/month');
    console.log('   🔗 Register at: https://www.weatherapi.com\n');
  } catch (error) {
    console.log('❌ WeatherAPI.com - Not accessible');
    console.log('   Error:', error.message, '\n');
  }

  console.log('🎯 Recommendation: Try all three and see which works best for you!');
};

// Export for use in browser console
window.testWeatherAPIs = testWeatherAPIs;

export default testWeatherAPIs;