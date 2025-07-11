
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, Satellite, Map as MapIcon, Crosshair } from 'lucide-react';
import { fetchNDVIData, fetchSoilData } from '@/utils/apiService';

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
    
    // Convert click position to lat/lng offset
    const latOffset = (y - 0.5) * 0.02; // Increased sensitivity
    const lngOffset = (x - 0.5) * 0.02;
    
    const newLat = Math.max(-90, Math.min(90, location.lat + latOffset));
    const newLng = Math.max(-180, Math.min(180, location.lng + lngOffset));
    
    console.log(`Map clicked: Moving from ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)} to ${newLat.toFixed(4)}, ${newLng.toFixed(4)}`);
    
    onLocationChange({ lat: newLat, lng: newLng });
  };

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={mapLayer === 'satellite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapLayer('satellite')}
            className="text-xs"
          >
            <Satellite className="h-3 w-3 mr-1" />
            Satellite
          </Button>
          <Button
            variant={mapLayer === 'ndvi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapLayer('ndvi')}
            className="text-xs"
          >
            <Layers className="h-3 w-3 mr-1" />
            NDVI
            {loading && <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin ml-1" />}
          </Button>
          <Button
            variant={mapLayer === 'terrain' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapLayer('terrain')}
            className="text-xs"
          >
            <MapIcon className="h-3 w-3 mr-1" />
            Terrain
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Crosshair className="h-3 w-3 mr-1" />
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </Badge>
          {loading && <Badge variant="outline" className="text-xs animate-pulse">Loading...</Badge>}
        </div>
      </div>

      {/* Interactive Map Display */}
      <div 
        className="relative w-full h-80 bg-gradient-to-br from-green-100 to-brown-100 rounded-lg overflow-hidden cursor-crosshair border-2 border-gray-200 hover:border-green-400 transition-colors"
        onClick={handleMapClick}
      >
        <div className={`absolute inset-0 transition-all duration-500 ${
          mapLayer === 'satellite' ? 'bg-gradient-to-br from-green-200 via-brown-200 to-green-300' :
          mapLayer === 'ndvi' ? `bg-gradient-to-br from-red-200 via-yellow-200 to-green-200` :
          'bg-gradient-to-br from-gray-200 via-brown-200 to-green-200'
        }`}>
          
          {/* Farm Field Overlays */}
          <div className="absolute top-8 left-8 w-32 h-24 border-2 border-blue-400 bg-green-200/50 rounded-lg hover:bg-green-300/70 transition-colors cursor-pointer">
            <div className="p-2">
              <div className="text-xs font-semibold text-blue-800">Field A</div>
              <div className="text-xs text-blue-600">12.5 hectares</div>
              <div className="text-xs text-blue-600">NDVI: {ndviData.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="absolute top-12 right-12 w-28 h-20 border-2 border-purple-400 bg-yellow-200/50 rounded-lg hover:bg-yellow-300/70 transition-colors cursor-pointer">
            <div className="p-2">
              <div className="text-xs font-semibold text-purple-800">Field B</div>
              <div className="text-xs text-purple-600">8.2 hectares</div>
              <div className="text-xs text-purple-600">NDVI: {(ndviData * 0.9).toFixed(2)}</div>
            </div>
          </div>

          {/* NDVI Layer Overlay */}
          {mapLayer === 'ndvi' && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-300/60 via-yellow-300/60 to-green-300/60 transition-opacity duration-300">
              <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-sm">
                <div className="text-xs font-semibold mb-1">NDVI Legend</div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span>0.0</span>
                  <div className="w-3 h-3 bg-yellow-400 rounded mx-1"></div>
                  <span>0.5</span>
                  <div className="w-3 h-3 bg-green-400 rounded ml-1"></div>
                  <span>1.0</span>
                </div>
              </div>
            </div>
          )}

          {/* Location Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Selected Location
            </div>
          </div>
        </div>

        {/* Interactive Instruction */}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg text-xs text-gray-600 shadow-sm">
          🖱️ Click anywhere to select a new farm location and fetch real data
        </div>
      </div>

      {/* Real-time Field Data Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/60 hover:bg-white/80 transition-colors">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{ndviData.toFixed(2)}</div>
              <div className="text-xs text-gray-600">NDVI Index</div>
              <Badge className={`${getNdviColor(ndviData)} text-white text-xs mt-1`}>
                {getNdviStatus(ndviData)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 hover:bg-white/80 transition-colors">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{soilData.temperature.toFixed(1)}°C</div>
              <div className="text-xs text-gray-600">Soil Temp</div>
              <Badge variant="outline" className="text-xs mt-1">
                {soilData.temperature > 25 ? 'Warm' : soilData.temperature > 15 ? 'Normal' : 'Cool'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 hover:bg-white/80 transition-colors">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{soilData.moisture.toFixed(0)}%</div>
              <div className="text-xs text-gray-600">Moisture</div>
              <Badge variant="outline" className="text-xs mt-1">
                {soilData.moisture > 70 ? 'High' : soilData.moisture > 40 ? 'Optimal' : 'Low'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 hover:bg-white/80 transition-colors">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{soilData.ph.toFixed(1)}</div>
              <div className="text-xs text-gray-600">Soil pH</div>
              <Badge variant="outline" className="text-xs mt-1">
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
