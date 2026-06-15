import weatherCodeMap from '../utils/weatherCodeMap.js';
import { AppError } from '../errors/AppError.js';

export async function consultarClimaPorCoordenadas(latitud, longitud) {
    const apiUrl = process.env.API_CLIMA_URL;

    if (!apiUrl) {
        throw new AppError('API_CLIMA_URL no esta definida en las variables de entorno', 500);
    }

    const parametros = new URLSearchParams({
        latitude: String(latitud),
        longitude: String(longitud),
        current: 'apparent_temperature,is_day,weather_code,rain,temperature_2m',
        timezone: 'auto',
        forecast_days: '1',
    });

    try {
        const response = await fetch(`${apiUrl}?${parametros.toString()}`);

        if (!response.ok) {
            throw new AppError(`Error consultando clima: ${response.status}`, 502);
        }

        const data = await response.json();
        const weatherCode = data.current?.weather_code;
        const descripcionClima = weatherCodeMap[weatherCode] || 'Clima desconocido';

        return {
            ubicacion: {
                latitud,
                longitud,
            },
            climaActual: {
                temperatura: data.current?.temperature_2m,
                sensacionTermica: data.current?.apparent_temperature,
                lluvia: data.current?.rain,
                esDeDia: data.current?.is_day,
                codigoClima: weatherCode,
                descripcion: descripcionClima,
            },
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(`Fallo al obtener el clima: ${error.message}`, 502);
    }
}
