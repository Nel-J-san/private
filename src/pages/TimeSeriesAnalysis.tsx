import React, { useState } from 'react';
import { Clock, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import { dailyTransportData, hourlyUsageData } from '../data/simulatedData';

const TimeSeriesAnalysis: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('month');
  
  // Filter data based on selected transport mode
  const filteredData = dailyTransportData.map(day => {
    if (selectedMode === 'all') {
      return {
        ...day,
        total: day.train + day.bus + day.ferry + day.lightRail
      };
    }
    return day;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Time Series Analysis</h1>
        <p className="text-gray-600 mt-1">
          Analyzing temporal patterns in Sydney's public transport usage
        </p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transport Mode
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedMode('all')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  selectedMode === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Modes
              </button>
              <button
                onClick={() => setSelectedMode('train')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  selectedMode === 'train'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Train
              </button>
              <button
                onClick={() => setSelectedMode('bus')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  selectedMode === 'bus'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bus
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  timeRange === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  timeRange === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('quarter')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  timeRange === 'quarter'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Quarter
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main charts */}
      <div className="grid grid-cols-1 gap-6">
        <Card 
          title="Daily Ridership Trends" 
          icon={<Filter size={18} />}
          className="col-span-1"
        >
          <TimeSeriesChart
            data={filteredData}
            lines={
              selectedMode === 'all'
                ? [{ dataKey: 'total', color: '#1a73e8', name: 'All Transport' }]
                : [
                    { dataKey: 'train', color: '#1a73e8', name: 'Train' },
                    { dataKey: 'bus', color: '#34a853', name: 'Bus' },
                    { dataKey: 'ferry', color: '#4285f4', name: 'Ferry' },
                    { dataKey: 'lightRail', color: '#fbbc04', name: 'Light Rail' },
                  ]
            }
            xAxisDataKey="date"
            yAxisLabel="Passengers"
          />
          <div className="mt-4">
            <h4 className="font-medium text-gray-900">Key Insights</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Pronounced weekly pattern with weekday peaks and weekend dips</li>
              <li>• Train usage shows the strongest weekday/weekend contrast</li>
              <li>• Ferry ridership is more consistent throughout the week</li>
            </ul>
          </div>
        </Card>
        
        <Card 
          title="24-Hour Usage Pattern" 
          icon={<Clock size={18} />}
          className="col-span-1"
        >
          <TimeSeriesChart
            data={hourlyUsageData}
            lines={[
              { dataKey: 'passengers', color: '#ea4335', name: 'Passengers' },
            ]}
            xAxisDataKey="hour"
            yAxisLabel="Passengers"
            xAxisLabel="Hour of Day"
          />
          <div className="mt-4">
            <h4 className="font-medium text-gray-900">24-Hour Pattern Analysis</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Morning peak: 7:00-9:00 AM with maximum at 8:00 AM</li>
              <li>• Evening peak: 4:00-6:00 PM with maximum at 5:00 PM</li>
              <li>• Lowest ridership between 1:00-4:00 AM</li>
              <li>• Steady midday ridership between peaks</li>
            </ul>
          </div>
        </Card>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
          <h3 className="font-medium">About This Analysis</h3>
          <p className="mt-1">
            In a real BigQuery implementation, this page would utilize time-partitioned tables for 
            efficient analysis of temporal patterns. Time-series analysis would leverage window 
            functions for moving averages, seasonality detection, and anomaly identification.
            SQL queries would be optimized to handle large datasets with efficient date-based 
            filtering and aggregations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesAnalysis;