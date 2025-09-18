import React from 'react';
import { AlertTriangle, CloudRain, Thermometer, Wind, Eye } from 'lucide-react';

const IndiaWeatherAlerts = ({ monsoonAlert, cycloneWatch, heatWave }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Red':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'Orange':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'Yellow':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'Green':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getSeverityIcon = (type) => {
    switch (type) {
      case 'monsoon':
        return <CloudRain className="h-5 w-5" />;
      case 'cyclone':
        return <Wind className="h-5 w-5" />;
      case 'heatwave':
        return <Thermometer className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <h3 className="text-lg font-semibold text-gray-900">Tamil Nadu Weather Alerts</h3>
      </div>

      <div className="space-y-4">
        {/* Monsoon Alert */}
        {monsoonAlert.active && (
          <div className={`p-4 rounded-lg border-2 ${getSeverityColor(monsoonAlert.severity)}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getSeverityIcon('monsoon')}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{monsoonAlert.title}</h4>
                <p className="text-sm mb-2">{monsoonAlert.description}</p>
                <p className="text-xs opacity-75">Valid until: {monsoonAlert.validUntil}</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                monsoonAlert.severity === 'Orange' ? 'bg-orange-200 text-orange-800' : 'bg-gray-200 text-gray-800'
              }`}>
                {monsoonAlert.severity}
              </div>
            </div>
          </div>
        )}

        {/* Heat Wave Alert */}
        {heatWave.active && (
          <div className={`p-4 rounded-lg border-2 ${getSeverityColor(heatWave.severity)}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getSeverityIcon('heatwave')}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{heatWave.title}</h4>
                <p className="text-sm mb-2">{heatWave.description}</p>
                <p className="text-xs opacity-75">Valid until: {heatWave.validUntil}</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                heatWave.severity === 'Yellow' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'
              }`}>
                {heatWave.severity}
              </div>
            </div>
          </div>
        )}

        {/* Cyclone Watch */}
        <div className="p-4 rounded-lg border-2 bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Eye className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1 text-green-800">Cyclone Watch - Bay of Bengal</h4>
              <p className="text-sm text-green-700">{cycloneWatch.status}</p>
            </div>
            <div className="px-2 py-1 rounded text-xs font-medium bg-green-200 text-green-800">
              All Clear
            </div>
          </div>
        </div>

        {/* India Meteorological Department Notice */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-center">
            <h5 className="font-medium text-blue-900 mb-1">India Meteorological Department</h5>
            <p className="text-sm text-blue-700">
              Official weather warnings and forecasts for Tamil Nadu region
            </p>
            <button className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium">
              Visit WeatherMantra Tamil Nadu →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaWeatherAlerts;