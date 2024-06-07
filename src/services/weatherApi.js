import axios from 'axios';

const API_KEY = '7ec03a22e6dcc2e19624b3aa0bd620bc';
const BASE_URL = 'http://api.openweathermap.org/data/2.5';


export const getAirPollution = async (lat, lon) => {
    const response = await axios.get(`${BASE_URL}/air_pollution/history`, {
        params: {
            lat,
            lon,
            start: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 90, // 3 months ago
            end: Math.floor(Date.now() / 1000),
            appid: API_KEY,
        },
    });
    return response.data;
};

export const getWeatherForecast = async (lat, lon) => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
        },
    });
    return response.data;
};

export const getCurrentWeather = async (lat, lon) => {
    const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
        },
    });
    return response.data;
};