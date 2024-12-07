const express = require('express');
const db = require('./server'); 
const cors = require('cors');
const estudianteRoutes = require('./routes/EstudianteRoutes'); 
const ProfesorRoutes = require('./routes/ProfesorRoutes'); 
const materiaRoutes = require('./routes/materiaRoutes');
const InasistenciaRoutes = require('./routes/InasistenciaRoute');

const app = express();

app.use(express.json()); 
app.use(cors());

// Rutas para API
app.use('/api', estudianteRoutes); 
app.use('/api', ProfesorRoutes); 
app.use('/api', materiaRoutes); 
app.use('/api', InasistenciaRoutes);

// Sirve los archivos estáticos de la carpeta uploads
app.use('/uploads', express.static('uploads'));

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
