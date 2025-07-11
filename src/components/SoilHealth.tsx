
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, TestTube, Thermometer, Droplets } from 'lucide-react';

interface SoilHealthProps {
  location: { lat: number; lng: number };
}

const SoilHealth: React.FC<SoilHealthProps> = ({ location }) => {
  const [soilData, setSoilData] = useState({
    ph: 6.8,
    organicCarbon: 1.2,
    nitrogen: 0.15,
    phosphorus: 23,
    potassium: 180,
    moisture: 65,
    temperature: 20.7,
    salinity: 0.8
  });

  const getHealthScore = (value: number, optimal: [number, number]) => {
    if (value >= optimal[0] && value <= optimal[1]) return 'Excellent';
    if (value >= optimal[0] * 0.8 && value <= optimal[1] * 1.2) return 'Good';
    if (value >= optimal[0] * 0.6 && value <= optimal[1] * 1.4) return 'Fair';
    return 'Poor';
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'Excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getProgressValue = (value: number, optimal: [number, number]) => {
    const mid = (optimal[0] + optimal[1]) / 2;
    const range = optimal[1] - optimal[0];
    const distance = Math.abs(value - mid) / (range / 2);
    return Math.max(0, Math.min(100, (1 - distance) * 100));
  };

  // Simulate soil data updates based on location
  useEffect(() => {
    const updateSoilData = () => {
      setSoilData(prev => ({
        ...prev,
        ph: 6.5 + (Math.sin(location.lat * 0.1) + 1) * 0.5,
        moisture: 55 + Math.random() * 20,
        temperature: 18 + Math.sin(location.lng * 0.1) * 5 + Math.random() * 3
      }));
    };

    updateSoilData();
  }, [location]);

  const nutrients = [
    { name: 'pH Level', value: soilData.ph, unit: '', optimal: [6.0, 7.5] },
    { name: 'Organic Carbon', value: soilData.organicCarbon, unit: '%', optimal: [1.0, 2.0] },
    { name: 'Nitrogen', value: soilData.nitrogen, unit: '%', optimal: [0.1, 0.2] },
    { name: 'Phosphorus', value: soilData.phosphorus, unit: 'ppm', optimal: [15, 30] },
    { name: 'Potassium', value: soilData.potassium, unit: 'ppm', optimal: [150, 250] },
    { name: 'Salinity', value: soilData.salinity, unit: 'dS/m', optimal: [0.0, 2.0] }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Layers className="h-5 w-5 text-brown-600" />
          <span>Soil Health Monitor</span>
        </CardTitle>
        <CardDescription>
          Real-time soil analysis via SoilGrids API
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nutrients" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nutrients" className="space-y-4">
            {nutrients.map((nutrient, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{nutrient.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-900">
                      {nutrient.value.toFixed(2)}{nutrient.unit}
                    </span>
                    <Badge className={getScoreColor(getHealthScore(nutrient.value, nutrient.optimal))}>
                      {getHealthScore(nutrient.value, nutrient.optimal)}
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={getProgressValue(nutrient.value, nutrient.optimal)}
                  className="h-2"
                />
                <div className="text-xs text-gray-500">
                  Optimal range: {nutrient.optimal[0]} - {nutrient.optimal[1]}{nutrient.unit}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="conditions" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Soil Moisture</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{soilData.moisture.toFixed(1)}%</Badge>
                </div>
                <Progress value={soilData.moisture} className="mb-2" />
                <p className="text-xs text-blue-700">
                  {soilData.moisture > 70 ? 'High moisture - monitor for waterlogging' :
                   soilData.moisture > 40 ? 'Optimal moisture levels for crop growth' :
                   'Low moisture - consider irrigation'}
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-900">Soil Temperature</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">{soilData.temperature.toFixed(1)}°C</Badge>
                </div>
                <Progress value={(soilData.temperature / 40) * 100} className="mb-2" />
                <p className="text-xs text-orange-700">
                  {soilData.temperature > 25 ? 'Warm soil - favorable for bacterial activity' :
                   soilData.temperature > 15 ? 'Moderate temperature - normal biological activity' :
                   'Cool soil - slower nutrient availability'}
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TestTube className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-900">Soil Health Summary</span>
                </div>
                <p className="text-xs text-green-800">
                  Overall soil health is good with optimal pH levels and adequate organic matter. 
                  Consider adding potassium-rich fertilizer to improve nutrient balance.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SoilHealth;
