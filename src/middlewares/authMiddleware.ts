import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../middlewares/customError';

interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extraer token del header

    if (!token) {
        const error = new CustomError('Acceso denegado. Token no proporcionado.', 401);
        return next(error); // Pasar el error al siguiente middleware
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new CustomError('JWT_SECRET no está definido', 500); // Usar CustomError con status 500
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Guardar datos del usuario en la request
        next(); // Continuar con la siguiente función (Middleware o controlador)
    } catch (error) {
        const errorMessage = new CustomError('Token inválido o expirado', 403);
        next(errorMessage); // Pasar el error al siguiente middleware de manejo de errores
    }
};
