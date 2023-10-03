const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Ruta para leer registros de la tabla Cliente
  router.get('/clientes', (req, res) => {
    // Realiza una consulta SQL para seleccionar todos los registros de la tabla Cliente
    const sql = 'SELECT * FROM cliente';

    // Ejecuta la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Cliente:', err);
        res.status(500).json({ error: 'Error al leer registros de Cliente' });
      } else {
        // Devuelve los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });
  return router;
};
