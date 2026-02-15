import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './database/configDb';

dotenv.config();

//console.log(process.env.DB_CNN);

// Crear servidor de express
const app = express();
// Conectar a la base de datos
dbConnection();
// Middleware para servir archivos estáticos cuando se accede a la raíz del sitio
app.use(express.static('public'));
// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());


// Rutas
app.use('/api/auth', require('./routes/authRoutes'));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});