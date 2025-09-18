import React from 'react';
import { Calendar, Droplets, Thermometer, Wind, Sunrise, Moon } from 'lucide-react';

const TamilNaduInsights = ({ currentWeather }) => {
  // Tamil Nadu specific weather insights
  const getSeasonalInsight = () => {
    const month = new Date().getMonth() + 1;
    
    if (month >= 6 && month <= 9) {
      return {
        season: "Southwest Monsoon",
        insight: "Peak monsoon season in Western Ghats. Moderate rainfall expected in plains.",
        recommendation: "Good time for paddy transplantation in delta regions."
      };
    } else if (month >= 10 && month <= 12) {
      return {
        season: "Northeast Monsoon",
        insight: "Primary rainy season for Tamil Nadu. Heavy rainfall expected in coastal areas.",
        recommendation: "Main agricultural season. Monitor for cyclone warnings."
      };
    } else if (month >= 1 && month <= 2) {
      return {
        season: "Winter",
        insight: "Pleasant weather across Tamil Nadu. Minimal rainfall expected.",
        recommendation: "Ideal for tourism and outdoor activities. Harvest season for crops."
      };
    } else if (month >= 3 && month <= 5) {
      return {
        season: "Summer",
        insight: "Hot and dry conditions prevail. Temperature can exceed 40°C inland.",
        recommendation: "Take heat precautions. Pre-monsoon showers possible in May."
      };
    }
  };

  const getTamilNaduSpecificAdvice = () => {
    const temp = currentWeather.temperature;
    const humidity = currentWeather.humidity;
    
    if (temp > 38) {
      return {
        title: "வெப்ப அலை எச்சரிக்கை (Heat Wave Alert)",
        advice: "Stay indoors during 11 AM - 4 PM. Drink plenty of water and ORS.",
        tamilAdvice: "வீட்டுக்குள் இருங்கள். தண்ணீர் அதிகம் குடியுங்கள்."
      };
    } else if (humidity > 80 && temp > 30) {
      return {
        title: "Humid Conditions",
        advice: "High humidity makes it feel hotter. Use fans and stay in shade.",
        tamilAdvice: "ஈரப்பதம் அதிகம். விசிறி உபயோகியுங்கள்."
      };
    } else if (temp < 20) {
      return {
        title: "Cool Weather",
        advice: "Pleasant weather for outdoor activities. Good for tourism.",
        tamilAdvice: "குளிர்ச்சியான காலநிலை. சுற்றுலாவுக்கு ஏற்றது."
      };
    } else {
      return {
        title: "Pleasant Weather",
        advice: "Comfortable conditions prevail. Ideal for all activities.",
        tamilAdvice: "இனிமையான காலநிலை. எல்லா வேலைகளுக்கும் ஏற்றது."
      };
    }
  };

  const getCropAdvice = () => {
    const month = new Date().getMonth() + 1;
    const season = getSeasonalInsight().season;
    
    if (season === "Northeast Monsoon") {
      return {
        crop: "Paddy (நெல்)",
        advice: "Main season for paddy cultivation. Ensure proper drainage in fields.",
        timing: "Transplanting time in Cauvery delta region"
      };
    } else if (season === "Southwest Monsoon") {
      return {
        crop: "Cotton (பருத்தி)",
        advice: "Good time for cotton sowing in rain-fed areas.",
        timing: "Sowing season in central Tamil Nadu"
      };
    } else if (season === "Summer") {
      return {
        crop: "Sugarcane (கரும்பு)",
        advice: "Harvest sugarcane before peak summer. Maintain irrigation.",
        timing: "Harvesting season"
      };
    } else {
      return {
        crop: "Various Crops",
        advice: "Post-harvest activities. Prepare for next season.",
        timing: "Land preparation time"
      };
    }
  };

  const seasonal = getSeasonalInsight();
  const advice = getTamilNaduSpecificAdvice();
  const cropAdvice = getCropAdvice();

  return (
    <div className="space-y-6">
      {/* Seasonal Insights */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Tamil Nadu Seasonal Insights</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Current Season:</span>
            <span className="text-sm font-semibold text-green-700">{seasonal.season}</span>
          </div>
          
          <p className="text-sm text-gray-600">{seasonal.insight}</p>
          
          <div className="bg-white/60 rounded-lg p-3">
            <p className="text-sm font-medium text-green-800">🌾 Agricultural Recommendation:</p>
            <p className="text-sm text-green-700 mt-1">{seasonal.recommendation}</p>
          </div>
        </div>
      </div>

      {/* Health & Comfort Advisory */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
        <div className="flex items-center space-x-2 mb-4">
          <Thermometer className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Health & Comfort Advisory</h3>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-orange-800">{advice.title}</h4>
          <p className="text-sm text-gray-600">{advice.advice}</p>
          <div className="bg-white/60 rounded-lg p-3">
            <p className="text-sm text-orange-700 font-medium">{advice.tamilAdvice}</p>
          </div>
        </div>
      </div>

      {/* Crop & Agriculture Advisory */}
      <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-xl p-6 border border-yellow-200">
        <div className="flex items-center space-x-2 mb-4">
          <Droplets className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">Agricultural Advisory</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Focus Crop:</span>
            <span className="text-sm font-semibold text-yellow-700">{cropAdvice.crop}</span>
          </div>
          
          <p className="text-sm text-gray-600">{cropAdvice.advice}</p>
          
          <div className="bg-white/60 rounded-lg p-3">
            <p className="text-sm font-medium text-yellow-800">⏰ Timing:</p>
            <p className="text-sm text-yellow-700 mt-1">{cropAdvice.timing}</p>
          </div>
        </div>
      </div>

      {/* Traditional Weather Indicators */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center space-x-2 mb-4">
          <Moon className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Traditional Weather Wisdom</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-lg p-3">
            <h5 className="text-sm font-medium text-purple-800 mb-1">Rainfall Prediction</h5>
            <p className="text-xs text-purple-700">"மழை வந்தால் மண் நானு" - Traditional Tamil saying about soil moisture</p>
          </div>
          
          <div className="bg-white/60 rounded-lg p-3">
            <h5 className="text-sm font-medium text-purple-800 mb-1">Wind Patterns</h5>
            <p className="text-xs text-purple-700">கடல் காற்று patterns indicate evening weather changes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TamilNaduInsights;