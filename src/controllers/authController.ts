
import { Request, Response } from 'express';

export const getRequest = (req: Request, res: Response) => {
    console.log('Petición GET /');
    //res.send('Hola Mundo /');
    res.json({
        mensaje: 'Hola Mundo /'
    });
};


export const crearUsuario = (req: Request, res: Response) => {
    console.log('Petición POST /new');
    res.json({
        mensaje: 'Registro /new'
    });
};

export const loginUsuario = (req: Request, res: Response) => {
    console.log('Petición POST /');
    res.json({
        mensaje: 'login /'
    });
};

export const revalidarToken = (req: Request, res: Response) => {
    console.log('Petición POST /renew');
    res.json({
        mensaje: 'Renew /renew'
    });
};

// module.exports = {
//     crearUsuario
// }