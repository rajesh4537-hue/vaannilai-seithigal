// Real Weather API Integration for Vaannilai Seithigal
// Using IndianAPI.in for Tamil Nadu weather data

import axios from 'axios';

class WeatherAPIService {
  constructor() {
    // API configuration - try OpenWeatherMap format first
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
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
      
      // Try OpenWeatherMap API format
      const response = await axios.get(`${this.baseURL}/weather`, {
        params: {
          q: `${cityName},IN`, // IN for India
          appid: this.apiKey,
          units: 'metric' // Celsius
        },
        timeout: 10000 // 10 second timeout
      });

      console.log('✅ Real weather data received:', response.data);
      return this.transformOpenWeatherData(response.data, cityName);

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

  // Transform OpenWeatherMap API data to our app format
  transformOpenWeatherData(apiData, cityName) {
    const main = apiData.main || {};
    const weather = apiData.weather?.[0] || {};
    const wind = apiData.wind || {};
    
    return {
      location: `${cityName}, Tamil Nadu`,
      temperature: Math.round(main.temp || 28),
      realFeel: Math.round(main.feels_like || main.temp || 28),
      condition: this.mapWeatherCondition(weather.description || 'Unknown'),
      icon: this.mapWeatherIcon(weather.description || 'clear'),
      humidity: main.humidity || 65,
      windSpeed: Math.round((wind.speed || 2) * 3.6), // Convert m/s to km/h
      windDirection: this.degreeToDirection(wind.deg) || 'SW',
      pressure: main.pressure ? (main.pressure * 0.02953) : 29.92, // Convert hPa to inHg
      uvIndex: 6, // OpenWeatherMap doesn't provide UV in basic plan
      visibility: apiData.visibility ? Math.round(apiData.visibility / 1000) : 10, // Convert m to km
      dewPoint: this.calculateDewPoint(main.temp, main.humidity),
      cloudCover: apiData.clouds?.all || 40,
      lastUpdated: new Date().toISOString(),
      isRealData: true
    };
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