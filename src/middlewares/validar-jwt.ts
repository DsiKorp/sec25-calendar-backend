import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extender la interfaz Request para agregar propiedades personalizadas
declare global {
    namespace Express {
        interface Request {
            uid?: string;
            name?: string;
        }
    }
}

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    console.log('Token recibido:', token);


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        // payload: { uid, name, iat, exp }
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED || ''
        ) as { uid: string, name: string };

        console.log({ uid, name });

        req.uid = uid;
        req.name = name;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
};
