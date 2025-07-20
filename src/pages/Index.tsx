import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin,
  Thermometer,
  Droplets,
  Sprout,
  BarChart3,
  Settings,
  Bell,
  HelpCircle
} from 'lucide-react';
import WeatherWidget from '@/components/WeatherWidget';
import SoilHealth from '@/components/SoilHealth';
import RiskAssessment from '@/components/RiskAssessment';
import AIRecommendations from '@/components/AIRecommendations';
import FarmMap from '@/components/FarmMap';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import ChatbotWidget from '@/components/ChatbotWidget';
import AlertsPanel from '@/components/AlertsPanel';
import { OnboardingTour } from '@/components/OnboardingTour';
import { WelcomeModal } from '@/components/WelcomeModal';
import { HelpTooltip } from '@/components/HelpTooltip';

const Index = () => {
  const [activeTab, setActiveTab] = useState('executive');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [selectedLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [weatherData] = useState(null);
  const [soilData] = useState(null);
  const [riskLevels] = useState({
    drought: 35,
    pest: 68,
    disease: 22,
    overall: 42
  });

  useEffect(() => {
    // Check if user is new (first visit)
    const hasVisited = localStorage.getItem('agriintel-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('agriintel-visited', 'true');
    }
  }, []);

  const handleStartTour = () => {
    setShowTour(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4 tour-welcome">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    AgriIntel™
                  </h1>
                  <p className="text-sm text-muted-foreground">Farm Intelligence Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Midwest Farm, Iowa</span>
              </div>
              <AlertsPanel />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleStartTour}
                className="mr-2"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-2/3 mx-auto bg-card/50 backdrop-blur">
            <TabsTrigger value="executive" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white tour-executive">
              <div className="flex items-center gap-2">
                Executive Summary
                <HelpTooltip content="Quick overview of farm status, alerts, and key metrics" />
              </div>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white tour-monitoring">
              <div className="flex items-center gap-2">
                Real-time Monitoring
                <HelpTooltip content="Live weather, soil, and crop health data from sensors and satellites" />
              </div>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white tour-analytics">
              <div className="flex items-center gap-2">
                Advanced Analytics
                <HelpTooltip content="Performance metrics, trends, and predictive insights" />
              </div>
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <div className="flex items-center gap-2">
                Farm Management
                <HelpTooltip content="Field management, planning, and operational tools" />
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Executive Summary Tab */}
          <TabsContent value="executive" className="space-y-6">
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-success/20 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Farm Health</p>
                        <p className="text-2xl font-bold text-success">92%</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success">Excellent</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-warning/20 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                        <p className="text-2xl font-bold text-warning">Medium</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-warning/10 text-warning">Monitor</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Yield Forecast</p>
                        <p className="text-2xl font-bold text-primary">+12%</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">Above Target</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-sky/20 rounded-lg">
                        <Droplets className="h-6 w-6 text-sky" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Water Status</p>
                        <p className="text-2xl font-bold text-sky">Optimal</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-sky/10 text-sky">Well Managed</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <FarmMap location={selectedLocation} onLocationChange={() => {}} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WeatherWidget location={selectedLocation} />
                  <SoilHealth location={selectedLocation} />
                </div>
              </div>
              <div className="space-y-6">
                <RiskAssessment location={selectedLocation} weatherData={weatherData} soilData={soilData} onRiskLevelsUpdate={() => {}} />
                <AIRecommendations location={selectedLocation} weatherData={weatherData} soilData={soilData} riskLevels={riskLevels} />
              </div>
            </div>
          </TabsContent>

          {/* Real-time Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Live Farm Monitoring</span>
                      <HelpTooltip content="Real-time satellite imagery with environmental overlays" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FarmMap location={selectedLocation} onLocationChange={() => {}} />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <WeatherWidget location={selectedLocation} />
                <SoilHealth location={selectedLocation} />
              </div>
            </div>
          </TabsContent>

          {/* Advanced Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard weatherData={weatherData} soilData={soilData} riskLevels={riskLevels} />
          </TabsContent>

          {/* Farm Management Tab */}
          <TabsContent value="management" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <RiskAssessment location={selectedLocation} weatherData={weatherData} soilData={soilData} onRiskLevelsUpdate={() => {}} />
                <AlertsPanel />
              </div>
              <div className="space-y-6">
                <AIRecommendations location={selectedLocation} weatherData={weatherData} soilData={soilData} riskLevels={riskLevels} />
                <PerformanceMetrics riskLevels={riskLevels} weatherData={weatherData} soilData={soilData} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Assistant */}
      <div className="tour-chatbot">
        <ChatbotWidget />
      </div>

      {/* Onboarding Components */}
      <WelcomeModal 
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)}
        onStartTour={handleStartTour}
      />
      <OnboardingTour 
        isOpen={showTour} 
        onClose={() => setShowTour(false)}
      />
    </div>
  );
};

export default Index;