import React, { useState } from 'react';
import { Wifi, WifiOff, AlertTriangle, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react';

const APIStatusBanner = ({ connectionStatus, onRefresh }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (connectionStatus.type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus.type) {
      case 'success': 
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': 
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error': 
        return <WifiOff className="h-5 w-5 text-red-600" />;
      default: 
        return <Wifi className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className={`rounded-lg border p-4 mb-6 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <p className="font-medium text-sm">{connectionStatus.message}</p>
            {!connectionStatus.connected && (
              <p className="text-xs opacity-75 mt-1">
                Currently showing mock data - Get API key for real weather
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {connectionStatus.connected && (
            <button
              onClick={onRefresh}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              title="Refresh weather data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs underline hover:no-underline"
          >
            {isExpanded ? 'Hide' : 'Setup'} API
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-current/20">
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium mb-2">🔑 Get FREE Weather API Key:</h4>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Visit: <strong>weather.indianapi.in</strong></li>
                <li>Click "Sign Up" (FREE account)</li>
                <li>Verify your email address</li>
                <li>Copy your API key from dashboard</li>
                <li>Add key to environment variables</li>
              </ol>
            </div>
            
            <div className="bg-white/20 rounded p-3">
              <h5 className="font-medium mb-1">📁 Environment Setup:</h5>
              <code className="text-xs bg-black/10 px-2 py-1 rounded block">
                REACT_APP_WEATHER_API_KEY=your_api_key_here
              </code>
              <p className="text-xs mt-1 opacity-75">
                Add this to your .env file in frontend folder
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs">
                <strong>Free Tier:</strong> 1,000 calls/day<br/>
                <strong>Coverage:</strong> All Tamil Nadu cities
              </div>
              
              <a 
                href="https://weather.indianapi.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs underline hover:no-underline"
              >
                <span>Get API Key</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIStatusBanner;