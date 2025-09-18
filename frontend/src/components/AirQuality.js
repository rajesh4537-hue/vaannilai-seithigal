import React from 'react';
import { Wind, Info } from 'lucide-react';

const AirQuality = ({ airQuality }) => {
  const getQualityColor = (index) => {
    if (index <= 50) return 'text-green-600 bg-green-100';
    if (index <= 100) return 'text-yellow-600 bg-yellow-100';
    if (index <= 150) return 'text-orange-600 bg-orange-100';
    if (index <= 200) return 'text-red-600 bg-red-100';
    return 'text-purple-600 bg-purple-100';
  };

  const getQualityLevel = (index) => {
    if (index <= 50) return 'Good';
    if (index <= 100) return 'Moderate';
    if (index <= 150) return 'Unhealthy for Sensitive';
    if (index <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Wind className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Air Quality</h3>
      </div>

      <div className="space-y-4">
        {/* AQI Number and Level */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {airQuality.index}
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(airQuality.index)}`}>
              {getQualityLevel(airQuality.index)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">US AQI</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>300+</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div className="bg-green-400 flex-1"></div>
              <div className="bg-yellow-400 flex-1"></div>
              <div className="bg-orange-400 flex-1"></div>
              <div className="bg-red-400 flex-1"></div>
              <div className="bg-purple-400 flex-1"></div>
              <div className="bg-red-800 flex-1"></div>
            </div>
            <div 
              className="absolute w-1 h-2 bg-white border border-gray-800 transform -translate-x-1/2"
              style={{ left: `${(airQuality.index / 300) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">
          {airQuality.description}
        </p>

        {/* Action Button */}
        <button className="w-full py-2 px-4 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
          View Detailed Forecast
        </button>
      </div>
    </div>
  );
};

export default AirQuality;