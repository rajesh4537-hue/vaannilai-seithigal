/**
 * Comprehensive Unit Tests for Weather API Service
 * Vaannilai Seithigal - Tamil Nadu Weather App
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Import the weatherAPI after setting up mocks
jest.mock('axios');
const mockedAxios = axios;

// Import after mocking
import { weatherAPI } from '../weatherAPI';

describe('WeatherAPI Service Tests', () => {
  let mockAxiosAdapter;

  beforeAll(() => {
    // Setup axios mock
    mockAxiosAdapter = new MockAdapter(mockedAxios);
  });

  beforeEach(() => {
    mockAxiosAdapter.reset();
    // Reset environment variables
    process.env.REACT_APP_WEATHER_API_KEY = 'test_api_key_123';
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockAxiosAdapter.restore();
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

  describe('Data Transformation', () => {
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
      expect(result.pressure).toBeCloseTo(29.97, 1); // Converted from mb to inHg
      expect(result.isRealData).toBe(true);
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
});

// Test configuration for specific Tamil Nadu weather scenarios
describe('Tamil Nadu Specific Weather Scenarios', () => {
  beforeEach(() => {
    process.env.REACT_APP_WEATHER_API_KEY = 'test_key';
  });

  test('should handle Chennai monsoon conditions correctly', () => {
    const mockWeather = {
      condition: 'Heavy Rain',
      temperature: 28,
      humidity: 95,
      windDirection: 'NE' // Northeast monsoon
    };

    const minuteCast = weatherAPI.generateMinuteCast(mockWeather);
    
    expect(minuteCast.summary).toContain('மழை தொடரும்');
    expect(minuteCast.precipitation[0].intensity).toBeGreaterThan(1);
  });

  test('should handle hill station weather conditions', () => {
    const hillWeather = {
      condition: 'Cool & Pleasant',
      temperature: 18, // Cool hill station temperature
      humidity: 85
    };

    const minuteCast = weatherAPI.generateMinuteCast(hillWeather);
    expect(minuteCast.summary).toContain('தெளிவான வானிலை');
  });

  test('should handle coastal weather conditions', () => {
    const coastalWeather = {
      condition: 'Hot & Windy',
      temperature: 32,
      windSpeed: 20, // Strong coastal winds
      windDirection: 'SW' // Sea breeze direction
    };

    const hourlyForecast = weatherAPI.generateHourlyForecast(coastalWeather);
    expect(hourlyForecast[0].temp).toBeGreaterThan(25); // Warm coastal temperature
  });
});

// Performance and Edge Case Tests
describe('Edge Cases and Performance', () => {
  test('should handle invalid weather data gracefully', () => {
    const invalidData = {
      current: null,
      location: {}
    };

    const result = weatherAPI.transformWeatherAPIData(invalidData, 'TestCity');
    expect(result.temperature).toBe(28); // Default fallback
    expect(result.location).toBe('TestCity, Tamil Nadu');
  });

  test('should handle missing weather properties', () => {
    const incompleteData = {
      current: {
        temp_c: 25
        // Missing most properties
      },
      location: {
        name: 'Chennai'
      }
    };

    const result = weatherAPI.transformWeatherAPIData(incompleteData, 'Chennai');
    expect(result.temperature).toBe(25);
    expect(result.humidity).toBe(65); // Default fallback
    expect(result.windSpeed).toBe(8); // Default fallback
  });

  test('should handle extreme weather conditions', () => {
    const extremeData = {
      current: {
        temp_c: 48, // Extreme heat
        humidity: 100,
        wind_kph: 150, // Cyclone conditions
        condition: { text: 'Severe Thunderstorm', code: 1276 }
      },
      location: { name: 'Chennai' }
    };

    const result = weatherAPI.transformWeatherAPIData(extremeData, 'Chennai');
    expect(result.temperature).toBe(48);
    expect(result.windSpeed).toBe(150);
    expect(result.icon).toBe('thunderstorms');
  });
});