import React from 'react';
import { ChevronRight, Droplets } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const DailyForecast = ({ forecast }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">15-Day Forecast</h3>
        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          <span>View All</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {forecast.slice(0, 8).map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            {/* Day */}
            <div className="flex-1">
              <span className={`text-sm font-medium ${index === 0 ? 'text-blue-600' : 'text-gray-900'}`}>
                {item.day}
              </span>
            </div>

            {/* Weather Icon and Condition */}
            <div className="flex items-center space-x-3 flex-1 justify-center">
              <WeatherIcon condition={item.icon} size="small" />
              <span className="text-sm text-gray-600 hidden sm:block">
                {item.condition}
              </span>
            </div>

            {/* Precipitation */}
            <div className="flex items-center space-x-1 flex-1 justify-center">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {item.precipitation}%
              </span>
            </div>

            {/* Temperature Range */}
            <div className="flex items-center space-x-2 flex-1 justify-end">
              <span className="text-sm font-semibold text-gray-900">
                {item.high}°C
              </span>
              <span className="text-sm text-gray-500">
                {item.low}°C
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button */}
      <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
        Show remaining 7 days
      </button>
    </div>
  );
};

export default DailyForecast;