const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión
const config = {
    user: 'MIXATO/miguel',
    password: '',
    server: 'MIXATO',
    database: 'colegio',
    options: {
        encrypt: true, // Usa true si estás en Azure
        trustServerCertificate: true // Cambia esto según tu entorno
    }
};

// Ruta de ejemplo
app.get('/api/ejemplo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM tu_tabla');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la conexión a la base de datos');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
