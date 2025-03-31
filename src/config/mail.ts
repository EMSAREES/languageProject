import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Crear un transportador utilizando los parámetros de configuración
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Gmail como proveedor de servicio
  auth: {
    user: process.env.EMAIL_USER,  // Usuario (tu correo electrónico)
    pass: process.env.EMAIL_PASS   // Contraseña o contraseña de aplicación
  }
});

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verificación de correo electrónico',
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 500px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Verifica tu correo electrónico</h2>
          <p style="font-size: 16px; color: #555;">Gracias por registrarte. Para completar tu registro, haz clic en el botón de abajo:</p>
          <a href="${verificationLink}" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; margin-top: 10px;">
            Verificar cuenta
          </a>
          <p style="font-size: 14px; color: #888; margin-top: 20px;">Si no solicitaste este correo, puedes ignorarlo.</p>
        </div>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo de verificación enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar el correo de verificación:', error);
    throw new Error('Error al enviar el correo de verificación');
  }
};
