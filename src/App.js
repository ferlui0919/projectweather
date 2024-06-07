import React, { useEffect, useState } from 'react';
import useCurrentLocation from './hooks/useCurrentLocation';
import { getCurrentWeather, getWeatherForecast, getAirPollution } from './services/weatherApi';
import AirPollutionChart from './components/AirPollutionChart';
import PrecipitationChart from './components/PrecipitationChart';
import WeatherTable from './components/WeatherTable';
import './css/App.css'; // Importa el archivo CSS para aplicar estilos
import Modal from 'react-modal'; // Importa react-modal

// Función para mostrar el mensaje del modal
const ModalMessage = ({ isOpen, onRequestClose }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Permission Modal"
        className="modal"
        overlayClassName="overlay"
    >
        <h2>Permitir Acceso a la Ubicación</h2>
        <p>Por favor, permita el acceso a su ubicación para mostrar los datos meteorológicos correspondientes.</p>
    </Modal>
);

// Componente principal
const App = () => {
    const { location, error: locationError } = useCurrentLocation();
    const [currentWeather, setCurrentWeather] = useState(null);
    const [weatherForecast, setWeatherForecast] = useState(null);
    const [airPollution, setAirPollution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(true); // Estado para controlar la apertura del modal

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (location) {
                try {
                    setLoading(true); // Iniciar el estado de carga
                    const current = await getCurrentWeather(location.lat, location.lon);
                    const forecast = await getWeatherForecast(location.lat, location.lon);
                    const airPollutionData = await getAirPollution(location.lat, location.lon);

                    // Verifica la respuesta de la API en la consola
                    console.log('Current Weather:', current);
                    console.log('Weather Forecast:', forecast);
                    console.log('Air Pollution:', airPollutionData);

                    setCurrentWeather(current);
                    setWeatherForecast(forecast);
                    setAirPollution(airPollutionData);
                    setLoading(false); // Finalizar el estado de carga
                } catch (err) {
                    setError(err.message);
                    setLoading(false); // Finalizar el estado de carga en caso de error
                }
            }
        };

        fetchWeatherData();
    }, [location]);

    if (locationError) return <div>Error: {locationError}</div>;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App">
            <h1>Weather Dashboard</h1>
            <AirPollutionChart airPollution={airPollution} />
            <PrecipitationChart weatherForecast={weatherForecast} />
            <WeatherTable currentWeather={currentWeather} />
            <ModalMessage isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} /> {/* Renderiza el modal */}
        </div>
    );
};

export default App;
