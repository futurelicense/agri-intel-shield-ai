import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, TrendingDown, BarChart3, PieChart, Activity, 
  Zap, Target, AlertTriangle, CheckCircle, Calendar,
  Droplets, Thermometer, Wind, Sun, CloudRain
} from 'lucide-react';

interface AnalyticsDashboardProps {
  weatherData: any;
  soilData: any;
  riskLevels: any;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  weatherData, 
  soilData, 
  riskLevels 
}) => {
  // Generate synthetic analytics data
  const yieldPrediction = {
    current: 85,
    target: 92,
    trend: '+12%',
    confidence: 87
  };

  const farmEfficiency = {
    waterUsage: 78,
    energyEfficiency: 82,
    cropDensity: 91,
    soilHealth: 86
  };

  const weeklyTrends = [
    { day: 'Mon', health: 82, risk: 25, yield: 78 },
    { day: 'Tue', health: 85, risk: 22, yield: 81 },
    { day: 'Wed', health: 87, risk: 19, yield: 84 },
    { day: 'Thu', health: 84, risk: 28, yield: 79 },
    { day: 'Fri', health: 89, risk: 15, yield: 87 },
    { day: 'Sat', health: 91, risk: 12, yield: 89 },
    { day: 'Sun', health: 88, risk: 18, yield: 86 }
  ];

  const criticalMetrics = [
    {
      title: 'Crop Health Index',
      value: 88,
      change: '+5.2%',
      trend: 'up',
      status: 'excellent',
      icon: Activity,
      color: 'text-success'
    },
    {
      title: 'Water Efficiency',
      value: 76,
      change: '-2.1%',
      trend: 'down',
      status: 'good',
      icon: Droplets,
      color: 'text-info'
    },
    {
      title: 'Risk Mitigation',
      value: 92,
      change: '+8.7%',
      trend: 'up',
      status: 'excellent',
      icon: Target,
      color: 'text-success'
    },
    {
      title: 'Yield Forecast',
      value: yieldPrediction.current,
      change: yieldPrediction.trend,
      trend: 'up',
      status: 'very-good',
      icon: TrendingUp,
      color: 'text-success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {criticalMetrics.map((metric, index) => (
          <Card key={index} className="hover-lift glass border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
                <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{metric.value}%</h3>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <Progress value={metric.value} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="space-x-2">
            <Zap className="h-4 w-4" />
            <span>Efficiency</span>
          </TabsTrigger>
          <TabsTrigger value="predictions" className="space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Predictions</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="space-x-2">
            <Target className="h-4 w-4" />
            <span>Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Overview */}
            <Card className="glass border-0 shadow-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Farm Performance Overview</span>
                </CardTitle>
                <CardDescription>Real-time metrics and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyTrends.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="font-medium text-sm">{day.day}</span>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Health: {day.health}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span>Risk: {day.risk}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-info rounded-full"></div>
                        <span>Yield: {day.yield}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Environmental Conditions */}
            <Card className="glass border-0 shadow-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-warning" />
                  <span>Environmental Analysis</span>
                </CardTitle>
                <CardDescription>Current conditions impacting crop health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-sky/10 to-water/10 rounded-lg">
                    <Thermometer className="h-8 w-8 mx-auto mb-2 text-sky" />
                    <div className="text-2xl font-bold">{weatherData?.temperature || 24}°C</div>
                    <div className="text-xs text-muted-foreground">Temperature</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-water/10 to-sky/10 rounded-lg">
                    <Droplets className="h-8 w-8 mx-auto mb-2 text-water" />
                    <div className="text-2xl font-bold">{weatherData?.humidity || 68}%</div>
                    <div className="text-xs text-muted-foreground">Humidity</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-leaf/10 rounded-lg">
                    <Wind className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{weatherData?.windSpeed || 12} km/h</div>
                    <div className="text-xs text-muted-foreground">Wind Speed</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-earth/10 to-soil/10 rounded-lg">
                    <CloudRain className="h-8 w-8 mx-auto mb-2 text-earth" />
                    <div className="text-2xl font-bold">{weatherData?.rainfall || 2.3} mm</div>
                    <div className="text-xs text-muted-foreground">Rainfall</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6 mt-6">
          <Card className="glass border-0 shadow-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-warning" />
                <span>Resource Efficiency Metrics</span>
              </CardTitle>
              <CardDescription>Optimize your farm's resource utilization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(farmEfficiency).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <Badge variant={value > 80 ? 'default' : 'secondary'}>{value}%</Badge>
                  </div>
                  <Progress value={value} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {value > 85 ? 'Excellent efficiency' : 
                     value > 70 ? 'Good performance' : 
                     'Needs improvement'}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass border-0 shadow-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span>Yield Prediction</span>
                </CardTitle>
                <CardDescription>AI-powered harvest forecasting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-success/10 to-leaf/10 rounded-lg">
                  <div className="text-4xl font-bold text-success mb-2">{yieldPrediction.current}%</div>
                  <div className="text-sm text-muted-foreground mb-4">Expected yield efficiency</div>
                  <Progress value={yieldPrediction.current} className="h-3 mb-4" />
                  <div className="flex justify-between text-xs">
                    <span>Target: {yieldPrediction.target}%</span>
                    <span>Confidence: {yieldPrediction.confidence}%</span>
                  </div>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Factors</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Optimal soil moisture levels</li>
                    <li>• Favorable weather conditions</li>
                    <li>• Low pest pressure</li>
                    <li>• Effective nutrient management</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Seasonal Forecast</span>
                </CardTitle>
                <CardDescription>Long-term agricultural outlook</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Spring', 'Summer', 'Fall', 'Winter'].map((season, index) => {
                  const seasonData = [92, 88, 75, 45][index];
                  return (
                    <div key={season} className="p-3 rounded-lg bg-muted/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{season}</span>
                        <Badge variant="outline">{seasonData}%</Badge>
                      </div>
                      <Progress value={seasonData} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          <Card className="glass border-0 shadow-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>AI-Powered Insights</span>
              </CardTitle>
              <CardDescription>Intelligent analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success mb-2" />
                  <h4 className="font-semibold text-success mb-1">Optimal Conditions</h4>
                  <p className="text-sm text-muted-foreground">
                    Current soil moisture and temperature levels are ideal for crop development.
                  </p>
                </div>
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-warning mb-2" />
                  <h4 className="font-semibold text-warning mb-1">Weather Alert</h4>
                  <p className="text-sm text-muted-foreground">
                    High winds predicted tomorrow. Consider protective measures for sensitive crops.
                  </p>
                </div>
                <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                  <Activity className="h-5 w-5 text-info mb-2" />
                  <h4 className="font-semibold text-info mb-1">Efficiency Boost</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjusting irrigation schedule could improve water efficiency by 15%.
                  </p>
                </div>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary mb-2" />
                  <h4 className="font-semibold text-primary mb-1">Growth Trend</h4>
                  <p className="text-sm text-muted-foreground">
                    Crop development is 12% ahead of schedule compared to last season.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;