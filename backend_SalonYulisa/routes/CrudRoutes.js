const express = require('express');
const router = express.Router();

module.exports = (db) =>{
  // Ruta para leer registros
  router.get('/read', (req, res) =>{

 
     // Utiliza la instancia de la base de datos pasada como parámetr
     // Realizar una consulta SQL para seleccionar todos los registro
     const sql = 'SELECT * FROM city';



     // Ejecutar la consulta
    db.query(sql, (err, result) => {
       if (err) {
        console.error( 'Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
       } else{
         // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
       }
     });


   });
   // Otras rutas CRUD
   return router;

   // Ruta para crear un nuevo registro con ID específico
  router.post('/create', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { id, name, countrycode, district, population } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!id || !name || !countrycode || !district || !population) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO city (ID, Name, CountryCode, District, Population) VALUES (?, ?, ?, ?, ?)`;
    const values = [id, name, countrycode, district, population];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        // Devuelve el ID del nuevo registro como respuesta
        res.status(201).json({ id });
      }
    });
  });

  


};