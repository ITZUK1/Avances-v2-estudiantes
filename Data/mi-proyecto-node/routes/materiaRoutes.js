const express = require('express');
const router = express.Router();
const sql = require('mssql'); // Asegúrate de importar mssql

router.post('/materia', (req, res) => {
    const { nombre, descripcion, semestre, fecha_inicio, status } = req.body;
    const query = `
        DECLARE @outputTable TABLE (id INT);  -- Declaramos una tabla temporal para almacenar el ID
        INSERT INTO Materia (nombre, descripcion, semestre, fecha_inicio, status)
        OUTPUT INSERTED.id INTO @outputTable  -- Usamos OUTPUT con INTO para guardar el ID
        VALUES (@nombre, @descripcion, @semestre, @fecha_inicio, @status);

        -- Ahora seleccionamos el ID insertado desde la tabla temporal
        SELECT id FROM @outputTable;
    `;
    const fechaInicioValue = fecha_inicio ? fecha_inicio : null;

    req.pool.request()
        .input('nombre', sql.VarChar, nombre)
        .input('descripcion', sql.VarChar, descripcion)
        .input('semestre', sql.VarChar, semestre)
        .input('fecha_inicio', sql.Date, fechaInicioValue)
        .input('status', sql.VarChar, status)
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


router.get('/materia', (req, res) => {
    const query = 'SELECT * FROM Materia';
    req.pool.request()  // Usamos req.pool.request() para hacer la consulta
        .query(query)
        .then(results => {
            res.json(results.recordset);  // Devolver los resultados
        })
        .catch(err => {
            console.error("Error al obtener datos de la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});

router.get('/materia/id/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Materia WHERE id = @id';
    req.pool.request()  // Usamos req.pool.request() para hacer la consulta
        .input('id', sql.Int, id)
        .query(query)
        .then(results => {
            if (results.recordset.length === 0) {
                return res.status(404).json({ message: "Materia no encontrada" });
            }
            const mappedSubject = {
                name: results.recordset[0].nombre,
                status: results.recordset[0].status,
                startDate: results.recordset[0].fecha_inicio,
            };
            res.json(mappedSubject);
        })
        .catch(err => {
            console.error("Error al obtener datos de la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});

router.put('/materia/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, semestre, fecha_inicio, status } = req.body;
    const query = `
        UPDATE Materia
        SET nombre = @nombre, descripcion = @descripcion, semestre = @semestre, fecha_inicio = @fecha_inicio, status = @status
        WHERE id = @id
    `;
    req.pool.request()  // Usamos req.pool.request() para hacer la consulta
        .input('nombre', sql.VarChar, nombre)
        .input('descripcion', sql.VarChar, descripcion)
        .input('semestre', sql.VarChar, semestre)
        .input('fecha_inicio', sql.Date, fecha_inicio)
        .input('status', sql.VarChar, status)
        .input('id', sql.Int, id)
        .query(query)
        .then(result => {
            if (result.rowsAffected === 0) {
                return res.status(404).json({ message: "Materia no encontrada" });
            }
            res.json({ message: "Materia actualizada correctamente" });
        })
        .catch(err => {
            console.error("Error al actualizar la materia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});

router.delete('/materia/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Materia WHERE id = @id';
    req.pool.request()  // Usamos req.pool.request() para hacer la consulta
        .input('id', sql.Int, id)
        .query(query)
        .then(result => {
            if (result.rowsAffected === 0) {
                return res.status(404).json({ message: "Materia no encontrada" });
            }
            res.json({ message: "Materia eliminada correctamente" });
        })
        .catch(err => {
            console.error("Error al eliminar la materia:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        });
});

module.exports = router;
