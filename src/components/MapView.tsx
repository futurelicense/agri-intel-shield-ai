import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
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
  const map = useRef<google.maps.Map | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  }>({ lat: 40.7128, lng: -74.0060 });
  const [searchQuery, setSearchQuery] = useState('');
  const [farmMarkers, setFarmMarkers] = useState<google.maps.Marker[]>([]);
  const [loading, setLoading] = useState(false);
  const selectedMarker = useRef<google.maps.Marker | null>(null);

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

  const initializeMap = async () => {
    if (!mapContainer.current) return;

    try {
      const loader = new Loader({
        apiKey: 'AIzaSyDanWieWiB0E9zHWq9AWk03cBLkWgtPq9I',
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      await loader.load();
      
      map.current = new google.maps.Map(mapContainer.current, {
        center: { lat: selectedLocation.lat, lng: selectedLocation.lng },
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      geocoder.current = new google.maps.Geocoder();

      // Add click event listener
      map.current.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setSelectedLocation({ lat, lng });
          updateLocationMarker(lat, lng);
        }
      });

      addFarmMarkers();
      setMapInitialized(true);
      toast.success('Google Maps loaded successfully!');

    } catch (error) {
      console.error('Error loading Google Maps:', error);
      toast.error('Failed to load Google Maps');
    }
  };

  const addFarmMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    farmMarkers.forEach(marker => marker.setMap(null));
    setFarmMarkers([]);

    const newMarkers: google.maps.Marker[] = [];

    farmData.forEach((farm) => {
      const healthColors = {
        excellent: '#10b981',
        healthy: '#84cc16',
        moderate: '#f59e0b',
        poor: '#ef4444'
      };

      const marker = new google.maps.Marker({
        position: { lat: farm.coordinates[1], lng: farm.coordinates[0] },
        map: map.current!,
        title: farm.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 15,
          fillColor: healthColors[farm.health as keyof typeof healthColors],
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
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
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current!, marker);
      });

      newMarkers.push(marker);
    });

    setFarmMarkers(newMarkers);
  };

  const updateLocationMarker = (lat: number, lng: number) => {
    if (!map.current) return;

    // Remove existing marker
    if (selectedMarker.current) {
      selectedMarker.current.setMap(null);
    }

    // Create new marker
    selectedMarker.current = new google.maps.Marker({
      position: { lat, lng },
      map: map.current,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#ef4444',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3
      },
      animation: google.maps.Animation.BOUNCE
    });

    // Stop animation after 2 seconds
    setTimeout(() => {
      if (selectedMarker.current) {
        selectedMarker.current.setAnimation(null);
      }
    }, 2000);
  };

  const searchLocation = async () => {
    if (!searchQuery.trim() || !geocoder.current) return;

    setLoading(true);
    try {
      geocoder.current.geocode({ address: searchQuery }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const placeName = results[0].formatted_address;
          
          setSelectedLocation({ lat, lng, name: placeName });
          
          if (map.current) {
            map.current.panTo({ lat, lng });
            map.current.setZoom(14);
            updateLocationMarker(lat, lng);
          }
          
          toast.success(`Found: ${placeName}`);
        } else {
          toast.error('Location not found');
        }
        setLoading(false);
      });
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed');
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    if (map.current) {
      const currentZoom = map.current.getZoom();
      map.current.setZoom((currentZoom || 12) + 1);
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      const currentZoom = map.current.getZoom();
      map.current.setZoom((currentZoom || 12) - 1);
    }
  };

  const handleResetView = () => {
    if (map.current) {
      map.current.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng });
      map.current.setZoom(12);
    }
  };

  const changeMapStyle = (style: string) => {
    if (map.current) {
      const mapTypeId = style === 'satellite' ? google.maps.MapTypeId.SATELLITE :
                       style === 'roadmap' ? google.maps.MapTypeId.ROADMAP :
                       style === 'terrain' ? google.maps.MapTypeId.TERRAIN :
                       google.maps.MapTypeId.HYBRID;
      map.current.setMapTypeId(mapTypeId);
    }
  };

  useEffect(() => {
    initializeMap();
    
    return () => {
      if (map.current) {
        // Cleanup markers
        farmMarkers.forEach(marker => marker.setMap(null));
        if (selectedMarker.current) {
          selectedMarker.current.setMap(null);
        }
      }
    };
  }, []);

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
          {!mapInitialized ? (
            <div className="flex items-center justify-center h-[600px]">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
                <h3 className="text-lg font-semibold">Loading Google Maps</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we initialize the map...
                </p>
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
                      onClick={() => changeMapStyle('roadmap')}
                      className="text-xs"
                    >
                      Roadmap
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => changeMapStyle('satellite')}
                      className="text-xs"
                    >
                      Satellite
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => changeMapStyle('terrain')}
                      className="text-xs"
                    >
                      Terrain
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => changeMapStyle('hybrid')}
                      className="text-xs"
                    >
                      Hybrid
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
    </div>
  );
};

export default MapView;