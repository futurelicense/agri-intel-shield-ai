
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, Satellite, Map as MapIcon, Crosshair, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { fetchNDVIData, fetchSoilData } from '@/utils/apiService';
import LocationSearch from './LocationSearch';

interface FarmMapProps {
  location: { lat: number; lng: number };
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

const FarmMap: React.FC<FarmMapProps> = ({ location, onLocationChange }) => {
  const [mapLayer, setMapLayer] = useState('satellite');
  const [ndviData, setNdviData] = useState(0.75);
  const [soilData, setSoilData] = useState({
    ph: 6.8,
    temperature: 20.7,
    moisture: 65,
    organicCarbon: 1.2
  });
  const [loading, setLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLocationName, setSelectedLocationName] = useState('');
  
  // Fetch real NDVI and soil data based on location
  useEffect(() => {
    const updateMapData = async () => {
      setLoading(true);
      try {
        const [ndvi, soil] = await Promise.all([
          fetchNDVIData(location.lat, location.lng),
          fetchSoilData(location.lat, location.lng)
        ]);
        
        setNdviData(ndvi);
        setSoilData({
          ph: soil.ph || 6.8,
          temperature: soil.temperature || 20.7,
          moisture: soil.moisture || 65,
          organicCarbon: soil.organicCarbon || 1.2
        });
        
        console.log('Map data updated - NDVI:', ndvi, 'Soil:', soil);
      } catch (error) {
        console.error('Failed to fetch map data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    updateMapData();
  }, [location]);

  const getNdviColor = (value: number) => {
    if (value > 0.7) return 'bg-green-500';
    if (value > 0.5) return 'bg-yellow-500';
    if (value > 0.3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getNdviStatus = (value: number) => {
    if (value > 0.7) return 'Healthy';
    if (value > 0.5) return 'Moderate';
    if (value > 0.3) return 'Stressed';
    return 'Critical';
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    const sensitivity = 0.02 / zoomLevel;
    const latOffset = (y - 0.5) * sensitivity;
    const lngOffset = (x - 0.5) * sensitivity;
    
    const newLat = Math.max(-90, Math.min(90, location.lat + latOffset));
    const newLng = Math.max(-180, Math.min(180, location.lng + lngOffset));
    
    console.log(`Map clicked: Moving from ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)} to ${newLat.toFixed(4)}, ${newLng.toFixed(4)}`);
    
    onLocationChange({ lat: newLat, lng: newLng });
    setSelectedLocationName(''); // Clear location name when clicking on map
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 8));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    onLocationChange({ lat: 40.7128, lng: -74.0060 });
    setSelectedLocationName('');
  };

  const handleLocationSearch = (searchResult: { lat: number; lng: number; name: string }) => {
    onLocationChange({ lat: searchResult.lat, lng: searchResult.lng });
    setSelectedLocationName(searchResult.name.split(',')[0]); // Use first part of the name
    console.log('Location searched and selected:', searchResult);
  };

  return (
    <div className="space-y-6">
      {/* Location Search */}
      <div className="flex flex-col gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Location Search</h3>
            <p className="text-xs text-gray-600">Search for a location or click on the map</p>
          </div>
        </div>
        <LocationSearch onLocationSelect={handleLocationSearch} />
        {selectedLocationName && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white text-green-700 border-green-200">
              📍 {selectedLocationName}
            </Badge>
          </div>
        )}
      </div>

      {/* Enhanced Map Controls */}
      <div className="flex flex-wrap gap-3 justify-between items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
        <div className="flex gap-2">
          <Button
            variant={mapLayer === 'satellite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapLayer('satellite')}
            className="text-xs shadow-sm hover:shadow-md transition-all"
          >
            <Satellite className="h-3 w-3 mr-1" />
            Satellite
          </Button>
          <Button
            variant={mapLayer === 'ndvi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapLayer('ndvi')}
            className="text-xs shadow-sm hover:shadow-md transition-all"
          >
            <Layers className="h-3 w-3 mr-1" />
            NDVI
            {loading && <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin ml-1" />}
          </Button>
          <Button
            variant={mapLayer === 'terrain' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapLayer('terrain')}
            className="text-xs shadow-sm hover:shadow-md transition-all"
          >
            <MapIcon className="h-3 w-3 mr-1" />
            Terrain
          </Button>
        </div>
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="text-xs shadow-sm hover:shadow-md transition-all"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Badge variant="outline" className="text-xs font-mono bg-white">
            {zoomLevel.toFixed(1)}x
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="text-xs shadow-sm hover:shadow-md transition-all"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetView}
            className="text-xs shadow-sm hover:shadow-md transition-all"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-white shadow-sm">
            <Crosshair className="h-3 w-3 mr-1" />
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </Badge>
          {loading && <Badge variant="outline" className="text-xs animate-pulse bg-blue-50 border-blue-200">Loading...</Badge>}
        </div>
      </div>

      {/* Enhanced Interactive Map Display */}
      <div 
        className="relative w-full h-96 bg-gradient-to-br from-green-100 to-brown-100 rounded-xl overflow-hidden cursor-crosshair border-4 border-gray-200 hover:border-green-400 transition-all duration-300 shadow-xl hover:shadow-2xl"
        onClick={handleMapClick}
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className={`absolute inset-0 transition-all duration-500 ${
          mapLayer === 'satellite' ? 'bg-gradient-to-br from-green-200 via-brown-200 to-green-300' :
          mapLayer === 'ndvi' ? `bg-gradient-to-br from-red-200 via-yellow-200 to-green-200` :
          'bg-gradient-to-br from-gray-200 via-brown-200 to-green-200'
        }`}>
          
          <div className="absolute top-8 left-8 w-32 h-24 border-3 border-blue-500 bg-green-200/60 rounded-xl hover:bg-green-300/80 transition-all cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-sm">
            <div className="p-3">
              <div className="text-xs font-bold text-blue-900">Field A</div>
              <div className="text-xs text-blue-700 mt-1">12.5 hectares</div>
              <div className="text-xs text-blue-700">NDVI: {ndviData.toFixed(2)}</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${getNdviColor(ndviData)} text-white shadow-sm`}>
                {getNdviStatus(ndviData)}
              </div>
            </div>
          </div>
          
          <div className="absolute top-12 right-12 w-28 h-20 border-3 border-purple-500 bg-yellow-200/60 rounded-xl hover:bg-yellow-300/80 transition-all cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-sm">
            <div className="p-2">
              <div className="text-xs font-bold text-purple-900">Field B</div>
              <div className="text-xs text-purple-700 mt-1">8.2 hectares</div>
              <div className="text-xs text-purple-700">NDVI: {(ndviData * 0.9).toFixed(2)}</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${getNdviColor(ndviData * 0.9)} text-white shadow-sm`}>
                {getNdviStatus(ndviData * 0.9)}
              </div>
            </div>
          </div>

          {mapLayer === 'ndvi' && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-300/60 via-yellow-300/60 to-green-300/60 transition-opacity duration-300">
              <div className="absolute top-4 right-4 bg-white/95 p-3 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200">
                <div className="text-xs font-bold mb-2 text-gray-800">NDVI Legend</div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-3 h-3 bg-red-400 rounded shadow-sm"></div>
                  <span className="font-mono">0.0</span>
                  <div className="w-3 h-3 bg-yellow-400 rounded mx-1 shadow-sm"></div>
                  <span className="font-mono">0.5</span>
                  <div className="w-3 h-3 bg-green-400 rounded ml-1 shadow-sm"></div>
                  <span className="font-mono">1.0</span>
                </div>
              </div>
            </div>
          )}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-5 h-5 bg-red-500 rounded-full border-3 border-white shadow-xl animate-pulse ring-4 ring-red-500/30"></div>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg backdrop-blur-sm">
                <div className="font-semibold">Selected Location</div>
                <div className="text-xs opacity-90">{location.lat.toFixed(2)}, {location.lng.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/95 px-4 py-3 rounded-xl text-xs text-gray-700 shadow-lg backdrop-blur-sm border border-gray-200 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🖱️</span>
            <span className="font-semibold">Interactive Farm Map</span>
          </div>
          <div className="text-xs opacity-80">
            Search location above or click anywhere to select • Use zoom controls • Real-time data updates
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-white/80 to-green-50/80 hover:from-white/90 hover:to-green-50/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-green-100">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{ndviData.toFixed(2)}</div>
              <div className="text-xs text-gray-600 mb-2">NDVI Index</div>
              <Badge className={`${getNdviColor(ndviData)} text-white text-xs shadow-sm`}>
                {getNdviStatus(ndviData)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/80 to-orange-50/80 hover:from-white/90 hover:to-orange-50/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-orange-100">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{soilData.temperature.toFixed(1)}°C</div>
              <div className="text-xs text-gray-600 mb-2">Soil Temperature</div>
              <Badge variant="outline" className="text-xs shadow-sm bg-white/70">
                {soilData.temperature > 25 ? 'Warm' : soilData.temperature > 15 ? 'Normal' : 'Cool'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/80 to-blue-50/80 hover:from-white/90 hover:to-blue-50/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-100">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{soilData.moisture.toFixed(0)}%</div>
              <div className="text-xs text-gray-600 mb-2">Soil Moisture</div>
              <Badge variant="outline" className="text-xs shadow-sm bg-white/70">
                {soilData.moisture > 70 ? 'High' : soilData.moisture > 40 ? 'Optimal' : 'Low'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/80 to-purple-50/80 hover:from-white/90 hover:to-purple-50/90 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-purple-100">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{soilData.ph.toFixed(1)}</div>
              <div className="text-xs text-gray-600 mb-2">Soil pH Level</div>
              <Badge variant="outline" className="text-xs shadow-sm bg-white/70">
                {soilData.ph >= 6.0 && soilData.ph <= 7.5 ? 'Good' : soilData.ph < 6.0 ? 'Acidic' : 'Alkaline'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmMap;
