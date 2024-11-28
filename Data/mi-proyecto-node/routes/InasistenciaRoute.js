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

// Obtener todas las inasistencias
router.get('/inasistencias', (req, res) => {
    const query = `
        SELECT 
            i.id, i.fecha, i.motivo,
            e.nombre AS estudiante_nombre,
            m.nombre AS materia_nombre
        FROM Inasistencia i
        JOIN Estudiante e ON i.estudiante_id = e.id
        JOIN Materia m ON i.materia_id = m.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener las inasistencias:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});

// Obtener una inasistencia específica por su ID
router.get('/inasistencia/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            i.id, i.fecha, i.motivo,
            e.nombre AS estudiante_nombre,
            m.nombre AS materia_nombre
        FROM Inasistencia i
        JOIN Estudiante e ON i.estudiante_id = e.id
        JOIN Materia m ON i.materia_id = m.id
        WHERE i.id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener la inasistencia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Inasistencia no encontrada" });
        }
        res.json(results[0]);
    });
});

// Actualizar una inasistencia
router.put('/inasistencia/:id', (req, res) => {
    const { id } = req.params;
    const { fecha, motivo } = req.body;

    // Verificar que los campos necesarios estén presentes
    if (!fecha || !motivo) {
        return res.status(400).json({ error: "Los campos 'fecha' y 'motivo' son obligatorios" });
    }

    // Actualizar la inasistencia en la base de datos
    const query = `
        UPDATE Inasistencia
        SET fecha = ?, motivo = ?
        WHERE id = ?
    `;
    db.query(query, [fecha, motivo, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar la inasistencia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Inasistencia no encontrada" });
        }
        res.json({ id, fecha, motivo, message: "Inasistencia actualizada con éxito" });
    });
});


// Eliminar una inasistencia
router.delete('/inasistencia/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Inasistencia WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar la inasistencia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Inasistencia no encontrada" });
        }
        res.json({ message: "Inasistencia eliminada con éxito" });
    });
});



module.exports = router;
