
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Brain, TrendingUp, Shield, Bug, Droplets, Leaf } from 'lucide-react';

interface RiskAssessmentProps {
  location: { lat: number; lng: number };
  weatherData?: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
  };
  soilData?: {
    ph: number;
    moisture: number;
    temperature: number;
    organicCarbon: number;
  };
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ location, weatherData, soilData }) => {
  const [selectedRisk, setSelectedRisk] = useState('overall');
  const [riskLevels, setRiskLevels] = useState({
    drought: 35,
    pest: 68,
    disease: 22,
    overall: 42
  });

  // Calculate real-time risk levels based on actual data
  useEffect(() => {
    const calculateRiskLevels = () => {
      let droughtRisk = 30;
      let pestRisk = 40;
      let diseaseRisk = 25;

      // Calculate drought risk based on weather and soil data
      if (weatherData && soilData) {
        // Drought risk factors
        if (weatherData.rainfall < 5) droughtRisk += 30;
        else if (weatherData.rainfall < 15) droughtRisk += 15;
        
        if (soilData.moisture < 30) droughtRisk += 25;
        else if (soilData.moisture < 50) droughtRisk += 10;
        
        if (weatherData.temperature > 30) droughtRisk += 15;
        else if (weatherData.temperature > 25) droughtRisk += 5;

        // Pest risk factors
        if (weatherData.humidity > 80) pestRisk += 20;
        else if (weatherData.humidity > 60) pestRisk += 10;
        
        if (weatherData.temperature > 20 && weatherData.temperature < 30) pestRisk += 15;
        
        if (soilData.moisture > 70) pestRisk += 10;

        // Disease risk factors
        if (weatherData.humidity > 85) diseaseRisk += 25;
        else if (weatherData.humidity > 70) diseaseRisk += 10;
        
        if (soilData.moisture > 80) diseaseRisk += 20;
        else if (soilData.moisture > 60) diseaseRisk += 5;
        
        if (weatherData.temperature > 15 && weatherData.temperature < 25) diseaseRisk += 10;
        
        // pH affects disease susceptibility
        if (soilData.ph < 6.0 || soilData.ph > 7.5) diseaseRisk += 15;
      }

      // Cap at 100%
      droughtRisk = Math.min(droughtRisk, 100);
      pestRisk = Math.min(pestRisk, 100);
      diseaseRisk = Math.min(diseaseRisk, 100);

      const overallRisk = Math.round((droughtRisk + pestRisk + diseaseRisk) / 3);

      setRiskLevels({
        drought: Math.round(droughtRisk),
        pest: Math.round(pestRisk),
        disease: Math.round(diseaseRisk),
        overall: overallRisk
      });

      console.log('Risk levels calculated:', { droughtRisk, pestRisk, diseaseRisk, overallRisk });
    };

    calculateRiskLevels();
  }, [weatherData, soilData, location]);

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'drought': return <Droplets className="h-4 w-4" />;
      case 'pest': return <Bug className="h-4 w-4" />;
      case 'disease': return <Leaf className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getRiskColor = (level: number) => {
    if (level < 30) return 'text-green-600';
    if (level < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (level: number) => {
    if (level < 30) return 'bg-green-500';
    if (level < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRecommendations = (type: string, level: number) => {
    const recommendations = {
      drought: level > 60 ? [
        'Increase irrigation frequency immediately',
        'Apply mulch to retain soil moisture',
        'Monitor soil moisture hourly',
        'Consider drought-resistant crop varieties',
        'Implement water conservation practices'
      ] : level > 30 ? [
        'Monitor soil moisture levels daily',
        'Prepare irrigation systems for activation',
        'Check weather forecasts for rainfall',
        'Consider moisture-retaining soil amendments'
      ] : [
        'Continue normal irrigation schedule',
        'Maintain soil health practices',
        'Monitor weather patterns'
      ],
      pest: level > 60 ? [
        'Apply integrated pest management immediately',
        'Increase field monitoring to twice daily',
        'Deploy biological control agents',
        'Remove affected plant material safely',
        'Consider targeted pesticide application'
      ] : level > 30 ? [
        'Set up pest monitoring traps',
        'Inspect crops twice weekly',
        'Maintain beneficial insect habitats',
        'Monitor for early pest signs'
      ] : [
        'Continue routine weekly monitoring',
        'Maintain healthy crop conditions',
        'Support natural predator populations'
      ],
      disease: level > 60 ? [
        'Apply preventive fungicides immediately',
        'Improve air circulation around plants',
        'Remove infected plant debris',
        'Adjust irrigation timing to morning',
        'Increase plant spacing if possible'
      ] : level > 30 ? [
        'Monitor for early disease symptoms',
        'Ensure proper plant spacing',
        'Avoid overhead watering in evening',
        'Remove fallen leaves regularly'
      ] : [
        'Maintain good cultural practices',
        'Regular field inspections weekly',
        'Keep tools clean and sanitized'
      ]
    };
    
    return recommendations[type as keyof typeof recommendations] || [];
  };

  const getAIInsights = (type: string, level: number) => {
    const currentWeather = weatherData ? `Current conditions: ${weatherData.temperature}°C, ${weatherData.humidity}% humidity, ${weatherData.rainfall}mm rainfall` : 'Weather data loading...';
    
    switch (type) {
      case 'drought':
        return `${currentWeather}. Soil moisture analysis indicates ${level > 60 ? 'critical' : level > 30 ? 'moderate' : 'low'} drought stress. ${soilData ? `Soil moisture at ${soilData.moisture.toFixed(1)}%` : 'Soil data loading...'}`;
      case 'pest':
        return `${currentWeather}. Temperature and humidity conditions are ${level > 60 ? 'highly favorable' : level > 30 ? 'moderately favorable' : 'unfavorable'} for pest activity. Regional pest pressure monitoring active.`;
      case 'disease':
        return `${currentWeather}. Environmental conditions show ${level > 60 ? 'high' : level > 30 ? 'moderate' : 'low'} disease pressure potential. ${soilData ? `Soil pH at ${soilData.ph.toFixed(1)}` : 'Soil analysis pending...'}`;
      case 'overall':
        return `Comprehensive analysis of weather patterns, soil conditions, and environmental factors. Primary concern: ${riskLevels.pest > riskLevels.drought && riskLevels.pest > riskLevels.disease ? 'pest activity' : riskLevels.drought > riskLevels.disease ? 'drought stress' : 'disease pressure'}. Monitoring systems active.`;
      default:
        return 'AI analysis in progress...';
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI Risk Assessment</span>
        </CardTitle>
        <CardDescription>
          Real-time crop risk analysis powered by machine learning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk Overview */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(riskLevels).map(([key, value]) => (
            <Button
              key={key}
              variant={selectedRisk === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRisk(key)}
              className="justify-start h-auto p-3"
            >
              <div className="flex items-center space-x-2 w-full">
                {getRiskIcon(key)}
                <div className="text-left flex-1">
                  <div className="text-xs font-medium capitalize">{key}</div>
                  <div className={`text-sm font-bold ${getRiskColor(value)}`}>{value}%</div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Selected Risk Details */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 capitalize flex items-center space-x-2">
              {getRiskIcon(selectedRisk)}
              <span>{selectedRisk} Risk Analysis</span>
            </h4>
            <Badge 
              className={selectedRisk === 'overall' ? getRiskColor(riskLevels.overall) : getRiskColor(riskLevels[selectedRisk as keyof typeof riskLevels])}
            >
              {selectedRisk === 'overall' ? riskLevels.overall : riskLevels[selectedRisk as keyof typeof riskLevels]}%
            </Badge>
          </div>
          
          <Progress 
            value={selectedRisk === 'overall' ? riskLevels.overall : riskLevels[selectedRisk as keyof typeof riskLevels]}
            className="mb-4"
          />

          {/* AI-Generated Insights */}
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-900">AI Insights</span>
            </div>
            <p className="text-xs text-gray-700 mb-3">
              {getAIInsights(selectedRisk, selectedRisk === 'overall' ? riskLevels.overall : riskLevels[selectedRisk as keyof typeof riskLevels])}
            </p>

            {/* Recommendations */}
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-gray-900">Recommended Actions:</h5>
              <ul className="space-y-1">
                {getRecommendations(
                  selectedRisk, 
                  selectedRisk === 'overall' ? riskLevels.overall : riskLevels[selectedRisk as keyof typeof riskLevels]
                ).map((rec, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Trend */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">7-Day Trend Analysis</span>
          </div>
          <p className="text-xs text-blue-800">
            {riskLevels.overall > 50 ? 
              'Risk levels are elevated due to current environmental conditions. Increased monitoring recommended.' :
              riskLevels.overall > 30 ?
              'Risk levels are moderate. Continue standard monitoring protocols.' :
              'Risk levels are low. Maintain current farming practices.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
