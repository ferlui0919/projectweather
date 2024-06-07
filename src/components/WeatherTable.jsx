import React from 'react';
import '../css/WeatherTable.css';

// Componente funcional para mostrar la tabla de datos meteorológicos
const WeatherTable = ({ currentWeather }) => {
    // Verifica si hay datos meteorológicos disponibles
    if (!currentWeather) return <div>Loading...</div>;

    return (
        // Estructura de la tabla
        <table className="weather-table">
            <thead>
                <tr>
                    <th>Temperature</th>
                    <th>Humidity</th>
                    <th>Pressure</th>
                    <th>Wind Speed</th>
                </tr>
            </thead>
            <tbody>
                {/* Fila de la tabla con los datos meteorológicos */}
                <tr>
                    <td>{currentWeather.main.temp}°C</td>
                    <td>{currentWeather.main.humidity}%</td>
                    <td>{currentWeather.main.pressure} hPa</td>
                    <td>{currentWeather.wind.speed} m/s</td>
                </tr>
            </tbody>
        </table>
    );
};

export default WeatherTable;
