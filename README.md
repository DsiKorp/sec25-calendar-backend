# Calendar Backend

Backend API para aplicación de calendario desarrollado con Node.js, Express, TypeScript y MongoDB.

## 🚀 Tecnologías

- **Node.js** con **TypeScript**
- **Express.js** - Framework web
- **MongoDB** con **Mongoose** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **express-validator** - Validación de datos
- **CORS** - Configuración de políticas de acceso

## 📋 Prerequisitos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio
```bash
git clone <repository-url>
cd sec25-calendar-backend
```

2. Instala las dependencias
```bash
npm install
```

3. Configura las variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
PORT=4000
DB_CNN=mongodb://localhost:27017/calendar-db
SECRET_JWT_SEED=tu-secret-key-super-segura
```

4. Ejecuta el servidor en modo desarrollo
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
src/
├── app.ts              # Configuración principal del servidor
├── controllers/        # Controladores de rutas
├── database/          # Configuración de base de datos
├── helpers/           # Utilidades y helpers
├── middlewares/       # Middlewares personalizados
├── models/           # Modelos de MongoDB
└── routes/           # Definición de rutas
```

## 🔗 API Endpoints

### Autenticación (`/api/auth`)

#### **GET** `/api/auth/`
- **Descripción**: Endpoint de prueba
- **Respuesta**:
```json
{
  "msg": "Hola Mundo /"
}
```

#### **POST** `/api/auth/new`
- **Descripción**: Registro de nuevo usuario
- **Validaciones**:
  - `name`: Requerido, no puede estar vacío
  - `email`: Requerido, debe ser un email válido
  - `password`: Requerido, mínimo 6 caracteres
- **Body**:
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```
- **Respuesta exitosa** (201):
```json
{
  "ok": true,
  "msg": "Registro correcto",
  "uid": "user-id",
  "name": "Juan Pérez",
  "token": "jwt-token"
}
```
- **Errores**:
  - 400: Usuario ya existe con ese email
  - 500: Error interno del servidor

#### **POST** `/api/auth/`
- **Descripción**: Inicio de sesión
- **Validaciones**:
  - `email`: Requerido, debe ser un email válido
  - `password`: Requerido, mínimo 6 caracteres
- **Body**:
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```
- **Respuesta exitosa**:
```json
{
  "ok": true,
  "msg": "Login correcto",
  "uid": "user-id",
  "name": "Juan Pérez",
  "token": "jwt-token"
}
```
- **Errores**:
  - 400: Usuario no existe o contraseña incorrecta
  - 500: Error interno del servidor

#### **GET** `/api/auth/renew`
- **Descripción**: Renovar token JWT
- **Headers requeridos**:
```
x-token: jwt-token
```
- **Respuesta exitosa**:
```json
{
  "ok": true,
  "msg": "/renew",
  "token": "new-jwt-token"
}
```
- **Errores**:
  - 401: Token no válido o no proporcionado

## 🛡️ Middlewares

### Validación de Campos
- **Archivo**: [`validar-campos.ts`](src/middlewares/validar-campos.ts)
- **Función**: Valida los campos usando express-validator

### Validación de JWT
- **Archivo**: [`validar-jwt.ts`](src/middlewares/validar-jwt.ts)
- **Función**: Verifica la validez del token JWT
- **Header requerido**: `x-token`

## 🗃️ Modelos de Datos

### Usuario
- **Archivo**: [`Usuario.ts`](src/models/Usuario.ts)
- **Campos**:
  - `name`: String (requerido)
  - `email`: String (requerido, único)
  - `password`: String (encriptado)

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. Al registrarse o iniciar sesión, el usuario recibe un token
2. Este token debe incluirse en el header `x-token` para rutas protegidas
3. El token contiene: `uid`, `name`, `iat`, `exp`

## 🚨 Manejo de Errores

### Códigos de Estado HTTP:
- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **400**: Error de validación o datos incorrectos
- **401**: No autorizado (token inválido o faltante)
- **500**: Error interno del servidor

### Estructura de Respuesta de Error:
```json
{
  "ok": false,
  "msg": "Descripción del error"
}
```

## 🧪 Testing

Para probar los endpoints puedes usar herramientas como:
- **Postman**
- **Thunder Client** (extensión de VS Code)
- **curl**

### Ejemplo con curl:
```bash
# Registro
curl -X POST http://localhost:4000/api/auth/new \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:4000/api/auth/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Renovar token
curl -X GET http://localhost:4000/api/auth/renew \
  -H "x-token: your-jwt-token"
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo con nodemon
npm run build    # Compilar TypeScript a JavaScript
npm start        # Ejecutar versión compilada
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

