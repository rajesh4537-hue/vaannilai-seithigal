import React, { useState, useEffect } from 'react';
import { X, MapPin, Bell, Trash2, Plus } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, availableCities, onLocationChange }) => {
  const [myLocations, setMyLocations] = useState([]);
  const [alertSettings, setAlertSettings] = useState({
    weatherAlerts: true,
    severWeatherAlerts: true,
    rainAlerts: true,
    temperatureAlerts: false
  });
  const [newLocationInput, setNewLocationInput] = useState('');
  const [showAddLocation, setShowAddLocation] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedLocations = localStorage.getItem('myLocations');
    const savedAlertSettings = localStorage.getItem('alertSettings');
    
    if (savedLocations) {
      try {
        setMyLocations(JSON.parse(savedLocations));
      } catch (e) {
        console.error('Error loading saved locations:', e);
      }
    } else {
      // Default locations for Tamil Nadu
      setMyLocations(['Chennai', 'Madurai', 'Coimbatore']);
    }
    
    if (savedAlertSettings) {
      try {
        setAlertSettings(JSON.parse(savedAlertSettings));
      } catch (e) {
        console.error('Error loading alert settings:', e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('myLocations', JSON.stringify(myLocations));
  }, [myLocations]);

  useEffect(() => {
    localStorage.setItem('alertSettings', JSON.stringify(alertSettings));
  }, [alertSettings]);

  const addLocation = () => {
    const trimmedInput = newLocationInput.trim();
    if (trimmedInput && availableCities.includes(trimmedInput)) {
      if (!myLocations.includes(trimmedInput)) {
        setMyLocations([...myLocations, trimmedInput]);
        setNewLocationInput('');
        setShowAddLocation(false);
      }
    }
  };

  const removeLocation = (location) => {
    setMyLocations(myLocations.filter(loc => loc !== location));
  };

  const handleAlertToggle = (alertType) => {
    setAlertSettings(prev => ({
      ...prev,
      [alertType]: !prev[alertType]
    }));
  };

  const filteredCities = availableCities.filter(city => 
    city.toLowerCase().includes(newLocationInput.toLowerCase()) && 
    !myLocations.includes(city)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 -m-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          
          {/* My Locations Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">My Locations</h3>
              <button
                onClick={() => setShowAddLocation(!showAddLocation)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add</span>
              </button>
            </div>
            
            {/* Add Location Input */}
            {showAddLocation && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newLocationInput}
                      onChange={(e) => setNewLocationInput(e.target.value)}
                      placeholder="Search Tamil Nadu cities..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {newLocationInput && (
                      <div className="mt-2 max-h-32 overflow-y-auto bg-white border border-gray-200 rounded-md">
                        {filteredCities.slice(0, 5).map((city, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setNewLocationInput(city);
                              addLocation();
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{city}, Tamil Nadu</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={addLocation}
                    disabled={!newLocationInput.trim() || !availableCities.includes(newLocationInput.trim())}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* My Locations List */}
            <div className="space-y-2">
              {myLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <button
                    onClick={() => {
                      onLocationChange(`${location}, Tamil Nadu`);
                      onClose();
                    }}
                    className="flex items-center space-x-3 flex-1 text-left hover:text-blue-600 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{location}, Tamil Nadu</span>
                  </button>
                  <button
                    onClick={() => removeLocation(location)}
                    className="text-red-500 hover:text-red-700 p-1 -m-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {myLocations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm">No saved locations yet</p>
                  <p className="text-xs">Add your favorite Tamil Nadu cities</p>
                </div>
              )}
            </div>
          </div>

          {/* Weather Alerts Settings */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Alerts</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">General Weather Alerts</p>
                    <p className="text-sm text-gray-500">Daily weather updates and forecasts</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAlertToggle('weatherAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alertSettings.weatherAlerts ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alertSettings.weatherAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Severe Weather Alerts</p>
                    <p className="text-sm text-gray-500">Cyclones, storms, and extreme weather</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAlertToggle('severWeatherAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alertSettings.severWeatherAlerts ? 'bg-orange-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alertSettings.severWeatherAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">Rain Alerts</p>
                    <p className="text-sm text-gray-500">Monsoon and precipitation updates</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAlertToggle('rainAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alertSettings.rainAlerts ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alertSettings.rainAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-900">Temperature Alerts</p>
                    <p className="text-sm text-gray-500">Heat waves and cold spells</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAlertToggle('temperatureAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alertSettings.temperatureAlerts ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alertSettings.temperatureAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Vaannilai Seithigal</h4>
            <p className="text-sm text-blue-700 mb-2">Tamil Nadu Weather Information System</p>
            <p className="text-xs text-blue-600">Real-time weather data powered by WeatherAPI.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;