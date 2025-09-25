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
  const [showRadarModal, setShowRadarModal] = useState(false);
  const [showSatelliteModal, setShowSatelliteModal] = useState(false);
  
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
      <Header 
        onLocationChange={handleLocationChange} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

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

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading weather data...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Tab Content */}
        {!loading && currentWeather && (
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

          {/* Radar Tab */}
          {activeTab === 'radar' && (
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

              {/* Interactive Radar */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Radar - Tamil Nadu</h3>
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="absolute inset-0 border-4 border-blue-300 rounded-full animate-ping"></div>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Interactive Weather Radar</h4>
                    <p className="text-sm text-gray-600 mb-4">Live precipitation and weather patterns across Tamil Nadu</p>
                    <button 
                      onClick={() => setShowRadarModal(true)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Launch Full Radar
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Light Rain</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Moderate Rain</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Heavy Rain</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* MinuteCast Tab */}
          {activeTab === 'minutecast' && (
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

              {/* MinuteCast - Full Width */}
              <MinuteCast minuteCast={minuteCast} />

              {/* Hourly Forecast for Context */}
              <HourlyForecast forecast={hourlyForecast} />
            </>
          )}
        </div>
        )}

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
                <button 
                  onClick={() => setShowRadarModal(true)}
                  className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
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
                <button 
                  onClick={() => setShowSatelliteModal(true)}
                  className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
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

      {/* Radar Modal */}
      {showRadarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl w-full h-full sm:max-w-4xl sm:w-full sm:max-h-[90vh] sm:h-auto overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Live Weather Radar - Tamil Nadu</h2>
              <button
                onClick={() => setShowRadarModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 -m-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6 h-full overflow-y-auto max-h-screen"
                 style={{maxHeight: 'calc(100vh - 80px)'}}>
              <div className="space-y-4">
                {/* Mobile-friendly radar content */}
                <div className="block sm:hidden">
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="absolute inset-0 border-4 border-blue-300 rounded-full animate-ping"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Weather Radar</h3>
                    <p className="text-sm text-gray-600 mb-4">Live precipitation data for Tamil Nadu region</p>
                    <a 
                      href="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=precipitation&lat=11.0168&lon=76.9558&zoom=6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Open in New Tab →
                    </a>
                  </div>
                  
                  {/* Live weather summary for mobile */}
                  <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Current Radar Summary</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span>Light Rain Areas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Moderate Rain</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                        <span>Heavy Showers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span>Clear Areas</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop iframe */}
                <div className="hidden sm:block">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=precipitation&lat=11.0168&lon=76.9558&zoom=6"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Tamil Nadu Weather Radar"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                      <span>Light Precipitation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Moderate Precipitation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                      <span>Heavy Precipitation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Very Heavy Precipitation</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    🌧️ Live precipitation data for Tamil Nadu region. Map shows current weather patterns and rainfall intensity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Satellite Modal */}
      {showSatelliteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl w-full h-full sm:max-w-4xl sm:w-full sm:max-h-[90vh] sm:h-auto overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Live Satellite View - Tamil Nadu</h2>
              <button
                onClick={() => setShowSatelliteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 -m-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6 h-full overflow-auto">
              <div className="space-y-4">
                {/* Mobile-friendly satellite content */}
                <div className="block sm:hidden">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Satellite View</h3>
                    <p className="text-sm text-gray-600 mb-4">Real-time cloud coverage and weather systems</p>
                    <a 
                      href="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=clouds&lat=11.0168&lon=76.9558&zoom=6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      Open in New Tab →
                    </a>
                  </div>

                  {/* Live satellite summary for mobile */}
                  <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Current Cloud Coverage</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div>
                        <span>Clear Sky</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                        <span>Light Clouds</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span>Moderate Clouds</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <span>Heavy Clouds</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        🛰️ <strong>Current Status:</strong> Monitoring monsoon clouds over Tamil Nadu. 
                        Bay of Bengal shows active weather systems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop iframe */}
                <div className="hidden sm:block">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=clouds&lat=11.0168&lon=76.9558&zoom=6"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Tamil Nadu Satellite View"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div>
                      <span>Clear Sky</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                      <span>Light Clouds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span>Moderate Clouds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                      <span>Heavy Clouds</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    🛰️ Live satellite imagery for Tamil Nadu region. Shows cloud coverage and weather systems from space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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