import React, { useState } from 'react';
import { CloudRain, Thermometer, Wind, Calendar, BarChart2 } from 'lucide-react';
import Card from '../components/ui/Card';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import BarChart from '../components/charts/BarChart';
import { weatherImpactData } from '../data/simulatedData';

const WeatherAnalysis: React.FC = () => {
  const [weatherType, setWeatherType] = useState<string>('all');
  
  // Identify rainy days
  const rainyDays = weatherImpactData.filter(day => day.rainMM > 0);
  
  // Group data by temperature ranges
  const temperatureRanges = [
    { range: '18-20°C', min: 18, max: 20 },
    { range: '21-23°C', min: 21, max: 23 },
    { range: '24-26°C', min: 24, max: 26 },
    { range: '27-29°C', min: 27, max: 29 },
  ];
  
  const tempData = temperatureRanges.map(range => {
    const daysInRange = weatherImpactData.filter(
      day => day.temperature >= range.min && day.temperature <= range.max
    );
    
    return {
      range: range.range,
      avgRidership: Math.round(
        daysInRange.reduce((sum, day) => sum + day.totalRidership, 0) / 
        (daysInRange.length || 1)
      )
    };
  });
  
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdayData = weekdayNames.map(day => {
    const daysWithName = weatherImpactData.filter(d => d.day === day);
    const rainyDaysWithName = daysWithName.filter(d => d.rainMM > 0);
    const dryDaysWithName = daysWithName.filter(d => d.rainMM === 0);
    
    return {
      day,
      rainyRidership: rainyDaysWithName.length ? 
        Math.round(rainyDaysWithName.reduce((sum, d) => sum + d.totalRidership, 0) / rainyDaysWithName.length) : 0,
      dryRidership: dryDaysWithName.length ?
        Math.round(dryDaysWithName.reduce((sum, d) => sum + d.totalRidership, 0) / dryDaysWithName.length) : 0,
    };
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Weather Impact Analysis</h1>
        <p className="text-gray-600 mt-1">
          Analyzing how weather conditions affect Sydney's public transport usage
        </p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weather Condition
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setWeatherType('all')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  weatherType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Conditions
              </button>
              <button
                onClick={() => setWeatherType('rain')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  weatherType === 'rain'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rainy Days
              </button>
              <button
                onClick={() => setWeatherType('dry')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  weatherType === 'dry'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dry Days
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather impact summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600 mr-4">
            <CloudRain size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Ridership on Rainy Days</p>
            <p className="text-xl font-semibold text-gray-900">
              {Math.round(
                rainyDays.reduce((sum, day) => sum + day.totalRidership, 0) / 
                (rainyDays.length || 1)
              ).toLocaleString()}
            </p>
            <p className="text-sm text-red-600">-15.2% vs. dry days</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600 mr-4">
            <Thermometer size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Optimal Temperature Range</p>
            <p className="text-xl font-semibold text-gray-900">21-23°C</p>
            <p className="text-sm text-green-600">+4.8% higher ridership</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center">
          <div className="p-3 bg-green-50 rounded-lg text-green-600 mr-4">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Most Weather-Resilient Day</p>
            <p className="text-xl font-semibold text-gray-900">Tuesday</p>
            <p className="text-sm text-gray-600">Only -8.3% impact on rainy days</p>
          </div>
        </div>
      </div>
      
      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          title="Weather Conditions & Ridership" 
          icon={<CloudRain size={18} />}
        >
          <TimeSeriesChart
            data={weatherImpactData}
            lines={[
              { dataKey: 'totalRidership', color: '#1a73e8', name: 'Total Ridership' },
              { dataKey: 'rainMM', color: '#34a853', name: 'Rainfall (mm)' },
            ]}
            xAxisDataKey="date"
            yAxisLabel="Passengers"
          />
          <div className="mt-4">
            <h4 className="font-medium text-gray-900">Weather Impact Insights</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Significant ridership drops on days with heavy rainfall</li>
              <li>• Light rain has minimal impact on weekday commuting</li>
              <li>• Weekend ridership is more affected by rainy conditions</li>
            </ul>
          </div>
        </Card>
        
        <Card 
          title="Temperature Impact on Ridership" 
          icon={<Thermometer size={18} />}
        >
          <BarChart
            data={tempData}
            bars={[
              { dataKey: 'avgRidership', color: '#ea4335', name: 'Average Daily Ridership' },
            ]}
            xAxisDataKey="range"
            yAxisLabel="Avg. Passengers"
          />
          <div className="mt-4">
            <h4 className="font-medium text-gray-900">Temperature Insights</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Optimal ridership occurs in the 21-23°C range</li>
              <li>• Higher temperatures (27°C+) show decreased ridership</li>
              <li>• Cooler weather has minimal impact on commuter patterns</li>
            </ul>
          </div>
        </Card>
      </div>
      
      {/* Day of week comparison */}
      <Card 
        title="Rainy vs. Dry Day Comparison by Weekday" 
        icon={<BarChart2 size={18} />}
      >
        <BarChart
          data={weekdayData}
          bars={[
            { dataKey: 'rainyRidership', color: '#4285f4', name: 'Rainy Day Ridership' },
            { dataKey: 'dryRidership', color: '#fbbc04', name: 'Dry Day Ridership' },
          ]}
          xAxisDataKey="day"
          yAxisLabel="Avg. Passengers"
        />
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">Weekly Pattern Insights</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• Tuesday shows the smallest weather-related ridership decrease</li>
            <li>• Weekend ridership (especially Sunday) shows the largest weather sensitivity</li>
            <li>• Friday afternoon ridership drops significantly during rainy conditions</li>
          </ul>
        </div>
      </Card>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
        <h3 className="font-medium">About This Analysis</h3>
        <p className="mt-1">
          In a real implementation with Google Cloud, this analysis would join transport data with 
          weather data in BigQuery. We could use JOIN operations on timestamp fields and apply machine 
          learning models to predict ridership based on weather forecasts. This integration would enable 
          transport planners to adjust service levels based on expected weather conditions.
        </p>
      </div>
    </div>
  );
};

export default WeatherAnalysis;