import { promises } from 'nodemailer/lib/xoauth2';
import pool from '../config/db';
import { files } from '../types/Files';

//insertar archivo
//user_id?: number, file_name: string,  file_location: string, creation_date?: Date, description: string, file_type: string, file_status: boolean
export const saveFile = async (files: files): Promise<void> =>{
    
    const sql = 'INSERT INTO files (user_id, file_name, file_location, description, file_type, file_status, new_fileName) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const values = [files.user_id, files.file_name, files.file_location, files.description, files.file_type, files.file_status, files.new_fileName];
    console.log("Valores para insertar:", values);  //para ver si se manda los valores o resive


    try {
        const connection = await pool.getConnection();
        await connection.execute(sql, values);
        connection.release();
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Archivo duplicado. Verifica los datos antes de insertar.');
        } else if (error.code === 'ER_NO_SUCH_TABLE') {
            throw new Error('La tabla especificada no existe en la base de datos.');
        } else {
            console.error('Error general al guardar el archivo:', error);
            throw new Error('Error desconocido al insertar archivo.');
        }
    }
}

// insertar likes al archivo
export const saveLike = async (id: number): Promise<void> =>{
    const sql = 'UPDATE files SET likes_count= likes_count + 1 WHERE id = ?';
    const values = [id];

    try
    {
        const connection = await pool.getConnection();
        await connection.execute(sql, values);
        connection.release(); // Libera la conexión
    } catch (error) {
        console.error('Error al guardar el archivo:', error);
        throw new Error('Error al insertar archivo');
    }
}

// Cambiar el estado a 'deleted' (dar de baja lógica)
export const markFileAsDeleted = async (file: files): Promise<void> => {
    const sql = 'UPDATE files SET file_status = false WHERE id = ?';
    const values = [file.id];

    try {
        const connection = await pool.getConnection();
        await connection.execute(sql, values);
        connection.release();
    } catch (error) {
        console.error('Error al marcar archivo como eliminado:', error);
        throw new Error('Error al cambiar estado del archivo');
    }
}

// Dar de baja permanente del archivo (eliminación física)
export const deleteFilePermanently = async (file: files): Promise<void> => {
    const sql = 'DELETE FROM files WHERE id = ?';
    const values = [file.id];

    try {
        const connection = await pool.getConnection();
        await connection.execute(sql, values);
        connection.release();
    } catch (error) {
        console.error('Error al eliminar archivo permanentemente:', error);
        throw new Error('Error al eliminar archivo');
    }
}

// Ordenar archivos por likes (descendente)
export const getFilesByLikes = async (): Promise<files[]> => {
    const sql = 'SELECT * FROM files WHERE file_status = true ORDER BY likes_count DESC';
    
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(sql);
        connection.release();
        return rows as files[];
    } catch (error) {
        console.error('Error al obtener archivos ordenados por likes:', error);
        throw new Error('Error al consultar archivos');
    }
}

// Buscar archivo por nombre
export const searchFilesByName = async (searchTerm: string): Promise<files[]> => {
    const sql = 'SELECT * FROM files WHERE file_name LIKE ? AND file_status = true';
    const values = [`%${searchTerm}%`];
    
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(sql, values);
        connection.release();
        return rows as files[];
    } catch (error) {
        console.error('Error al buscar archivos por nombre:', error);
        throw new Error('Error al buscar archivos');
    }
}