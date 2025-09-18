// Custom React Hook for Weather Data Management
import { useState, useEffect, useCallback } from 'react';
import weatherAPI from '../services/weatherAPI';

export const useWeatherData = (initialCity = 'Chennai') => {
  const [weatherData, setWeatherData] = useState(null);
  const [minuteCast, setMinuteCast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [apiStatus, setApiStatus] = useState({ status: 'unknown' });
  const [lastUpdated, setLastUpdated] = useState(null);

  // Check API status on mount
  useEffect(() => {
    const checkStatus = async () => {
      const status = await weatherAPI.checkAPIStatus();
      setApiStatus(status);
      console.log('🔌 API Status:', status);
    };
    
    checkStatus();
  }, []);

  // Fetch weather data
  const fetchWeatherData = useCallback(async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🌤️ Fetching weather for ${cityName}...`);
      
      // Get current weather
      const currentWeather = await weatherAPI.getCurrentWeather(cityName);
      
      // Generate related forecasts
      const minuteCastData = weatherAPI.generateMinuteCast(currentWeather);
      const hourlyData = weatherAPI.generateHourlyForecast(currentWeather);
      
      // Update state
      setWeatherData(currentWeather);
      setMinuteCast(minuteCastData);
      setHourlyForecast(hourlyData);
      setLastUpdated(new Date());
      
      console.log('✅ Weather data updated successfully');
      
    } catch (err) {
      console.error('❌ Error fetching weather:', err);
      setError('Failed to fetch weather data. Using mock data.');
      
      // Fallback to mock data
      const mockData = weatherAPI.getMockWeatherData(cityName);
      setWeatherData(mockData);
      setMinuteCast(weatherAPI.generateMinuteCast(mockData));
      setHourlyForecast(weatherAPI.generateHourlyForecast(mockData));
      
    } finally {
      setLoading(false);
    }
  }, []);

  // Change city
  const changeCity = useCallback(async (newCity) => {
    setSelectedCity(newCity);
    await fetchWeatherData(newCity);
  }, [fetchWeatherData]);

  // Refresh data
  const refreshData = useCallback(async () => {
    await fetchWeatherData(selectedCity);
  }, [selectedCity, fetchWeatherData]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (weatherAPI.isAPIKeyAvailable()) {
        console.log('🔄 Auto-refreshing weather data...');
        refreshData();
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [refreshData]);

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity, fetchWeatherData]);

  // Get API connection status
  const getConnectionStatus = () => {
    if (!weatherAPI.isAPIKeyAvailable()) {
      return {
        connected: false,
        message: 'API key required for real weather data',
        type: 'warning'
      };
    }
    
    if (apiStatus.status === 'connected') {
      return {
        connected: true,
        message: 'Real-time weather data active',
        type: 'success'
      };
    }
    
    if (apiStatus.status === 'error') {
      return {
        connected: false,
        message: apiStatus.message,
        type: 'error'
      };
    }
    
    return {
      connected: false,
      message: 'Checking connection...',
      type: 'info'
    };
  };

  return {
    // Data
    weatherData,
    minuteCast,
    hourlyForecast,
    selectedCity,
    
    // Status
    loading,
    error,
    lastUpdated,
    connectionStatus: getConnectionStatus(),
    
    // Actions
    changeCity,
    refreshData,
    
    // Utilities
    availableCities: weatherAPI.getAvailableCities(),
    isRealData: weatherAPI.isAPIKeyAvailable() && !weatherData?.isMockData
  };
};