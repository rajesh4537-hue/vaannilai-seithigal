import React from 'react';
import { Clock, Droplets } from 'lucide-react';

const MinuteCast = ({ minuteCast }) => {
  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 0:
        return 'bg-gray-200';
      case 1:
        return 'bg-blue-200';
      case 2:
        return 'bg-blue-400';
      case 3:
        return 'bg-blue-600';
      default:
        return 'bg-gray-200';
    }
  };

  const getIntensityText = (intensity) => {
    switch (intensity) {
      case 0:
        return 'No precipitation';
      case 1:
        return 'Light';
      case 2:
        return 'Moderate';
      case 3:
        return 'Heavy';
      default:
        return 'No precipitation';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">MinuteCast®</h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">{minuteCast.summary}</p>

      {/* Precipitation Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Precipitation Intensity</span>
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">Next 2 hours</span>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="relative">
          <div className="flex justify-between items-end space-x-1 h-20 mb-2">
            {minuteCast.precipitation.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t ${getIntensityColor(item.intensity)} transition-all duration-300 hover:opacity-80`}
                  style={{ height: `${(item.intensity / 3) * 100}%` || '4px' }}
                  title={`${item.time}: ${getIntensityText(item.intensity)}`}
                />
              </div>
            ))}
          </div>

          {/* Time labels */}
          <div className="flex justify-between text-xs text-gray-500">
            {minuteCast.precipitation.map((item, index) => (
              <span key={index} className="flex-1 text-center">
                {index % 2 === 0 ? item.time : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span className="text-xs text-gray-600">None</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <span className="text-xs text-gray-600">Light</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-xs text-gray-600">Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-xs text-gray-600">Heavy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinuteCast;