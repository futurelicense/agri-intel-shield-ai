import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
  HelpCircle,
  Wifi,
  WifiOff
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
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [weatherData] = useState(null);
  const [soilData] = useState(null);
  const [riskLevels] = useState({
    drought: 35,
    pest: 68,
    disease: 22,
    overall: 42
  });

  // Memoized data for performance
  const farmMetrics = useMemo(() => ({
    health: { value: 92, status: 'Excellent', variant: 'success' as const },
    risk: { value: 'Medium', status: 'Monitor', variant: 'warning' as const },
    yield: { value: '+12%', status: 'Above Target', variant: 'primary' as const },
    water: { value: 'Optimal', status: 'Well Managed', variant: 'sky' as const }
  }), []);

  useEffect(() => {
    // Check if user is new (first visit)
    const hasVisited = localStorage.getItem('agriintel-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('agriintel-visited', 'true');
    }

    // Simulate loading completion
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleStartTour = useCallback(() => {
    setShowTour(true);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

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
                  <p className="text-xs text-muted-foreground/80">Powered by Shield AI Solutions</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Midwest Farm, Iowa</span>
              </div>
              
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-success" />
                ) : (
                  <WifiOff className="h-4 w-4 text-destructive" />
                )}
                <span className={`text-xs ${isOnline ? 'text-success' : 'text-destructive'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
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
        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Skeleton className="w-full h-96 rounded-lg" />
              </div>
              <div className="space-y-6">
                <Skeleton className="w-full h-48 rounded-lg" />
                <Skeleton className="w-full h-48 rounded-lg" />
              </div>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="gradient-card hover-lift transition-all duration-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 lg:p-3 bg-${farmMetrics.health.variant}/20 rounded-lg`}>
                        <CheckCircle2 className={`h-5 w-5 lg:h-6 lg:w-6 text-${farmMetrics.health.variant}`} />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm font-medium text-muted-foreground">Farm Health</p>
                        <p className={`text-xl lg:text-2xl font-bold text-${farmMetrics.health.variant}`}>
                          {farmMetrics.health.value}%
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`bg-${farmMetrics.health.variant}/10 text-${farmMetrics.health.variant} text-xs`}>
                      {farmMetrics.health.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card hover-lift transition-all duration-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 lg:p-3 bg-${farmMetrics.risk.variant}/20 rounded-lg`}>
                        <AlertTriangle className={`h-5 w-5 lg:h-6 lg:w-6 text-${farmMetrics.risk.variant}`} />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm font-medium text-muted-foreground">Risk Level</p>
                        <p className={`text-xl lg:text-2xl font-bold text-${farmMetrics.risk.variant}`}>
                          {farmMetrics.risk.value}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`bg-${farmMetrics.risk.variant}/10 text-${farmMetrics.risk.variant} text-xs`}>
                      {farmMetrics.risk.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card hover-lift transition-all duration-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 lg:p-3 bg-${farmMetrics.yield.variant}/20 rounded-lg`}>
                        <TrendingUp className={`h-5 w-5 lg:h-6 lg:w-6 text-${farmMetrics.yield.variant}`} />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm font-medium text-muted-foreground">Yield Forecast</p>
                        <p className={`text-xl lg:text-2xl font-bold text-${farmMetrics.yield.variant}`}>
                          {farmMetrics.yield.value}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`bg-${farmMetrics.yield.variant}/10 text-${farmMetrics.yield.variant} text-xs`}>
                      {farmMetrics.yield.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card hover-lift transition-all duration-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 lg:p-3 bg-${farmMetrics.water.variant}/20 rounded-lg`}>
                        <Droplets className={`h-5 w-5 lg:h-6 lg:w-6 text-${farmMetrics.water.variant}`} />
                      </div>
                      <div>
                        <p className="text-xs lg:text-sm font-medium text-muted-foreground">Water Status</p>
                        <p className={`text-xl lg:text-2xl font-bold text-${farmMetrics.water.variant}`}>
                          {farmMetrics.water.value}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`bg-${farmMetrics.water.variant}/10 text-${farmMetrics.water.variant} text-xs`}>
                      {farmMetrics.water.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                <div className="transition-all duration-300">
                  <FarmMap location={selectedLocation} onLocationChange={() => {}} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="transition-all duration-300">
                    <WeatherWidget location={selectedLocation} />
                  </div>
                  <div className="transition-all duration-300">
                    <SoilHealth location={selectedLocation} />
                  </div>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <div className="transition-all duration-300">
                  <RiskAssessment location={selectedLocation} weatherData={weatherData} soilData={soilData} onRiskLevelsUpdate={() => {}} />
                </div>
                <div className="transition-all duration-300">
                  <AIRecommendations location={selectedLocation} weatherData={weatherData} soilData={soilData} riskLevels={riskLevels} />
                </div>
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
        )}
      </main>

      {/* AI Assistant */}
      <div className="tour-chatbot">
        <ChatbotWidget />
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm bg-gradient-primary bg-clip-text text-transparent">
                    Shield AI Solutions
                  </h3>
                  <p className="text-xs text-muted-foreground">Agricultural Technology Leader</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-xs text-muted-foreground">
              <span>© 2024 Shield AI Solutions. All rights reserved.</span>
              <span>AgriIntel™ v2.1.0</span>
              <span>Enterprise Licensed</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                System Operational
              </Badge>
              <span className="text-muted-foreground">Last Update: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="border-t border-border/20 mt-4 pt-4">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
                <span>Support</span>
                <span>Documentation</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-muted-foreground">Powered by</span>
                <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">
                  Shield AI Solutions
                </span>
                <Badge variant="secondary" className="ml-2">
                  Pro License
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>

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