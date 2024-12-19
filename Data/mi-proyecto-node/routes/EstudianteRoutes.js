const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sql = require('mssql');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Ruta para crear un estudiante
router.post('/estudiantes', (req, res) => {
  const { documento_identidad, nombre, fecha_nacimiento, telefono, status } = req.body;
  const query = `
    INSERT INTO Estudiante (documento_identidad, nombre, fecha_nacimiento, telefono, status)
    VALUES (@documento_identidad, @nombre, @fecha_nacimiento, @telefono, @status);
    SELECT SCOPE_IDENTITY() AS id; -- Obtiene el ID generado
  `;
  
  req.pool.request()
    .input('documento_identidad', sql.VarChar, documento_identidad)
    .input('nombre', sql.VarChar, nombre)
    .input('fecha_nacimiento', sql.Date, fecha_nacimiento)
    .input('telefono', sql.VarChar, telefono)
    .input('status', sql.VarChar, status)
    .query(query)
    .then(result => {
      if (result.recordset.length > 0) {
        res.json({ id: result.recordset[0].id, ...req.body });
      } else {
        res.status(500).json({ error: "No se pudo insertar el estudiante" });
      }
    })
    .catch(err => {
      console.error("Error al insertar en la base de datos:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    });
});


// Ruta para obtener todos los estudiantes
router.get('/estudiantes', (req, res) => {
  const query = 'SELECT documento_identidad, nombre, fecha_nacimiento, telefono, status FROM estudiante';
  
  req.pool.request()
    .query(query)
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
      console.error("Error ejecutando la consulta:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    });
});

// Ruta para obtener un estudiante por documento de identidad
router.get('/estudiantes/documento_identidad/:documento_identidad', (req, res) => {
  const query = 'SELECT * FROM estudiante WHERE documento_identidad = @documento_identidad';
  
  req.pool.request()
    .input('documento_identidad', sql.VarChar, req.params.documento_identidad)
    .query(query)
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
      console.error("Error ejecutando la consulta:", err);
      return res.status(500).send(err);
    });
});

// Ruta para actualizar los datos de un estudiante
router.put('/estudiantes/documento_identidad/:documento_identidad', (req, res) => {
  const { nombre, fecha_nacimiento, telefono, status } = req.body;
  const { documento_identidad } = req.params;

  const query = `
    UPDATE estudiante
    SET nombre = @nombre, fecha_nacimiento = @fecha_nacimiento, telefono = @telefono, status = @status
    WHERE documento_identidad = @documento_identidad
  `;
  
  req.pool.request()
    .input('nombre', sql.VarChar, nombre)
    .input('fecha_nacimiento', sql.Date, fecha_nacimiento)
    .input('telefono', sql.VarChar, telefono)
    .input('status', sql.VarChar, status)
    .input('documento_identidad', sql.VarChar, documento_identidad)
    .query(query)
    .then(result => {
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
      }
      res.json({ message: "Estudiante actualizado correctamente" });
    })
    .catch(err => {
      console.error("Error ejecutando la consulta:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    });
});

// Ruta para eliminar un estudiante
router.delete('/estudiantes/documento_identidad/:documento_identidad', (req, res) => {
  const { documento_identidad } = req.params;

  const query = 'DELETE FROM estudiante WHERE documento_identidad = @documento_identidad';
  
  req.pool.request()
    .input('documento_identidad', sql.VarChar, documento_identidad)
    .query(query)
    .then(result => {
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
      }
      res.json({ message: "Estudiante eliminado correctamente" });
    })
    .catch(err => {
      console.error("Error ejecutando la consulta:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    });
});

// Ruta para actualizar el estado de un estudiante
router.put('/estudiantes/estado/:documento_identidad', (req, res) => {
  const { status } = req.body;
  const { documento_identidad } = req.params;

  if (status !== 'activo' && status !== 'inactivo') {
    return res.status(400).json({ message: "Estado inválido" });
  }

  const query = `
    UPDATE estudiante
    SET status = @status
    WHERE documento_identidad = @documento_identidad
  `;
  
  req.pool.request()
    .input('status', sql.VarChar, status)
    .input('documento_identidad', sql.VarChar, documento_identidad)
    .query(query)
    .then(result => {
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
      }
      res.json({ message: "Estado actualizado correctamente" });
    })
    .catch(err => {
      console.error("Error ejecutando la consulta:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    });
});

// Ruta para actualizar la imagen de un estudiante
router.put('/estudiantes/imagen/:documento_identidad', upload.single('avatar'), (req, res) => {
  const { documento_identidad } = req.params;
  if (!documento_identidad) {
    return res.status(400).json({ error: 'El documento_identidad es requerido' });
  }
  const avatar_url = `/uploads/${req.file.filename}`;
  const query = 'UPDATE estudiante SET avatar_url = @avatar_url WHERE documento_identidad = @documento_identidad';

  req.pool.request()
    .input('avatar_url', sql.VarChar, avatar_url)
    .input('documento_identidad', sql.VarChar, documento_identidad)
    .query(query)
    .then(() => {
      res.json({ avatar_url });
    })
    .catch(err => {
      console.error("Error al subir la imagen:", err);
      return res.status(500).send(err);
    });
});


// Ruta para obtener la imagen de un estudiante
router.get('/estudiantes/imagen/:documento_identidad', (req, res) => {
  const query = 'SELECT avatar_url FROM estudiante WHERE documento_identidad = @documento_identidad';
  
  req.pool.request()
    .input('documento_identidad', sql.VarChar, req.params.documento_identidad)
    .query(query)
    .then(result => {
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      const avatarUrl = result.recordset[0].avatar_url;
      res.json({ avatar_url: avatarUrl });
    })
    .catch(err => {
      console.error("Error ejecutando la consulta:", err);
      return res.status(500).send(err);
    });
});

module.exports = router;
