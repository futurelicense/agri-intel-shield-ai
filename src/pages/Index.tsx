
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FarmMap from '@/components/FarmMap';
import WeatherWidget from '@/components/WeatherWidget';
import RiskAssessment from '@/components/RiskAssessment';
import AIRecommendations from '@/components/AIRecommendations';
import AlertsPanel from '@/components/AlertsPanel';
import SoilHealth from '@/components/SoilHealth';
import ChatbotWidget from '@/components/ChatbotWidget';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import { fetchWeatherData, fetchSoilData } from '@/utils/apiService';
import { 
  Shield, Activity, TrendingUp, MapPin, Zap, Brain,
  Satellite, BarChart3, Target, Settings, Bell, Leaf,
  Globe, Eye, RefreshCw, Calendar
} from 'lucide-react';

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
  const [lastUpdated, setLastUpdated] = useState(new Date());

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
        setLastUpdated(new Date());
        console.log('Dashboard data updated:', { weather, soil });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, [selectedLocation]);

  const getRiskColor = (level: number) => {
    if (level < 30) return 'bg-success text-success-foreground';
    if (level < 60) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  const getRiskText = (level: number) => {
    if (level < 30) return 'Low Risk';
    if (level < 60) return 'Moderate';
    return 'High Risk';
  };

  // Callback function to receive risk levels from RiskAssessment component
  const handleRiskLevelsUpdate = (newRiskLevels: typeof riskLevels) => {
    setRiskLevels(newRiskLevels);
    console.log('Risk levels updated in dashboard:', newRiskLevels);
  };

  // Calculate overall health score
  const healthScore = Math.round((100 - riskLevels.overall) * 0.9 + 
    (soilData?.ph >= 6.0 && soilData?.ph <= 7.5 ? 10 : 0));

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="gradient-primary p-3 rounded-xl shadow-primary">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                AgriShield AI
              </h1>
              <p className="text-xs text-muted-foreground">Advanced Geospatial Crop Intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="space-x-1">
              <Eye className="h-3 w-3" />
              <span>Live Monitoring</span>
            </Badge>
            <Badge variant="secondary" className="space-x-1">
              <RefreshCw className="h-3 w-3" />
              <span>Updated {lastUpdated.toLocaleTimeString()}</span>
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        {/* Executive Summary Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="lg:col-span-2 glass border-0 shadow-elegant hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Farm Health Score</h3>
                    <p className="text-sm text-muted-foreground">Overall system performance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{healthScore}%</div>
                  <Badge className={getRiskColor(riskLevels.overall)} variant="secondary">
                    {getRiskText(riskLevels.overall)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-lg font-bold text-success">{100 - riskLevels.drought}%</div>
                  <div className="text-xs text-muted-foreground">Water Security</div>
                </div>
                <div className="text-center p-3 bg-warning/10 rounded-lg">
                  <div className="text-lg font-bold text-warning">{100 - riskLevels.pest}%</div>
                  <div className="text-xs text-muted-foreground">Pest Control</div>
                </div>
                <div className="text-center p-3 bg-info/10 rounded-lg">
                  <div className="text-lg font-bold text-info">{100 - riskLevels.disease}%</div>
                  <div className="text-xs text-muted-foreground">Disease Prevention</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-elegant hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-sky/10 rounded-lg">
                  <Globe className="h-5 w-5 text-sky" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-xs text-muted-foreground">Active monitoring area</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Lat:</span> {selectedLocation.lat.toFixed(4)}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Lng:</span> {selectedLocation.lng.toFixed(4)}
                </div>
                <Badge variant="outline" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  12.5 hectares
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-elegant hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Zap className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold">System Status</h3>
                  <p className="text-xs text-muted-foreground">AI monitoring active</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Sensors:</span>
                  <Badge variant="secondary" className="text-xs">24/24 Online</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>AI Models:</span>
                  <Badge variant="secondary" className="text-xs">Running</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Data Quality:</span>
                  <Badge variant="secondary" className="text-xs">98% Accuracy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-elegant hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Today's Summary</h3>
                  <p className="text-xs text-muted-foreground">Key metrics</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Alerts:</span>
                  <Badge variant="destructive" className="text-xs">3 Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Actions:</span>
                  <Badge variant="secondary" className="text-xs">12 Completed</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Efficiency:</span>
                  <Badge variant="secondary" className="text-xs">+5.2%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm h-12">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Satellite className="h-4 w-4" />
              <span className="hidden sm:inline">Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Management</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass border-0 shadow-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Interactive Farm Map</span>
                    </CardTitle>
                    <CardDescription>
                      Real-time satellite imagery with NDVI overlay and environmental data
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

              <div className="space-y-6">
                <AlertsPanel />
                <RiskAssessment 
                  location={selectedLocation}
                  weatherData={weatherData}
                  soilData={soilData}
                  onRiskLevelsUpdate={handleRiskLevelsUpdate}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="glass border-0 shadow-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Satellite className="h-5 w-5 text-primary" />
                      <span>Satellite Monitoring</span>
                    </CardTitle>
                    <CardDescription>Advanced geospatial analysis and crop health monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FarmMap 
                      location={selectedLocation} 
                      onLocationChange={setSelectedLocation}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <SoilHealth location={selectedLocation} />
                <WeatherWidget location={selectedLocation} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsDashboard 
              weatherData={weatherData}
              soilData={soilData}
              riskLevels={riskLevels}
            />
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <PerformanceMetrics 
              riskLevels={riskLevels}
              weatherData={weatherData}
              soilData={soilData}
            />
          </TabsContent>

          <TabsContent value="management" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <RiskAssessment 
                  location={selectedLocation}
                  weatherData={weatherData}
                  soilData={soilData}
                  onRiskLevelsUpdate={handleRiskLevelsUpdate}
                />
                <AlertsPanel />
              </div>
              <div className="space-y-6">
                <AIRecommendations 
                  location={selectedLocation}
                  weatherData={weatherData}
                  soilData={soilData}
                  riskLevels={riskLevels}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Floating Chatbot */}
      <ChatbotWidget />
    </div>
  );
};

export default Index;
