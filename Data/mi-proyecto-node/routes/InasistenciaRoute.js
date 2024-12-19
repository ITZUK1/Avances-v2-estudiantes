const express = require('express');
const router = express.Router();
const sql = require('mssql'); // Asegúrate de importar mssql

// Crear una inasistencia utilizando el nombre del estudiante y el nombre de la materia
router.post('/inasistencia', (req, res) => {
    const { fecha, estudiante_nombre, materia_nombre, motivo } = req.body;

    // Buscar el id del estudiante por su nombre
   // Buscar el id del estudiante por su nombre
const queryEstudiante = 'SELECT id FROM Estudiante WHERE nombre = @estudiante_nombre';
req.pool.request()
    .input('estudiante_nombre', sql.VarChar, estudiante_nombre)
    .query(queryEstudiante)
    .then(resultsEstudiante => {
        if (resultsEstudiante.recordset.length === 0) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }
        const estudiante_id = resultsEstudiante.recordset[0]?.id; // Usar el operador de encadenamiento opcional para evitar el error

        // Buscar el id de la materia por su nombre
        const queryMateria = 'SELECT id FROM Materia WHERE nombre = @materia_nombre';
        req.pool.request()
            .input('materia_nombre', sql.VarChar, materia_nombre)
            .query(queryMateria)
            .then(resultsMateria => {
                if (resultsMateria.recordset.length === 0) {
                    return res.status(404).json({ error: "Materia no encontrada" });
                }
                const materia_id = resultsMateria.recordset[0].id;

                // Insertar la inasistencia con los ids obtenidos
                const query = `
                    INSERT INTO Inasistencia (fecha, estudiante_id, materia_id, motivo)
                    VALUES (@fecha, @estudiante_id, @materia_id, @motivo)
                `;
                req.pool.request()
                    .input('fecha', sql.Date, fecha)
                    .input('estudiante_id', sql.Int, estudiante_id)
                    .input('materia_id', sql.Int, materia_id)
                    .input('motivo', sql.VarChar, motivo)
                    .query(query)
                    .then(result => {
                        res.json({ id: result.recordset[0].id, ...req.body });
                    })
                    .catch(err => {
                        console.error("Error al insertar en la base de datos:", err);
                        return res.status(500).json({ error: "Error en la base de datos" });
                    });
            })
            .catch(err => {
                console.error("Error al buscar la materia:", err);
                return res.status(500).json({ error: "Error al buscar la materia" });
            });
    })
    .catch(err => {
        console.error("Error al buscar el estudiante:", err);
        return res.status(500).json({ error: "Error al buscar el estudiante" });
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
