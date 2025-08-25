
import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  MapPin, 
  Settings, 
  Bell,
  Menu,
  Home,
  Sprout,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import existing components
import WeatherWidget from '@/components/WeatherWidget';
import SoilHealth from '@/components/SoilHealth';
import RiskAssessment from '@/components/RiskAssessment';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import AIRecommendations from '@/components/AIRecommendations';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import AlertsPanel from '@/components/AlertsPanel';
import ChatbotWidget from '@/components/ChatbotWidget';
import { OnboardingTour } from '@/components/OnboardingTour';
import { WelcomeModal } from '@/components/WelcomeModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [riskLevels, setRiskLevels] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showOnboardingTour, setShowOnboardingTour] = useState(false);

  const handleLocationSelect = useCallback((location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  }, []);

  const handleWeatherUpdate = useCallback((data: any) => {
    setWeatherData(data);
  }, []);

  const handleSoilUpdate = useCallback((data: any) => {
    setSoilData(data);
  }, []);

  const handleRiskUpdate = useCallback((data: any) => {
    setRiskLevels(data);
  }, []);

  const handleStartTour = () => {
    setShowOnboardingTour(true);
  };

  const handleCloseTour = () => {
    setShowOnboardingTour(false);
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="hover:bg-muted/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                  <Sprout className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">AgriIntel™ Dashboard</h1>
                  <p className="text-xs text-muted-foreground">Farm Intelligence Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="space-x-2">
              <Home className="h-4 w-4" />
              <span>Executive Summary</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="mapping" className="space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Field Mapping</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="space-x-2">
              <Sprout className="h-4 w-4" />
              <span>AI Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content - Left Side */}
              <div className="lg:col-span-3 space-y-6">
                {/* Performance Overview */}
                <Card className="glass border-0 shadow-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Farm Performance Overview</span>
                      <Badge className="bg-success/20 text-success">All Systems Optimal</Badge>
                    </CardTitle>
                    <CardDescription>Real-time monitoring and key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PerformanceMetrics 
                      weatherData={weatherData} 
                      soilData={soilData} 
                      riskLevels={riskLevels} 
                    />
                  </CardContent>
                </Card>

                {/* Environmental Conditions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WeatherWidget 
                    location={selectedLocation}
                  />
                  <SoilHealth 
                    location={selectedLocation}
                  />
                </div>

                {/* Risk Assessment */}
                <RiskAssessment 
                  location={selectedLocation}
                  weatherData={weatherData} 
                  soilData={soilData} 
                  onRiskLevelsUpdate={handleRiskUpdate} 
                />
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <AlertsPanel />
                <AIRecommendations 
                  location={selectedLocation}
                  weatherData={weatherData} 
                  soilData={soilData} 
                  riskLevels={riskLevels} 
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard 
              weatherData={weatherData} 
              soilData={soilData} 
              riskLevels={riskLevels} 
            />
          </TabsContent>

          <TabsContent value="mapping">
            <Card className="glass border-0 shadow-primary">
              <CardHeader>
                <CardTitle>Field Mapping & Satellite Imagery</CardTitle>
                <CardDescription>Interactive maps and real-time field monitoring</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] relative">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-50 rounded-lg"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 90% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
                      `
                    }}
                  >
                    {/* Field Zones */}
                    <div className="absolute top-16 left-16 w-32 h-24 bg-green-500/20 border-2 border-green-500 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs font-semibold text-green-700">North Field</div>
                        <div className="text-xs text-green-600">Corn • 12.5ha</div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-20 left-20 w-28 h-20 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs font-semibold text-yellow-700">South Field</div>
                        <div className="text-xs text-yellow-600">Soybeans • 8.3ha</div>
                      </div>
                    </div>

                    <div className="absolute top-20 right-24 w-36 h-28 bg-blue-500/20 border-2 border-blue-500 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs font-semibold text-blue-700">East Field</div>
                        <div className="text-xs text-blue-600">Wheat • 15.2ha</div>
                      </div>
                    </div>

                    {/* Weather Markers */}
                    <div className="absolute top-8 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-6 left-1/2 text-xs text-red-600 font-medium">22°C</div>
                    
                    <div className="absolute bottom-32 right-16 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-30 right-12 text-xs text-blue-600 font-medium">90% humidity</div>

                    {/* Controls Overlay */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <Card className="p-2 bg-white/90 backdrop-blur">
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="text-xs">Satellite</Button>
                          <Button size="sm" variant="outline" className="text-xs">Terrain</Button>
                          <Button size="sm" variant="outline" className="text-xs">Fields</Button>
                        </div>
                      </Card>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 right-4">
                      <Card className="p-3 bg-white/90 backdrop-blur">
                        <div className="space-y-2">
                          <div className="text-xs font-semibold">Field Health</div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span>Excellent (NDVI {'>0.8'})</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            <span>Good (NDVI 0.6-0.8)</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            <span>Monitoring (NDVI {'<0.6'})</span>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Center Message */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Card className="p-6 bg-white/95 backdrop-blur pointer-events-auto">
                        <div className="text-center space-y-3">
                          <MapPin className="h-12 w-12 mx-auto text-primary" />
                          <div>
                            <h3 className="font-semibold text-lg">Interactive Field Map</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Simulated field visualization with real-time monitoring
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate('/map')}
                            >
                              View Full Map
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => {
                                // Simulate field selection
                                const fields = ['North Field selected', 'South Field selected', 'East Field selected'];
                                const randomField = fields[Math.floor(Math.random() * fields.length)];
                                alert(randomField);
                              }}
                            >
                              Select Field
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIRecommendations 
                location={selectedLocation}
                weatherData={weatherData} 
                soilData={soilData} 
                riskLevels={riskLevels} 
              />
              <Card className="glass border-0 shadow-primary">
                <CardHeader>
                  <CardTitle>Predictive Analytics</CardTitle>
                  <CardDescription>AI-powered forecasting and trend analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <h4 className="font-semibold text-success mb-2">Yield Prediction</h4>
                      <p className="text-sm text-muted-foreground">Current conditions suggest 15% yield increase compared to last season.</p>
                    </div>
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <h4 className="font-semibold text-warning mb-2">Weather Forecast Impact</h4>
                      <p className="text-sm text-muted-foreground">Upcoming rain will benefit crop development in northern fields.</p>
                    </div>
                    <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                      <h4 className="font-semibold text-info mb-2">Resource Optimization</h4>
                      <p className="text-sm text-muted-foreground">Irrigation efficiency can be improved by 20% with schedule adjustments.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating Components */}
      <ChatbotWidget />
      <OnboardingTour 
        isOpen={showOnboardingTour} 
        onClose={handleCloseTour} 
      />
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={handleCloseWelcomeModal} 
        onStartTour={handleStartTour} 
      />
    </div>
  );
};

export default Dashboard;
