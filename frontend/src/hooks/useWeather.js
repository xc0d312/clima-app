import { useState } from 'react';
import {
  obtenerClimaPorCiudad,
  obtenerClimaPorCoordenadas,
} from '../services/weatherApi.js';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ultimaBusqueda, setUltimaBusqueda] = useState('');

  async function buscarPorCiudad(ciudad) {
    setLoading(true);
    setError('');
    setUltimaBusqueda(`Ciudad: ${ciudad}`);

    try {
      const data = await obtenerClimaPorCiudad(ciudad);
      setWeather(data);
    } catch (requestError) {
      setWeather(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function buscarPorCoordenadas(latitud, longitud) {
    setLoading(true);
    setError('');
    setUltimaBusqueda(`Coordenadas: ${latitud}, ${longitud}`);

    try {
      const data = await obtenerClimaPorCoordenadas(latitud, longitud);
      setWeather(data);
    } catch (requestError) {
      setWeather(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    weather,
    loading,
    error,
    buscarPorCiudad,
    buscarPorCoordenadas,
    ultimaBusqueda,
  };
}
