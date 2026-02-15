/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();
const { getRequest, crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController');

// getRequest
router.get(
    '/',
    getRequest
);

// crearUsuario
router.post('/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

// loginUsuario
router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

// revalidarToken
router.get('/renew', revalidarToken);



module.exports = router;