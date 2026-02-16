import { Request, Response } from 'express';
import { Evento } from '../models/Evento';

export const getEventos = (req: Request, res: Response) => {
    console.log('Petición GET /');
    res.json({
        ok: true,
        msg: 'getEventos'
    });
};

export const crearEvento = async (req: Request, res: Response) => {
    const evento = new Evento(req.body);
    console.log('------------------------------------')
    console.log(req.body);
    console.log(req.uid);
    console.log('------------------------------------')

    try {
        evento.user = req.uid as any;
        const eventoGuardado = await evento.save();
        console.log('Petición POST /');
        res.json({
            ok: true,
            msg: 'crearEvento',
            evento: eventoGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear evento, por favor contacte al administrador'
        });
    }
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