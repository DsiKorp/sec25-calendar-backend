
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'

import { Usuario } from '../models/Usuario';

export const getRequest = (req: Request, res: Response) => {
    console.log('Petición GET /');
    //res.send('Hola Mundo /');
    res.json({
        msg: 'Hola Mundo /'
    });
};


export const crearUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        //console.log(usuario);

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        res.status(201).json({
            ok: true,
            msg: 'Registro correcto',
            uid: usuario.id,
            name: usuario.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario, por favor contacte al administrador'
        });
    }
};

export const loginUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //console.log('Petición POST /');

    try {

        const usuario = await Usuario.findOne({ email });
        //console.log(usuario);

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        res.json({
            ok: true,
            msg: 'Login correcto',
            uid: usuario.id,
            name: usuario.name

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión, por favor contacte al administrador'
        });
    }




};

export const revalidarToken = (req: Request, res: Response) => {
    console.log('Petición POST /renew');
    res.json({
        ok: true,
        msg: 'Renew /renew'
    });
};

// module.exports = {
//     crearUsuario
// }