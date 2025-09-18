import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Map, Info } from 'lucide-react';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import MinuteCast from '../components/MinuteCast';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import AirQuality from '../components/AirQuality';
import IndiaWeatherAlerts from '../components/IndiaWeatherAlerts';
import DistrictWeather from '../components/DistrictWeather';
import TamilNaduFeatures from '../components/TamilNaduFeatures';
import TamilNaduInsights from '../components/TamilNaduInsights';
import APIStatusBanner from '../components/APIStatusBanner';
import { useWeatherData } from '../hooks/useWeatherData';
import { dailyForecast, airQuality, monsoonAlert, cycloneWatch, heatWave } from '../data/mockWeatherData';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('current');
  
  // Use real weather data hook
  const {
    weatherData: currentWeather,
    minuteCast,
    hourlyForecast,
    selectedCity,
    loading,
    error,
    connectionStatus,
    changeCity,
    refreshData,
    availableCities,
    isRealData
  } = useWeatherData('Madurai'); // Start with Madurai

  const handleLocationChange = (newLocation) => {
    // Extract city name from location string
    const cityName = newLocation.replace(', Tamil Nadu', '').replace(',', '').trim();
    if (availableCities.includes(cityName)) {
      changeCity(cityName);
    } else {
      console.log('City not available in Tamil Nadu list:', cityName);
    }
  };

  const tabs = [
    { id: 'current', name: 'Current Weather', icon: MapPin },
    { id: 'hourly', name: 'Hourly', icon: Clock },
    { id: 'daily', name: 'Daily', icon: Calendar },
    { id: 'districts', name: 'Districts', icon: Map },
    { id: 'insights', name: 'TN Insights', icon: Info }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onLocationChange={handleLocationChange} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Status Banner */}
        <APIStatusBanner 
          connectionStatus={connectionStatus}
          onRefresh={refreshData}
        />
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Current Weather Tab */}
          {activeTab === 'current' && (
            <>
              {/* Current Weather - Hero Section */}
              <CurrentWeather weather={currentWeather} />

              {/* Tamil Nadu Weather Alerts */}
              <IndiaWeatherAlerts 
                monsoonAlert={monsoonAlert}
                cycloneWatch={cycloneWatch}
                heatWave={heatWave}
              />

              {/* MinuteCast */}
              <MinuteCast minuteCast={minuteCast} />

              {/* Air Quality */}
              <AirQuality airQuality={airQuality} />
            </>
          )}

          {/* Hourly Tab */}
          {activeTab === 'hourly' && (
            <>
              {/* Current Weather - Compact View */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">{currentWeather.location}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-light text-gray-900">{currentWeather.temperature}°C</div>
                    <p className="text-sm text-gray-600">{currentWeather.condition}</p>
                  </div>
                </div>
              </div>

              {/* MinuteCast */}
              <MinuteCast minuteCast={minuteCast} />

              {/* Hourly Forecast - Full Width */}
              <HourlyForecast forecast={hourlyForecast} />
            </>
          )}

          {/* Daily Tab */}
          {activeTab === 'daily' && (
            <>
              {/* Current Weather - Compact View */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">{currentWeather.location}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-light text-gray-900">{currentWeather.temperature}°C</div>
                    <p className="text-sm text-gray-600">{currentWeather.condition}</p>
                  </div>
                </div>
              </div>

              {/* Daily Forecast - Full Width */}
              <DailyForecast forecast={dailyForecast} />
            </>
          )}

          {/* Districts Tab */}
          {activeTab === 'districts' && (
            <>
              {/* District-wise Weather Information */}
              <DistrictWeather />
            </>
          )}

          {/* Tamil Nadu Insights Tab */}
          {activeTab === 'insights' && (
            <>
              {/* Tamil Nadu Specific Insights */}
              <TamilNaduInsights currentWeather={currentWeather} />
            </>
          )}
        </div>

        {/* Additional Weather Information Cards - Always Visible except for Districts and Insights tabs */}
        {activeTab !== 'districts' && activeTab !== 'insights' && (
          <div className="space-y-8 mt-8">
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

            {/* Tamil Nadu Features */}
            <TamilNaduFeatures />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Vaannilai Seithigal (வானிலை செய்திகள்). வானிலை அறிவோம், வாழ்வை மேம்படுத்துவோம்.</p>
            <p className="mt-1">தமிழ்நாட்டின் 38 மாவட்டங்களுக்கான சிறப்பு வானிலை தகவல் மையம்.</p>
            <div className="mt-3 flex justify-center items-center space-x-6 text-xs">
              <span>🏛️ IMD அங்கீகாரம்</span>
              <span>🌊 வங்கக்கடல் கண்காணிப்பு</span>
              <span>🌾 விவசாய ஆலோசனை</span>
              <span>📱 முழு தமிழ் ஆதரவு</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;