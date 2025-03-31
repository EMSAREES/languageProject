import pool from '../config/db';
import { User, UserAdmins } from '../types/User';



// Buscar un usuario verificado por email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows.length ? rows[0] : null;
};

// Buscar un usuario pendiente por email
export const findPendingUserByEmail = async (email: string): Promise<any | null> => {
  const [rows]: any = await pool.query('SELECT * FROM pending_users WHERE email = ?', [email]);
  return rows.length ? rows[0] : null;
};

// Buscar un usuario pendiente por token
export const findPendingUserByToken = async (token: string): Promise<any | null> => {
  const [rows]: any = await pool.query('SELECT * FROM pending_users WHERE verification_token = ?', [token]);
  return rows.length ? rows[0] : null;
};

// Guardar un usuario pendiente (que aún no está verificado)
export const savePendingUser = async (username: string, email: string, password: string, token: string): Promise<void> => {
  // Primero, eliminar cualquier registro pendiente existente con el mismo email
  await pool.query('DELETE FROM pending_users WHERE email = ?', [email]);
  
  // Insertar el nuevo usuario pendiente
  const sql = 'INSERT INTO pending_users (username, email, password, verification_token) VALUES (?, ?, ?, ?)';
  await pool.query(sql, [username, email, password, token]);
};

// Verificar usuario: mover de pendiente a verificado
export const verifyAndCreateUser = async (token: string): Promise<void> => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Obtener el usuario pendiente
    const [pendingUsers]: any = await connection.query('SELECT * FROM pending_users WHERE verification_token = ?', [token]);
    
    if (!pendingUsers.length) {
      throw new Error('Token de verificación no válido');
    }
    
    const pendingUser = pendingUsers[0];
    
    // Verificar si ya existe un usuario verificado con el mismo email
    const [existingUsers]: any = await connection.query('SELECT * FROM users WHERE email = ?', [pendingUser.email]);
    
    if (existingUsers.length) {
      // Si ya existe, actualizar sus datos
      await connection.query(
        'UPDATE users SET username = ?, password = ? WHERE email = ?',
        [pendingUser.username, pendingUser.password, pendingUser.email]
      );
    } else {
      // Si no existe, crear un nuevo usuario
      await connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [pendingUser.username, pendingUser.email, pendingUser.password]
      );
    }
    
    // Eliminar el usuario pendiente
    await connection.query('DELETE FROM pending_users WHERE verification_token = ?', [token]);
    
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Limpiar usuarios pendientes antiguos (puede ejecutarse periódicamente)
export const cleanupOldPendingUsers = async (): Promise<void> => {
  // Eliminar usuarios pendientes más antiguos que 24 horas
  await pool.query('DELETE FROM pending_users WHERE created_at < DATE_SUB(NOW(), INTERVAL 24 HOUR)');
};

export const saveUserAdmin = async (userAdmin:UserAdmins): Promise<void> => {

    const sql = 'INSERT INTO UserAdmin (username, email, password) VALUES (?, ?, ?)';
  
    const values =[userAdmin.username, userAdmin.email, userAdmin.password];

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
};

/// Buscar un usuarioAdmin por email
export const findUserAdminByEmail = async (userAdmin:UserAdmins): Promise<void> => {
  const sql = 'SELECT * FROM UserAdmin WHERE email = ?';

  const values = [userAdmin.email];

    try {
        const connection = await pool.getConnection();
        await connection.execute(sql, values);
        connection.release();
    } catch (error) {
        console.error('Error al eliminar archivo permanentemente:', error);
        throw new Error('Error al eliminar archivo');
    }
};



export const getAllUser = async (): Promise<User[]> => {
  const sql = 'SELECT * FROM users WHERE isVerified = true';

  try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(sql);
      connection.release();
      return rows as User[];
  } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw new Error('Error al consultar usuarios');
  }
};

export const deleteUserByEmail = async (userAdmin:UserAdmins): Promise<void> => {
  const sql = 'DELETE FROM users WHERE email = ?';

  const values = [userAdmin.email];

  try {
      const connection = await pool.getConnection();
      await connection.execute(sql, [values]);
      connection.release();
  } catch (error) {
      console.error('Error al eliminar usuario por email:', error);
      throw new Error('Error al eliminar el usuario');
  }
};

