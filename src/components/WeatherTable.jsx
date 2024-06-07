import React from 'react';
import '../css/WeatherTable.css';

const WeatherTable = ({ currentWeather }) => {
    if (!currentWeather) return <div>Loading...</div>;

    return (
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
