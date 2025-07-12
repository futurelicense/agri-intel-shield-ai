
import React, { useState, useEffect } from 'react';
import { MapPin, Cloud, Leaf, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import FarmMap from '@/components/FarmMap';
import WeatherWidget from '@/components/WeatherWidget';
import RiskAssessment from '@/components/RiskAssessment';
import SoilHealth from '@/components/SoilHealth';
import ChatbotWidget from '@/components/ChatbotWidget';
import AlertsPanel from '@/components/AlertsPanel';
import AIRecommendations from '@/components/AIRecommendations';
import { fetchWeatherData, fetchSoilData } from '@/utils/apiService';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [weatherData, setWeatherData] = useState<any>(null);
  const [soilData, setSoilData] = useState<any>(null);
  const [riskLevels, setRiskLevels] = useState({
    drought: 35,
    pest: 68,
    disease: 22,
    overall: 42
  });

  // Fetch data when location changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weather, soil] = await Promise.all([
          fetchWeatherData(selectedLocation.lat, selectedLocation.lng),
          fetchSoilData(selectedLocation.lat, selectedLocation.lng)
        ]);
        
        setWeatherData(weather);
        setSoilData(soil);
        console.log('Dashboard data updated:', { weather, soil });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, [selectedLocation]);

  const getRiskColor = (level: number) => {
    if (level < 30) return 'text-green-600 bg-green-50';
    if (level < 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskText = (level: number) => {
    if (level < 30) return 'Low';
    if (level < 60) return 'Medium';
    return 'High';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AgriShield AI</h1>
                <p className="text-sm text-gray-600">Geospatial Crop Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <MapPin className="h-3 w-3 mr-1" />
                Farm Location Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{riskLevels.overall}%</p>
                </div>
                <Badge className={getRiskColor(riskLevels.overall)}>
                  {getRiskText(riskLevels.overall)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drought Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{riskLevels.drought}%</p>
                </div>
                <Badge className={getRiskColor(riskLevels.drought)}>
                  {getRiskText(riskLevels.drought)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pest Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{riskLevels.pest}%</p>
                </div>
                <Badge className={getRiskColor(riskLevels.pest)}>
                  {getRiskText(riskLevels.pest)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disease Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{riskLevels.disease}%</p>
                </div>
                <Badge className={getRiskColor(riskLevels.disease)}>
                  {getRiskText(riskLevels.disease)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map and Weather */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Farm Monitoring Dashboard</span>
                </CardTitle>
                <CardDescription>
                  Interactive satellite and NDVI mapping with real-time data overlay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FarmMap 
                  location={selectedLocation} 
                  onLocationChange={setSelectedLocation}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherWidget location={selectedLocation} />
              <SoilHealth location={selectedLocation} />
            </div>
          </div>

          {/* Right Column - Alerts and AI */}
          <div className="space-y-6">
            <AlertsPanel />
            
            <RiskAssessment 
              location={selectedLocation}
              weatherData={weatherData}
              soilData={soilData}
            />
            
            <AIRecommendations 
              location={selectedLocation}
              weatherData={weatherData}
              soilData={soilData}
              riskLevels={riskLevels}
            />
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <ChatbotWidget />
    </div>
  );
};

export default Index;
