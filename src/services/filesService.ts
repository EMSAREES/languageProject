import { promises } from "nodemailer/lib/xoauth2";
import { saveFile, saveLike, markFileAsDeleted, deleteFilePermanently, getFilesByLikes, searchFilesByName} from "../models/filesModel";
import { files } from "../types/Files";
import path from 'path';

export const saveFiles = async(files: files): Promise<void> => {
    try{
        if (!files.file_name) {
            throw new Error('VALIDATION_ERROR: El nombre del archivo no puede estar vacío');
        }

        if (!files.file_location) {
            throw new Error('VALIDATION_ERROR: La ubicación del archivo no puede estar vacía');
        }

        if (!files.file_type) {
            throw new Error('VALIDATION_ERROR: El tipo de archivo no puede estar vacío');
        }

        await saveFile(files);
    } catch(error: any){
        if (error.message.startsWith('VALIDATION_ERROR')) {
            console.error('Error de validación:', error.message);
            throw new Error(error.message.replace('VALIDATION_ERROR: ', ''));
        }
        console.error('Error interno:', error.message);
        throw new Error('Error al guardar el archivo. Intenta nuevamente.');

    }
};

export const saveLikes = async(files: files): Promise<void> => {
    try
    {
        if (!files.id) {
            throw new Error('El ID del archivo no está definido');
        }

        await saveLike(files.id); // Pasamos el ID válido
    }catch(error: any){
        console.error('Error interno:', error.message);
        throw new Error('Error al guardar el archivo. Intenta nuevamente.');
    }
};

export const setFileAsDeleted = async (file: files): Promise<void> => {
    try {
        if (!file.id) {
            throw new Error('El ID del archivo no está definido');
        }
        await markFileAsDeleted(file);
    } catch (error: any) {
        console.error('Error interno al marcar archivo como eliminado:', error.message);
        throw new Error('Error al dar de baja el archivo.');
    }
};

export const removeFilePermanently = async (file: files): Promise<void> => {
    try {
        if (!file.id) {
            throw new Error('El ID del archivo no está definido');
        }
        await deleteFilePermanently(file);
    } catch (error: any) {
        console.error('Error interno al eliminar archivo permanentemente:', error.message);
        throw new Error('Error al eliminar el archivo permanentemente.');
    }
};

export const fetchFilesByLikes = async (): Promise<files[]> => {
    try {
        return await getFilesByLikes();
    } catch (error: any) {
        console.error('Error interno al obtener archivos por likes:', error.message);
        throw new Error('Error al consultar archivos ordenados por likes.');
    }
};

export const findFilesByName = async (searchTerm: string): Promise<files[]> => {
    try {
        if (!searchTerm.trim()) {
            throw new Error('El término de búsqueda no puede estar vacío.');
        }
        return await searchFilesByName(searchTerm);
    } catch (error: any) {
        console.error('Error interno al buscar archivos por nombre:', error.message);
        throw new Error('Error al buscar archivos con el término especificado.');
    }
};

