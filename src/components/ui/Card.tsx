import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-blue-600">{icon}</span>}
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;