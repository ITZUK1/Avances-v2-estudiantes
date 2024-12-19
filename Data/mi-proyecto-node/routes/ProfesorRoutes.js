const express = require('express');
const router = express.Router();
const db = require('../server');
const sql = require('mssql');

// Método POST para crear un profesor
router.post('/profesor', (req, res) => {
    const { documento_identidad, nombre, fecha_nacimiento, telefono, status } = req.body;

    // Verificar si documento_identidad es un string válido
    if (typeof documento_identidad !== 'string' || documento_identidad.trim() === '') {
        return res.status(400).json({ error: "El documento de identidad debe ser una cadena de texto válida." });
    }

    const insertQuery = `
        INSERT INTO profesor (documento_identidad, nombre, fecha_nacimiento, telefono, status)
        VALUES (@documento_identidad, @nombre, @fecha_nacimiento, @telefono, @status);
        
        SELECT SCOPE_IDENTITY() AS id;
    `;

    req.pool.request()  // Usamos el pool de conexiones
        .input('documento_identidad', sql.VarChar, documento_identidad)
        .input('nombre', sql.VarChar, nombre)
        .input('fecha_nacimiento', sql.Date, fecha_nacimiento)
        .input('telefono', sql.VarChar, telefono)
        .input('status', sql.VarChar, status)
        .query(insertQuery)
        .then(result => {
            res.json({ id: result.recordset[0].id, ...req.body });
        })
        .catch(err => {
            console.error("Error al insertar en la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});

// Método GET para obtener todos los profesores
router.get('/profesor', (req, res) => {
    const query = 'SELECT * FROM profesor';
    req.pool.request()  // Usa req.pool.request() en lugar de db.request()
        .query(query)
        .then(result => {
            res.json(result.recordset);
        })
        .catch(err => {
            console.error("Error al obtener datos de la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});

// Método GET para obtener un profesor por documento de identidad
router.get('/profesor/documento_identidad/:documento_identidad', (req, res) => {
    const { documento_identidad } = req.params;
    const query = 'SELECT * FROM profesor WHERE documento_identidad = @documento_identidad';
    req.pool.request()  // Usa req.pool.request()
        .input('documento_identidad', sql.VarChar, documento_identidad)
        .query(query)
        .then(result => {
            if (result.recordset.length === 0) {
                return res.status(404).json({ message: "Profesor no encontrado" });
            }
            res.json(result.recordset[0]);
        })
        .catch(err => {
            console.error("Error al obtener el profesor:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});


// Método PUT para actualizar un profesor por documento de identidad
router.put('/profesor/documento_identidad/:documento_identidad', (req, res) => {
    const { documento_identidad } = req.params;
    const { nombre, fecha_nacimiento, telefono, status } = req.body;

    // Verificar si el profesor existe antes de actualizar
    const checkQuery = 'SELECT 1 FROM profesor WHERE documento_identidad = @documento_identidad';
    req.pool.request()  // Usamos req.pool.request() en lugar de db.request()
        .input('documento_identidad', sql.VarChar, documento_identidad)
        .query(checkQuery)
        .then(result => {
            if (result.recordset.length === 0) {
                return res.status(404).json({ message: "Profesor no encontrado" });
            }

            const updateQuery = `
                UPDATE profesor
                SET nombre = @nombre, fecha_nacimiento = @fecha_nacimiento, telefono = @telefono, status = @status
                WHERE documento_identidad = @documento_identidad
            `;
            req.pool.request()  // Usamos req.pool.request() aquí también
                .input('nombre', sql.VarChar, nombre)
                .input('fecha_nacimiento', sql.Date, fecha_nacimiento)
                .input('telefono', sql.VarChar, telefono)
                .input('status', sql.VarChar, status)
                .input('documento_identidad', sql.VarChar, documento_identidad)
                .query(updateQuery)
                .then(result => {
                    if (result.rowsAffected === 0) {
                        return res.status(404).json({ message: "Profesor no encontrado" });
                    }
                    res.json({ message: "Profesor actualizado correctamente" });
                })
                .catch(err => {
                    console.error("Error al actualizar el profesor:", err);
                    return res.status(500).json({ error: "Error en la base de datos" });
                });
        })
        .catch(err => {
            console.error("Error al verificar existencia del profesor:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});


// Método DELETE para eliminar un profesor por documento de identidad
// Método DELETE para eliminar un profesor por documento de identidad
router.delete('/profesor/documento_identidad/:documento_identidad', (req, res) => {
    const { documento_identidad } = req.params;

    // Verificar si el profesor existe antes de eliminar
    const checkQuery = 'SELECT 1 FROM profesor WHERE documento_identidad = @documento_identidad';
    req.pool.request()  // Aquí se debe usar req.pool.request() en lugar de db.request()
        .input('documento_identidad', sql.VarChar, documento_identidad)
        .query(checkQuery)
        .then(result => {
            if (result.recordset.length === 0) {
                return res.status(404).json({ message: "Profesor no encontrado" });
            }

            const deleteQuery = 'DELETE FROM profesor WHERE documento_identidad = @documento_identidad';
            req.pool.request()  // Aquí también usas req.pool.request()
                .input('documento_identidad', sql.VarChar, documento_identidad)
                .query(deleteQuery)
                .then(result => {
                    if (result.rowsAffected === 0) {
                        return res.status(404).json({ message: "Profesor no encontrado" });
                    }
                    res.json({ message: "Profesor eliminado correctamente" });
                })
                .catch(err => {
                    console.error("Error al eliminar el profesor:", err);
                    return res.status(500).json({ error: "Error en la base de datos" });
                });
        })
        .catch(err => {
            console.error("Error al verificar existencia del profesor:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});


module.exports = router;
