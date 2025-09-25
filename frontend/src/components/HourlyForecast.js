import React from 'react';
import { ChevronRight, Droplets } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const HourlyForecast = ({ forecast }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">24-Hour Forecast</h3>
        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          <span>View Details</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
        <div className="flex space-x-4 pb-2 min-w-max">
          {forecast.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-3 flex-shrink-0 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer min-w-[80px]">
              {/* Time */}
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {item.time}
              </span>

              {/* Weather Icon */}
              <WeatherIcon condition={item.icon} size="medium" />

              {/* Temperature */}
              <span className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                {item.temp}°C
              </span>

              {/* Precipitation */}
              <div className="flex items-center space-x-1">
                <Droplets className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  {item.precipitation}%
                </span>
              </div>

              {/* Condition */}
              <span className="text-xs text-gray-500 text-center whitespace-nowrap max-w-16">
                {item.condition}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator for mobile */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;