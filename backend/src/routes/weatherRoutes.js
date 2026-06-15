//Definimos rutas relacionadas con el clima
import express from 'express';
import { obtenerClimaActual } from '../controllers/climaController.js';
const router = express.Router();


//Ruta para obtener el clima actual
router.get('/clima', obtenerClimaActual);


export default router;