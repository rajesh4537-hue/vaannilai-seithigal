// Real Weather API Integration for Vaannilai Seithigal
// Using IndianAPI.in for Tamil Nadu weather data

import axios from 'axios';

class WeatherAPIService {
  constructor() {
    // API configuration - try WeatherAPI.com format 
    this.baseURL = 'https://api.weatherapi.com/v1';
    this.apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Will be set in .env file
    
    // Tamil Nadu cities mapping
    this.tamilNaduCities = {
      'Chennai': 'Chennai',
      'Coimbatore': 'Coimbatore',
      'Madurai': 'Madurai',
      'Tiruchirappalli': 'Tiruchirappalli',
      'Salem': 'Salem',
      'Tirunelveli': 'Tirunelveli',
      'Vellore': 'Vellore',
      'Erode': 'Erode',
      'Thanjavur': 'Thanjavur',
      'Dindigul': 'Dindigul',
      'Kanyakumari': 'Kanyakumari',
      'Cuddalore': 'Cuddalore',
      'Nagapattinam': 'Nagapattinam',
      'Thoothukudi': 'Thoothukudi'
    };
  }

  // Check if API key is available
  isAPIKeyAvailable() {
    return this.apiKey && this.apiKey !== '';
  }

  // Get current weather for a Tamil Nadu city
  async getCurrentWeather(cityName) {
    try {
      if (!this.isAPIKeyAvailable()) {
        console.warn('API key not available, using mock data');
        return this.getMockWeatherData(cityName);
      }

      console.log(`🌤️ Fetching real weather for ${cityName}...`);
      
      // Try WeatherAPI.com format
      const response = await axios.get(`${this.baseURL}/current.json`, {
        params: {
          key: this.apiKey,
          q: `${cityName}, Tamil Nadu, India`,
          aqi: 'yes' // Include air quality
        },
        timeout: 10000 // 10 second timeout
      });

      console.log('✅ Real weather data received:', response.data);
      return this.transformWeatherAPIData(response.data, cityName);

    } catch (error) {
      console.error('❌ Error fetching real weather:', error.message);
      
      if (error.response?.status === 401) {
        console.error('🔑 Invalid API key - check your credentials');
      } else if (error.response?.status === 429) {
        console.error('⚠️ API rate limit exceeded - too many requests');
      }
      
      // Fallback to mock data
      console.log('🔄 Falling back to mock data...');
      return this.getMockWeatherData(cityName);
    }
  }

  // Transform WeatherAPI.com data to our app format
  transformWeatherAPIData(apiData, cityName) {
    const current = apiData.current || {};
    const location = apiData.location || {};
    const condition = current.condition || {};
    
    return {
      location: `${location.name || cityName}, Tamil Nadu`,
      temperature: Math.round(current.temp_c || 28),
      realFeel: Math.round(current.feelslike_c || current.temp_c || 28),
      condition: condition.text || 'Unknown',
      icon: this.mapWeatherAPIIcon(condition.code || 1000),
      humidity: current.humidity || 65,
      windSpeed: Math.round(current.wind_kph || 8),
      windDirection: current.wind_dir || 'SW',
      pressure: current.pressure_mb ? (current.pressure_mb * 0.02953) : 29.92,
      uvIndex: Math.round(current.uv || 6),
      visibility: Math.round(current.vis_km || 10),
      dewPoint: Math.round(current.dewpoint_c || 22),
      cloudCover: current.cloud || 40,
      lastUpdated: current.last_updated || new Date().toISOString(),
      isRealData: true
    };
  }

