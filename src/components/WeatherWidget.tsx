import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { WeatherData } from '../types';

const API_KEY = 'e06cace5e13382fbcfcb973dc67e6b45';

const fetchWeather = async (city: string): Promise<WeatherData> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
        throw new Error('City not found');
    }
    return response.json();
};

const WeatherWidget: React.FC = () => {
    const [city, setCity] = useState('');
    const [searchCity, setSearchCity] = useState('');

    const { data: weather, isLoading, error, refetch } = useQuery<WeatherData>(
        ['weather', searchCity],
        () => fetchWeather(searchCity),
        {
            enabled: false,
            retry: false,
        }
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            setSearchCity(city.trim());
            refetch();
        }
    };

    const getWeatherIcon = (iconCode: string) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="space-y-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex space-x-2">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    type="submit"
                    disabled={!city.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Search
                </button>
            </form>

            {/* Weather Display */}
            <div className="min-h-[200px]">
                {isLoading && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Fetching weather...</p>
                    </div>
                )}

                {!!error && (
                    <div className="text-center py-8">
                        <div className="text-red-600 mb-2">⚠️</div>
                        <p className="text-red-600">
                            {error instanceof Error && error.message === 'City not found'
                                ? 'City not found. Please try a different city name.'
                                : 'Error fetching weather data. Please try again.'}
                        </p>
                    </div>
                )}

                {weather && !isLoading && (
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">{weather.name}</h3>
                            {weather.weather[0]?.icon && (
                                <img
                                    src={getWeatherIcon(weather.weather[0].icon)}
                                    alt={weather.weather[0].description}
                                    className="w-16 h-16"
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
                                <p className="text-sm opacity-90 capitalize">
                                    {weather.weather[0]?.description || 'Clear sky'}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center justify-end mb-2">
                                    <span className="text-sm opacity-90 mr-2">Humidity:</span>
                                    <span className="font-semibold">{weather.main.humidity}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!weather && !isLoading && !error && (
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">🌤️</div>
                        <p>Enter a city name to get weather information</p>
                        <p className="text-sm mt-1">
                            Note: You need to add your OpenWeatherMap API key to the WeatherWidget component
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherWidget;
