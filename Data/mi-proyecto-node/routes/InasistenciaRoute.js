const express = require('express');
const router = express.Router();
const sql = require('mssql'); // Asegúrate de importar mssql

// Crear una inasistencia utilizando el nombre del estudiante y el nombre de la materia
router.post('/inasistencia', (req, res) => {
    const { fecha, estudiante_nombre, materia_nombre, motivo } = req.body;
    const query = `
        INSERT INTO Inasistencia (fecha, estudiante_id, materia_id, motivo)
        OUTPUT INSERTED.id
        VALUES (@fecha, 
                (SELECT id FROM Estudiante WHERE nombre = @estudiante_nombre), 
                (SELECT id FROM Materia WHERE nombre = @materia_nombre), 
                @motivo);
    `;

    req.pool.request()
        .input('fecha', sql.Date, fecha)
        .input('estudiante_nombre', sql.VarChar, estudiante_nombre)
        .input('materia_nombre', sql.VarChar, materia_nombre)
        .input('motivo', sql.VarChar, motivo)
        .query(query)
        .then(result => {
            if (result.recordset.length > 0) {
                const insertId = result.recordset[0].id;  // Obtenemos el ID insertado
                res.json({ id: insertId, ...req.body });
            } else {
                res.status(500).json({ error: "No se pudo obtener el ID insertado" });
            }
        })
        .catch(err => {
            console.error("Error al insertar en la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
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
    req.pool.request()
        .query(query)
        .then(results => {
            res.json(results.recordset);
        })
        .catch(err => {
            console.error("Error al obtener las inasistencias:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
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
        WHERE i.id = @id
    `;
    req.pool.request()
        .input('id', sql.Int, id)
        .query(query)
        .then(results => {
            if (results.recordset.length === 0) {
                return res.status(404).json({ error: "Inasistencia no encontrada" });
            }
            res.json(results.recordset[0]);
        })
        .catch(err => {
            console.error("Error al obtener la inasistencia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
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
        SET fecha = @fecha, motivo = @motivo
        WHERE id = @id
    `;
    req.pool.request()
        .input('fecha', sql.Date, fecha)
        .input('motivo', sql.VarChar, motivo)
        .input('id', sql.Int, id)
        .query(query)
        .then(result => {
            if (result.rowsAffected === 0) {
                return res.status(404).json({ error: "Inasistencia no encontrada" });
            }
            res.json({ id, fecha, motivo, message: "Inasistencia actualizada con éxito" });
        })
        .catch(err => {
            console.error("Error al actualizar la inasistencia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});

// Eliminar una inasistencia
router.delete('/inasistencia/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Inasistencia WHERE id = @id';
    req.pool.request()
        .input('id', sql.Int, id)
        .query(query)
        .then(result => {
            if (result.rowsAffected === 0) {
                return res.status(404).json({ error: "Inasistencia no encontrada" });
            }
            res.json({ message: "Inasistencia eliminada con éxito" });
        })
        .catch(err => {
            console.error("Error al eliminar la inasistencia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});

module.exports = router;
