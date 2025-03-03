import React, { useState, useEffect } from 'react';
import { Search, Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from 'lucide-react';

// API key for OpenWeatherMap
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun className="h-16 w-16 text-yellow-400" />;
      case 'clouds':
        return <Cloud className="h-16 w-16 text-gray-400" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="h-16 w-16 text-blue-400" />;
      default:
        return <Cloud className="h-16 w-16 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Weather App</h1>
          <p>/Imagine a photorealistic tableau of Emma Watson, her tiny stature (1:100 ratio compared to Hagrid) creating a jaw-dropping contrast with Hagrid's colossal frame, as they plummet vertically through the clouds in a high-speed nose dive during the vibrant Holi festivities. She sits astride a broomstick, wearing a strapless bikini top paired with swimsuit underwear, the minimal fabric accentuating her figure, with vibrant Holi colors splashed across her outfit. The deep décolletage of her bikini top draws attention to her graceful curves, highlighted by the golden afternoon sunlight, adding depth and dimension to her form. Her lengthy red tresses cascade backward in the wind as she bends forward, her body parallel to the broomstick, while Hagrid, his gigantic form towering over her like a mountain, sits behind her, his massive hands (each larger than her entire torso) resting firmly on her hips, his fingers gently pressing into the soft contours of her waist as he guides her through the dive. The extreme size difference is emphasized as his broad chest presses against her back, his hands nearly encircling her completely. Golden afternoon sunlight illuminates swirling clouds of pink, yellow, and green Holi powder in the air as they plummet vertically through the sky at breakneck speed, the Hogwarts castle towers and turrets visible in the distance, the Quidditch pitch and green grounds displaying scattered colored powders far below. Cinematic quality, emotional connection, detailed facial expressions.
</p>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p>{error}</p>
            </div>
          )}

          {weather && !loading && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
                  <p className="text-gray-600">{weather.sys.country}</p>
                </div>
                <div className="flex flex-col items-center">
                  {getWeatherIcon(weather.weather[0].main)}
                  <p className="text-gray-700 mt-1 capitalize">{weather.weather[0].description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                  <Thermometer className="h-6 w-6 text-red-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-lg font-semibold">{Math.round(weather.main.temp)}°C</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                  <Thermometer className="h-6 w-6 text-orange-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Feels Like</p>
                    <p className="text-lg font-semibold">{Math.round(weather.main.feels_like)}°C</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                  <Droplets className="h-6 w-6 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-lg font-semibold">{weather.main.humidity}%</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                  <Wind className="h-6 w-6 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="text-lg font-semibold">{weather.wind.speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;