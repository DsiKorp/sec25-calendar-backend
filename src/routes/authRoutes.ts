/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

import { Router } from 'express';
const router = Router();
const { getRequest, crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController');

router.get('/', getRequest);

router.post('/new', crearUsuario);

router.post('/', loginUsuario);

router.get('/renew', revalidarToken);



module.exports = router;