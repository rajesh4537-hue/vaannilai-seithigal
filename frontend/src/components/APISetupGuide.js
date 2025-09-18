import React, { useState } from 'react';
import { ExternalLink, Copy, CheckCircle, AlertCircle, Globe, MapPin, Zap } from 'lucide-react';

const APISetupGuide = ({ onClose }) => {
  const [copiedKey, setCopiedKey] = useState('');

  const copyToClipboard = (text, keyType) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyType);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const apiOptions = [
    {
      id: 'indianapi',
      name: 'IndianAPI.in',
      icon: <MapPin className="h-5 w-5 text-orange-600" />,
      badge: 'Tamil Nadu Focus',
      badgeColor: 'bg-orange-100 text-orange-800',
      freeLimit: '1,000 calls/day',
      coverage: 'All Indian cities + Tamil Nadu specific',
      pros: ['Tamil Nadu focused', 'Indian city optimized', 'Good coverage'],
      cons: ['Smaller provider', 'Less global coverage'],
      signupUrl: 'https://weather.indianapi.in',
      difficulty: 'Easy',
      recommended: true
    },
    {
      id: 'openweather',
      name: 'OpenWeatherMap',
      icon: <Globe className="h-5 w-5 text-blue-600" />,
      badge: 'Most Popular',
      badgeColor: 'bg-blue-100 text-blue-800',
      freeLimit: '1,000 calls/day',
      coverage: 'Global coverage including all Tamil Nadu cities',
      pros: ['Very reliable', 'Excellent documentation', 'Global coverage'],
      cons: ['More general', 'Less India-specific'],
      signupUrl: 'https://openweathermap.org/api',
      difficulty: 'Easy',
      recommended: false
    },
    {
      id: 'weatherapi',
      name: 'WeatherAPI.com',
      icon: <Zap className="h-5 w-5 text-purple-600" />,
      badge: 'Best Free Tier',
      badgeColor: 'bg-purple-100 text-purple-800',
      freeLimit: '1 million calls/month',
      coverage: 'Global coverage with good Indian city support',
      pros: ['Very generous free tier', 'Fast response', 'Good API'],
      cons: ['Less India-focused', 'Newer service'],
      signupUrl: 'https://www.weatherapi.com',
      difficulty: 'Easy',
      recommended: false
    }
  ];

  const stepsByService = {
    indianapi: [
      'Visit weather.indianapi.in',
      'Click "Sign Up" or "Get Started"',
      'Enter email and create password',
      'Verify your email address',
      'Login to dashboard',
      'Copy your API key'
    ],
    openweather: [
      'Visit openweathermap.org/api',
      'Click "Sign Up" button',
      'Fill registration form',
      'Verify email and login',
      'Go to "API Keys" section',
      'Copy the default API key'
    ],
    weatherapi: [
      'Visit weatherapi.com',
      'Click "Sign Up Free"',
      'Register with email',
      'Verify email account',
      'Go to dashboard',
      'Copy your API key'
    ]
  };

  const [selectedService, setSelectedService] = useState('indianapi');

  const envExamples = {
    indianapi: 'REACT_APP_WEATHER_API_KEY=your_indianapi_key_here',
    openweather: 'REACT_APP_WEATHER_API_KEY=your_openweather_key_here',
    weatherapi: 'REACT_APP_WEATHER_API_KEY=your_weatherapi_key_here'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Get FREE Weather API Key</h2>
              <p className="text-gray-600 mt-1">Choose the best weather service for Vaannilai Seithigal</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* API Service Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {apiOptions.map((api) => (
              <div
                key={api.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedService === api.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${api.recommended ? 'ring-2 ring-orange-200' : ''}`}
                onClick={() => setSelectedService(api.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {api.icon}
                    <h3 className="font-semibold">{api.name}</h3>
                  </div>
                  {api.recommended && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className={`inline-block px-2 py-1 rounded text-xs ${api.badgeColor}`}>
                    {api.badge}
                  </div>
                  <p className="text-gray-600">{api.coverage}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium">🆓 {api.freeLimit}</span>
                    <span className="text-gray-500 text-xs">{api.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Service Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              {apiOptions.find(api => api.id === selectedService)?.icon}
              <h3 className="text-xl font-semibold">
                {apiOptions.find(api => api.id === selectedService)?.name} Setup
              </h3>
            </div>

            {/* Step by step instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">📋 Registration Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  {stepsByService[selectedService].map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>

                <a
                  href={apiOptions.find(api => api.id === selectedService)?.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <span>Open Registration Page</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div>
                <h4 className="font-medium mb-3">⚙️ Environment Setup:</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Add this to your <code className="bg-gray-200 px-1 rounded">/app/frontend/.env</code> file:
                    </p>
                    <div className="bg-black rounded-lg p-3 text-green-400 font-mono text-sm relative">
                      <code>{envExamples[selectedService]}</code>
                      <button
                        onClick={() => copyToClipboard(envExamples[selectedService], selectedService)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedKey === selectedService ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800">Important:</p>
                        <p className="text-yellow-700">
                          After adding the API key, restart your application to see real weather data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
              <div>
                <h5 className="font-medium text-green-800 mb-2">✅ Advantages:</h5>
                <ul className="text-sm space-y-1">
                  {apiOptions.find(api => api.id === selectedService)?.pros.map((pro, index) => (
                    <li key={index} className="text-green-700">• {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-orange-800 mb-2">⚠️ Considerations:</h5>
                <ul className="text-sm space-y-1">
                  {apiOptions.find(api => api.id === selectedService)?.cons.map((con, index) => (
                    <li key={index} className="text-orange-700">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              All these services offer free tiers perfect for Vaannilai Seithigal
            </p>
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APISetupGuide;