/**
 * Comprehensive Unit Tests for Weather API Service
 * Vaannilai Seithigal - Tamil Nadu Weather App
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { weatherAPI } from '../weatherAPI';

// Mock axios
const mock = new MockAdapter(axios);

describe('WeatherAPI Service Tests', () => {
  beforeEach(() => {
    mock.reset();
    // Reset environment variables
    process.env.REACT_APP_WEATHER_API_KEY = 'test_api_key_123';
  });

  afterEach(() => {
    mock.restore();
  });

  describe('API Key Management', () => {
    test('should detect when API key is available', () => {
      process.env.REACT_APP_WEATHER_API_KEY = 'valid_key_123';
      expect(weatherAPI.isAPIKeyAvailable()).toBe(true);
    });

    test('should detect when API key is missing', () => {
      process.env.REACT_APP_WEATHER_API_KEY = '';
      expect(weatherAPI.isAPIKeyAvailable()).toBe(false);
    });

    test('should detect when API key is undefined', () => {
      delete process.env.REACT_APP_WEATHER_API_KEY;
      expect(weatherAPI.isAPIKeyAvailable()).toBe(false);
    });
  });

  describe('Tamil Nadu Cities Management', () => {
    test('should return list of available Tamil Nadu cities', () => {
      const cities = weatherAPI.getAvailableCities();
      expect(cities).toContain('Chennai');
      expect(cities).toContain('Madurai');
      expect(cities).toContain('Coimbatore');
      expect(cities).toContain('Tiruchirappalli');
      expect(cities.length).toBeGreaterThan(10);
    });

    test('should have proper Tamil Nadu cities mapping', () => {
      expect(weatherAPI.tamilNaduCities['Chennai']).toBe('Chennai');
      expect(weatherAPI.tamilNaduCities['Madurai']).toBe('Madurai');
      expect(weatherAPI.tamilNaduCities['Kanyakumari']).toBe('Kanyakumari');
    });
  });

  describe('Weather API Calls - Success Cases', () => {
    test('should fetch real weather data successfully', async () => {
      const mockWeatherResponse = {
        current: {
          temp_c: 32,
          feelslike_c: 35,
          condition: {
            text: 'Partly cloudy',
            code: 1003
          },
          humidity: 75,
          wind_kph: 12,
          wind_dir: 'SW',
          pressure_mb: 1013,
          uv: 6,
          vis_km: 10,
          dewpoint_c: 24,
          cloud: 40,
          last_updated: '2025-09-25 10:30'
        },
        location: {
          name: 'Chennai',
          region: 'Tamil Nadu',
          country: 'India'
        }
      };

      mock.onGet('https://api.weatherapi.com/v1/current.json')
        .reply(200, mockWeatherResponse);

      const result = await weatherAPI.getCurrentWeather('Chennai');

      expect(result.location).toBe('Chennai, Tamil Nadu');
      expect(result.temperature).toBe(32);
      expect(result.realFeel).toBe(35);
      expect(result.condition).toBe('Partly cloudy');
      expect(result.humidity).toBe(75);
      expect(result.windSpeed).toBe(12);
      expect(result.windDirection).toBe('SW');
      expect(result.isRealData).toBe(true);
      expect(result.isMockData).toBeUndefined();
    });

    test('should transform WeatherAPI data correctly', () => {
      const mockApiData = {
        current: {
          temp_c: 28,
          feelslike_c: 32,
          condition: { text: 'Sunny', code: 1000 },
          humidity: 65,
          wind_kph: 8,
          wind_dir: 'NE',
          pressure_mb: 1015,
          uv: 7,
          vis_km: 15,
          dewpoint_c: 22,
          cloud: 20,
          last_updated: '2025-09-25 12:00'
        },
        location: { name: 'Madurai' }
      };

      const result = weatherAPI.transformWeatherAPIData(mockApiData, 'Madurai');

      expect(result.temperature).toBe(28);
      expect(result.condition).toBe('Sunny');
      expect(result.icon).toBe('sunny');
      expect(result.pressure).toBe(29.97); // Converted from mb to inHg
      expect(result.isRealData).toBe(true);
    });
  });

  describe('Weather API Calls - Error Handling', () => {
    test('should fallback to mock data when API key is invalid (401)', async () => {
      mock.onGet('https://api.weatherapi.com/v1/current.json')
        .reply(401, { error: { message: 'Invalid API key' } });

      const result = await weatherAPI.getCurrentWeather('Chennai');

      expect(result.isMockData).toBe(true);
      expect(result.condition).toBe('Mock Data - Get API Key for Real Weather');
      expect(result.location).toBe('Chennai, Tamil Nadu');
      expect(result.temperature).toBe(28);
    });

    test('should fallback to mock data when rate limit exceeded (429)', async () => {
      mock.onGet('https://api.weatherapi.com/v1/current.json')
        .reply(429, { error: { message: 'Rate limit exceeded' } });

      const result = await weatherAPI.getCurrentWeather('Madurai');

      expect(result.isMockData).toBe(true);
      expect(result.location).toBe('Madurai, Tamil Nadu');
    });

    test('should fallback to mock data when network error occurs', async () => {
      mock.onGet('https://api.weatherapi.com/v1/current.json')
        .networkError();

      const result = await weatherAPI.getCurrentWeather('Coimbatore');

      expect(result.isMockData).toBe(true);
      expect(result.location).toBe('Coimbatore, Tamil Nadu');
    });

    test('should fallback to mock data when API timeout occurs', async () => {
      mock.onGet('https://api.weatherapi.com/v1/current.json')
        .timeout();

      const result = await weatherAPI.getCurrentWeather('Salem');

      expect(result.isMockData).toBe(true);
      expect(result.location).toBe('Salem, Tamil Nadu');
    });

    test('should use mock data when API key is not configured', async () => {
      process.env.REACT_APP_WEATHER_API_KEY = '';

      const result = await weatherAPI.getCurrentWeather('Tirunelveli');

      expect(result.isMockData).toBe(true);
      expect(result.location).toBe('Tirunelveli, Tamil Nadu');
      // Should not make any HTTP calls
      expect(mock.history.get.length).toBe(0);
    });
  });

  describe('Weather Icon Mapping', () => {
    test('should map WeatherAPI condition codes to correct icons', () => {
      expect(weatherAPI.mapWeatherAPIIcon(1000)).toBe('sunny');
      expect(weatherAPI.mapWeatherAPIIcon(1003)).toBe('partly-cloudy');
      expect(weatherAPI.mapWeatherAPIIcon(1006)).toBe('cloudy');
      expect(weatherAPI.mapWeatherAPIIcon(1063)).toBe('light-rain');
      expect(weatherAPI.mapWeatherAPIIcon(1087)).toBe('thunderstorms');
      expect(weatherAPI.mapWeatherAPIIcon(1195)).toBe('rain');
      expect(weatherAPI.mapWeatherAPIIcon(9999)).toBe('partly-cloudy'); // Unknown code
    });

    test('should map weather descriptions to icons correctly', () => {
      expect(weatherAPI.mapWeatherIcon('heavy rain')).toBe('rain');
      expect(weatherAPI.mapWeatherIcon('light drizzle')).toBe('light-rain');
      expect(weatherAPI.mapWeatherIcon('thunderstorm')).toBe('thunderstorms');
      expect(weatherAPI.mapWeatherIcon('clear sky')).toBe('sunny');
      expect(weatherAPI.mapWeatherIcon('partly cloudy')).toBe('partly-cloudy');
      expect(weatherAPI.mapWeatherIcon('foggy morning')).toBe('fog');
    });
  });

  describe('Weather Condition Mapping', () => {
    test('should map descriptions to proper weather conditions', () => {
      expect(weatherAPI.mapWeatherCondition('heavy rain')).toBe('Heavy Rain');
      expect(weatherAPI.mapWeatherCondition('light drizzle')).toBe('Light Rain');
      expect(weatherAPI.mapWeatherCondition('thunderstorm with rain')).toBe('Thunderstorms');
      expect(weatherAPI.mapWeatherCondition('partly cloudy')).toBe('Partly Cloudy');
      expect(weatherAPI.mapWeatherCondition('clear sky')).toBe('Clear');
      expect(weatherAPI.mapWeatherCondition('morning fog')).toBe('Fog');
      expect(weatherAPI.mapWeatherCondition('hot and humid')).toBe('Hot & Humid');
    });
  });

  describe('Generated Forecasts', () => {
    test('should generate realistic MinuteCast for rainy conditions', () => {
      const mockWeather = {
        condition: 'Heavy Rain',
        temperature: 25
      };

      const minuteCast = weatherAPI.generateMinuteCast(mockWeather);

      expect(minuteCast.summary).toContain('மழை தொடரும்');
      expect(minuteCast.summary).toContain('Rain expected to continue');
      expect(minuteCast.precipitation).toHaveLength(8);
      expect(minuteCast.precipitation[0].time).toBe('Now');
      expect(minuteCast.precipitation[0].intensity).toBeGreaterThan(0);
    });

    test('should generate MinuteCast for clear weather', () => {
      const mockWeather = {
        condition: 'Clear',
        temperature: 30
      };

      const minuteCast = weatherAPI.generateMinuteCast(mockWeather);

      expect(minuteCast.summary).toContain('தெளிவான வானிலை');
      expect(minuteCast.summary).toContain('Clear weather expected');
      expect(minuteCast.precipitation[0].intensity).toBe(0);
    });

    test('should generate hourly forecast with temperature variation', () => {
      const mockWeather = {
        condition: 'Sunny',
        temperature: 32,
        icon: 'sunny'
      };

      const hourlyForecast = weatherAPI.generateHourlyForecast(mockWeather);

      expect(hourlyForecast).toHaveLength(12);
      expect(hourlyForecast[0].time).toBeDefined();
      expect(hourlyForecast[0].temp).toBeGreaterThan(20);
      expect(hourlyForecast[0].condition).toBeDefined();
      expect(hourlyForecast[0].precipitation).toBeGreaterThanOrEqual(0);
      expect(hourlyForecast[0].icon).toBeDefined();
    });
  });

  describe('API Status Check', () => {
    test('should return no_key status when API key is missing', async () => {
      process.env.REACT_APP_WEATHER_API_KEY = '';

      const status = await weatherAPI.checkAPIStatus();

      expect(status.status).toBe('no_key');
      expect(status.message).toBe('API key not configured');
    });

    test('should return connected status when API is working', async () => {
      mock.onGet('https://api.weatherapi.com/v1/current.json')
        .reply(200, {
          current: { temp_c: 30 },
          location: { name: 'Chennai' }
        });

      const status = await weatherAPI.checkAPIStatus();

      expect(status.status).toBe('connected');
      expect(status.message).toBe('Real-time weather data active');
      expect(status.service).toBe('WeatherAPI.com');
    });

    test('should return error status when API key is invalid', async () => {
      mock.onGet('https://api.weatherapi.com/v1/current.json')
        .reply(401, { error: { message: 'Invalid API key' } });

      const status = await weatherAPI.checkAPIStatus();

      expect(status.status).toBe('error');
      expect(status.message).toBe('Invalid API key');
    });

    test('should return error status when API is unreachable', async () => {
      mock.onGet('https://api.weatherapi.com/v1/current.json')
        .networkError();

      const status = await weatherAPI.checkAPIStatus();

      expect(status.status).toBe('error');
      expect(status.message).toContain('Connection failed');
    });
  });

  describe('Mock Data Generation', () => {
    test('should generate consistent mock data', () => {
      const mockData1 = weatherAPI.getMockWeatherData('Vellore');
      const mockData2 = weatherAPI.getMockWeatherData('Vellore');

      expect(mockData1.location).toBe(mockData2.location);
      expect(mockData1.isMockData).toBe(true);
      expect(mockData1.temperature).toBe(28);
      expect(mockData1.condition).toContain('Mock Data');
    });

    test('should generate mock data for different cities', () => {
      const chennaiMock = weatherAPI.getMockWeatherData('Chennai');
      const maduraiMock = weatherAPI.getMockWeatherData('Madurai');

      expect(chennaiMock.location).toBe('Chennai, Tamil Nadu');
      expect(maduraiMock.location).toBe('Madurai, Tamil Nadu');
      expect(chennaiMock.isMockData).toBe(true);
      expect(maduraiMock.isMockData).toBe(true);
    });
  });

  describe('Utility Functions', () => {
    test('should convert wind degree to direction correctly', () => {
      expect(weatherAPI.degreeToDirection(0)).toBe('N');
      expect(weatherAPI.degreeToDirection(90)).toBe('E');
      expect(weatherAPI.degreeToDirection(180)).toBe('S');
      expect(weatherAPI.degreeToDirection(270)).toBe('W');
      expect(weatherAPI.degreeToDirection(45)).toBe('NE');
      expect(weatherAPI.degreeToDirection(null)).toBe('SW');
    });

    test('should calculate dew point correctly', () => {
      const dewPoint = weatherAPI.calculateDewPoint(30, 70);
      expect(dewPoint).toBeGreaterThan(20);
      expect(dewPoint).toBeLessThan(30);
      expect(weatherAPI.calculateDewPoint(null, 70)).toBe(22);
      expect(weatherAPI.calculateDewPoint(30, null)).toBe(22);
    });
  });

  describe('Integration Tests', () => {
    test('should handle complete weather flow for Chennai', async () => {
      const mockResponse = {
        current: {
          temp_c: 34,
          feelslike_c: 38,
          condition: { text: 'Hot & Humid', code: 1000 },
          humidity: 80,
          wind_kph: 15,
          wind_dir: 'SW',
          pressure_mb: 1008,
          uv: 8,
          vis_km: 8,
          dewpoint_c: 26,
          cloud: 60,
          last_updated: '2025-09-25 14:30'
        },
        location: {
          name: 'Chennai',
          region: 'Tamil Nadu'
        }
      };

      mock.onGet().reply(200, mockResponse);

      const weather = await weatherAPI.getCurrentWeather('Chennai');
      const minuteCast = weatherAPI.generateMinuteCast(weather);
      const hourlyForecast = weatherAPI.generateHourlyForecast(weather);

      // Verify main weather data
      expect(weather.location).toBe('Chennai, Tamil Nadu');
      expect(weather.temperature).toBe(34);
      expect(weather.isRealData).toBe(true);

      // Verify generated forecasts
      expect(minuteCast.precipitation).toHaveLength(8);
      expect(hourlyForecast).toHaveLength(12);

      // Verify Tamil Nadu specific handling
      expect(weather.windDirection).toBe('SW'); // Common Chennai wind direction
      expect(weather.humidity).toBe(80); // High humidity typical for Chennai
    });

    test('should handle API failure gracefully with proper fallback', async () => {
      mock.onGet().reply(500, { error: 'Server Error' });

      const weather = await weatherAPI.getCurrentWeather('Kanyakumari');

      expect(weather.isMockData).toBe(true);
      expect(weather.location).toBe('Kanyakumari, Tamil Nadu');
      expect(weather.temperature).toBe(28);

      // Should still be able to generate forecasts from mock data
      const minuteCast = weatherAPI.generateMinuteCast(weather);
      const hourlyForecast = weatherAPI.generateHourlyForecast(weather);

      expect(minuteCast).toBeDefined();
      expect(hourlyForecast).toHaveLength(12);
    });
  });

  describe('Performance Tests', () => {
    test('should handle multiple concurrent API calls', async () => {
      const cities = ['Chennai', 'Madurai', 'Coimbatore', 'Tiruchirappalli'];
      
      // Mock successful responses for all cities
      mock.onGet().reply(200, {
        current: { temp_c: 30, condition: { text: 'Sunny', code: 1000 } },
        location: { name: 'TestCity', region: 'Tamil Nadu' }
      });

      const promises = cities.map(city => weatherAPI.getCurrentWeather(city));
      const results = await Promise.all(promises);

      expect(results).toHaveLength(4);
      results.forEach(result => {
        expect(result.temperature).toBeDefined();
        expect(result.condition).toBeDefined();
      });
    });

    test('should not exceed timeout limits', async () => {
      const start = Date.now();
      
      mock.onGet().reply(() => {
        return new Promise(resolve => {
          setTimeout(() => resolve([200, { current: {}, location: {} }]), 15000);
        });
      });

      await weatherAPI.getCurrentWeather('Chennai');
      
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(12000); // Should timeout before 12 seconds
    });
  });
});

// Test configuration for specific Tamil Nadu weather scenarios
describe('Tamil Nadu Specific Weather Scenarios', () => {
  const mock = new MockAdapter(axios);
  
  beforeEach(() => {
    mock.reset();
    process.env.REACT_APP_WEATHER_API_KEY = 'test_key';
  });

  test('should handle Chennai monsoon conditions', async () => {
    const monsoonResponse = {
      current: {
        temp_c: 28,
        condition: { text: 'Heavy Rain', code: 1195 },
        humidity: 95,
        wind_kph: 25,
        wind_dir: 'NE' // Northeast monsoon
      },
      location: { name: 'Chennai' }
    };

    mock.onGet().reply(200, monsoonResponse);
    const result = await weatherAPI.getCurrentWeather('Chennai');

    expect(result.condition).toBe('Heavy Rain');
    expect(result.humidity).toBe(95);
    expect(result.windDirection).toBe('NE'); // Northeast monsoon typical
  });

  test('should handle hill station weather (Ooty/Nilgiris)', async () => {
    const hillStationResponse = {
      current: {
        temp_c: 18,
        condition: { text: 'Cool & Pleasant', code: 1003 },
        humidity: 85,
        wind_kph: 12
      },
      location: { name: 'Ooty' }
    };

    mock.onGet().reply(200, hillStationResponse);
    const result = await weatherAPI.getCurrentWeather('Ooty');

    expect(result.temperature).toBe(18); // Cool hill station temperature
    expect(result.humidity).toBe(85); // High humidity in hills
  });

  test('should handle coastal weather conditions', async () => {
    const coastalResponse = {
      current: {
        temp_c: 32,
        condition: { text: 'Hot & Windy', code: 1000 },
        humidity: 78,
        wind_kph: 20,
        wind_dir: 'SW' // Sea breeze
      },
      location: { name: 'Kanyakumari' }
    };

    mock.onGet().reply(200, coastalResponse);
    const result = await weatherAPI.getCurrentWeather('Kanyakumari');

    expect(result.windSpeed).toBe(20); // Strong coastal winds
    expect(result.windDirection).toBe('SW'); // Sea breeze direction
  });
});