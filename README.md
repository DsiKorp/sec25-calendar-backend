# Calendar Backend

API REST para gestión de autenticación y eventos de calendario, construida con **Node.js + Express + TypeScript + MongoDB**.

---

## 🚀 Tecnologías

- **Node.js**
- **TypeScript**
- **Express**
- **MongoDB + Mongoose**
- **JWT** (autenticación)
- **bcryptjs** (hash de contraseñas)
- **express-validator** (validaciones)
- **cors**
- **dotenv**

---

## 📋 Requisitos previos

- Node.js 18+ recomendado
- MongoDB local o remoto (Mongo Atlas)
- npm

---

## ⚙️ Configuración del proyecto

### 1) Instalar dependencias

```bash
npm install
```

### 2) Variables de entorno

Crear archivo `.env` en la raíz:

```env
PORT=4000
DB_CNN=mongodb://localhost:27017/calendar-db
SECRET_JWT_SEED=tu_clave_super_segura
```

### 3) Levantar en desarrollo

```bash
npm run dev
ó
npm run dev:nodemon
```

---

## 📁 Estructura (resumen)

```text
src/
├── app.ts
├── controllers/
│   ├── authController.ts
│   └── eventsController.ts
├── database/
│   └── configDb.ts
├── helpers/
│   ├── jwt.ts
│   └── isDate.ts
├── middlewares/
│   ├── validar-campos.ts
│   └── validar-jwt.ts
├── models/
│   ├── Usuario.ts
│   └── Evento.ts
└── routes/
    ├── authRoutes.ts
    └── eventsRoutes.ts
```

---

## 🔐 Autenticación

La API usa **JWT**.  
Para rutas protegidas se debe enviar:

```http
x-token: <jwt>
```

---

## 🔗 Endpoints

## 1) Auth (`/api/auth`)

### `GET /api/auth/`
Endpoint de prueba (si está definido en tu `authRoutes.ts`).

**Response ejemplo**
```json
{
  "msg": "Hola Mundo /"
}
```

---

### `POST /api/auth/new`
Registrar usuario.

**Validaciones**
- `name`: obligatorio
- `email`: obligatorio y formato válido
- `password`: obligatorio, mínimo 6 caracteres

**Body**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

**200/201 Response ejemplo**
```json
{
  "ok": true,
  "uid": "65f0d2...",
  "name": "Juan Pérez",
  "token": "jwt_token"
}
```

**Errores comunes**
- `400` usuario ya existe / validaciones
- `500` error interno

---

### `POST /api/auth/`
Login de usuario.

**Validaciones**
- `email`: obligatorio y formato válido
- `password`: obligatorio, mínimo 6 caracteres

**Body**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**200 Response ejemplo**
```json
{
  "ok": true,
  "uid": "65f0d2...",
  "name": "Juan Pérez",
  "token": "jwt_token"
}
```

**Errores comunes**
- `400` credenciales inválidas
- `500` error interno

---

### `GET /api/auth/renew`
Renovar token.

**Headers**
```http
x-token: jwt_token
```

**200 Response ejemplo**
```json
{
  "ok": true,
  "uid": "65f0d2...",
  "name": "Juan Pérez",
  "token": "new_jwt_token"
}
```

**Errores comunes**
- `401` token faltante o inválido

---

## 2) Eventos (`/api/events`)

> Todas las rutas de eventos están protegidas con `validarJWT`.

### `GET /api/events`
Listar eventos.

**Headers**
```http
x-token: jwt_token
```

**200 Response ejemplo**
```json
{
  "ok": true,
  "eventos": [
    {
      "id": "65f1ab...",
      "title": "Daily",
      "notes": "Seguimiento",
      "start": "2026-02-16T14:00:00.000Z",
      "end": "2026-02-16T14:30:00.000Z",
      "user": {
        "_id": "65f0d2...",
        "name": "Juan Pérez"
      }
    }
  ]
}
```

---

### `POST /api/events`
Crear evento.

**Validaciones**
- `title`: obligatorio
- `start`: obligatorio y fecha válida
- `end`: obligatorio y fecha válida

> En este proyecto suele validarse fecha con helper `isDate`.

**Body**
```json
{
  "title": "Planning",
  "notes": "Sprint planning",
  "start": "2026-02-16T09:00:00.000Z",
  "end": "2026-02-16T10:00:00.000Z"
}
```

