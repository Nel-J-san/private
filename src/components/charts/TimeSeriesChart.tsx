import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface TimeSeriesProps {
  data: Array<any>;
  lines: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  xAxisDataKey: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
}

const TimeSeriesChart: React.FC<TimeSeriesProps> = ({
  data,
  lines,
  xAxisDataKey,
  yAxisLabel,
  xAxisLabel,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey={xAxisDataKey}
          label={
            xAxisLabel
              ? { value: xAxisLabel, position: 'insideBottomRight', offset: -10 }
              : undefined
          }
          tick={{ fontSize: 12 }}
        />
        <YAxis
          label={
            yAxisLabel
              ? {
                  value: yAxisLabel,
                  angle: -90,
                  position: 'insideLeft',
                }
              : undefined
          }
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          }}
        />
        <Legend />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            activeDot={{ r: 6 }}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;