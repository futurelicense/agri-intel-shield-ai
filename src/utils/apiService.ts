
// API configuration
const API_KEYS = {
  openWeather: 'f17e81a49b838826e860d5e195641c0b',
  sentinelHub: {
    clientId: '1e5a42f8-2c99-4637-8e97-c10811fdd2d7',
    clientSecret: 'A2fBg12rU2bKgMI97nQIAG5HYRuGLtiG'
  },
  planetLabs: 'PLAK1027964b903d4427a64a171967f955f4',
  googleEarthEngine: 'AIzaSyDanWieWiB0E9zHWq9AWk03cBLkWgtPq9I'
};

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  rainfall: number;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
    rain: number;
  }>;
}

export interface SoilData {
  ph: number;
  organicCarbon: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  temperature: number;
  salinity: number;
}

// Fetch weather data from OpenWeatherMap
export const fetchWeatherData = async (lat: number, lng: number): Promise<WeatherData> => {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS.openWeather}&units=metric`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEYS.openWeather}&units=metric`)
    ]);

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    const getCondition = (weatherId: number) => {
      if (weatherId >= 200 && weatherId < 300) return 'rainy';
      if (weatherId >= 300 && weatherId < 600) return 'rainy';
      if (weatherId >= 600 && weatherId < 700) return 'rainy';
      if (weatherId >= 700 && weatherId < 800) return 'cloudy';
      if (weatherId === 800) return 'sunny';
      return 'partly-cloudy';
    };

    const forecast = forecastData.list.slice(0, 5).map((item: any, index: number) => ({
      day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : 
           new Date(item.dt * 1000).toLocaleDateString('en', { weekday: 'short' }),
      temp: Math.round(item.main.temp),
      condition: getCondition(item.weather[0].id),
      rain: Math.round((item.pop || 0) * 100)
    }));

    return {
      temperature: Math.round(currentData.main.temp),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind?.speed * 3.6 || 0), // Convert m/s to km/h
      condition: getCondition(currentData.weather[0].id),
      rainfall: currentData.rain?.['1h'] || 0,
      forecast
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return fallback data
    return {
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
    };
  }
};

// Fetch soil data from SoilGrids API
export const fetchSoilData = async (lat: number, lng: number): Promise<SoilData> => {
  try {
    const properties = ['phh2o', 'soc', 'nitrogen', 'phoscr', 'ksat', 'sand', 'clay'];
    const depth = '0-5cm';
    
    const url = `https://rest.isric.org/soilgrids/v2.0/properties?lon=${lng}&lat=${lat}&property=${properties.join('&property=')}&depth=${depth}&value=mean`;
    
    const response = await fetch(url);
    const data = await response.json();

    // Extract values and convert units
    const getValue = (property: string) => {
      const prop = data.properties?.layers?.find((layer: any) => layer.name === property);
      return prop?.depths?.[0]?.values?.mean || 0;
    };

    return {
      ph: getValue('phh2o') / 10, // Convert from pH*10 to pH
      organicCarbon: getValue('soc') / 10, // Convert from g/kg to %
      nitrogen: getValue('nitrogen') / 100, // Convert from cg/kg to %
      phosphorus: getValue('phoscr') || 23, // mg/kg (ppm)
      potassium: getValue('ksat') || 180, // Approximate from available data
      moisture: 55 + Math.random() * 20, // Simulated (not available in SoilGrids)
      temperature: 18 + Math.random() * 8, // Simulated
      salinity: Math.random() * 1.5 // Simulated
    };
  } catch (error) {
    console.error('Error fetching soil data:', error);
    // Return fallback data
    return {
      ph: 6.8,
      organicCarbon: 1.2,
      nitrogen: 0.15,
      phosphorus: 23,
      potassium: 180,
      moisture: 65,
      temperature: 20.7,
      salinity: 0.8
    };
  }
};

// Placeholder for NDVI data (requires more complex Sentinel Hub authentication)
export const fetchNDVIData = async (lat: number, lng: number): Promise<number> => {
  try {
    // Note: Sentinel Hub requires OAuth2 authentication which is complex for frontend
    // For now, return simulated data based on location
    const baseNdvi = 0.6 + (Math.sin(lat * 0.1) * 0.2);
    const noise = (Math.random() - 0.5) * 0.1;
    return Math.max(0, Math.min(1, baseNdvi + noise));
  } catch (error) {
    console.error('Error fetching NDVI data:', error);
    return 0.75;
  }
};
