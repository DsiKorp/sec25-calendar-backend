/*
    Rutas de eventos /events
    host + /api/events
*/

import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from '../controllers/eventsController';

const router = Router();

router.get('/', validarJWT, getEventos);
router.post('/', validarJWT, crearEvento);
router.put('/:id', validarJWT, actualizarEvento);
router.delete('/:id', validarJWT, eliminarEvento);


module.exports = router;