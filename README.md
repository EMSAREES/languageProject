<div align="center">

# 🚀 Language Project

<img src="https://img.shields.io/badge/status-en%20desarrollo-orange?style=for-the-badge&logo=construction&logoColor=white" alt="Estado">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">

### Una aplicación web moderna con autenticación, gestión de usuarios y múltiples integraciones

*Construida con Node.js, pensada como base para proyectos que requieren seguridad, notificaciones y automatización de tareas*

---

</div>

## ✨ Características Principales

<table>
<tr>
<td width="50%">

### 🔐 **Seguridad & Autenticación**
- 🔑 Autenticación JWT segura
- 🛡️ Encriptación con bcrypt/bcryptjs  
- 🔒 Estrategias Passport integradas
- 🌐 OAuth 2.0 con Google

</td>
<td width="50%">

### ⚡ **Comunicación & APIs**
- 📧 Sistema de correos con Nodemailer
- 🤖 Integración Google Generative AI
- 🧠 Conectividad con OpenAI
- 🌍 CORS configurado

</td>
</tr>
<tr>
<td width="50%">

### 📁 **Gestión de Datos**
- 🗂️ Manejo de archivos con Multer
- 🗄️ Base de datos MySQL2
- 📊 Logging avanzado con Morgan
- ⚙️ Variables de entorno seguras

</td>
<td width="50%">

### 🔄 **Automatización**
- ⏰ Tareas programadas con Node-Cron
- 🚀 Desarrollo ágil con ts-node-dev
- 📈 Escalabilidad modular
- 🛠️ TypeScript para desarrollo

</td>
</tr>
</table>

---

## 📋 Requisitos Previos

> **Antes de comenzar, asegúrate de tener instalado:**

| Herramienta | Versión | Descripción |
|-------------|---------|-------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | `v16.x+` | Runtime de JavaScript |
| ![NPM](https://img.shields.io/badge/NPM-CB3837?style=flat&logo=npm&logoColor=white) | `Latest` | Gestor de paquetes |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) | `8.0+` | Sistema de base de datos |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) | `Latest` | Control de versiones |

---

## 🚀 Instalación Rápida

### 1️⃣ **Clonar el repositorio**
```bash
git clone https://github.com/EMSAREES/languageProject.git
cd languageProject
```

### 2️⃣ **Instalar dependencias**
```bash
# Con NPM
npm install

# Con Yarn
yarn install
```

### 3️⃣ **Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto (ver sección de configuración)

### 4️⃣ **Iniciar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

🎉 **¡Listo!** Tu aplicación estará disponible en `http://localhost:3000`

---

## ⚙️ Configuración del Archivo `.env`

<details>
<summary><strong>📝 Plantilla completa del archivo .env</strong></summary>

```bash
# 🗄️ CONFIGURACIÓN DE BASE DE DATOS
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=lenguagedb
DB_PORT=3306

# 🔑 APIS EXTERNAS
GOOGLE_API_KEY=TU_CLAVE_API_GOOGLE

# 📧 CONFIGURACIÓN DE EMAIL
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=TU_EMAIL
EMAIL_PASS=TU_CONTRASEÑA_EMAIL
EMAIL_FROM=TU_EMAIL

# 🔐 SEGURIDAD
JWT_SECRET=TU_CLAVE_SECRETA_JWT

# 🌐 SERVIDOR
SERVER_URL=http://localhost:3000
```

</details>

### 📋 **Descripción de Variables**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_HOST` | Servidor MySQL | `localhost` |
| `DB_USER` | Usuario de BD | `root` |
| `DB_PASSWORD` | Contraseña BD | `mi_password_123` |
| `GOOGLE_API_KEY` | API Key de Google | `AIza...` |
| `EMAIL_USER` | Email para envíos | `mi-app@gmail.com` |
| `JWT_SECRET` | Clave secreta JWT | `mi_clave_super_secreta` |

> ⚠️ **Importante:** Nunca subas tu archivo `.env` al repositorio. Está incluido en `.gitignore`

---

## 📦 Stack Tecnológico

<div align="center">

### **Backend & Framework**
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### **Base de Datos**
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

### **Autenticación & Seguridad**
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)

### **APIs & Integraciones**
![Google](https://img.shields.io/badge/Google%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

</div>

---

## 🗂️ Dependencias Principales

<details>
<summary><strong>🔍 Ver lista completa de dependencias</strong></summary>

### **🧠 IA & APIs**
- `@google/generative-ai` - API de Google AI
- `openai` - Integración con OpenAI
- `google-auth-library` - Autenticación Google

### **🔐 Autenticación & Seguridad**
- `jsonwebtoken` - Tokens JWT
- `passport` - Framework de autenticación
- `passport-google-oauth20` - OAuth Google
- `bcrypt` / `bcryptjs` - Encriptación de contraseñas

### **🌐 Servidor & Comunicación**
- `express` - Framework web
- `cors` - Control de CORS
- `morgan` - Logging HTTP
- `nodemailer` - Envío de emails

### **📁 Datos & Archivos**
- `mysql2` - Cliente MySQL
- `multer` - Manejo de archivos
- `dotenv` - Variables de entorno

### **⏰ Tareas & Desarrollo**
- `node-cron` - Tareas programadas
- `ts-node-dev` - Desarrollo TypeScript
- `@types/node-cron` - Tipos TypeScript

</details>

---

## 🛠️ Scripts Disponibles

```bash
# 🚀 Desarrollo
npm run dev          # Inicia servidor en modo desarrollo

# 🏗️ Construcción
npm run build        # Compila TypeScript a JavaScript

# ▶️ Producción
npm start           # Inicia servidor en producción

# 🧪 Testing
npm test            # Ejecuta pruebas (si están configuradas)
```

---

## 📁 Estructura del Proyecto

```
languageProject/
├── 📂 src/
│   ├── 📂 controllers/     # Controladores de rutas
│   ├── 📂 models/          # Modelos de datos
│   ├── 📂 routes/          # Definición de rutas
│   ├── 📂 middleware/      # Middleware personalizado
│   ├── 📂 services/        # Lógica de negocio
│   └── 📂 utils/           # Utilidades y helpers
├── 📂 uploads/             # Archivos subidos
├── 📄 .env                 # Variables de entorno
├── 📄 package.json         # Configuración NPM
└── 📄 README.md           # Este archivo
```

---

## 🚀 Roadmap de Desarrollo

- [x] ✅ Autenticación JWT
- [x] ✅ Integración Google OAuth
- [x] ✅ Sistema de correos
- [x] ✅ Manejo de archivos
- [ ] 🔄 Panel de administración
- [ ] 🔄 API REST completa
- [ ] 🔄 Tests automatizados
- [ ] 🔄 Documentación Swagger

---

## 🤝 Contribución

¿Quieres contribuir? ¡Genial! 

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

---



<sub>🚀 **Language Project** - Construyendo el futuro de las aplicaciones web</sub>

</div>
