import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, verifyEmail, resendVerificationEmail } from '../services/authService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    await registerUser(username, email, password);
    res.status(201).json({ message: 'Usuario registrado. Por favor, verifica tu correo electrónico.' });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query;
    
    // Verificar que el token existe y es un string
    if (!token || typeof token !== 'string') {
      res.status(400).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error de Verificación</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f8f9fa;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              padding: 30px;
              text-align: center;
              max-width: 500px;
              width: 90%;
            }
            .icon-error {
              color: #dc3545;
              font-size: 60px;
              margin-bottom: 20px;
            }
            h1 {
              color: #343a40;
              margin-bottom: 20px;
            }
            p {
              color: #6c757d;
              margin-bottom: 25px;
              line-height: 1.6;
            }
            .btn {
              background-color: #007bff;
              color: white;
              border: none;
              padding: 12px 25px;
              border-radius: 4px;
              font-size: 16px;
              cursor: pointer;
              text-decoration: none;
              transition: background-color 0.3s;
            }
            .btn:hover {
              background-color: #0069d9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon-error">❌</div>
            <h1>Token de verificación inválido</h1>
            <p>Lo sentimos, pero el token proporcionado no es válido o ha expirado. Por favor, intenta registrarte nuevamente o contacta a soporte técnico si el problema persiste.</p>
            <a href="/" class="btn">Volver al inicio</a>
          </div>
        </body>
        </html>
      `);
      return;
    }
    
    try {
      await verifyEmail(token);
      
      // Responder con una página HTML estilizada para éxito
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verificación Exitosa</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f8f9fa;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              padding: 30px;
              text-align: center;
              max-width: 500px;
              width: 90%;
            }
            .icon-success {
              color: #28a745;
              font-size: 60px;
              margin-bottom: 20px;
            }
            h1 {
              color: #343a40;
              margin-bottom: 20px;
            }
            p {
              color: #6c757d;
              margin-bottom: 25px;
              line-height: 1.6;
            }
            .btn {
              background-color: #28a745;
              color: white;
              border: none;
              padding: 12px 25px;
              border-radius: 4px;
              font-size: 16px;
              cursor: pointer;
              text-decoration: none;
              transition: background-color 0.3s;
            }
            .btn:hover {
              background-color: #218838;
            }
            .benefits {
              display: flex;
              justify-content: space-between;
              margin: 30px 0;
              flex-wrap: wrap;
            }
            .benefit {
              flex-basis: 30%;
              padding: 15px 0;
            }
            .benefit-icon {
              font-size: 30px;
              margin-bottom: 10px;
            }
            .benefit-title {
              font-weight: bold;
              margin-bottom: 5px;
              color: #343a40;
            }
            .timer {
              font-size: 14px;
              color: #6c757d;
              margin-top: 20px;
            }
            @media (max-width: 768px) {
              .benefit {
                flex-basis: 100%;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon-success">✅</div>
            <h1>¡Verificación Exitosa!</h1>
            <p>Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión y disfrutar de todos los beneficios de nuestra plataforma.</p>
            
            <div class="benefits">
              <div class="benefit">
                <div class="benefit-icon">🔒</div>
                <div class="benefit-title">Seguridad</div>
                <div>Datos protegidos</div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">⚡</div>
                <div class="benefit-title">Rapidez</div>
                <div>Acceso inmediato</div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">🌟</div>
                <div class="benefit-title">Premium</div>
                <div>Funciones exclusivas</div>
              </div>
            </div>
            
            <a href="/login" class="btn">Iniciar sesión ahora</a>
            
            <div class="timer">Serás redirigido a la página de inicio de sesión en <span id="countdown">10</span> segundos.</div>
            
            <script>
              // Redirección automática
              let seconds = 10;
              const countdownElement = document.getElementById('countdown');
              
              const interval = setInterval(() => {
                seconds--;
                countdownElement.textContent = seconds;
                
                if (seconds <= 0) {
                  clearInterval(interval);
                  window.location.href = '/login';
                }
              }, 1000);
            </script>
          </div>
        </body>
        </html>
      `);
    } catch (error: any) {
      // Responder con una página HTML estilizada para error
      console.error('Error al verificar el correo:', error);
      res.status(400).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error de Verificación</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f8f9fa;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              padding: 30px;
              text-align: center;
              max-width: 500px;
              width: 90%;
            }
            .icon-error {
              color: #dc3545;
              font-size: 60px;
              margin-bottom: 20px;
            }
            h1 {
              color: #343a40;
              margin-bottom: 20px;
            }
            p {
              color: #6c757d;
              margin-bottom: 25px;
              line-height: 1.6;
            }
            .error-message {
              background-color: #f8d7da;
              color: #721c24;
              padding: 10px;
              border-radius: 4px;
              margin-bottom: 20px;
              font-size: 14px;
            }
            .btn {
              background-color: #007bff;
              color: white;
              border: none;
              padding: 12px 25px;
              border-radius: 4px;
              font-size: 16px;
              cursor: pointer;
              text-decoration: none;
              transition: background-color 0.3s;
            }
            .btn:hover {
              background-color: #0069d9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon-error">❌</div>
            <h1>Error de verificación</h1>
            <p>Lo sentimos, pero ha ocurrido un error al verificar tu cuenta.</p>
            <div class="error-message">${error.message || 'Token inválido o expirado'}</div>
            <p>Por favor, intenta registrarte nuevamente o contacta a soporte técnico si el problema persiste.</p>
            <div>
              <a href="/register" class="btn">Volver al registro</a>
            </div>
          </div>
        </body>
        </html>
      `);
    }
  } catch (error: any) {
    console.error('Error inesperado:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error del Servidor</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 30px;
            text-align: center;
            max-width: 500px;
            width: 90%;
          }
          .icon-error {
            color: #dc3545;
            font-size: 60px;
            margin-bottom: 20px;
          }
          h1 {
            color: #343a40;
            margin-bottom: 20px;
          }
          p {
            color: #6c757d;
            margin-bottom: 25px;
            line-height: 1.6;
          }
          .btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            transition: background-color 0.3s;
          }
          .btn:hover {
            background-color: #0069d9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon-error">⚠️</div>
          <h1>Error del servidor</h1>
          <p>Ha ocurrido un error inesperado en el servidor. Por favor, intenta más tarde o contacta a soporte técnico.</p>
          <a href="/" class="btn">Volver al inicio</a>
        </div>
      </body>
      </html>
    `);
  }
};

// Controlador para reenviar el correo de verificación
export const resendVerificationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
    }
    
    await resendVerificationEmail(email);
    
    res.status(200).json({ message: 'Se ha enviado un nuevo correo de verificación' });
  } catch (error) {
    next(error);
  }
};