  // Map WeatherAPI.com condition codes to icons
  mapWeatherAPIIcon(code) {
    const iconMap = {
      1000: 'sunny', // Sunny
      1003: 'partly-cloudy', // Partly cloudy
      1006: 'cloudy', // Cloudy
      1009: 'cloudy', // Overcast
      1030: 'fog', // Mist
      1063: 'light-rain', // Patchy rain possible
      1066: 'snow', // Patchy snow possible
      1069: 'light-rain', // Patchy sleet possible
      1072: 'light-rain', // Patchy freezing drizzle possible
      1087: 'thunderstorms', // Thundery outbreaks possible
      1114: 'snow', // Blowing snow
      1117: 'snow', // Blizzard
      1135: 'fog', // Fog
      1147: 'fog', // Freezing fog
      1150: 'light-rain', // Patchy light drizzle
      1153: 'light-rain', // Light drizzle
      1168: 'light-rain', // Freezing drizzle
      1171: 'light-rain', // Heavy freezing drizzle
      1180: 'light-rain', // Patchy light rain
      1183: 'light-rain', // Light rain
      1186: 'rain', // Moderate rain at times
      1189: 'rain', // Moderate rain
      1192: 'rain', // Heavy rain at times
      1195: 'rain', // Heavy rain
      1198: 'light-rain', // Light freezing rain
      1201: 'rain', // Moderate or heavy freezing rain
      1204: 'light-rain', // Light sleet
      1207: 'rain', // Moderate or heavy sleet
      1210: 'snow', // Patchy light snow
      1213: 'snow', // Light snow
      1216: 'snow', // Patchy moderate snow
      1219: 'snow', // Moderate snow
      1222: 'snow', // Patchy heavy snow
      1225: 'snow', // Heavy snow
      1237: 'snow', // Ice pellets
      1240: 'light-rain', // Light rain shower
      1243: 'rain', // Moderate or heavy rain shower
      1246: 'rain', // Torrential rain shower
      1249: 'light-rain', // Light sleet showers
      1252: 'rain', // Moderate or heavy sleet showers
      1255: 'snow', // Light snow showers
      1258: 'snow', // Moderate or heavy snow showers
      1261: 'snow', // Light showers of ice pellets
      1264: 'snow', // Moderate or heavy showers of ice pellets
      1273: 'thunderstorms', // Patchy light rain with thunder
      1276: 'thunderstorms', // Moderate or heavy rain with thunder
      1279: 'thunderstorms', // Patchy light snow with thunder
      1282: 'thunderstorms' // Moderate or heavy snow with thunder
    };
    
    return iconMap[code] || 'partly-cloudy';
  }

