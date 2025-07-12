
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Brain, CheckCircle, AlertCircle, Clock, Lightbulb } from 'lucide-react';

interface AIRecommendationsProps {
  location: { lat: number; lng: number };
  weatherData?: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    forecast: Array<{
      day: string;
      temp: number;
      condition: string;
      rain: number;
    }>;
  };
  soilData?: {
    ph: number;
    moisture: number;
    temperature: number;
    organicCarbon: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  riskLevels?: {
    drought: number;
    pest: number;
    disease: number;
    overall: number;
  };
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'irrigation' | 'pest_control' | 'fertilization' | 'disease_prevention' | 'soil_management';
  timeframe: string;
  completed?: boolean;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  location, 
  weatherData, 
  soilData, 
  riskLevels 
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  // Generate dynamic recommendations based on real data
  useEffect(() => {
    const generateRecommendations = () => {
      const newRecommendations: Recommendation[] = [];

      // Weather-based recommendations
      if (weatherData) {
        if (weatherData.rainfall < 5 && weatherData.temperature > 25) {
          newRecommendations.push({
            id: 'irrigation-1',
            title: 'Increase Irrigation Frequency',
            description: `Low rainfall (${weatherData.rainfall}mm) and high temperature (${weatherData.temperature}°C) detected. Increase watering schedule.`,
            priority: 'high',
            category: 'irrigation',
            timeframe: 'Next 24 hours'
          });
        }

        if (weatherData.humidity > 80) {
          newRecommendations.push({
            id: 'disease-1',
            title: 'Monitor for Fungal Diseases',
            description: `High humidity (${weatherData.humidity}%) creates favorable conditions for fungal infections. Increase monitoring frequency.`,
            priority: 'medium',
            category: 'disease_prevention',
            timeframe: 'Next 3 days'
          });
        }

        if (weatherData.windSpeed > 20) {
          newRecommendations.push({
            id: 'pest-1',
            title: 'Check for Wind Damage',
            description: `Strong winds (${weatherData.windSpeed} km/h) may cause physical damage. Inspect plants for broken branches.`,
            priority: 'medium',
            category: 'pest_control',
            timeframe: 'Today'
          });
        }
      }

      // Soil-based recommendations
      if (soilData) {
        if (soilData.ph < 6.0) {
          newRecommendations.push({
            id: 'soil-1',
            title: 'Apply Lime to Increase pH',
            description: `Soil pH is ${soilData.ph.toFixed(1)}, which is acidic. Apply agricultural lime to raise pH to optimal range (6.0-7.5).`,
            priority: 'high',
            category: 'soil_management',
            timeframe: 'Next week'
          });
        } else if (soilData.ph > 7.5) {
          newRecommendations.push({
            id: 'soil-2',
            title: 'Monitor Nutrient Availability',
            description: `Soil pH is ${soilData.ph.toFixed(1)}, which is alkaline. Monitor for nutrient deficiencies, especially iron and manganese.`,
            priority: 'medium',
            category: 'soil_management',
            timeframe: 'Next 2 weeks'
          });
        }

        if (soilData.nitrogen < 0.12) {
          newRecommendations.push({
            id: 'fert-1',
            title: 'Apply Nitrogen Fertilizer',
            description: `Nitrogen levels are low (${(soilData.nitrogen * 100).toFixed(1)}%). Apply nitrogen-rich fertilizer to support plant growth.`,
            priority: 'high',
            category: 'fertilization',
            timeframe: 'Next 5 days'
          });
        }

        if (soilData.phosphorus < 20) {
          newRecommendations.push({
            id: 'fert-2',
            title: 'Supplement Phosphorus',
            description: `Phosphorus levels are below optimal (${soilData.phosphorus} ppm). Consider phosphate fertilizer application.`,
            priority: 'medium',
            category: 'fertilization',
            timeframe: 'Next week'
          });
        }

        if (soilData.organicCarbon < 1.0) {
          newRecommendations.push({
            id: 'soil-3',
            title: 'Add Organic Matter',
            description: `Organic carbon is low (${soilData.organicCarbon.toFixed(1)}%). Add compost or organic matter to improve soil health.`,
            priority: 'medium',
            category: 'soil_management',
            timeframe: 'Next 2 weeks'
          });
        }
      }

      // Risk-based recommendations
      if (riskLevels) {
        if (riskLevels.pest > 60) {
          newRecommendations.push({
            id: 'pest-2',
            title: 'Implement Pest Control Measures',
            description: `High pest risk detected (${riskLevels.pest}%). Deploy integrated pest management strategies immediately.`,
            priority: 'high',
            category: 'pest_control',
            timeframe: 'Immediate'
          });
        }

        if (riskLevels.drought > 60) {
          newRecommendations.push({
            id: 'irrigation-2',
            title: 'Activate Drought Response Plan',
            description: `High drought risk (${riskLevels.drought}%). Implement water conservation and stress mitigation measures.`,
            priority: 'high',
            category: 'irrigation',
            timeframe: 'Immediate'
          });
        }
      }

      // Seasonal recommendations
      const currentMonth = new Date().getMonth();
      if (currentMonth >= 2 && currentMonth <= 4) { // Spring
        newRecommendations.push({
          id: 'season-1',
          title: 'Prepare for Growing Season',
          description: 'Spring is ideal for soil preparation, seed planting, and establishing irrigation systems.',
          priority: 'medium',
          category: 'soil_management',
          timeframe: 'Next month'
        });
      }

      setRecommendations(newRecommendations);
      console.log('Generated recommendations:', newRecommendations);
    };

    generateRecommendations();
  }, [weatherData, soilData, riskLevels, location]);

  const toggleCompleted = (id: string) => {
    const newCompleted = new Set(completedActions);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedActions(newCompleted);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation': return '💧';
      case 'pest_control': return '🐛';
      case 'fertilization': return '🌱';
      case 'disease_prevention': return '🍃';
      case 'soil_management': return '🌍';
      default: return '📋';
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All', count: recommendations.length },
    { id: 'irrigation', name: 'Irrigation', count: recommendations.filter(r => r.category === 'irrigation').length },
    { id: 'pest_control', name: 'Pest Control', count: recommendations.filter(r => r.category === 'pest_control').length },
    { id: 'fertilization', name: 'Fertilization', count: recommendations.filter(r => r.category === 'fertilization').length },
    { id: 'disease_prevention', name: 'Disease Prevention', count: recommendations.filter(r => r.category === 'disease_prevention').length },
    { id: 'soil_management', name: 'Soil Management', count: recommendations.filter(r => r.category === 'soil_management').length }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <span>AI Recommendations</span>
        </CardTitle>
        <CardDescription>
          Personalized farming recommendations based on real-time data analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((rec) => (
              <div key={rec.id} className={`p-4 rounded-lg border transition-all ${
                completedActions.has(rec.id) ? 'bg-gray-50 opacity-75' : 'bg-white hover:shadow-md'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(rec.category)}</span>
                    <h4 className={`font-semibold text-sm ${
                      completedActions.has(rec.id) ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {rec.title}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCompleted(rec.id)}
                      className="p-1 h-auto"
                    >
                      {completedActions.has(rec.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <p className={`text-xs mb-2 ${
                  completedActions.has(rec.id) ? 'text-gray-500' : 'text-gray-700'
                }`}>
                  {rec.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {rec.timeframe}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                No recommendations available for the selected category.
                <br />
                Check back as conditions change.
              </p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{recommendations.length}</div>
            <div className="text-xs text-gray-600">Total Actions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">
              {recommendations.filter(r => r.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-600">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{completedActions.size}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
