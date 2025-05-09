import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  Map, 
  Route, 
  CloudRain,
  Settings
} from 'lucide-react';

const navItems = [
  { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
  { to: '/time-series', icon: <LineChart size={20} />, label: 'Time Series' },
  { to: '/geospatial', icon: <Map size={20} />, label: 'Geospatial' },
  { to: '/routes', icon: <Route size={20} />, label: 'Routes' },
  { to: '/weather', icon: <CloudRain size={20} />, label: 'Weather Impact' },
];

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside 
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0 md:translate-x-0 md:w-64'
      } fixed md:static inset-y-0 left-0 z-20 overflow-y-auto`}
    >
      <div className="px-4 py-6">
        <div className="space-y-4">
          <div className="mb-8">
            <h2 className="text-xs uppercase font-semibold text-gray-500 px-3">
              Main Navigation
            </h2>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <NavLink
            to="/settings"
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="mr-3"><Settings size={20} /></span>
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;