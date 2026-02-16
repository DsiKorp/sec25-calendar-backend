/*
    Rutas de eventos /events
    host + /api/events
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar-campos';
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from '../controllers/eventsController';
import { isDate } from '../helpers/isDate';

const router = Router();
// Todas las rutas deben pasar por la validación del JWT
router.use(validarJWT);
router.get('/',
    [
        // check('title', 'El título es obligatorio').not().isEmpty(),
        // validarCampos
    ],
    getEventos);

router.post('/',
    [
        // check('title', 'El título es obligatorio').not().isEmpty(),
        // check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        // check('end', 'La fecha de fin es obligatoria').custom(isDate),

        // validarCampos
    ],
    crearEvento);

// router.put('/:id', [], actualizarEvento);

// router.delete('/:id', [], eliminarEvento);


module.exports = router;