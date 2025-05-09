import React from 'react';
import { Map, MapPin, Navigation, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import { dailyTransportData, popularRoutesData } from '../data/simulatedData';

const GeospatialAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Geospatial Analysis</h1>
        <p className="text-gray-600 mt-1">
          Exploring spatial patterns in Sydney's public transport network
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
                className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md"
              >
                All Modes
              </button>
              <button
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 text-sm rounded-md transition-colors"
              >
                Train
              </button>
              <button
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 text-sm rounded-md transition-colors"
              >
                Bus
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <div className="flex space-x-2">
              <button
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 text-sm rounded-md transition-colors"
              >
                Morning Peak
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md"
              >
                All Day
              </button>
              <button
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 text-sm rounded-md transition-colors"
              >
                Evening Peak
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder - In a real implementation, this would be a Google Maps or Mapbox component */}
      <Card 
        title="Transport Activity Heatmap" 
        icon={<Map size={18} />}
        className="col-span-1"
      >
        <div className="bg-gray-100 rounded-lg relative overflow-hidden" style={{ height: '400px' }}>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <Map size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500 text-center max-w-md px-4">
              This would display a heat map of Sydney transport activity using Google Maps API
              or BigQuery GIS. In production, this would connect to real geospatial data from Google Cloud.
            </p>
          </div>
          
          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-md shadow-sm border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Activity Density</h4>
            <div className="flex items-center space-x-2">
              <div className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full" />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">Key Insights</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• Sydney CBD shows highest concentration during weekdays</li>
            <li>• Northern beaches corridor exhibits strong weekend patterns</li>
            <li>• Western Sydney line shows consistent usage throughout the week</li>
            <li>• Major interchange stations are activity hotspots</li>
          </ul>
        </div>
      </Card>
      
      {/* Station Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          title="Top Origin Stations" 
          icon={<MapPin size={18} />}
          className="col-span-1"
        >
          <div className="space-y-3">
            {[
              { station: "Central", count: 32560, change: "+4.2%" },
              { station: "Town Hall", count: 28950, change: "+2.1%" },
              { station: "Parramatta", count: 24780, change: "+5.7%" },
              { station: "Wynyard", count: 23410, change: "-1.2%" },
              { station: "North Sydney", count: 18920, change: "+3.5%" }
            ].map((station, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">{index + 1}</div>
                  <span className="font-medium text-gray-900">{station.station}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">{station.count.toLocaleString()}</span>
                  <span className={`text-sm ${station.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {station.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card 
          title="Top Destination Stations" 
          icon={<Navigation size={18} />}
          className="col-span-1"
        >
          <div className="space-y-3">
            {[
              { station: "Town Hall", count: 35780, change: "+3.8%" },
              { station: "Central", count: 29860, change: "+1.9%" },
              { station: "Martin Place", count: 25650, change: "+7.2%" },
              { station: "Circular Quay", count: 21470, change: "+5.3%" },
              { station: "Wynyard", count: 19240, change: "+2.1%" }
            ].map((station, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">{index + 1}</div>
                  <span className="font-medium text-gray-900">{station.station}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">{station.count.toLocaleString()}</span>
                  <span className={`text-sm ${station.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {station.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
        <h3 className="font-medium">About This Analysis</h3>
        <p className="mt-1">
          In a real implementation with Google Cloud, this page would utilize BigQuery GIS functions to analyze 
          geospatial patterns in transport data. The analysis would include ST_DISTANCE, ST_DWITHIN, and 
          ST_GEOGPOINT functions to identify clusters, calculate distances between stations, and visualize 
          patterns using the Google Maps API or BigQuery GeoViz.
        </p>
      </div>
    </div>
  );
};

export default GeospatialAnalysis;