//generar la app de express
import express from 'express';
import router from './routes/weatherRoutes.js';
//importar cors para permitir peticiones desde el frontend
import cors from 'cors';

const app = express();
const corsOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'];
app.use(cors({ origin: corsOrigins }));

//middleware para parsear el body de las peticiones
app.use(express.json());

app.get('/', (_req, res) => {
    res.json({
        nombre: 'API de clima',
        estado: 'ok',
        endpoints: ['/health', '/clima?ciudad=Managua', '/clima?latitud=12.13&longitud=-86.25'],
    });
});

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

//rutas
app.use(router);


export default app;
