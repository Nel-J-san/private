import React, { useState } from 'react';
import { Route, ArrowRightCircle, Users, Filter, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import BarChart from '../components/charts/BarChart';
import { popularRoutesData } from '../data/simulatedData';

const RouteAnalysis: React.FC = () => {
  const [transportMode, setTransportMode] = useState<string>('all');
  
  // Filter routes based on selected transport mode
  const filteredRoutes = transportMode === 'all' 
    ? popularRoutesData 
    : popularRoutesData.filter(route => 
        route.transportMode.toLowerCase() === transportMode.toLowerCase()
      );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Route Analysis</h1>
        <p className="text-gray-600 mt-1">
          Examining popular routes and passenger flows across Sydney's transport network
        </p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transport Mode
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTransportMode('all')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  transportMode === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Modes
              </button>
              <button
                onClick={() => setTransportMode('train')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  transportMode === 'train'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Train
              </button>
              <button
                onClick={() => setTransportMode('bus')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  transportMode === 'bus'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bus
              </button>
              <button
                onClick={() => setTransportMode('ferry')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  transportMode === 'ferry'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ferry
              </button>
              <button
                onClick={() => setTransportMode('light rail')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  transportMode === 'light rail'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Light Rail
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main chart */}
      <Card 
        title="Popular Routes by Passenger Volume" 
        icon={<Route size={18} />}
      >
        <BarChart
          data={filteredRoutes.slice(0, 8)}
          bars={[
            { dataKey: 'passengers', color: '#1a73e8', name: 'Daily Passengers' },
          ]}
          xAxisDataKey="route"
          yAxisLabel="Passengers"
        />
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">Route Insights</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• Central to Parramatta remains the busiest train route</li>
            <li>• The Circular Quay to Manly ferry route shows consistent high demand</li>
            <li>• Bus routes to universities show peak usage during semester periods</li>
          </ul>
        </div>
      </Card>
      
      {/* Route details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          title="Route Details" 
          icon={<ArrowRightCircle size={18} />}
        >
          <div className="space-y-4">
            {filteredRoutes.slice(0, 5).map((route, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                  <div className="font-medium text-gray-900">{route.route}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      route.transportMode === 'Train' ? 'bg-blue-100 text-blue-800' :
                      route.transportMode === 'Bus' ? 'bg-green-100 text-green-800' :
                      route.transportMode === 'Ferry' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {route.transportMode}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-gray-700">{route.passengers.toLocaleString()} daily passengers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-gray-700">{Math.round(Math.random() * 10) + 20} min avg journey</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-sm text-gray-600 mb-1">Occupancy by time of day</div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Morning</span>
                      <span>Midday</span>
                      <span>Evening</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card 
          title="Transport Mode Comparison" 
          icon={<Filter size={18} />}
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Average Trip Duration</h4>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { mode: 'Train', duration: '32 min', icon: '🚆' },
                  { mode: 'Bus', duration: '28 min', icon: '🚌' },
                  { mode: 'Ferry', duration: '24 min', icon: '⛴️' },
                  { mode: 'Light Rail', duration: '18 min', icon: '🚈' },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{item.duration}</div>
                    <div className="text-xs text-gray-500">{item.mode}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Passenger Satisfaction</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { mode: 'Train', satisfaction: '86%', change: '+2.3%' },
                  { mode: 'Bus', satisfaction: '79%', change: '+1.2%' },
                  { mode: 'Ferry', satisfaction: '92%', change: '+0.8%' },
                  { mode: 'Light Rail', satisfaction: '84%', change: '+3.5%' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item.mode}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{item.satisfaction}</span>
                      <span className="text-xs text-green-600">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Capacity Utilization</h4>
              <div className="space-y-3">
                {[
                  { mode: 'Train', utilization: 68 },
                  { mode: 'Bus', utilization: 74 },
                  { mode: 'Ferry', utilization: 62 },
                  { mode: 'Light Rail', utilization: 81 },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.mode}</span>
                      <span className="font-medium text-gray-900">{item.utilization}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          item.utilization > 75 ? 'bg-red-500' : 
                          item.utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} 
                        style={{ width: `${item.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
        <h3 className="font-medium">About This Analysis</h3>
        <p className="mt-1">
          In a real implementation with Google Cloud, this page would analyze route-level data 
          stored in BigQuery. Analysis would include aggregations and window functions to identify 
          popular routes, peak times, and changing trends. Machine learning models could be applied 
          to predict future demand patterns and optimize service frequencies.
        </p>
      </div>
    </div>
  );
};

export default RouteAnalysis;