import { AppError } from '../errors/AppError.js';

export async function obtenerCoordenadas(ciudad) {
    const urlGeocoding = process.env.API_GEOLOCATION_URL;

    if (!urlGeocoding) {
        throw new AppError('La URL de geocodificacion no esta configurada', 500);
    }

    const parametros = new URLSearchParams({
        name: ciudad,
        count: '1',
        language: 'es',
        format: 'json',
    });

    const urlCompleta = `${urlGeocoding}?${parametros.toString()}`;

    try {
        const respuesta = await fetch(urlCompleta);

        if (!respuesta.ok) {
            throw new AppError(`Error en la geocodificacion: ${respuesta.status}`, 502);
        }

        const datos = await respuesta.json();

        if (!datos.results || datos.results.length === 0) {
            throw new AppError(`No se encontraron coordenadas para la ciudad: ${ciudad}`, 404);
        }

        const { latitude, longitude } = datos.results[0];

        return { latitud: latitude, longitud: longitude };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(`Error al obtener coordenadas: ${error.message}`, 502);
    }
}
