import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, TrendingDown, BarChart3, Target, Award,
  Zap, Droplets, Thermometer, Activity, Timer,
  DollarSign, Leaf, Users, Calendar
} from 'lucide-react';

interface PerformanceMetricsProps {
  riskLevels: any;
  weatherData: any;
  soilData: any;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  riskLevels, 
  weatherData, 
  soilData 
}) => {
  // Calculate performance scores based on real data with null checks
  const calculatePerformanceScore = () => {
    const overallRisk = riskLevels?.overall || 40;
    const baseScore = 100 - overallRisk;
    const weatherBonus = weatherData?.temperature > 20 && weatherData?.temperature < 30 ? 10 : 0;
    const soilBonus = soilData?.ph >= 6.0 && soilData?.ph <= 7.5 ? 10 : 0;
    return Math.min(100, Math.max(0, baseScore + weatherBonus + soilBonus));
  };

  const performanceScore = calculatePerformanceScore();

  const metrics = [
    {
      title: 'Overall Farm Score',
      value: performanceScore,
      target: 90,
      change: '+5.2%',
      trend: 'up',
      icon: Award,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Comprehensive farm performance index'
    },
    {
      title: 'Crop Health Index',
      value: Math.max(0, 100 - (riskLevels?.disease || 25)),
      target: 85,
      change: '+3.1%',
      trend: 'up',
      icon: Leaf,
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Disease resistance and vitality'
    },
    {
      title: 'Water Efficiency',
      value: soilData?.moisture ? Math.min(100, soilData.moisture + 20) : 78,
      target: 80,
      change: '-1.2%',
      trend: 'down',
      icon: Droplets,
      color: 'text-info',
      bgColor: 'bg-info/10',
      description: 'Irrigation optimization score'
    },
    {
      title: 'Risk Management',
      value: Math.max(0, 100 - (riskLevels?.overall || 40)),
      target: 85,
      change: '+8.7%',
      trend: 'up',
      icon: Target,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Threat mitigation effectiveness'
    }
  ];

  const operationalMetrics = [
    {
      title: 'Active Monitoring Areas',
      value: '12.5',
      unit: 'hectares',
      icon: BarChart3,
      color: 'text-primary'
    },
    {
      title: 'Data Points Collected',
      value: '2,847',
      unit: 'today',
      icon: Activity,
      color: 'text-success'
    },
    {
      title: 'Automated Actions',
      value: '18',
      unit: 'this week',
      icon: Zap,
      color: 'text-warning'
    },
    {
      title: 'System Uptime',
      value: '99.8%',
      unit: 'reliability',
      icon: Timer,
      color: 'text-info'
    }
  ];

  const benchmarkData = [
    {
      category: 'Yield Efficiency',
      current: 87,
      industry: 75,
      best: 95
    },
    {
      category: 'Resource Usage',
      current: 82,
      industry: 70,
      best: 90
    },
    {
      category: 'Sustainability',
      current: 91,
      industry: 68,
      best: 96
    },
    {
      category: 'Technology Adoption',
      current: 94,
      industry: 55,
      best: 98
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover-lift glass border-0 shadow-elegant overflow-hidden">
            <CardContent className="p-0">
              <div className={`p-4 ${metric.bgColor} border-b`}>
                <div className="flex items-center justify-between">
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  <Badge 
                    variant={metric.trend === 'up' ? 'default' : 'destructive'} 
                    className="text-xs"
                  >
                    {metric.change}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}%</span>
                  <span className="text-xs text-muted-foreground">Target: {metric.target}%</span>
                </div>
                <div className="space-y-2">
                  <Progress value={metric.value} className="h-2" />
                  <h3 className="font-semibold text-sm">{metric.title}</h3>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operational Metrics */}
        <Card className="glass border-0 shadow-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Operational Metrics</span>
            </CardTitle>
            <CardDescription>Real-time system performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {operationalMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-card ${metric.color}`}>
                    <metric.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{metric.title}</h4>
                    <p className="text-xs text-muted-foreground">{metric.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{metric.value}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Industry Benchmarks */}
        <Card className="glass border-0 shadow-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Industry Benchmarks</span>
            </CardTitle>
            <CardDescription>Compare performance against industry standards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {benchmarkData.map((benchmark, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{benchmark.category}</span>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-muted-foreground">You: {benchmark.current}%</span>
                    <span className="text-muted-foreground">Industry: {benchmark.industry}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full flex">
                      <div 
                        className="bg-muted-foreground/30"
                        style={{ width: `${benchmark.industry}%` }}
                      />
                      <div 
                        className="bg-primary"
                        style={{ width: `${Math.max(0, benchmark.current - benchmark.industry)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Industry Average</span>
                    <span>Best in Class: {benchmark.best}%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {benchmark.current > benchmark.industry ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span className="text-xs">
                    {benchmark.current > benchmark.industry 
                      ? `${benchmark.current - benchmark.industry}% above average`
                      : `${benchmark.industry - benchmark.current}% below average`
                    }
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="glass border-0 shadow-primary">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Performance Insights</span>
          </CardTitle>
          <CardDescription>AI-driven analysis of your farm's performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-4 w-4 text-success" />
                <span className="font-semibold text-success text-sm">Top Performer</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your farm ranks in the top 15% for technology adoption and sustainability practices.
              </p>
            </div>
            <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-info" />
                <span className="font-semibold text-info text-sm">Improvement Area</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Water efficiency could be optimized by adjusting irrigation timing based on soil moisture data.
              </p>
            </div>
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-warning" />
                <span className="font-semibold text-warning text-sm">Next Goal</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Achieve 90% overall farm score by focusing on risk management and crop health monitoring.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
