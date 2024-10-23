const express = require('express');
const db = require('./server'); // Esto importa tu configuración de la base de datos
const estudianteRoutes = require('./routes/EstudianteRoutes'); // Importa tus rutas

const app = express();

app.use(express.json()); // Asegúrate de poder parsear JSON en las peticiones

// Usa las rutas
app.use('/api', estudianteRoutes); // Esto carga las rutas desde EstudianteRoutes.js

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
