import React, { useState } from 'react';
import { Search, User, MapPin, Settings, Bell, Map, Menu } from 'lucide-react';
import SettingsModal from './SettingsModal';
import { locations } from '../data/mockWeatherData';

const Header = ({ onLocationChange, activeTab, onTabChange, availableCities }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationSelect = (location) => {
    onLocationChange(location);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div>
                <h1 className="text-2xl font-bold text-blue-600">Vaannilai Seithigal</h1>
                <p className="text-xs text-gray-500">வானிலை செய்திகள் - Tamil Nadu Weather</p>
              </div>
            </div>
          </div>

          {/* Navigation - Hidden on Mobile, Visible on Desktop */}
          <nav className="hidden xl:flex space-x-8">
            <button 
              onClick={() => onTabChange('current')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === 'current' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Current Weather
            </button>
            <button 
              onClick={() => onTabChange('hourly')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === 'hourly' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Hourly
            </button>
            <button 
              onClick={() => onTabChange('daily')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === 'daily' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Daily
            </button>
            <button 
              onClick={() => onTabChange('radar')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === 'radar' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Radar
            </button>
            <button 
              onClick={() => onTabChange('minutecast')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === 'minutecast' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              MinuteCast
            </button>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search Tamil Nadu districts and cities"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                      />
                    </div>
                    
                    {searchQuery && (
                      <div className="mt-3 space-y-1">
                        {filteredLocations.map((location, index) => (
                          <button
                            key={index}
                            onClick={() => handleLocationSelect(location)}
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                          >
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{location}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu - Simplified */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <div className="font-medium">Vaannilai Seithigal</div>
                      <div className="text-xs text-gray-500">Tamil Nadu Weather</div>
                    </div>
                    <button 
                      onClick={() => {
                        window.open('https://openweathermap.org/weathermap?basemap=map&cities=true&layer=precipitation&lat=11.0168&lon=76.9558&zoom=6', '_blank');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <MapPin className="h-4 w-4 mr-3" />
                      Live Weather Map
                    </button>
                    <button 
                      onClick={() => {
                        alert('Weather alerts are displayed on the main page. Check the Weather Alerts section for current Tamil Nadu warnings.');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Bell className="h-4 w-4 mr-3" />
                      About Alerts
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        availableCities={availableCities || locations}
        onLocationChange={onLocationChange}
      />
    </header>
  );
};

export default Header;