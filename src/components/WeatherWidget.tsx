
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

interface WeatherWidgetProps {
  location: { lat: number; lng: number };
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState({
    temperature: 24,
    humidity: 68,
    windSpeed: 12,
    condition: 'partly-cloudy',
    rainfall: 2.3,
    forecast: [
      { day: 'Today', temp: 24, condition: 'partly-cloudy', rain: 10 },
      { day: 'Tomorrow', temp: 26, condition: 'sunny', rain: 0 },
      { day: 'Wed', temp: 22, condition: 'rainy', rain: 80 },
      { day: 'Thu', temp: 25, condition: 'cloudy', rain: 30 },
      { day: 'Fri', temp: 27, condition: 'sunny', rain: 5 }
    ]
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'rainy': return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'cloudy': return <Cloud className="h-5 w-5 text-gray-500" />;
      default: return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getRainColor = (chance: number) => {
    if (chance > 70) return 'text-blue-600 bg-blue-50';
    if (chance > 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  // Simulate weather data updates based on location
  useEffect(() => {
    const updateWeatherData = () => {
      const baseTemp = 20 + Math.sin(location.lat * 0.1) * 10;
      const tempVariation = (Math.random() - 0.5) * 6;
      const newTemp = Math.round(baseTemp + tempVariation);
      
      setWeatherData(prev => ({
        ...prev,
        temperature: newTemp,
        humidity: Math.round(60 + Math.random() * 30),
        windSpeed: Math.round(8 + Math.random() * 12)
      }));
    };

    updateWeatherData();
  }, [location]);

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Cloud className="h-5 w-5 text-blue-600" />
          <span>Weather Monitoring</span>
        </CardTitle>
        <CardDescription>
          Real-time weather data and 5-day forecast
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getWeatherIcon(weatherData.condition)}
              <span className="text-2xl font-bold text-gray-900">
                {weatherData.temperature}°C
              </span>
            </div>
            <Badge variant="outline" className="bg-white/80">
              Current
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-gray-600">{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wind className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{weatherData.windSpeed} km/h</span>
            </div>
            <div className="flex items-center space-x-1">
              <CloudRain className="h-4 w-4 text-blue-600" />
              <span className="text-gray-600">{weatherData.rainfall}mm</span>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">5-Day Forecast</h4>
          <div className="space-y-2">
            {weatherData.forecast.map((day, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(day.condition)}
                  <span className="font-medium text-sm text-gray-900">{day.day}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-gray-900">{day.temp}°C</span>
                  <Badge className={`${getRainColor(day.rain)} text-xs`}>
                    {day.rain}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Thermometer className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Weather Advisory</span>
          </div>
          <p className="text-xs text-amber-700">
            High humidity expected midweek. Monitor for increased pest activity and fungal risks.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
