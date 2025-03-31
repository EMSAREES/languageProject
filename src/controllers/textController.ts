import { Request, Response, NextFunction } from 'express';
import { generateText } from '../services/textService';
import { getLatestText } from '../models/textModel';

export const generateDailyText = async (req: Request, res: Response, next: NextFunction) => {
    try
    {
        const text = await generateText();
        res.status(201).json(text);
    } catch (error) {
        next(error);
    }
};

export const getTextOfTheDay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try 
    {
        const text = await getLatestText();
        if (!text) {
            // Aquí no es necesario "return", solo manejamos la respuesta
            res.status(404).json({ message: 'No hay textos generados aún.' });
            return; // Este return asegura que no continúe ejecutándose el código posterior
        }
        res.json(text); // Aquí sí respondemos con el texto encontrado
    } catch (error) {
        next(error); // Pasamos el error al middleware de manejo de errores
    }
};
