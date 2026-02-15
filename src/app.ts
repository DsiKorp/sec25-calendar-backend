import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


// Crear servidor de express
const app = express();

app.use(express.static('public'));


// Rutas
app.use('/api/auth', require('./routes/authRoutes'));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});