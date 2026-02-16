/*
    Rutas de usuarios /auth
    host + /api/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { getRequest, crearUsuario, loginUsuario, revalidarToken } from '../controllers/authController';

const router = Router();

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
router.get('/renew', validarJWT, revalidarToken);



module.exports = router;