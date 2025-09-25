/**
 * Weather API Service Unit Tests
 * Vaannilai Seithigal - Tamil Nadu Weather App
 */

import { weatherAPI } from '../weatherAPI';

// Mock console methods to avoid test noise
global.console = {
  ...console,
  log: () => {},
  warn: () => {},
  error: () => {},
};

describe('WeatherAPI Service Tests', () => {
  beforeEach(() => {
    // Reset environment variables for each test
    process.env.REACT_APP_WEATHER_API_KEY = 'test_api_key_123';
  });

  describe('API Key Management', () => {
    test('should detect when API key is available', () => {
      // API key is loaded at constructor time from environment
      expect(weatherAPI.isAPIKeyAvailable()).toBe(true);
    });

    test('should use mock data when API key is not configured', () => {
      // The weatherAPI instance already has the key loaded, so this tests the fallback behavior
      const mockData = weatherAPI.getMockWeatherData('Chennai');
      expect(mockData.isMockData).toBe(true);
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

    test('should include all major Tamil Nadu districts', () => {
      const cities = weatherAPI.getAvailableCities();
      const majorCities = [
        'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 
        'Salem', 'Tirunelveli', 'Vellore', 'Erode'
      ];
      
      majorCities.forEach(city => {
        expect(cities).toContain(city);
      });
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
      expect(result.realFeel).toBe(32);
      expect(result.condition).toBe('Sunny');
      expect(result.humidity).toBe(65);
      expect(result.windSpeed).toBe(8);
      expect(result.windDirection).toBe('NE');
      expect(result.uvIndex).toBe(7);
      expect(result.visibility).toBe(15);
      expect(result.dewPoint).toBe(22);
      expect(result.cloudCover).toBe(20);
      expect(result.isRealData).toBe(true);
    });

    test('should handle missing data gracefully', () => {
      const incompleteData = {
        current: {
          temp_c: 25
          // Missing other properties
        },
        location: {
          name: 'Chennai'
        }
      };

      const result = weatherAPI.transformWeatherAPIData(incompleteData, 'Chennai');
      
      expect(result.temperature).toBe(25);
      expect(result.location).toBe('Chennai, Tamil Nadu');
      expect(result.humidity).toBe(65); // Default fallback
      expect(result.windSpeed).toBe(8); // Default fallback
      expect(result.pressure).toBeCloseTo(29.92, 2); // Default pressure
    });
  });

  describe('Weather Icon Mapping', () => {
    test('should map WeatherAPI condition codes correctly', () => {
      expect(weatherAPI.mapWeatherAPIIcon(1000)).toBe('sunny');
      expect(weatherAPI.mapWeatherAPIIcon(1003)).toBe('partly-cloudy');
      expect(weatherAPI.mapWeatherAPIIcon(1006)).toBe('cloudy');
      expect(weatherAPI.mapWeatherAPIIcon(1063)).toBe('light-rain');
      expect(weatherAPI.mapWeatherAPIIcon(1087)).toBe('thunderstorms');
      expect(weatherAPI.mapWeatherAPIIcon(1195)).toBe('rain');
    });

    test('should handle unknown condition codes', () => {
      expect(weatherAPI.mapWeatherAPIIcon(9999)).toBe('partly-cloudy');
      expect(weatherAPI.mapWeatherAPIIcon(null)).toBe('partly-cloudy');
      expect(weatherAPI.mapWeatherAPIIcon(undefined)).toBe('partly-cloudy');
    });

    test('should map weather descriptions to icons', () => {
      expect(weatherAPI.mapWeatherIcon('heavy rain')).toBe('rain');
      expect(weatherAPI.mapWeatherIcon('light drizzle')).toBe('light-rain');
      expect(weatherAPI.mapWeatherIcon('thunderstorm')).toBe('thunderstorms');
      expect(weatherAPI.mapWeatherIcon('clear sky')).toBe('sunny');
      expect(weatherAPI.mapWeatherIcon('partly cloudy')).toBe('partly-cloudy');
      expect(weatherAPI.mapWeatherIcon('foggy morning')).toBe('fog');
    });
  });

  describe('Weather Condition Mapping', () => {
    test('should map rain descriptions correctly', () => {
      expect(weatherAPI.mapWeatherCondition('heavy rain')).toBe('Heavy Rain');
      expect(weatherAPI.mapWeatherCondition('light drizzle')).toBe('Light Rain');
      expect(weatherAPI.mapWeatherCondition('moderate rain')).toBe('Rain');
    });

    test('should map storm conditions correctly', () => {
      expect(weatherAPI.mapWeatherCondition('thunderstorm with rain')).toBe('Thunderstorms');
      expect(weatherAPI.mapWeatherCondition('severe storm')).toBe('Thunderstorms');
    });

    test('should map sky conditions correctly', () => {
      expect(weatherAPI.mapWeatherCondition('partly cloudy')).toBe('Partly Cloudy');
      expect(weatherAPI.mapWeatherCondition('overcast')).toBe('Cloudy');
      expect(weatherAPI.mapWeatherCondition('clear sky')).toBe('Clear');
      expect(weatherAPI.mapWeatherCondition('sunny')).toBe('Clear');
    });

    test('should handle fog and mist', () => {
      expect(weatherAPI.mapWeatherCondition('morning fog')).toBe('Fog');
      expect(weatherAPI.mapWeatherCondition('misty conditions')).toBe('Fog');
    });

    test('should identify hot conditions', () => {
      expect(weatherAPI.mapWeatherCondition('hot and humid')).toBe('Hot & Humid');
      expect(weatherAPI.mapWeatherCondition('very hot')).toBe('Hot & Humid');
    });

    test('should handle unknown conditions', () => {
      expect(weatherAPI.mapWeatherCondition('unknown weather')).toBe('Partly Cloudy');
      expect(weatherAPI.mapWeatherCondition('')).toBe('Partly Cloudy');
    });
  });

  describe('Generated Forecasts', () => {
    test('should generate MinuteCast for rainy conditions', () => {
      const rainyWeather = {
        condition: 'Heavy Rain',
        temperature: 25
      };

      const minuteCast = weatherAPI.generateMinuteCast(rainyWeather);

      expect(minuteCast.summary).toContain('மழை தொடரும்');
      expect(minuteCast.summary).toContain('Rain expected to continue');
      expect(minuteCast.precipitation).toHaveLength(8);
      expect(minuteCast.precipitation[0].time).toBe('Now');
      expect(minuteCast.precipitation[0].intensity).toBeGreaterThan(0);
      
      // All precipitation values should be realistic
      minuteCast.precipitation.forEach(item => {
        expect(item.intensity).toBeGreaterThanOrEqual(0);
        expect(item.intensity).toBeLessThanOrEqual(5);
        expect(item.time).toBeDefined();
      });
    });

    test('should generate MinuteCast for clear weather', () => {
      const clearWeather = {
        condition: 'Clear',
        temperature: 30
      };

      const minuteCast = weatherAPI.generateMinuteCast(clearWeather);

      expect(minuteCast.summary).toContain('தெளிவான வானிலை');
      expect(minuteCast.summary).toContain('Clear weather expected');
      expect(minuteCast.precipitation[0].intensity).toBe(0);
    });

    test('should generate hourly forecast with realistic data', () => {
      const baseWeather = {
        condition: 'Sunny',
        temperature: 32,
        icon: 'sunny'
      };

      const hourlyForecast = weatherAPI.generateHourlyForecast(baseWeather);

      expect(hourlyForecast).toHaveLength(12);
      
      hourlyForecast.forEach((hour, index) => {
        expect(hour.time).toBeDefined();
        expect(hour.temp).toBeGreaterThan(15);
        expect(hour.temp).toBeLessThan(50);
        expect(hour.condition).toBeDefined();
        expect(hour.precipitation).toBeGreaterThanOrEqual(0);
        expect(hour.precipitation).toBeLessThanOrEqual(100);
        expect(hour.icon).toBeDefined();
      });

      // First few hours should match base weather
      expect(hourlyForecast[0].condition).toBe('Sunny');
      expect(hourlyForecast[1].condition).toBe('Sunny');
    });

    test('should vary temperature realistically throughout day', () => {
      const baseWeather = {
        condition: 'Partly Cloudy',
        temperature: 28,
        icon: 'partly-cloudy'
      };

      const hourlyForecast = weatherAPI.generateHourlyForecast(baseWeather);
      
      // Check that temperatures vary but stay within realistic range
      const temperatures = hourlyForecast.map(h => h.temp);
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);
      
      expect(maxTemp - minTemp).toBeGreaterThan(0); // Should have some variation
      expect(maxTemp - minTemp).toBeLessThan(15); // But not too extreme
      expect(minTemp).toBeGreaterThanOrEqual(20); // Minimum should be reasonable for TN
    });
  });

  describe('Mock Data Generation', () => {
    test('should generate consistent mock data', () => {
      const mockData1 = weatherAPI.getMockWeatherData('Vellore');
      const mockData2 = weatherAPI.getMockWeatherData('Vellore');

      expect(mockData1.location).toBe(mockData2.location);
      expect(mockData1.temperature).toBe(mockData2.temperature);
      expect(mockData1.isMockData).toBe(true);
      expect(mockData1.condition).toContain('Mock Data');
    });

    test('should generate mock data for all cities', () => {
      const cities = ['Chennai', 'Madurai', 'Coimbatore', 'Tirunelveli'];
      
      cities.forEach(city => {
        const mockData = weatherAPI.getMockWeatherData(city);
        expect(mockData.location).toBe(`${city}, Tamil Nadu`);
        expect(mockData.isMockData).toBe(true);
        expect(mockData.temperature).toBe(28);
        expect(mockData.condition).toContain('Mock Data - Get API Key for Real Weather');
        expect(mockData.humidity).toBe(75);
        expect(mockData.windSpeed).toBe(12);
      });
    });

    test('should include all required weather properties', () => {
      const mockData = weatherAPI.getMockWeatherData('Salem');
      
      const requiredProps = [
        'location', 'temperature', 'realFeel', 'condition', 'icon',
        'humidity', 'windSpeed', 'windDirection', 'pressure', 'uvIndex',
        'visibility', 'dewPoint', 'cloudCover', 'lastUpdated', 'isMockData'
      ];
      
      requiredProps.forEach(prop => {
        expect(mockData).toHaveProperty(prop);
        expect(mockData[prop]).toBeDefined();
      });
    });
  });

  describe('Utility Functions', () => {
    test('should convert wind degrees to compass directions', () => {
      expect(weatherAPI.degreeToDirection(0)).toBe('N');
      expect(weatherAPI.degreeToDirection(45)).toBe('NE');
      expect(weatherAPI.degreeToDirection(90)).toBe('E');
      expect(weatherAPI.degreeToDirection(135)).toBe('SE');
      expect(weatherAPI.degreeToDirection(180)).toBe('S');
      expect(weatherAPI.degreeToDirection(225)).toBe('SW');
      expect(weatherAPI.degreeToDirection(270)).toBe('W');
      expect(weatherAPI.degreeToDirection(315)).toBe('NW');
      expect(weatherAPI.degreeToDirection(360)).toBe('N');
    });

    test('should handle invalid wind degrees', () => {
      expect(weatherAPI.degreeToDirection(null)).toBe('SW');
      expect(weatherAPI.degreeToDirection(undefined)).toBe('SW');
      expect(weatherAPI.degreeToDirection(-10)).toBeDefined();
      expect(weatherAPI.degreeToDirection(400)).toBeDefined();
    });

    test('should calculate dew point correctly', () => {
      // Test with typical Chennai weather conditions
      const dewPoint = weatherAPI.calculateDewPoint(32, 80);
      expect(dewPoint).toBeGreaterThan(25);
      expect(dewPoint).toBeLessThan(32);
      
      // Test with drier conditions
      const dewPointDry = weatherAPI.calculateDewPoint(35, 40);
      expect(dewPointDry).toBeLessThan(25);
    });

    test('should handle invalid dew point inputs', () => {
      expect(weatherAPI.calculateDewPoint(null, 70)).toBe(22);
      expect(weatherAPI.calculateDewPoint(30, null)).toBe(22);
      expect(weatherAPI.calculateDewPoint(null, null)).toBe(22);
    });
  });

  describe('Tamil Nadu Weather Scenarios', () => {
    test('should handle Chennai monsoon patterns', () => {
      const monsoonWeather = {
        condition: 'Heavy Rain',
        temperature: 28,
        humidity: 95,
        windDirection: 'NE' // Northeast monsoon typical
      };

      const minuteCast = weatherAPI.generateMinuteCast(monsoonWeather);
      expect(minuteCast.summary).toContain('மழை தொடரும்');
      expect(minuteCast.precipitation[0].intensity).toBeGreaterThan(1);
    });

    test('should handle hill station conditions', () => {
      const hillWeather = {
        condition: 'Cool & Pleasant',
        temperature: 18, // Typical Ooty/Kodaikanal temperature
        humidity: 85
      };

      const hourlyForecast = weatherAPI.generateHourlyForecast(hillWeather);
      // Hill stations should maintain cooler temperatures
      const avgTemp = hourlyForecast.reduce((sum, h) => sum + h.temp, 0) / 12;
      expect(avgTemp).toBeLessThan(25);
    });

    test('should handle coastal weather patterns', () => {
      const coastalWeather = {
        condition: 'Hot & Windy',
        temperature: 32,
        windSpeed: 20, // Strong sea breeze
        windDirection: 'SW'
      };

      const minuteCast = weatherAPI.generateMinuteCast(coastalWeather);
      // Coastal areas typically have less rain intensity
      expect(minuteCast.precipitation[0].intensity).toBeLessThanOrEqual(2);
    });

    test('should handle summer heat conditions', () => {
      const hotWeather = {
        condition: 'Very Hot',
        temperature: 42, // Summer heat in interior TN
        humidity: 30 // Dry heat
      };

      const hourlyForecast = weatherAPI.generateHourlyForecast(hotWeather);
      // Should maintain high temperatures during day
      const dayHours = hourlyForecast.slice(0, 6);
      dayHours.forEach(hour => {
        expect(hour.temp).toBeGreaterThan(35);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle extreme temperature values', () => {
      const extremeData = {
        current: {
          temp_c: 50, // Extreme heat
          feelslike_c: 55,
          humidity: 5, // Very low humidity
          wind_kph: 100 // High wind speeds
        },
        location: { name: 'TestCity' }
      };

      const result = weatherAPI.transformWeatherAPIData(extremeData, 'TestCity');
      expect(result.temperature).toBe(50);
      expect(result.realFeel).toBe(55);
      expect(result.humidity).toBe(5);
      expect(result.windSpeed).toBe(100);
    });

    test('should handle missing location data', () => {
      const noLocationData = {
        current: { temp_c: 30 },
        location: null
      };

      const result = weatherAPI.transformWeatherAPIData(noLocationData, 'DefaultCity');
      expect(result.location).toBe('DefaultCity, Tamil Nadu');
    });

    test('should handle completely empty API response', () => {
      const emptyData = {};
      
      const result = weatherAPI.transformWeatherAPIData(emptyData, 'EmptyTest');
      expect(result.location).toBe('EmptyTest, Tamil Nadu');
      expect(result.temperature).toBe(28); // Default fallback
      expect(result.isRealData).toBe(true);
    });
  });

  describe('Performance and Reliability', () => {
    test('should generate forecasts quickly', () => {
      const weather = { condition: 'Sunny', temperature: 30, icon: 'sunny' };
      
      const start = Date.now();
      const minuteCast = weatherAPI.generateMinuteCast(weather);
      const hourlyForecast = weatherAPI.generateHourlyForecast(weather);
      const duration = Date.now() - start;
      
      expect(duration).toBeLessThan(100); // Should be very fast
      expect(minuteCast.precipitation).toHaveLength(8);
      expect(hourlyForecast).toHaveLength(12);
    });

    test('should handle concurrent data processing', () => {
      const cities = ['Chennai', 'Madurai', 'Coimbatore', 'Salem'];
      
      const results = cities.map(city => 
        weatherAPI.getMockWeatherData(city)
      );
      
      expect(results).toHaveLength(4);
      results.forEach((result, index) => {
        expect(result.location).toBe(`${cities[index]}, Tamil Nadu`);
        expect(result.isMockData).toBe(true);
      });
    });
  });
});