import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Zap, Eye, CloudDrizzle } from 'lucide-react';

const WeatherIcon = ({ condition, size = 'medium' }) => {
  const getIcon = () => {
    switch (condition) {
      case 'sunny':
      case 'clear':
        return <Sun className={`text-yellow-500 ${getSizeClass()}`} />;
      case 'partly-cloudy':
        return <Cloud className={`text-gray-500 ${getSizeClass()}`} />;
      case 'cloudy':
        return <Cloud className={`text-gray-600 ${getSizeClass()}`} />;
      case 'light-rain':
        return <CloudDrizzle className={`text-blue-500 ${getSizeClass()}`} />;
      case 'rain':
        return <CloudRain className={`text-blue-600 ${getSizeClass()}`} />;
      case 'snow':
        return <CloudSnow className={`text-blue-300 ${getSizeClass()}`} />;
      case 'thunderstorms':
        return <Zap className={`text-purple-600 ${getSizeClass()}`} />;
      case 'fog':
        return <Eye className={`text-gray-400 ${getSizeClass()}`} />;
      default:
        return <Sun className={`text-yellow-500 ${getSizeClass()}`} />;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'h-5 w-5';
      case 'medium':
        return 'h-8 w-8';
      case 'large':
        return 'h-16 w-16';
      default:
        return 'h-8 w-8';
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;