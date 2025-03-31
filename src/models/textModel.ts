import connection from '../config/db';
import { Text } from '../types/Text';

// export const saveText = async (text:Text): Promise<void> => {  
//     const sql = 'INSERT INTO text_day (topic, content) VALUES (?, ?)';
//     await connection.query(sql, [text.topic, text.content]);
    
// };

// export const getLatestText = async (): Promise<Text | null> => {
//     const [rows]: any = await connection.query('SELECT * FROM text_day ORDER BY created_at DESC LIMIT 1');
//     return rows.length ? rows[0] : null;
// };

export const saveText = async (text: Text): Promise<void> => {
    try {
        // Validar los datos antes de insertarlos
        if (!text.topic || !text.content) {
            throw new Error('Los campos topic y content son obligatorios');
        }
        
        // Limitar la longitud para evitar problemas de almacenamiento
        const topicSafe = text.topic.substring(0, 255);
        const contentSafe = text.content.substring(0, 10000); // Define un límite apropiado
        
        const sql = 'INSERT INTO text_day (topic, content) VALUES (?, ?)';
        await connection.query(sql, [topicSafe, contentSafe]);
    } catch (error) {
        // Manejo de errores específico
        console.error('Error al guardar texto en la base de datos:', error);
        throw new Error('No se pudo guardar el texto en la base de datos');
    }
};

/**
 * Obtiene el texto más reciente de la base de datos
 */
export const getLatestText = async (): Promise<Text | null> => {
    try {
        // Especificar exactamente qué columnas se necesitan
        const sql = 'SELECT id, topic, content, created_at FROM text_day ORDER BY created_at DESC LIMIT 1';
        
        // Usar any[] temporal mientras manejamos los tipos adecuadamente
        const [rows]: any[] = await connection.query(sql);
        
        if (!rows || rows.length === 0) {
            return null;
        }
        
        // Extraer el primer resultado y convertirlo al tipo Text
        const result = rows[0];
        return {
            id: result.id,
            topic: result.topic,
            content: result.content,
            created_at: result.created_at
        };
    } catch (error) {
        console.error('Error al obtener el último texto:', error);
        throw new Error('No se pudo obtener el texto más reciente');
    }
};
