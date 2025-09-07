🚀 Language Project (En Desarrollo)

Language Project es una aplicación desarrollada con Node.js que incluye autenticación, gestión de usuarios y diversas integraciones, como la API de Google y el manejo de correos electrónicos. Este proyecto está pensado para servir como base robusta para aplicaciones web con funcionalidades modernas y seguras.

💡 Estado: En desarrollo

🛠 Características principales

🔑 Autenticación de usuarios con JWT y Passport

📧 Envío de correos electrónicos mediante Nodemailer

🌐 Integración con API de Google y OpenAI

🗂 Gestión de archivos con Multer

⏰ Tareas programadas usando Node-Cron

🛡️ Seguridad en contraseñas con bcrypt / bcryptjs

⚡ Registro de solicitudes HTTP con Morgan

🌎 Configuración de CORS con cors

📦 Requisitos previos

Antes de empezar, asegúrate de tener instalado:

Node.js (v16.x o superior)

NPM (incluido con Node.js) o Yarn

MySQL (como base de datos)

Git (para manejo de repositorios)

⚙️ Instalación de dependencias

En la raíz del proyecto, ejecuta:

npm install
# o
yarn install

📚 Dependencias principales

@google/generative-ai – Interacción con la API de Google AI

@types/node-cron – Tipos TypeScript para cron

bcrypt / bcryptjs – Encriptación de contraseñas

cors – Middleware para CORS

dotenv – Variables de entorno

express – Framework web

google-auth-library – Autenticación de Google

jsonwebtoken – Tokens JWT

morgan – Registro de solicitudes HTTP

multer – Manejo de archivos

mysql2 – Cliente MySQL

node-cron – Tareas programadas

nodemailer – Envío de correos electrónicos

openai – Integración con OpenAI

passport – Autenticación

passport-google-oauth20 – Estrategia de Google para Passport

ts-node-dev – Desarrollo con TypeScript y Node.js

⚙️ Configuración del archivo .env

En la raíz del proyecto, crea un archivo .env con el siguiente contenido y reemplaza los valores según sea necesario:

# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=lenguagedb
DB_PORT=3306

# API de Google
GOOGLE_API_KEY=TU_CLAVE_API_GOOGLE

# Correo electrónico
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=TU_EMAIL
EMAIL_PASS=TU_CONTRASEÑA_EMAIL
EMAIL_FROM=TU_EMAIL

# JWT
JWT_SECRET=TU_CLAVE_SECRETA_JWT

# URL del servidor
SERVER_URL=http://localhost:3000

🚀 Ejecución del proyecto

Para iniciar la aplicación en modo desarrollo:

npm run dev
# o
yarn dev


El servidor estará disponible en http://localhost:3000.
