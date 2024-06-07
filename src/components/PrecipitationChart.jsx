import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PrecipitationChart = ({ weatherForecast }) => {
    if (!weatherForecast) return <div>Loading...</div>;

    // Filtrar los datos para los próximos 5 días
    const nextFiveDays = weatherForecast.list.slice(0, 5);

    // Preparar datos para el gráfico
    const labels = nextFiveDays.map((entry, index) => `Day ${index + 1}`);
    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Temperature (°C)',
                data: nextFiveDays.map(entry => entry.main.temp),
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                yAxisID: 'y-axis-1',
            },
            {
                type: 'bar',
                label: 'Precipitation Probability (%)',
                data: nextFiveDays.map(entry => entry.pop * 100),
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(54,162,235,1)',
                yAxisID: 'y-axis-2',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                },
            },
            yAxes: [
                {
                    id: 'y-axis-1',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                    },
                },
                {
                    id: 'y-axis-2',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Precipitation Probability (%)',
                    },
                },
            ],
        },
    };

    return (
        <div>
            <h2>5-Day Weather Forecast</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default PrecipitationChart;
