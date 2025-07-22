import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Layers, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Search,
  Sprout,
  Thermometer,
  Droplets
} from 'lucide-react';
import { toast } from 'sonner';

interface MapViewProps {
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  }>({ lat: 40.7128, lng: -74.0060 });
  const [searchQuery, setSearchQuery] = useState('');
  const [farmMarkers, setFarmMarkers] = useState<mapboxgl.Marker[]>([]);
  const [loading, setLoading] = useState(false);

  // Sample farm data
  const farmData = [
    {
      id: 1,
      name: 'North Field',
      coordinates: [selectedLocation.lng + 0.01, selectedLocation.lat + 0.01],
      crop: 'Corn',
      health: 'healthy',
      size: '12.5 hectares',
      ndvi: 0.82
    },
    {
      id: 2,
      name: 'South Field',
      coordinates: [selectedLocation.lng - 0.01, selectedLocation.lat - 0.01],
      crop: 'Soybeans',
      health: 'moderate',
      size: '8.3 hectares',
      ndvi: 0.65
    },
    {
      id: 3,
      name: 'East Field',
      coordinates: [selectedLocation.lng + 0.015, selectedLocation.lat - 0.005],
      crop: 'Wheat',
      health: 'excellent',
      size: '15.2 hectares',
      ndvi: 0.91
    }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current || mapInitialized) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 12,
        pitch: 0,
        bearing: 0
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

      map.current.on('load', () => {
        addFarmMarkers();
        setMapInitialized(true);
        toast.success('Map loaded successfully!');
      });

      map.current.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        setSelectedLocation({ lat, lng });
        updateLocationMarker(lat, lng);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to initialize map. Please check your token.');
    }
  };

  const addFarmMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    farmMarkers.forEach(marker => marker.remove());
    setFarmMarkers([]);

    const newMarkers: mapboxgl.Marker[] = [];

    farmData.forEach((farm) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'farm-marker';
      markerElement.style.cssText = `
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 2px solid white;
        ${farm.health === 'excellent' ? 'background: linear-gradient(135deg, #10b981, #059669);' :
          farm.health === 'healthy' ? 'background: linear-gradient(135deg, #84cc16, #65a30d);' :
          farm.health === 'moderate' ? 'background: linear-gradient(135deg, #f59e0b, #d97706);' :
          'background: linear-gradient(135deg, #ef4444, #dc2626);'}
      `;
      markerElement.innerHTML = '🌱';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3">
          <h3 class="font-bold text-sm text-gray-900">${farm.name}</h3>
          <div class="mt-2 space-y-1">
            <div class="text-xs text-gray-600">Crop: ${farm.crop}</div>
            <div class="text-xs text-gray-600">Size: ${farm.size}</div>
            <div class="text-xs text-gray-600">NDVI: ${farm.ndvi}</div>
            <div class="inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
              farm.health === 'excellent' ? 'bg-green-500 text-white' :
              farm.health === 'healthy' ? 'bg-green-400 text-white' :
              farm.health === 'moderate' ? 'bg-yellow-500 text-white' :
              'bg-red-500 text-white'
            }">
              ${farm.health.charAt(0).toUpperCase() + farm.health.slice(1)}
            </div>
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(farm.coordinates as [number, number])
        .setPopup(popup)
        .addTo(map.current!);

      newMarkers.push(marker);
    });

    setFarmMarkers(newMarkers);
  };

  const updateLocationMarker = (lat: number, lng: number) => {
    if (!map.current) return;

    // Remove existing location marker
    const existingMarker = document.querySelector('.location-marker');
    if (existingMarker) {
      existingMarker.remove();
    }

    // Add new location marker
    const markerElement = document.createElement('div');
    markerElement.className = 'location-marker';
    markerElement.style.cssText = `
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ef4444;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      animation: pulse 2s infinite;
    `;

    new mapboxgl.Marker(markerElement)
      .setLngLat([lng, lat])
      .addTo(map.current);
  };

  const searchLocation = async () => {
    if (!searchQuery.trim() || !mapboxToken) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxToken}&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const placeName = data.features[0].place_name;
        
        setSelectedLocation({ lat, lng, name: placeName });
        
        if (map.current) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 12,
            duration: 2000
          });
          updateLocationMarker(lat, lng);
        }
        
        toast.success(`Found: ${placeName}`);
      } else {
        toast.error('Location not found');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (map.current) {
      map.current.flyTo({
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 12,
        bearing: 0,
        pitch: 0,
        duration: 1000
      });
    }
  };

  const changeMapStyle = (style: string) => {
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${style}`);
      
      // Re-add markers after style change
      map.current.once('styledata', () => {
        addFarmMarkers();
      });
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }
    
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  return (
    <div className={className}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Farm Map
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {!mapboxToken ? (
            <div className="p-6 space-y-4">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Mapbox Token Required</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Enter your Mapbox public token to enable the interactive map. 
                  Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
                </p>
              </div>
              <div className="max-w-md mx-auto space-y-3">
                <Input
                  type="password"
                  placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGZqMGVtaDEwMWl1..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="text-xs"
                />
                <Button 
                  onClick={() => initializeMap(mapboxToken)} 
                  className="w-full"
                  disabled={!mapboxToken.trim()}
                >
                  Initialize Map
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative h-[600px]">
              {/* Map Controls */}
              <div className="absolute top-4 left-4 z-10 space-y-2">
                {/* Search */}
                <Card className="p-3 bg-white/95 backdrop-blur">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                      className="text-xs"
                    />
                    <Button 
                      size="sm" 
                      onClick={searchLocation}
                      disabled={loading}
                    >
                      <Search className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>

                {/* Map Style Controls */}
                <Card className="p-3 bg-white/95 backdrop-blur">
                  <div className="flex gap-1 flex-wrap">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => changeMapStyle('streets-v12')}
                      className="text-xs"
                    >
                      Streets
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => changeMapStyle('satellite-v9')}
                      className="text-xs"
                    >
                      Satellite
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => changeMapStyle('outdoors-v12')}
                      className="text-xs"
                    >
                      Terrain
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 z-10 space-y-1">
                <Button size="sm" variant="outline" onClick={handleZoomIn} className="w-8 h-8 p-0 bg-white/95">
                  <ZoomIn className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleZoomOut} className="w-8 h-8 p-0 bg-white/95">
                  <ZoomOut className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleResetView} className="w-8 h-8 p-0 bg-white/95">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>

              {/* Location Info */}
              <div className="absolute bottom-4 left-4 z-10">
                <Card className="p-3 bg-white/95 backdrop-blur">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Selected Location</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                    </div>
                    {selectedLocation.name && (
                      <div className="text-xs text-muted-foreground">
                        {selectedLocation.name}
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Farm Stats */}
              <div className="absolute bottom-4 right-4 z-10">
                <Card className="p-3 bg-white/95 backdrop-blur">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sprout className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Farm Overview</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>3 Fields</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3" />
                        <span>22°C</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>36 hectares</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        <span>65% humidity</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Map Container */}
              <div 
                ref={mapContainer} 
                className="w-full h-full rounded-lg"
                style={{
                  borderRadius: '0.5rem'
                }}
              />

              {/* Loading Overlay */}
              {loading && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20">
                  <Card className="p-4 bg-white/95 backdrop-blur">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">Searching...</span>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
          }
          .location-marker {
            animation: pulse 2s infinite;
          }
        `
      }} />
    </div>
  );
};

export default MapView;