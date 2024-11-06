const express = require('express');
const router = express.Router();
const db = require('../server'); 

router.post('/profesor', (req, res) => {
    const { documento_identidad, nombre, fecha_nacimiento, telefono, status } = req.body;
    const query = 'INSERT INTO profesor (documento_identidad, nombre, fecha_nacimiento, telefono, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [documento_identidad, nombre, fecha_nacimiento, telefono, status], (err, result) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json({ id: result.insertId, ...req.body });
    });
});

router.get('/profesor', (req, res) => {
    const query = 'SELECT * FROM profesor';
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener datos de la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});

router.get('/profesor/documento_identidad/:documento_identidad', (req, res) => {
    const { documento_identidad } = req.params;
    const query = 'SELECT * FROM profesor WHERE documento_identidad = ?';
    db.query(query, [documento_identidad], (err, result) => {
        if (err) {
            console.error("Error al obtener el profesor:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Profesor no encontrado" });
        }
        res.json(result[0]);
    });
});

router.put('/profesor/documento_identidad/:documento_identidad', (req, res) => {
    const { documento_identidad } = req.params;
    const { nombre, fecha_nacimiento, telefono, status } = req.body;
    const query = `
        UPDATE profesor
        SET nombre = ?, fecha_nacimiento = ?, telefono = ?, status = ?
        WHERE documento_identidad = ?
    `;
    db.query(query, [nombre, fecha_nacimiento, telefono, status, documento_identidad], (err, result) => {
        if (err) {
            console.error("Error al actualizar el profesor:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Profesor no encontrado" });
        }
        res.json({ message: "Profesor actualizado correctamente" });
    });
});

router.delete('/profesor/documento_identidad/:documento_identidad', (req, res) => {
    const { documento_identidad } = req.params;
    const query = 'DELETE FROM profesor WHERE documento_identidad = ?';
    db.query(query, [documento_identidad], (err, result) => {
        if (err) {
            console.error("Error al eliminar el profesor:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Profesor no encontrado" });
        }
        res.json({ message: "Profesor eliminado correctamente" });
    });
});

module.exports = router;
