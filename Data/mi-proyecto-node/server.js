const sql = require('mssql');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Sirve archivos estáticos desde la carpeta "uploads"

// Configuración de la base de datos
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'false',
        trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true',
    },
};

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Middleware para inyectar la conexión a la base de datos
// Middleware para inyectar la conexión a la base de datos
app.use(async (req, res, next) => {
    try {
        req.pool = await sql.connect(dbConfig); // Guardamos el pool de conexiones
        next();
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        res.status(500).send('Error al conectar a la base de datos');
    }
});


// Importar rutas5
const estudianteRoutes = require('./routes/EstudianteRoutes');
const profesorRoutes = require('./routes/ProfesorRoutes');
const materiaRoutes = require('./routes/materiaRoutes');
const inasistenciaRoutes = require('./routes/InasistenciaRoute');

// Configuración de rutas
app.use('/api', estudianteRoutes);
app.use('/api', profesorRoutes);
app.use('/api', materiaRoutes);
app.use('/api', inasistenciaRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
