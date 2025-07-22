import React from 'react';
import MapView from '@/components/MapView';

const Map = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farm Map</h1>
          <p className="text-gray-600">Interactive geographic visualization of your farm operations</p>
        </div>
        
        <MapView className="w-full" />
      </div>
    </div>
  );
};

export default Map;