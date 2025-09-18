import React from 'react';
import { Waves, Sprout, Ship, Mountain, Sun, CloudRain } from 'lucide-react';

const TamilNaduFeatures = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Tamil Nadu Weather Specialties</h4>
        <p className="text-sm text-gray-600">Weather insights tailored for Tamil Nadu's unique climate and geography</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bay of Bengal Cyclone Tracking */}
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <Waves className="w-6 h-6 text-blue-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Bay of Bengal Monitor</h5>
          <p className="text-sm text-gray-600">Real-time cyclone tracking and coastal weather alerts for Tamil Nadu's 1000km coastline.</p>
        </div>

        {/* Agricultural Weather */}
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <Sprout className="w-6 h-6 text-green-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Farmer's Weather Guide</h5>
          <p className="text-sm text-gray-600">Specialized forecasts for paddy, sugarcane, cotton and other major Tamil Nadu crops.</p>
        </div>

        {/* Fishing Weather */}
        <div className="text-center">
          <div className="w-12 h-12 bg-cyan-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <Ship className="w-6 h-6 text-cyan-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Fishing Conditions</h5>
          <p className="text-sm text-gray-600">Wave height, wind speed and sea conditions for Tamil Nadu's fishing communities.</p>
        </div>

        {/* Monsoon Patterns */}
        <div className="text-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <CloudRain className="w-6 h-6 text-indigo-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Dual Monsoon Tracking</h5>
          <p className="text-sm text-gray-600">Southwest (June-Sep) and Northeast (Oct-Dec) monsoon predictions for Tamil Nadu.</p>
        </div>

        {/* Hill Station Weather */}
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <Mountain className="w-6 h-6 text-purple-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Hill Station Alerts</h5>
          <p className="text-sm text-gray-600">Special weather updates for Ooty, Kodaikanal, Yercaud and other hill stations.</p>
        </div>

        {/* Heat Wave Monitoring */}
        <div className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <Sun className="w-6 h-6 text-orange-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Heat Index Tracker</h5>
          <p className="text-sm text-gray-600">Advanced heat index calculations for Tamil Nadu's tropical climate conditions.</p>
        </div>
      </div>

      {/* Regional Weather Centers */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <h5 className="font-medium text-gray-900 mb-3">Powered by Regional Meteorological Centre, Chennai</h5>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
            <div>📡 121 Weather Stations</div>
            <div>🌊 Coastal Monitoring</div>
            <div>🌾 Agricultural Advisories</div>
            <div>⚠️ 24/7 Warning System</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TamilNaduFeatures;