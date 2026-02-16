import { Router } from 'express';
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from '../controllers/eventsController';

const router = Router();

router.get('/', getEventos);
router.post('/', crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);


module.exports = router;