const express = require('express');
const router = express.Router();
const db = require('../server'); // Importa la configuración de la base de datos

// Ruta para crear un nuevo estudiante
router.post('/estudiantes', (req, res) => {
    const { id_num, nombre, fecha_nacimiento, telefono } = req.body;
    const query = 'INSERT INTO Estudiantes (id_num, nombre, fecha_nacimiento, telefono) VALUES (?, ?, ?, ?)';
    db.query(query, [id_num, nombre, fecha_nacimiento, telefono], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, ...req.body });
    });
});

// Ruta para obtener todos los estudiantes
router.get('/estudiantes', (req, res) => {
    const query = 'SELECT id, id_num, nombre, fecha_nacimiento, telefono, status FROM Estudiantes';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Ruta para obtener un estudiante por ID
router.get('/estudiantes/id_num/:id_num', (req, res) => {
    const query = 'SELECT * FROM Estudiantes WHERE id_num = ?';
    db.query(query, [req.params.id_num], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Ruta para actualizar un estudiante
router.put('/estudiantes/:id', (req, res) => {
    const { id_num, nombre, fecha_nacimiento, telefono, status } = req.body;
    const query = 'UPDATE Estudiantes SET id_num = ?, nombre = ?, fecha_nacimiento = ?, telefono = ?, status = ? WHERE id = ?';
    db.query(query, [id_num, nombre, fecha_nacimiento, telefono, status, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Estudiante actualizado', id: req.params.id });
    });
});

// Ruta para eliminar un estudiante
router.delete('/estudiantes/:id', (req, res) => {
    const query = 'DELETE FROM Estudiantes WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Estudiante eliminado', id: req.params.id });
    });
});

module.exports = router; // Exporta el router
