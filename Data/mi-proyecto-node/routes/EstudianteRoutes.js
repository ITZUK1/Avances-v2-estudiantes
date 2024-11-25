const express = require('express');
const router = express.Router();
const db = require('../server'); 


router.post('/estudiantes', (req, res) => {
    const { documento_identidad, nombre, fecha_nacimiento, telefono,status } = req.body;
    const query = 'INSERT INTO Estudiante (documento_identidad, nombre, fecha_nacimiento, telefono,status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [documento_identidad, nombre, fecha_nacimiento, telefono,status], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, ...req.body });
    });
});
router.get('/estudiantes', (req, res) => {
    const query = 'SELECT documento_identidad, nombre, fecha_nacimiento, telefono, status FROM estudiante';
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error ejecutando la consulta:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(result);
    });
});
router.get('/estudiantes/documento_identidad/:documento_identidad', (req, res) => {
    const query = 'SELECT * FROM estudiante WHERE documento_identidad = ?';
    
    // Ejecuta la consulta con el parámetro 'documento_identidad'
    db.query(query, [req.params.documento_identidad], (err, result) => {
        if (err) {
            console.error("Error ejecutando la consulta:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        
       
        res.json(result);
    });
});

router.put('/estudiantes/documento_identidad/:documento_identidad', (req, res) => {
    const { nombre, fecha_nacimiento, telefono, status } = req.body;
    const { documento_identidad } = req.params;

    const query = `
        UPDATE estudiante
        SET nombre = ?, fecha_nacimiento = ?, telefono = ?, status = ?
        WHERE documento_identidad = ?
    `;
    
    // Ejecuta la consulta con los parámetros
    db.query(query, [nombre, fecha_nacimiento, telefono, status, documento_identidad], (err, result) => {
        if (err) {
            console.error("Error ejecutando la consulta:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json({ message: "Estudiante actualizado correctamente" });
    });
});

router.delete('/estudiantes/documento_identidad/:documento_identidad', (req, res) => {
    const { documento_identidad } = req.params;

    const query = 'DELETE FROM estudiante WHERE documento_identidad = ?';

    db.query(query, [documento_identidad], (err, result) => {
        if (err) {
            console.error("Error ejecutando la consulta:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json({ message: "Estudiante eliminado correctamente" });
    });
});

router.put('/estudiantes/estado/:documento_identidad', (req, res) => {
    const { status } = req.body;
    const { documento_identidad } = req.params;

    if (status !== 'activo' && status !== 'inactivo') {
        return res.status(400).json({ message: "Estado inválido" });
    }

    const query = `
        UPDATE estudiante
        SET status = ?
        WHERE documento_identidad = ?
    `;
    
    db.query(query, [status, documento_identidad], (err, result) => {
        if (err) {
            console.error("Error ejecutando la consulta:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json({ message: "Estado actualizado correctamente" });
    });
});



module.exports = router; 
