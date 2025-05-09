import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TimeSeriesAnalysis from './pages/TimeSeriesAnalysis';
import GeospatialAnalysis from './pages/GeospatialAnalysis';
import RouteAnalysis from './pages/RouteAnalysis';
import WeatherAnalysis from './pages/WeatherAnalysis';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'time-series', element: <TimeSeriesAnalysis /> },
      { path: 'geospatial', element: <GeospatialAnalysis /> },
      { path: 'routes', element: <RouteAnalysis /> },
      { path: 'weather', element: <WeatherAnalysis /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;