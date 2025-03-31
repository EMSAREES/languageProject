import app from './app';  
import connection from './config/db';  
import cron from 'node-cron';  
import { generateText } from './services/textService';
import dotenv from 'dotenv';

dotenv.config();  // Cargar variables de entorno

const PORT = Number(process.env.PORT) || 3000;

async function main() {
  try {
    
    const [rows] = await connection.query("SELECT 1");
    console.log(`Base de datos conectada:`, rows);

    
    app.listen(PORT, () => {
      console.log(`Servidor activado en el puerto localhost:${PORT}`);
    });


    // Cronjob para generar el texto automáticamente cada día a las 8:00 AM
    cron.schedule('* 8 * * *', async () => {
      console.log('Cronjob ejecutado: Generando texto');  // Esto confirmará si el cronjob se ejecuta
      try {
        const text = await generateText();  // Genera el texto
        console.log('Texto generado automáticamente:', text);  // Muestra el texto generado
      } catch (error) {
        console.error('Error al generar el texto:', error);  // Muestra el error si algo falla
      }
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

main();
