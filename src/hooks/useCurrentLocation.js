import { useState, useEffect } from 'react';

// Custom hook para obtener la ubicación actual del usuario
const useCurrentLocation = () => {
    // Estado para almacenar la ubicación actual del usuario
    const [location, setLocation] = useState(null);
    // Estado para manejar errores relacionados con la obtención de la ubicación
    const [error, setError] = useState(null);

    // Efecto que se ejecuta al renderizar el componente
    useEffect(() => {
        // Verifica si el navegador del usuario soporta la geolocalización
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        // Obtiene la ubicación actual del usuario
        navigator.geolocation.getCurrentPosition(
            // Callback en caso de éxito al obtener la ubicación
            (position) => {
                // Almacena la latitud y longitud en el estado
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            // Callback en caso de error al obtener la ubicación
            (err) => {
                // Almacena el mensaje de error en el estado
                setError(err.message);
            }
        );
    }, []); // El efecto se ejecuta solo una vez al montar el componente

    // Devuelve la ubicación actual y el posible error
    return { location, error };
};

export default useCurrentLocation;
