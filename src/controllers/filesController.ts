import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path = require('path');
import multer, { FileFilterCallback } from 'multer';
import { saveFiles, saveLikes, setFileAsDeleted, removeFilePermanently, fetchFilesByLikes, findFilesByName } from '../services/filesService';
import { files } from '../types/Files';

// Configuración de las rutas para los archivos
const filesDir = path.join(__dirname, '../uploads/files');
const pictureDir = path.join(__dirname, '../uploads/picture');

// Crear las carpetas si no existen
if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });
if (!fs.existsSync(pictureDir)) fs.mkdirSync(pictureDir, { recursive: true });

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const mimeType = file.mimetype;
        cb(null, mimeType.startsWith('image') ? pictureDir : filesDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para validar los tipos de archivos permitidos
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = [
        'image/jpeg', // JPG
        'image/png', // PNG
        'application/pdf', // PDF
        'application/msword', // Word .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word .docx
        'application/vnd.ms-powerpoint', // PowerPoint .ppt
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PowerPoint .pptx
        'application/vnd.ms-excel', // Excel .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Excel .xlsx
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'));
    }
};

// Exportar la configuración de multer con los límites y el filtro de archivos
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB máximo
    }
});

export const fileSaves =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as Express.Multer.File[];
        
        
        if (!files || files.length === 0) {
                res.status(400).json({
                success: false,
                message: 'No se subieron archivos'
            });
        }
        
        // Procesar cada archivo y guardar en la base de datos
        const uploadPromises = files.map(async (file) => {

            const userId = (req as any).user.id;

            
            if (!userId) {
                throw new Error('user_id es necesario');
            }
            
            const fileData: Partial<files> = {
                user_id: userId,
                file_name: file.originalname, 
                file_location: file.path,
                description: req.body.description || 'Sin descripción',
                file_type: file.mimetype,
                file_status: true,
                new_fileName: file.filename
            };
            
            await saveFiles(fileData as files);
            
            // Aquí debería devolver usando tus nombres de campos
            return {
              file_name: file.originalname, // Cambiar originalName por file_name
              file_location: file.path,     // Cambiar fileName y path por file_location
              size: file.size,              // Esto podría quedarse como una propiedad extra
              file_type: file.mimetype      // Cambiar type por file_type
            };
        });
        
        const uploadedFiles = await Promise.all(uploadPromises);
        
        res.status(200).json({
            success: true,
            message: `${files.length} archivo(s) subido(s) correctamente`,
            files: uploadedFiles
        });
        
    } catch (error) {
        console.error('Error al subir archivos:', error);
        next(error); // Pasar error a Express si hay middleware de manejo de errores
    }
};

export const LikeSave = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    try{
        const { fileId } = req.body;

        if (!fileId) {
                res.status(400).json({
                success: false,
                message: 'El ID del archivo es requerido.'
            });
        }

        // Crear un objeto fileData solo con el id, usando Partial<files> para permitir campos opcionales
        const fileData: Partial<files> = {
            id: fileId  // Solo el id es necesario
        };

        // Llamar a la función que guarda el "like"
        await saveLikes(fileData as files);  //El tipo 'files' es requerido por la función saveLikes

        res.status(200).json({
            success: true,
            message: 'Me gusta guardado exitosamente.'
        });

    }catch(error){
        console.error('Error al guardar tu like', error);
        next(error); // Pasar error a Express si hay middleware de manejo de errores
    }
};

export const deleteFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { fileId } = req.body;

        if (!fileId) {
            res.status(400).json({
            success: false,
            message: 'El ID del archivo es requerido.'
            });
        }

        // Crear un objeto fileData solo con el id, usando Partial<files> para permitir campos opcionales
        const fileData: Partial<files> = {
            id: fileId  // Solo el id es necesario
        };

        await setFileAsDeleted(fileData as files);

        res.status(200).json({
            success: true,
            message: 'se a dado de vaja exitosamente'
        });

    }catch(error){
        console.error('Error al guardar tu like', error);
        next(error); // Pasar error a Express si hay middleware de manejo de errores
    }
};

export const removeteFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { fileId } = req.body;

        if (!fileId) {
            res.status(400).json({
            success: false,
            message: 'El ID del archivo es requerido.'
            });
        }

        // Crear un objeto fileData solo con el id, usando Partial<files> para permitir campos opcionales
        const fileData: Partial<files> = {
            id: fileId  // Solo el id es necesario
        };

        await removeFilePermanently(fileData as files);

        res.status(200).json({
            success: true,
            message: 'se a eliminado'
        });

    }catch(error){
        console.error('Error al guardar tu like', error);
        next(error); // Pasar error a Express si hay middleware de manejo de errores
    }
};

export const getFilesByLikesController = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const files = await fetchFilesByLikes();  // Llama a la función de servicio

        const filesWithUrl = files.map((file: any) => ({
            ...file,
            file_location: `http://localhost:3000/uploads/${file.file_type.startsWith('image') ? 'picture' : 'files'}/${file.new_fileName}`
        }));

        res.status(200).json({
            success: true,
            message: 'Archivos obtenidos correctamente.',
            files: filesWithUrl,
        });
    } catch (error) {
        console.error('Error al obtener archivos por likes:', error);
        next(error); // Pasar error a Express si hay middleware de manejo de errores
    }
};


export const searchFilesByNameController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { searchTerm } = req.query;  // El término de búsqueda viene de la query string
        
        if (typeof searchTerm !== 'string' || !searchTerm.trim()) {
            res.status(400).json({
                success: false,
                message: 'El término de búsqueda no puede estar vacío.',
            });
            return;  // Termina la ejecución del controlador si no hay término de búsqueda válido
        }

        const files = await findFilesByName(searchTerm);  // Llama a la función de servicio
        res.status(200).json({
            success: true,
            message: 'Archivos encontrados correctamente.',
            files,
        });
    } catch (error) {
        console.error('Error al buscar archivos por nombre:', error);
        next(error); // Pasar error a Express si hay middleware de manejo de errores
    }
};