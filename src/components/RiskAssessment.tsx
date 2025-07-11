
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Brain, TrendingUp, Shield, Bug, Droplets, Leaf } from 'lucide-react';

interface RiskAssessmentProps {
  riskLevels: {
    drought: number;
    pest: number;
    disease: number;
    overall: number;
  };
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ riskLevels }) => {
  const [selectedRisk, setSelectedRisk] = useState('overall');

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
        'Increase irrigation frequency',
        'Apply mulch to retain moisture',
        'Monitor soil moisture daily',
        'Consider drought-resistant varieties'
      ] : level > 30 ? [
        'Monitor soil moisture levels',
        'Prepare irrigation systems',
        'Check weather forecasts regularly'
      ] : [
        'Continue normal irrigation schedule',
        'Maintain soil health practices'
      ],
      pest: level > 60 ? [
        'Apply integrated pest management',
        'Increase field monitoring',
        'Consider biological controls',
        'Remove affected plant material'
      ] : level > 30 ? [
        'Set up pest monitoring traps',
        'Inspect crops twice weekly',
        'Maintain beneficial insect habitats'
      ] : [
        'Continue routine monitoring',
        'Maintain healthy crop conditions'
      ],
      disease: level > 60 ? [
        'Apply preventive fungicides',
        'Improve air circulation',
        'Remove infected plant debris',
        'Adjust irrigation timing'
      ] : level > 30 ? [
        'Monitor for early symptoms',
        'Ensure proper plant spacing',
        'Avoid overhead watering'
      ] : [
        'Maintain good cultural practices',
        'Regular field inspections'
      ]
    };
    
    return recommendations[type as keyof typeof recommendations] || [];
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI Risk Assessment</span>
        </CardTitle>
        <CardDescription>
          Machine learning-powered crop risk analysis
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
              {selectedRisk === 'drought' && 'Weather patterns indicate below-average rainfall in the coming weeks. Soil moisture sensors show declining levels in upper root zones.'}
              {selectedRisk === 'pest' && 'Temperature and humidity conditions are favorable for aphid and thrips activity. Regional reports show increased pest pressure.'}
              {selectedRisk === 'disease' && 'Current environmental conditions show low disease pressure. Continue preventive measures to maintain crop health.'}
              {selectedRisk === 'overall' && 'Moderate risk levels detected. Primary concern is pest activity due to favorable weather conditions. Monitor closely.'}
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
            <span className="text-sm font-semibold text-blue-900">7-Day Trend</span>
          </div>
          <p className="text-xs text-blue-800">
            Risk levels have increased by 12% over the past week due to changing weather conditions. 
            Expect stabilization by early next week.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
