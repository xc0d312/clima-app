import {
    obtenerClimaPorCiudad,
    obtenerClimaPorCoordenadas,
} from '../services/climaService.js';

// El controller interpreta la peticion HTTP y delega el caso de uso al service.
export async function obtenerClimaActual(req, res) {
    const { ciudad, latitud, longitud } = req.query;

    try {
        if (ciudad) {
            const clima = await obtenerClimaPorCiudad(ciudad);
            return res.json(clima);
        }

        if (latitud == null || longitud == null) {
            return res.status(400).json({
                error: 'Debes enviar una ciudad o las coordenadas latitud y longitud',
            });
        }

        const clima = await obtenerClimaPorCoordenadas(latitud, longitud);
        return res.json(clima);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ error: error.message });
    }
}
