import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { savePendingUser, findUserByEmail, findPendingUserByEmail, verifyAndCreateUser, saveUserAdmin, findUserAdminByEmail, getAllUser, deleteUserByEmail} from '../models/userModel';
import { sendVerificationEmail } from '../config/mail';
import { User, UserAdmins } from '../types/User';

// Define el tipo personalizado para el payload del JWT
interface JwtPayloadWithEmail extends JwtPayload {
  email: string;
}

export const registerUser = async (username: string, email: string, password: string): Promise<void> => {
  if (!password) {
    throw new Error('Password no puede estar vacío');
  }
  
  // Verificar si el email ya está en uso por un usuario verificado
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Este correo electrónico ya está en uso por un usuario verificado');
  }
  
  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Crear un token de verificación
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está definido en .env');
  }
  
  const verificationToken = jwt.sign({ email: email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  
  // Guardar el usuario pendiente
  await savePendingUser(username, email, hashedPassword, verificationToken);
  
  // Enviar el correo de verificación
  await sendVerificationEmail(email, verificationToken);
};

export const verifyEmail = async (token: string): Promise<void> => {
  try {
    // Verificar que el token sea válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadWithEmail;
    
    // Verificar que el token no haya expirado
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      throw new Error('El token ha expirado');
    }
    
    // Mover el usuario de pendiente a verificado
    await verifyAndCreateUser(token);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Token de verificación inválido');
    }
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await findUserByEmail(email);
  
  if (!user) {
    // Verificar si existe como usuario pendiente
    const pendingUser = await findPendingUserByEmail(email);
    if (pendingUser) {
      throw new Error('Debes verificar tu correo electrónico antes de iniciar sesión');
    } else {
      throw new Error('El usuario no existe');
    }
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }
  
  const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
};

// Función para solicitar un nuevo correo de verificación
export const resendVerificationEmail = async (email: string): Promise<void> => {
  // Buscar si existe un usuario pendiente con este email
  const pendingUser = await findPendingUserByEmail(email);
  
  if (!pendingUser) {
    throw new Error('No hay un registro pendiente para este correo electrónico');
  }
  
  // Crear un nuevo token
  const verificationToken = jwt.sign({ email: email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  
  // Actualizar el token en la base de datos
  await savePendingUser(pendingUser.username, email, pendingUser.password, verificationToken);
  
  // Enviar el nuevo correo
  await sendVerificationEmail(email, verificationToken);
};

export const saveUserAdmins = async (userAdmin: UserAdmins): Promise<void> => {
  if (!userAdmin.password) {
      throw new Error('Password no puede estar vacío');
  }

  // Verificar si el correo ya está en uso
  // const existingUser = await findUserAdminByEmail(userAdmin.email);
  // if (existingUser) {
  //     throw new Error('Este correo electrónico ya está en uso por un usuario verificado');
  // }

  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash(userAdmin.password, 10);
  userAdmin.password = hashedPassword; // Asigna la contraseña cifrada al objeto

  // Crear un token de verificación (si es necesario)
  const secret = process.env.JWT_SECRET;
  if (!secret) {
      throw new Error('JWT_SECRET no está definido en .env');
  }

  // Guardar el nuevo usuario
  await saveUserAdmin(userAdmin);
};

export const getAllUsers = async(): Promise<void> => {

};

export const deleteUserByEmailS = async(email: string): Promise<void> => {

};