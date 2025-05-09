import React from 'react';
import { 
  TrainFront, 
  Bus, 
  Ship, 
  Timer, 
  LineChart, 
  BarChart2, 
  CreditCard, 
  Users 
} from 'lucide-react';
import Card from '../components/ui/Card';
import MetricCard from '../components/ui/MetricCard';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import BarChart from '../components/charts/BarChart';
import { 
  dailyTransportData, 
  kpiMetrics,
  popularRoutesData,
  hourlyUsageData,
} from '../data/simulatedData';

const metricIcons = [
  <Users size={24} />,
  <Timer size={24} />,
  <LineChart size={24} />,
  <CreditCard size={24} />,
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Sydney Public Transport Analytics - Autumn 2025
        </p>
      </div>
      
      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metricIcons[index]}
          />
        ))}
      </div>
      
      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Daily Transport Usage" icon={<BarChart2 size={18} />}>
          <TimeSeriesChart
            data={dailyTransportData}
            lines={[
              { dataKey: 'train', color: '#1a73e8', name: 'Train' },
              { dataKey: 'bus', color: '#34a853', name: 'Bus' },
              { dataKey: 'ferry', color: '#4285f4', name: 'Ferry' },
              { dataKey: 'lightRail', color: '#fbbc04', name: 'Light Rail' },
            ]}
            xAxisDataKey="date"
            yAxisLabel="Passengers"
          />
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <TrainFront size={16} className="text-blue-600" />
              <span>Train ridership shows the highest peaks on weekdays</span>
            </div>
            <div className="text-right">March 2025</div>
          </div>
        </Card>
        
        <Card title="Hourly Passenger Flow" icon={<LineChart size={18} />}>
          <TimeSeriesChart
            data={hourlyUsageData}
            lines={[
              { dataKey: 'passengers', color: '#ea4335', name: 'Passengers' },
            ]}
            xAxisDataKey="hour"
            yAxisLabel="Passengers"
          />
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <div>Clear morning and evening peak patterns</div>
            <div className="text-right">24-hour cycle</div>
          </div>
        </Card>
        
        <Card title="Top 5 Routes by Passengers" icon={<Bus size={18} />}>
          <BarChart
            data={popularRoutesData.slice(0, 5)}
            bars={[
              { dataKey: 'passengers', color: '#34a853', name: 'Daily Passengers' },
            ]}
            xAxisDataKey="route"
          />
          <div className="mt-4 text-sm text-gray-500">
            Central to Parramatta remains the busiest route
          </div>
        </Card>
        
        <Card title="Transport Mode Comparison" icon={<Ship size={18} />}>
          <BarChart
            data={[
              { name: 'Train', value: 48, color: '#1a73e8' },
              { name: 'Bus', value: 32, color: '#34a853' },
              { name: 'Light Rail', value: 12, color: '#fbbc04' },
              { name: 'Ferry', value: 8, color: '#ea4335' },
            ]}
            bars={[
              { dataKey: 'value', color: '#1a73e8', name: 'Percentage' },
            ]}
            xAxisDataKey="name"
            yAxisLabel="% of Total Trips"
          />
          <div className="mt-4 text-sm text-gray-500">
            Train remains the dominant transport mode at 48% of all trips
          </div>
        </Card>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
        <h3 className="font-medium">About This Dashboard</h3>
        <p className="mt-1 text-sm">
          This dashboard presents simulated data for Sydney's public transport usage during
          Autumn 2025. In a real-world implementation, this would connect to Google Cloud
          BigQuery and be refreshed daily with actual transport data.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;