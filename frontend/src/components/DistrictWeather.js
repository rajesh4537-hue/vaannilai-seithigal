import React, { useState } from 'react';
import { MapPin, Thermometer, Droplets, Wind, AlertTriangle, Search, Filter } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { tamilNaduDistricts, regionSummary } from '../data/tamilNaduDistricts';

const DistrictWeather = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const regions = ['All', ...Object.keys(regionSummary)];

  const getAlertColor = (alerts) => {
    if (alerts.length === 0) return 'text-green-600';
    if (alerts.some(alert => alert.includes('Heavy Rain') || alert.includes('Cyclone'))) return 'text-red-600';
    if (alerts.some(alert => alert.includes('Heat Wave'))) return 'text-orange-600';
    return 'text-yellow-600';
  };

  const filteredDistricts = tamilNaduDistricts
    .filter(district => {
      const matchesRegion = selectedRegion === 'All' || district.region === selectedRegion;
      const matchesSearch = district.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRegion && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'temperature':
          return b.temperature - a.temperature;
        case 'rainfall':
          return b.rainfall - a.rainfall;
        case 'alerts':
          return b.alerts.length - a.alerts.length;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Tamil Nadu District Weather</h3>
        </div>
        <div className="text-sm text-gray-500">
          {filteredDistricts.length} of {tamilNaduDistricts.length} districts
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="temperature">Sort by Temperature</option>
            <option value="rainfall">Sort by Rainfall</option>
            <option value="alerts">Sort by Alerts</option>
          </select>
        </div>

        {/* Region Summary */}
        {selectedRegion !== 'All' && regionSummary[selectedRegion] && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">{selectedRegion} Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Average Temperature:</span>
                <span className="font-medium text-blue-900 ml-1">{regionSummary[selectedRegion].avgTemp}°C</span>
              </div>
              <div>
                <span className="text-blue-700">Condition:</span>
                <span className="font-medium text-blue-900 ml-1">{regionSummary[selectedRegion].condition}</span>
              </div>
              <div>
                <span className="text-blue-700">Weather Pattern:</span>
                <span className="font-medium text-blue-900 ml-1">{regionSummary[selectedRegion].dominantWeather}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDistricts.map((district) => (
          <div key={district.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{district.name}</h4>
                <p className="text-xs text-gray-500">{district.region}</p>
              </div>
              <WeatherIcon condition={district.icon} size="small" />
            </div>

            <div className="space-y-2">
              {/* Temperature */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-600">Temperature</span>
                </div>
                <span className="font-semibold text-gray-900">{district.temperature}°C</span>
              </div>

              {/* Humidity */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Humidity</span>
                </div>
                <span className="font-semibold text-gray-900">{district.humidity}%</span>
              </div>

              {/* Wind */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Wind</span>
                </div>
                <span className="font-semibold text-gray-900">{district.windSpeed} km/h</span>
              </div>

              {/* Rainfall */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Rain Chance</span>
                </div>
                <span className="font-semibold text-gray-900">{district.rainfall}%</span>
              </div>

              {/* Condition */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700">{district.condition}</p>
              </div>

              {/* Alerts */}
              {district.alerts.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center space-x-1 mb-1">
                    <AlertTriangle className={`h-3 w-3 ${getAlertColor(district.alerts)}`} />
                    <span className="text-xs font-medium text-gray-600">Active Alerts</span>
                  </div>
                  <div className="space-y-1">
                    {district.alerts.map((alert, index) => (
                      <div key={index} className={`text-xs px-2 py-1 rounded ${
                        alert.includes('Heavy Rain') || alert.includes('Cyclone') 
                          ? 'bg-red-100 text-red-700' 
                          : alert.includes('Heat Wave')
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDistricts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No districts match your search criteria.</p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Hottest District</p>
            <p className="font-semibold text-red-600">
              {tamilNaduDistricts.reduce((prev, curr) => prev.temperature > curr.temperature ? prev : curr).name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Coolest District</p>
            <p className="font-semibold text-blue-600">
              {tamilNaduDistricts.reduce((prev, curr) => prev.temperature < curr.temperature ? prev : curr).name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Highest Rainfall</p>
            <p className="font-semibold text-blue-600">
              {tamilNaduDistricts.reduce((prev, curr) => prev.rainfall > curr.rainfall ? prev : curr).name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Most Alerts</p>
            <p className="font-semibold text-orange-600">
              {tamilNaduDistricts.reduce((prev, curr) => prev.alerts.length > curr.alerts.length ? prev : curr).name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictWeather;