import { Request, Response } from 'express';


export const getEventos = (req: Request, res: Response) => {
    console.log('Petición GET /');
    res.json({
        ok: true,
        msg: 'getEventos'
    });
};

export const crearEvento = (req: Request, res: Response) => {
    console.log('Petición POST /');
    res.json({
        ok: true,
        msg: 'crearEvento'
    });
};

export const actualizarEvento = (req: Request, res: Response) => {
    console.log('Petición PUT /');
    res.json({
        ok: true,
        msg: 'actualizarEvento'
    });
};

export const eliminarEvento = (req: Request, res: Response) => {
    console.log('Petición DELETE /');
    res.json({
        ok: true,
        msg: 'eliminarEvento'
    });
};