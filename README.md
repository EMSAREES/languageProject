# Language Project

Este proyecto es una aplicación desarrollada con Node.js que incluye autenticación, gestión de usuarios y diversas integraciones, como la API de Google y el manejo de correos electrónicos.

## Requisitos previos

Asegúrate de tener instalado lo siguiente antes de empezar:

- **Node.js** (versión 16.x o superior)
- **NPM** (incluido con Node.js) o **Yarn**
- **MySQL** (como base de datos)
- **Git** (para manejo de repositorios)

## Instalación de dependencias

Usa NPM o Yarn para instalar las dependencias necesarias:


## Dependencias
El proyecto utiliza las siguientes dependencias:

@google/generative-ai: Biblioteca para interactuar con la API de Google AI.

@types/node-cron: Tipos de TypeScript para la librería cron.

bcrypt: Librería para encriptar contraseñas.

bcryptjs: Alternativa de bcrypt para JavaScript puro.

cors: Middleware para permitir CORS (Cross-Origin Resource Sharing).

dotenv: Cargar variables de entorno desde el archivo .env.

express: Framework web para Node.js.

google-auth-library: Biblioteca de autenticación de Google.

jsonwebtoken: Generación y verificación de tokens JWT.

morgan: Middleware para registrar solicitudes HTTP.

multer: Middleware para manejar archivos.

mysql2: Cliente MySQL para Node.js.

node-cron: Librería para programar tareas cron.

nodemailer: Envío de correos electrónicos.

openai: API de OpenAI para interactuar con modelos de IA.

passport: Middleware de autenticación para Node.js.

passport-google-oauth20: Estrategia de autenticación de Google para Passport.

ts-node-dev: Herramienta de desarrollo para Node.js con soporte de TypeScript.

##  Crear el archivo .env
En la raíz del proyecto, crea un archivo .env con el siguiente contenido (reemplaza los valores según sea necesario):

env
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=lenguagedb
DB_PORT=3306

GOOGLE_API_KEY=TU_CLAVE_API_GOOGLE

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=TU_EMAIL
EMAIL_PASS=TU_CONTRASEÑA_EMAIL
EMAIL_FROM=TU_EMAIL

JWT_SECRET=TU_CLAVE_SECRETA_JWT

SERVER_URL=http://localhost:3000
