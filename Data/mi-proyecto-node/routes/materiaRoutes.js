const express = require('express');
const router = express.Router();
const db = require('../server'); 

router.post('/materia', (req, res) => {
    const { nombre, descripcion, semestre, fecha_inicio, status } = req.body;
    const query = `
        INSERT INTO Materia (nombre, descripcion, semestre, fecha_inicio, status)
        VALUES (?, ?, ?, ?, ?)
    `;
    // Si fecha_inicio es una cadena vacía, envía null
    const fechaInicioValue = fecha_inicio ? fecha_inicio : null;
    db.query(query, [nombre, descripcion, semestre, fechaInicioValue, status], (err, result) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json({ id: result.insertId, ...req.body });
    });
});


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

router.get('/materia', (req, res) => {
    const query = 'SELECT * FROM Materia';
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener datos de la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        const mappedSubjects = results.map(subject => ({
            name: subject.nombre,
            status: subject.status,
            startDate: subject.fecha_inicio 
        }));
        res.json(mappedSubjects);
    });
});

router.put('/materia/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, semestre, fecha_inicio, status } = req.body;
    const query = `
        UPDATE Materia
        SET nombre = ?, descripcion = ?, semestre = ?, fecha_inicio = ?, status = ?
        WHERE id = ?
    `;
    db.query(query, [nombre, descripcion, semestre, fecha_inicio, status, id], (err, result) => {
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
