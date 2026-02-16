import { Request, Response } from 'express';
import { Evento } from '../models/Evento';

export const getEventos = async (req: Request, res: Response) => {
    console.log('Petición GET /');

    try {
        // populate('user') es para traer toda la información del usuario que creó el evento, en lugar de solo su id
        // Si queremos traer solo el nombre del usuario, podemos usar populate('user', 'name')
        // populate('user', 'name email') es para traer solo el nombre y el email del usuario
        const eventos = await Evento.find().populate('user', 'name email');

        res.json({
            ok: true,
            msg: 'getEventos',
            eventos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener eventos, por favor contacte al administrador'
        });
    }
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

export const actualizarEvento = async (req: Request, res: Response) => {
    console.log('Petición PUT /');

    // Para obtener el id del evento a actualizar, lo obtenemos de los queries params, es decir, de la url, con req.params.id
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        // Si el evento no existe, retornamos un error 404
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'actualizarEvento: Evento no encontrado por id'
            });
        }

        // Si el evento existe, pero el usuario que lo creó no es el mismo que 
        // el usuario que está intentando actualizarlo, retornamos un error 401
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'actualizarEvento: No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        //  { new: true } es para que el método findByIdAndUpdate retorne el evento actualizado, en lugar del evento original
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            msg: 'actualizarEvento',
            evento: eventoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'actualizarEvento: Error al actualizar evento, por favor contacte al administrador'
        });
    }
};

export const eliminarEvento = async (req: Request, res: Response) => {
    console.log('Petición DELETE /');

    // Para obtener el id del evento a eliminar, lo obtenemos de los queries params, es decir, de la url, con req.params.id
    const eventoId = req.params.id;
    const uid = req.uid;


    try {
        const evento = await Evento.findById(eventoId);

        // Si el evento no existe, retornamos un error 404
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'eliminarEvento: Evento no encontrado por id'
            });
        }

        // Si el evento existe, pero el usuario que lo creó no es el mismo que 
        // el usuario que está intentando eliminarlo, retornamos un error 401
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'eliminarEvento: No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: `eliminarEvento: Evento ${eventoId} eliminado correctamente`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'eliminarEvento: Error al eliminar evento, por favor contacte al administrador'
        });

    }
};