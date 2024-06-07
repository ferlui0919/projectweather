import axios from 'axios';

// Clave de API y URL base para las solicitudes a la API del clima
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/data/2.5';

// Función para obtener datos de contaminación del aire
export const getAirPollution = async (lat, lon) => {
    const response = await axios.get(`${BASE_URL}/air_pollution/history`, {
        params: {
            lat, 
            lon, 
            start: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 90, // Hace 90 días desde la fecha actual
            end: Math.floor(Date.now() / 1000), // Fecha actual
            appid: API_KEY, 
        },
    });
    return response.data; // Devuelve los datos obtenidos de la API
};

// Función para obtener pronóstico del clima
export const getWeatherForecast = async (lat, lon) => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            lat, 
            lon, 
            appid: API_KEY, 
            units: 'metric', // Unidades métricas para la temperatura y otros parámetros
        },
    });
    return response.data; 
};

// Función para obtener el clima actual
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
