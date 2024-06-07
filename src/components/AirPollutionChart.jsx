import React from 'react';
import { Line } from 'react-chartjs-2';
import '../css/AirPollutionChart.css'; // Importa el archivo CSS

// Componente funcional para mostrar el gráfico de contaminación del aire
const AirPollutionChart = ({ airPollution }) => {
    // Verifica si hay datos de contaminación del aire disponibles
    if (!airPollution) return <div>Loading...</div>;

    // Filtrar los datos para mostrar solo los últimos 90 días
    const ninetyDaysData = airPollution.list.slice(-90);

    // Preparar datos para el gráfico
    const labels = ninetyDaysData.map((entry, index) => `Day ${index + 1}`);
    const data = {
        labels,
        datasets: [
            {
                label: 'Air Pollution Level',
                data: ninetyDaysData.map(entry => entry.main.aqi),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    // Opciones del gráfico
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'AQI (Air Quality Index)',
                },
                ticks: {
                    // Personaliza los valores del eje Y para mostrar los niveles de contaminación
                    callback: function(value, index, values) {
                        switch (value) {
                            case 1:
                                return 'Good';
                            case 2:
                                return 'Moderate';
                            case 3:
                                return 'Unhealthy for Sensitive Groups';
                            case 4:
                                return 'Unhealthy';
                            case 5:
                                return 'Very Unhealthy';
                            case 6:
                                return 'Hazardous';
                            default:
                                return '';
                        }
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Oculta la leyenda de la gráfica
            },
        },
    };

    return (
        <div className="air-pollution-container">
            <div className="air-pollution-info">
                <h3>Air Pollution Levels</h3>
                <ul>
                    <li>1: Good</li>
                    <li>2: Moderate</li>
                    <li>3: Unhealthy for Sensitive Groups</li>
                    <li>4: Unhealthy</li>
                    <li>5: Very Unhealthy</li>
                    <li>6: Hazardous</li>
                </ul>
            </div>
            <h2>Air Pollution Over the Last 3 Months</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default AirPollutionChart;
