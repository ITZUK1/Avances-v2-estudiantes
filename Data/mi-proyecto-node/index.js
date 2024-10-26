const express = require('express');
const db = require('./server'); 
const cors = require('cors');
const estudianteRoutes = require('./routes/EstudianteRoutes'); 
const ProfesorRoutes = require('./routes/ProfesorRoutes'); 
const materiaRoutes = require('./routes/materiaRoutes'); 

const app = express();

app.use(express.json()); 
app.use(cors());

// Usa las rutas
app.use('/api', estudianteRoutes); 
app.use('/api', ProfesorRoutes); 
app.use('/api', materiaRoutes); 

// Iniciar el servidor
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