**200/201 Response ejemplo**
```json
{
  "ok": true,
  "evento": {
    "id": "65f1ab...",
    "title": "Planning",
    "notes": "Sprint planning",
    "start": "2026-02-16T09:00:00.000Z",
    "end": "2026-02-16T10:00:00.000Z",
    "user": "65f0d2..."
  }
}
```

---

### `PUT /api/events/:id`
Actualizar evento.

**Validaciones**
- `id` en URL
- `title`: obligatorio
- `start`: fecha válida
- `end`: fecha válida

**Body ejemplo**
```json
{
  "title": "Planning actualizado",
  "notes": "Cambios de agenda",
  "start": "2026-02-16T09:30:00.000Z",
  "end": "2026-02-16T10:30:00.000Z"
}
```

**200 Response ejemplo**
```json
{
  "ok": true,
  "evento": {
    "id": "65f1ab...",
    "title": "Planning actualizado",
    "notes": "Cambios de agenda",
    "start": "2026-02-16T09:30:00.000Z",
    "end": "2026-02-16T10:30:00.000Z",
    "user": "65f0d2..."
  }
}
```

**Errores comunes**
- `404` evento no existe
- `401` usuario no autorizado para editar ese evento

---

### `DELETE /api/events/:id`
Eliminar evento.

**Validaciones**
- `id` en URL

**200 Response ejemplo**
```json
{
  "ok": true,
  "msg": "Evento eliminado"
}
```

**Errores comunes**
- `404` evento no existe
- `401` usuario no autorizado para eliminar ese evento

---

## 🧩 Middlewares

### `validar-campos.ts`
Procesa errores de `express-validator` y responde `400` si hay errores de entrada.

### `validar-jwt.ts`
- Lee token desde `x-token`
- Verifica JWT
- Inyecta `uid` y `name` del usuario autenticado en el `request`
- Responde `401` si el token no es válido

---

## ✅ Reglas de validación (resumen)

### Auth
- `name`: no vacío
- `email`: formato email
- `password`: mínimo 6

### Events
- `title`: no vacío
- `start`: fecha válida
- `end`: fecha válida
- `x-token`: obligatorio para todas las rutas de `/api/events`

---

## 🧠 Modelos

### Usuario (`src/models/Usuario.ts`)
- `name` (String, requerido)
- `email` (String, requerido, único)
- `password` (String, requerido)

### Evento (`src/models/Evento.ts`)
- `title` (String, requerido)
- `notes` (String, opcional)
- `start` (Date, requerido)
- `end` (Date, requerido)
- `user` (ObjectId ref `Usuario`, requerido)

Incluye transformación `toJSON` para:
- remover `__v`
- mapear `_id` => `id`

---

## 📦 Scripts npm

```bash
- `npm run dev`  
  Inicia el backend en modo desarrollo con recarga automática (según tu configuración de TypeScript/Nodemon).

- `npm run dev:nodemon`  
  Inicia el backend explícitamente con **nodemon** + **ts-node** para reinicios automáticos al guardar cambios.

- `npm run build`  
  Compila el proyecto TypeScript a JavaScript (normalmente en la carpeta `dist/`).

- `npm start`  
  Ejecuta la versión compilada del backend (entorno más cercano a producción).

> Nota: los comandos exactos dependen de cómo estén definidos en `package.json`.
```
---

## 🧪 Pruebas rápidas (Windows CMD)

### Registro
```bash
curl -X POST http://localhost:4000/api/auth/new ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Juan\",\"email\":\"juan@example.com\",\"password\":\"123456\"}"
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"juan@example.com\",\"password\":\"123456\"}"
```

### Obtener eventos
```bash
curl -X GET http://localhost:4000/api/events ^
  -H "x-token: TU_TOKEN"
```

### Crear evento
```bash
curl -X POST http://localhost:4000/api/events ^
  -H "Content-Type: application/json" ^
  -H "x-token: TU_TOKEN" ^
  -d "{\"title\":\"Daily\",\"notes\":\"Seguimiento\",\"start\":\"2026-02-16T14:00:00.000Z\",\"end\":\"2026-02-16T14:30:00.000Z\"}"
```

---

## 🚨 Códigos HTTP usados

- `200` OK
- `201` Created
- `400` Bad Request (validación/negocio)
- `401` Unauthorized
- `404` Not Found
- `500` Internal Server Error

---

## 📄 Licencia

MIT