  // Helper method to convert wind degree to direction
  degreeToDirection(degree) {
    if (!degree) return 'SW';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degree / 22.5) % 16];
  }

  // Helper method to calculate dew point
  calculateDewPoint(temp, humidity) {
    if (!temp || !humidity) return 22;
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    return Math.round((b * alpha) / (a - alpha));
  }

  // Map weather descriptions to our conditions
  mapWeatherCondition(description) {
    const desc = description.toLowerCase();
    
    if (desc.includes('rain') || desc.includes('drizzle')) {
      if (desc.includes('heavy')) return 'Heavy Rain';
      if (desc.includes('light')) return 'Light Rain';
      return 'Rain';
    }
    
    if (desc.includes('thunder') || desc.includes('storm')) {
      return 'Thunderstorms';
    }
    
    if (desc.includes('cloud')) {
      if (desc.includes('partly')) return 'Partly Cloudy';
      return 'Cloudy';
    }
    
    if (desc.includes('clear') || desc.includes('sunny')) {
      return 'Clear';
    }
    
    if (desc.includes('fog') || desc.includes('mist')) {
      return 'Fog';
    }
    
    if (desc.includes('hot')) {
      return 'Hot & Humid';
    }
    
    return 'Partly Cloudy';
  }

  // Map weather conditions to icons
  mapWeatherIcon(description) {
    const desc = description.toLowerCase();
    
    if (desc.includes('rain')) {
      if (desc.includes('heavy')) return 'rain';
      if (desc.includes('light')) return 'light-rain';
      return 'rain';
    }
    
    if (desc.includes('thunder')) return 'thunderstorms';
    if (desc.includes('cloud')) return desc.includes('partly') ? 'partly-cloudy' : 'cloudy';
    if (desc.includes('clear') || desc.includes('sunny')) return 'sunny';
    if (desc.includes('fog')) return 'fog';
    
    return 'partly-cloudy';
  }

  // Generate realistic MinuteCast based on current conditions
  generateMinuteCast(currentWeather) {
    const isRaining = currentWeather.condition.toLowerCase().includes('rain');
    const precipitationBase = isRaining ? 2 : 0;
    
    return {
      summary: isRaining 
        ? "மழை தொடரும் - Rain expected to continue for next 2 hours"
        : "தெளிவான வானிலை - Clear weather expected for next 2 hours",
      precipitation: [
        { time: "Now", intensity: precipitationBase },
        { time: "+15min", intensity: Math.max(0, precipitationBase + (Math.random() > 0.5 ? 1 : -1)) },
        { time: "+30min", intensity: Math.max(0, precipitationBase + (Math.random() > 0.5 ? 1 : -1)) },
        { time: "+45min", intensity: Math.max(0, precipitationBase - 1) },
        { time: "+60min", intensity: Math.max(0, precipitationBase - 1) },
        { time: "+75min", intensity: Math.max(0, precipitationBase - 2) },
        { time: "+90min", intensity: Math.max(0, precipitationBase - 2) },
        { time: "+105min", intensity: Math.max(0, precipitationBase - 3) }
      ]
    };
  }

  // Generate hourly forecast based on current conditions
  generateHourlyForecast(currentWeather) {
    const baseTemp = currentWeather.temperature;
    const hourly = [];
    
    for (let i = 0; i < 12; i++) {
      const hour = new Date();
      hour.setHours(hour.getHours() + i);
      
      // Temperature variation throughout day
      let tempVariation = 0;
      const hourOfDay = hour.getHours();
      
      if (hourOfDay >= 6 && hourOfDay <= 10) tempVariation = i * 2; // Morning warming
      else if (hourOfDay >= 11 && hourOfDay <= 15) tempVariation = 3; // Peak heat
      else if (hourOfDay >= 16 && hourOfDay <= 18) tempVariation = 1; // Evening cooling
      else tempVariation = -2 - i; // Night cooling
      
      const temp = Math.max(20, baseTemp + tempVariation);
      const isRainy = currentWeather.condition.toLowerCase().includes('rain');
      
      hourly.push({
        time: hour.toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true }),
        temp: Math.round(temp),
        condition: i < 3 ? currentWeather.condition : (isRainy ? 'Cloudy' : 'Partly Cloudy'),
        precipitation: isRainy ? Math.max(10, 80 - i * 10) : Math.max(0, 20 - i * 3),
        icon: i < 3 ? currentWeather.icon : (isRainy ? 'cloudy' : 'partly-cloudy')
      });
    }
    
    return hourly;
  }

  // Fallback mock data when API is not available
  getMockWeatherData(cityName) {
    console.log(`📱 Using mock data for ${cityName}`);
    
    return {
      location: `${cityName}, Tamil Nadu`,
      temperature: 28,
      realFeel: 32,
      condition: "Mock Data - Get API Key for Real Weather",
      icon: "partly-cloudy",
      humidity: 75,
      windSpeed: 12,
      windDirection: "SW",
      pressure: 29.85,
      uvIndex: 6,
      visibility: 8,
      dewPoint: 24,
      cloudCover: 60,
      lastUpdated: new Date().toISOString(),
      isMockData: true
    };
  }

  // Get list of available Tamil Nadu cities
  getAvailableCities() {
    return Object.keys(this.tamilNaduCities);
  }

  // Check API status
  async checkAPIStatus() {
    try {
      if (!this.isAPIKeyAvailable()) {
        return { status: 'no_key', message: 'API key not configured' };
      }

      // Test with a simple API call to Chennai
      const response = await axios.get(`${this.baseURL}/weather`, {
        params: {
          q: 'Chennai,IN',
          appid: this.apiKey,
          units: 'metric'
        },
        timeout: 5000
      });

      return { 
        status: 'connected', 
        message: 'Real-time weather data active',
        service: 'OpenWeatherMap'
      };
      
    } catch (error) {
      return { 
        status: 'error', 
        message: error.response?.status === 401 ? 'Invalid API key' : `Connection failed: ${error.message}`
      };
    }
  }
}

// Export singleton instance
export const weatherAPI = new WeatherAPIService();
export default weatherAPI;