
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
import OnboardingTour from '@/components/OnboardingTour';
import WelcomeModal from '@/components/WelcomeModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [riskLevels, setRiskLevels] = useState(null);

  const handleLocationSelect = useCallback((location: string) => {
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
                    onWeatherUpdate={handleWeatherUpdate} 
                  />
                  <SoilHealth 
                    location={selectedLocation} 
                    onSoilUpdate={handleSoilUpdate} 
                  />
                </div>

                {/* Risk Assessment */}
                <RiskAssessment 
                  weatherData={weatherData} 
                  soilData={soilData} 
                  onRiskUpdate={handleRiskUpdate} 
                />
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <AlertsPanel />
                <AIRecommendations 
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
              <CardContent>
                <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Advanced mapping features coming soon</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate('/map')}
                    >
                      View Current Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIRecommendations 
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
      <OnboardingTour />
      <WelcomeModal />
    </div>
  );
};

export default Dashboard;
