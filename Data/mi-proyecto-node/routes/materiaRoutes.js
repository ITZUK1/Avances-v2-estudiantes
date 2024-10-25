const express = require('express');
const router = express.Router();
const db = require('../server'); // Importa la configuración de la base de datos

// Crear una nueva materia
router.post('/materia', (req, res) => {
    const { nombre, descripcion, semestre, fecha_inicio, status, } = req.body;
    const query = `
       INSERT INTO materia (nombre, descripcion, semestre, fecha_inicio, status )
          VALUES (?, ?, ?, ?, ?) 
    `;
    db.query(query, [nombre, descripcion, semestre, fecha_inicio, status,], (err, result) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json({ id: result.insertId, ...req.body });
    });
});

// Obtener todas las materias
router.get('/materia', (req, res) => {
    const query = 'SELECT * FROM Materia';
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener datos de la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});

// Obtener una materia por id
router.get('/materia/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Materia WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error al obtener la materia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }
        res.json(result[0]);
    });
});

// Actualizar una materia por id
router.put('/materia/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, semestre, fecha_inicio, status, } = req.body;
    const query = `
        UPDATE Materia
        SET nombre = ?, descripcion = ?, semestre = ?, fecha_inicio = ?, status = ?, profesor_id = ?, curso_id = ?
        WHERE id = ?
    `;
    db.query(query, [nombre, descripcion, semestre, fecha_inicio, status, , id], (err, result) => {
        if (err) {
            console.error("Error al actualizar la materia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }
        res.json({ message: "Materia actualizada correctamente" });
    });
});

// Eliminar una materia por id
router.delete('/materia/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Materia WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar la materia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }
        res.json({ message: "Materia eliminada correctamente" });
    });
});

module.exports = router;
