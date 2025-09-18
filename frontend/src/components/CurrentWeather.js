import React from 'react';
import { MapPin, Eye, Droplets, Wind, Gauge, Sun } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const CurrentWeather = ({ weather }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">{weather.location}</h2>
        </div>
        <p className="text-sm text-gray-600">Now</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Temperature Display */}
        <div className="flex items-center space-x-6">
          <WeatherIcon condition={weather.icon} size="large" />
          <div>
            <div className="text-5xl font-light text-gray-900 mb-1">
              {weather.temperature}°
            </div>
            <p className="text-gray-600 mb-2">{weather.condition}</p>
            <p className="text-sm text-gray-500">
              RealFeel® {weather.realFeel}°
            </p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Wind</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {weather.windSpeed} mph
            </p>
            <p className="text-xs text-gray-500">{weather.windDirection}</p>
          </div>

          <div className="bg-white/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Humidity</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{weather.humidity}%</p>
          </div>

          <div className="bg-white/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Gauge className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Pressure</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{weather.pressure} in</p>
          </div>

          <div className="bg-white/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">UV Index</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{weather.uvIndex}</p>
            <p className="text-xs text-gray-500">High</p>
          </div>

          <div className="bg-white/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Visibility</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{weather.visibility} mi</p>
          </div>

          <div className="bg-white/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Dew Point</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{weather.dewPoint}°</p>
          </div>

          {weather.heatIndex && (
            <div className="bg-white/50 rounded-lg p-4 col-span-2">
              <div className="flex items-center space-x-2 mb-2">
                <Sun className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">Heat Index</span>
              </div>
              <p className="text-lg font-semibold text-red-600">{weather.heatIndex}°C</p>
              <p className="text-xs text-red-500 mt-1">Extreme Caution - Heat exhaustion possible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;