const express = require('express');
const router = express.Router();
const db = require('../server');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/estudiantes/documento_identidad/:documento_identidad', (req, res) => {
  const query = 'SELECT * FROM estudiante WHERE documento_identidad = ?';
  db.query(query, [req.params.documento_identidad], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

router.put('/estudiantes/imagen/:documento_identidad', upload.single('avatar'), (req, res) => {
  const avatar_url = `/uploads/${req.file.filename}`;
  const query = 'UPDATE estudiante SET avatar_url = ? WHERE documento_identidad = ?';
  db.query(query, [avatar_url, req.params.documento_identidad], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ avatar_url });
  });
});

router.put('/estudiantes/estado/:documento_identidad', (req, res) => {
  const query = 'UPDATE estudiante SET status = ? WHERE documento_identidad = ?';
  db.query(query, [req.body.status, req.params.documento_identidad], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Estado actualizado' });
  });
});

router.get('/estudiantes/imagen/:documento_identidad', (req, res) => {
  const query = 'SELECT avatar_url FROM estudiante WHERE documento_identidad = ?';
  db.query(query, [req.params.documento_identidad], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

    const avatarUrl = result[0].avatar_url;
    res.json({ avatar_url: avatarUrl });
  });
});


module.exports = router;
