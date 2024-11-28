const express = require('express');
const router = express.Router();
const db = require('../server'); 

// Crear una inasistencia utilizando el nombre del estudiante y el nombre de la materia
router.post('/inasistencia', (req, res) => {
    const { fecha, estudiante_nombre, materia_nombre, motivo } = req.body;

    // Buscar el id del estudiante por su nombre
    const queryEstudiante = 'SELECT id FROM Estudiante WHERE nombre = ?';
    db.query(queryEstudiante, [estudiante_nombre], (err, resultsEstudiante) => {
        if (err) {
            console.error("Error al buscar el estudiante:", err);
            return res.status(500).json({ error: "Error al buscar el estudiante" });
        }
        if (resultsEstudiante.length === 0) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }
        const estudiante_id = resultsEstudiante[0].id;

        // Buscar el id de la materia por su nombre
        const queryMateria = 'SELECT id FROM Materia WHERE nombre = ?';
        db.query(queryMateria, [materia_nombre], (err, resultsMateria) => {
            if (err) {
                console.error("Error al buscar la materia:", err);
                return res.status(500).json({ error: "Error al buscar la materia" });
            }
            if (resultsMateria.length === 0) {
                return res.status(404).json({ error: "Materia no encontrada" });
            }
            const materia_id = resultsMateria[0].id;

            // Insertar la inasistencia con los ids obtenidos
            const query = `
                INSERT INTO Inasistencia (fecha, estudiante_id, materia_id, motivo)
                VALUES (?, ?, ?, ?)
            `;
            db.query(query, [fecha, estudiante_id, materia_id, motivo], (err, result) => {
                if (err) {
                    console.error("Error al insertar en la base de datos:", err);
                    return res.status(500).json({ error: "Error en la base de datos" });
                }
                res.json({ id: result.insertId, ...req.body });
            });
        });
    });
});

// Resto de los endpoints (GET, PUT, DELETE) se mantienen igual.
module.exports = router;
