import React, { useState } from 'react';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import MinuteCast from '../components/MinuteCast';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import AirQuality from '../components/AirQuality';
import IndiaWeatherAlerts from '../components/IndiaWeatherAlerts';
import DistrictWeather from '../components/DistrictWeather';
import { currentWeather, minuteCast, hourlyForecast, dailyForecast, airQuality, monsoonAlert, cycloneWatch, heatWave } from '../data/mockWeatherData';

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState(currentWeather.location);

  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
    // In a real app, this would trigger new weather data fetch
    console.log('Location changed to:', newLocation);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onLocationChange={handleLocationChange} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Current Weather - Hero Section */}
          <CurrentWeather weather={currentWeather} />

          {/* MinuteCast */}
          <MinuteCast minuteCast={minuteCast} />

          {/* Tamil Nadu Weather Alerts */}
          <IndiaWeatherAlerts 
            monsoonAlert={monsoonAlert}
            cycloneWatch={cycloneWatch}
            heatWave={heatWave}
          />

          {/* Two Column Layout for Forecasts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Hourly Forecast - Takes 2 columns */}
            <div className="xl:col-span-2">
              <HourlyForecast forecast={hourlyForecast} />
            </div>

            {/* Air Quality - Takes 1 column */}
            <div className="xl:col-span-1">
              <AirQuality airQuality={airQuality} />
            </div>
          </div>

          {/* Daily Forecast - Full Width */}
          <DailyForecast forecast={dailyForecast} />

          {/* District-wise Weather Information */}
          <DistrictWeather />

          {/* Additional Weather Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Radar Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Radar</h3>
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">Interactive Radar</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                View Full Radar
              </button>
            </div>

            {/* Satellite Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Satellite</h3>
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">Live Satellite</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                View Satellite
              </button>
            </div>

            {/* Alerts Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center h-24 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-green-600 text-sm font-medium">No Active Alerts</div>
                    <div className="text-green-500 text-xs mt-1">All clear in your area</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Manage Alerts
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AccuWeather Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">MinuteCast®</h5>
                  <p className="text-sm text-gray-600">Minute-by-minute precipitation forecasts for the next 2 hours.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">RealFeel®</h5>
                  <p className="text-sm text-gray-600">What the temperature actually feels like outside.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">AccuWeather Alerts</h5>
                  <p className="text-sm text-gray-600">Life-saving severe weather warnings and notifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 WeatherMantra. Comprehensive weather forecasting for Tamil Nadu and India.</p>
            <p className="mt-1">Built with focus on Tamil Nadu districts and regional weather patterns.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;