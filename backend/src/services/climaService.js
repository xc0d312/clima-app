import { obtenerCoordenadas } from '../integrations/geocodingService.js';
import { consultarClimaPorCoordenadas } from '../integrations/weatherService.js';
import { AppError } from '../errors/AppError.js';

// Los services coordinan pasos de negocio. Aqui no hablamos HTTP ni construimos respuestas.
export async function obtenerClimaPorCiudad(ciudad) {
    if (!ciudad || !ciudad.trim()) {
        throw new AppError('La ciudad es requerida', 400);
    }

    const { latitud, longitud } = await obtenerCoordenadas(ciudad.trim());
    return consultarClimaPorCoordenadas(latitud, longitud);
}

export async function obtenerClimaPorCoordenadas(latitud, longitud) {
    if (latitud == null || longitud == null) {
        throw new AppError('Latitud y longitud son requeridas', 400);
    }

    const latitudNormalizada = Number(latitud);
    const longitudNormalizada = Number(longitud);

    if (Number.isNaN(latitudNormalizada) || Number.isNaN(longitudNormalizada)) {
        throw new AppError('Latitud y longitud deben ser numeros validos', 400);
    }

    if (latitudNormalizada < -90 || latitudNormalizada > 90) {
        throw new AppError('La latitud debe estar entre -90 y 90', 400);
    }

    if (longitudNormalizada < -180 || longitudNormalizada > 180) {
        throw new AppError('La longitud debe estar entre -180 y 180', 400);
    }

    return consultarClimaPorCoordenadas(latitudNormalizada, longitudNormalizada);
}
