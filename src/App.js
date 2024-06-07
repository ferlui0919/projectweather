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
        {/* Mensaje para solicitar permiso de ubicación */}
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
        // Función asincrónica para obtener datos meteorológicos
        const fetchWeatherData = async () => {
            if (location) { // Verifica si la ubicación está disponible
                try {
                    setLoading(true); // Iniciar el estado de carga
                    // Obtener datos actuales del clima, pronóstico y contaminación del aire
                    const current = await getCurrentWeather(location.lat, location.lon);
                    const forecast = await getWeatherForecast(location.lat, location.lon);
                    const airPollutionData = await getAirPollution(location.lat, location.lon);

                    // Log de los datos obtenidos en la consola para depuración
                    console.log('Current Weather:', current);
                    console.log('Weather Forecast:', forecast);
                    console.log('Air Pollution:', airPollutionData);

                    // Actualizar estados con los datos obtenidos
                    setCurrentWeather(current);
                    setWeatherForecast(forecast);
                    setAirPollution(airPollutionData);
                    setLoading(false); // Finalizar el estado de carga
                } catch (err) { // Manejo de errores en caso de falla en las solicitudes
                    setError(err.message);
                    setLoading(false); // Finalizar el estado de carga en caso de error
                }
            }
        };

        fetchWeatherData(); // Llamada a la función para obtener datos meteorológicos
    }, [location]); // Se ejecuta cuando la ubicación cambia

    // Manejo de casos de error, carga y ubicación no disponible
    if (locationError) return <div>Error: {locationError}</div>;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Renderizado de componentes de la aplicación con datos meteorológicos
    return (
        <div className="App">
            {/* Título de la aplicación */}
            <h1>Weather Dashboard</h1>
            {/* Componente para mostrar el gráfico de contaminación del aire */}
            <AirPollutionChart airPollution={airPollution} />
            {/* Componente para mostrar el gráfico de precipitación */}
            <PrecipitationChart weatherForecast={weatherForecast} />
            {/* Componente para mostrar la tabla de datos meteorológicos actuales */}
            <WeatherTable currentWeather={currentWeather} />
            {/* Renderiza el modal para solicitar permiso de ubicación */}
            <ModalMessage isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
        </div>
    );
};

export default App;
