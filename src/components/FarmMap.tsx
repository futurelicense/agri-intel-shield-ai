import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, Satellite, Map as MapIcon, Crosshair } from 'lucide-react';
import { fetchNDVIData } from '@/utils/apiService';

interface FarmMapProps {
  location: { lat: number; lng: number };
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

const FarmMap: React.FC<FarmMapProps> = ({ location, onLocationChange }) => {
  const [mapLayer, setMapLayer] = useState('satellite');
  const [ndviData, setNdviData] = useState(0.75);
  const [loading, setLoading] = useState(false);
  
  // Fetch real NDVI data based on location
  useEffect(() => {
    const updateNdviData = async () => {
      setLoading(true);
      try {
        const data = await fetchNDVIData(location.lat, location.lng);
        setNdviData(data);
        console.log('NDVI data updated:', data);
      } catch (error) {
        console.error('Failed to fetch NDVI data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    updateNdviData();
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
    
    const newLat = location.lat + (y - 0.5) * 0.01;
    const newLng = location.lng + (x - 0.5) * 0.01;
    
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
        </div>
      </div>

      {/* Map Display */}
      <div 
        className="relative w-full h-80 bg-gradient-to-br from-green-100 to-brown-100 rounded-lg overflow-hidden cursor-crosshair border-2 border-gray-200"
        onClick={handleMapClick}
      >
        <div className={`absolute inset-0 ${
          mapLayer === 'satellite' ? 'bg-gradient-to-br from-green-200 via-brown-200 to-green-300' :
          mapLayer === 'ndvi' ? 'bg-gradient-to-br from-red-200 via-yellow-200 to-green-200' :
          'bg-gradient-to-br from-gray-200 via-brown-200 to-green-200'
        }`}>
          
          <div className="absolute top-8 left-8 w-32 h-24 border-2 border-blue-400 bg-green-200/50 rounded-lg">
            <div className="p-2">
              <div className="text-xs font-semibold text-blue-800">Field A</div>
              <div className="text-xs text-blue-600">12.5 hectares</div>
            </div>
          </div>
          
          <div className="absolute top-12 right-12 w-28 h-20 border-2 border-purple-400 bg-yellow-200/50 rounded-lg">
            <div className="p-2">
              <div className="text-xs font-semibold text-purple-800">Field B</div>
              <div className="text-xs text-purple-600">8.2 hectares</div>
            </div>
          </div>

          {mapLayer === 'ndvi' && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-300/60 via-yellow-300/60 to-green-300/60">
              <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg">
                <div className="text-xs font-semibold mb-1">NDVI Legend</div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span>0.0</span>
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>0.5</span>
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span>1.0</span>
                </div>
              </div>
            </div>
          )}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-lg text-xs text-gray-600">
          Click to select farm location
        </div>
      </div>

      {/* Current Field Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/60">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{(ndviData).toFixed(2)}</div>
              <div className="text-xs text-gray-600">NDVI Index</div>
              <Badge className={`${getNdviColor(ndviData)} text-white text-xs mt-1`}>
                {getNdviStatus(ndviData)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">20.7°C</div>
              <div className="text-xs text-gray-600">Soil Temp</div>
              <Badge variant="outline" className="text-xs mt-1">Normal</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">65%</div>
              <div className="text-xs text-gray-600">Moisture</div>
              <Badge variant="outline" className="text-xs mt-1">Optimal</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">6.8</div>
              <div className="text-xs text-gray-600">Soil pH</div>
              <Badge variant="outline" className="text-xs mt-1">Good</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmMap;
