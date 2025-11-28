import React from 'react';

interface DynamicPageProps {
  title: string;
  description: string;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ title, description }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        <div className="mt-6 p-4 bg-blue-50 rounded-md border-l-4 border-blue-500">
          <p className="text-sm text-blue-700">
            <strong>Active Route Context:</strong> This page represents the 
            <span className="font-mono mx-1 bg-blue-100 px-1 rounded">{title}</span> 
            strategy/view.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;
