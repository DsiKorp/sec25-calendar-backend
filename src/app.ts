import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './database/configDb';


dotenv.config();

//console.log(process.env.DB_CNN);

// Crear servidor de express
const app = express();
const publicPath = path.join(__dirname, '../public');

// Conectar a la base de datos
dbConnection();

// CORS
app.use(cors());

// Middleware para servir archivos estáticos cuando se accede a la raíz del sitio
app.use(express.static(publicPath));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventsRoutes'));

app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});