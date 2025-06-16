import { useState, useEffect } from "react";
import "../styles/global.css";
import { GET } from "astro/assets/endpoint/generic";
import axios from "axios";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("New York");
  const [cities, setCities] = useState([
    "New York",
    "London",
    "Tokyo",
    "Sydney",
    "Paris",
    "Berlin",
  ]);
 

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/weather/${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const fetchCity = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/cities`);
      setCities(response.data);
    } catch (err) {
      setError("Failed to set cities data");
    }
  };

  useEffect(()=>{
    fetchCity();
  },[]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-serif text-gray-900 mb-1">
          Weather Dashboard
        </h1>
        <p className="text-gray-600 text-sm">Current conditions and forecast</p>
      </div>

      <div className="px-8 py-6">
        {/* City Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select City
          </label>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm mt-4">Loading weather data</p>
            </div>
          )}

          {error && (
            <div className="py-8 text-center">
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => fetchWeather(selectedCity)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {weatherData && !loading && (
            <div className="space-y-6">
              {/* Main Weather Display */}
              <div className="text-center space-y-3">
                <div className="text-6xl leading-none mb-3">
                  {weatherData.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-1">
                    {weatherData.temperature}°C
                  </h2>
                  <p className="text-gray-600 capitalize text-base">
                    {weatherData.condition}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Humidity</span>
                  <span className="font-medium text-gray-900">
                    {weatherData.humidity}%
                  </span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                  <span className="text-gray-600 text-sm">Wind speed</span>
                  <span className="font-medium text-gray-900">
                    {weatherData.windSpeed} km/h
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-2">
                <p className="text-xs text-gray-400">
                  Last updated{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
