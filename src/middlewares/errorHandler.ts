import { Request, Response, NextFunction } from 'express';
import { CustomError } from './customError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Verificar si el error es una instancia de CustomError
  const statusCode = err instanceof CustomError ? err.status : 500; // Si es CustomError, usa su código de estado
  const message = err.message || 'Error interno del servidor';

  console.error(err); // Para que puedas ver el error en consola

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};