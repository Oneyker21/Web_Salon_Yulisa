const express = require('express');
const router = express.Router();






/* curl http://localhost:5000/crud/readclientes */

/* curl -X POST -H "Content-Type: application/json" -d "{\"nombre\":\"NombreCliente\",\"apellido\":\"ApellidoCliente\",\"telefono\":\"1234567890\"}" http://localhost:5000/crud/createclientes */

/* curl -X PUT -H "Content-Type: application/json" -d "{\"nombre\":\"NuevoNombre\",\"apellido\":\"NuevoApellido\",\"telefono\":\"98765432\"}" http://localhost:5000/crud/upgradeclientes/1 */

/* curl -X DELETE http://localhost:5000/crud/deleteclientes/1 */


module.exports = (db) => {



// Ruta para obtener los servicios asociados a una cita
router.get('/readcitaservicios/:cod_cita', (req, res) => {
  const cod_cita = req.params.cod_cita;
  const sql = 'SELECT * FROM Cita_Servicio WHERE cod_cita = ?';
  db.query(sql, [cod_cita], (err, result) => {
    if (err) {
      console.error('Error al leer servicios de cita:', err);
      res.status(500).json({ error: 'Error al leer servicios de cita' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para actualizar los servicios asociados a una cita
router.put('/updatecitaservicios/:cod_cita', (req, res) => {
  const cod_cita = req.params.cod_cita;
  const { servicios } = req.body;

  // Eliminar los servicios existentes asociados a la cita
  const deleteCitaServicioSql = 'DELETE FROM Cita_Servicio WHERE cod_cita = ?';
  db.query(deleteCitaServicioSql, [cod_cita], (err) => {
    if (err) {
      console.error('Error al eliminar servicios de cita:', err);
      return res.status(500).json({ error: 'Error al eliminar servicios de cita' });
    }

    // Insertar los nuevos servicios asociados a la cita
    const insertCitaServicioSql = 'INSERT INTO Cita_Servicio (cod_cita, id_servicios) VALUES ?';
    const servicioValues = servicios.map((servicioId) => [cod_cita, servicioId]);

    db.query(insertCitaServicioSql, [servicioValues], (err) => {
      if (err) {
        console.error('Error al insertar servicios en Cita_Servicio:', err);
        return res.status(500).json({ error: 'Error al insertar servicios en Cita_Servicio' });
      }

      return res.status(200).json({ message: 'Servicios de cita actualizados exitosamente' });
    });
  });
});


































  // Ruta para verificar las credenciales y obtener el rol del usuario
router.post('/login', (req, res) => {
  const { nombre_Usuario, contrasena } = req.body;

  if (!nombre_Usuario || !contrasena) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
  }

  // Realizar la consulta para verificar las credenciales en la base de datos
  const sql = `SELECT rol FROM Usuario WHERE nombre_Usuario = ? AND contrasena = ?`;
  db.query(sql, [nombre_Usuario, contrasena], (err, result) => {
    if (err) {
      console.error('Error al verificar credenciales:', err);
      return res.status(500).json({ error: 'Error al verificar credenciales' });
    }

    if (result.length === 1) {
      const { rol } = result[0];
      res.json({ rol }); // Devolver el rol si las credenciales son correctas
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
});



  // Ruta para leer registros de la tabla Cliente
  router.get('/readclientes', (req, res) => {
    // Realiza una consulta SQL para seleccionar todos los registros de la tabla Cliente
    const sql = 'SELECT * FROM Cliente';

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

  // Ruta para crear un nuevo registro en la tabla Cliente
  router.post('/createclientes', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { nombre, apellido, telefono } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nombre || !apellido || !telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro en la tabla Cliente
    const sql = `INSERT INTO Cliente (nombre, apellido, telefono) VALUES (?, ?, ?)`;
    const values = [nombre, apellido, telefono];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Cliente:', err);
        res.status(500).json({ error: 'Error al insertar registro en Cliente' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(201).json({ message: 'Cliente creado exitosamente' });
      }
    });
  });

  // Ruta para actualizar un registro existente en la tabla Cliente por ID
  router.put('/upgradeclientes/:id_cliente', (req, res) => {
    // Obtén el ID del cliente a actualizar desde los parámetros de la URL
    const id_cliente = req.params.id_cliente;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { nombre, apellido, telefono } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nombre || !apellido || !telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro en la tabla Cliente por ID
    const sql = `
      UPDATE Cliente
      SET nombre = ?, apellido = ?, telefono = ?
      WHERE id_cliente = ?
    `;

    const values = [nombre, apellido, telefono, id_cliente];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Cliente:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en Cliente' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Cliente actualizado exitosamente' });
      }
    });
  });

  // Ruta para eliminar un registro existente en la tabla Cliente por ID
  router.delete('/deleteclientes/:id_cliente', (req, res) => {
    // Obtén el ID del cliente a eliminar desde los parámetros de la URL
    const id_cliente = req.params.id_cliente;

    // Realiza la consulta SQL para eliminar el registro en la tabla Cliente por ID
    const sql = 'DELETE FROM Cliente WHERE id_cliente = ?';

    // Ejecuta la consulta
    db.query(sql, [id_cliente], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Cliente:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Cliente' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
      }
    });
  });


  //------------------------------------------------CRUD EMPLEADO-----------------------------------------------

  // Ruta para leer registros de la tabla Empleado
  router.get('/readempleados', (req, res) => {
    const sql = 'SELECT * FROM Empleado';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Empleado:', err);
        res.status(500).json({ error: 'Error al leer registros de Empleado' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para crear un nuevo registro en la tabla Empleado
  router.post('/createempleados', (req, res) => {
    const { nombre, apellido, telefono, direccion } = req.body;

    if (!nombre || !apellido || !telefono || !direccion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `INSERT INTO Empleado ( nombre, apellido, telefono, direccion) VALUES ( ?, ?, ?, ?)`;
    const values = [nombre, apellido, telefono, direccion];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Empleado:', err);
        res.status(500).json({ error: 'Error al insertar registro en Empleado' });
      } else {
        res.status(201).json({ message: 'Empleado creado exitosamente' });
      }
    });
  });

  // Ruta para actualizar un registro existente en la tabla Empleado por ID
  router.put('/upgradeempleados/:id_empleado', (req, res) => {
    const id_empleado = req.params.id_empleado;
    const { nombre, apellido, telefono, direccion } = req.body;

    if (!nombre || !apellido || !telefono || !direccion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
    UPDATE Empleado
    SET nombre = ?, apellido = ?, telefono = ?, direccion = ?
    WHERE id_empleado = ?
  `;

    const values = [nombre, apellido, telefono, direccion, id_empleado];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Empleado:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en Empleado' });
      } else {
        res.status(200).json({ message: 'Empleado actualizado exitosamente' });
      }
    });
  });

  // Ruta para eliminar un registro existente en la tabla Empleado por ID
  router.delete('/deleteempleados/:id_empleado', (req, res) => {
    const id_empleado = req.params.id_empleado;

    const sql = 'DELETE FROM Empleado WHERE id_empleado = ?';

    db.query(sql, [id_empleado], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Empleado:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Empleado' });
      } else {
        res.status(200).json({ message: 'Empleado eliminado exitosamente' });
      }
    });
  });

  //------------------------------------------------CRUD CITAS-----------------------------------------------


  // Ruta para leer registros de la tabla Cita
  router.get('/readcitas', (req, res) => {
    const sql = `
      SELECT Cita.*, GROUP_CONCAT(Servicios.nombre_servicio SEPARATOR ', ') as servicios, 
      Cliente.nombre as nombre_cliente, Empleado.nombre as nombre_empleado
      FROM Cita
      LEFT JOIN Cita_Servicio ON Cita.cod_cita = Cita_Servicio.cod_cita
      LEFT JOIN Servicios ON Cita_Servicio.id_servicios = Servicios.id_servicios
      LEFT JOIN Cliente ON Cita.id_cliente = Cliente.id_cliente
      LEFT JOIN Empleado ON Cita.id_empleado = Empleado.id_empleado
      GROUP BY Cita.cod_cita
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Cita:', err);
        res.status(500).json({ error: 'Error al leer registros de Cita' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  

  // Ruta para crear un nuevo registro en la tabla Cita
  router.post('/createcitas2', (req, res) => {
    const { fecha_cita, id_cliente, id_empleado, servicios } = req.body;
  
    if (!fecha_cita || !id_cliente || !id_empleado || !servicios) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const sql = `INSERT INTO Cita (fecha_cita, id_cliente, id_empleado) VALUES (?, ?, ?)`;
    const values = [fecha_cita, id_cliente, id_empleado];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Cita:', err);
        res.status(500).json({ error: 'Error al insertar registro en Cita' });
      } else {
        const cod_cita = result.insertId;
        const servicioValues = servicios.map((servicio) => [cod_cita, servicio]);
        const insertCitaServicio = `INSERT INTO Cita_Servicio (cod_cita, id_servicios) VALUES ?`;
        db.query(insertCitaServicio, [servicioValues], (err) => {
          if (err) {
            console.error('Error al insertar servicios en Cita_Servicio:', err);
            res.status(500).json({ error: 'Error al insertar servicios en Cita_Servicio' });
          } else {
            res.status(201).json({ message: 'Cita creada exitosamente' });
          }
        });
      }
    });
  });

  // Ruta para actualizar un registro existente en la tabla Cita por ID
  router.put('/upgradecitas/:cod_cita', (req, res) => {
    const cod_cita = req.params.cod_cita;
    const { fecha_cita, id_cliente, id_empleado, id_servicios } = req.body;
  
    if (!fecha_cita || !id_cliente || !id_empleado || !id_servicios) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const updateCitaSql = `
      UPDATE Cita
      SET fecha_cita = ?, id_cliente = ?, id_empleado = ?
      WHERE cod_cita = ?
    `;
  
    const citaValues = [fecha_cita, id_cliente, id_empleado, cod_cita];
  
    db.query(updateCitaSql, citaValues, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Cita:', err);
        return res.status(500).json({ error: 'Error al actualizar el registro en Cita' });
      }
  
      const deleteCitaServicioSql = `
        DELETE FROM Cita_Servicio
        WHERE cod_cita = ?
      `;
  
      db.query(deleteCitaServicioSql, [cod_cita], (err) => {
        if (err) {
          console.error('Error al eliminar los servicios asociados:', err);
          return res.status(500).json({ error: 'Error al eliminar los servicios asociados' });
        }
  
        const insertCitaServicioSql = `INSERT INTO Cita_Servicio (cod_cita, id_servicios) VALUES ?`;
        const servicioValues = id_servicios.map((servicioId) => [cod_cita, servicioId]);
  
        db.query(insertCitaServicioSql, [servicioValues], (err) => {
          if (err) {
            console.error('Error al insertar servicios en Cita_Servicio:', err);
            return res.status(500).json({ error: 'Error al insertar servicios en Cita_Servicio' });
          }
  
          return res.status(200).json({ message: 'Cita y servicios asociados actualizados exitosamente' });
        });
      });
    });
  });
  

  // Ruta para eliminar un registro existente en la tabla Cita por ID
  router.delete('/deletecitas/:cod_cita', (req, res) => {
    const cod_cita = req.params.cod_cita;
    
    const deleteCitaServicioSql = `
      DELETE FROM Cita_Servicio
      WHERE cod_cita = ?
    `;
  
    db.query(deleteCitaServicioSql, [cod_cita], (err) => {
      if (err) {
        console.error('Error al eliminar la conexión en Cita_Servicio:', err);
        return res.status(500).json({ error: 'Error al eliminar la conexión en Cita_Servicio' });
      }
  
      const deleteCitaSql = 'DELETE FROM Cita WHERE cod_cita = ?';
  
      db.query(deleteCitaSql, [cod_cita], (err, result) => {
        if (err) {
          console.error('Error al eliminar el registro en Cita:', err);
          return res.status(500).json({ error: 'Error al eliminar el registro en Cita' });
        }
  
        return res.status(200).json({ message: 'Cita eliminada exitosamente' });
      });
    });
  });
  


  //------------------------------------------------CRUD SERVICIOS-----------------------------------------------



  // Ruta para leer registros de la tabla Servicios
  router.get('/readservicios', (req, res) => {
    const sql = 'SELECT * FROM Servicios';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Servicios:', err);
        res.status(500).json({ error: 'Error al leer registros de Servicios' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para crear un nuevo registro en la tabla Servicios
  router.post('/createservicios', (req, res) => {
    const { nombre_servicio, descripcion, precio_servicio } = req.body;

    if (!nombre_servicio || !descripcion || !precio_servicio) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `INSERT INTO Servicios (nombre_servicio, descripcion, precio_servicio) VALUES (?, ?, ?)`;
    const values = [nombre_servicio, descripcion, precio_servicio];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Servicios:', err);
        res.status(500).json({ error: 'Error al insertar registro en Servicios' });
      } else {
        res.status(201).json({ message: 'Servicio creado exitosamente' });
      }
    });
  });

  // Ruta para actualizar un registro existente en la tabla Servicios por ID
  router.put('/upgradeservicios/:id_servicios', (req, res) => {
    const id_servicios = req.params.id_servicios;
    const { nombre_servicio, descripcion, precio_servicio } = req.body;

    if (!nombre_servicio || !descripcion || !precio_servicio) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
      UPDATE Servicios
      SET nombre_servicio = ?, descripcion = ?, precio_servicio = ?
      WHERE id_servicios = ?
    `;

    const values = [nombre_servicio, descripcion, precio_servicio, id_servicios];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Servicios:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en Servicios' });
      } else {
        res.status(200).json({ message: 'Servicio actualizado exitosamente' });
      }
    });
  });

  // Ruta para eliminar un registro existente en la tabla Servicios por ID
  router.delete('/deleteservicios/:id_servicios', (req, res) => {
    const id_servicios = req.params.id_servicios;
    const sql = 'DELETE FROM Servicios WHERE id_servicios = ?';

    db.query(sql, [id_servicios], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Servicios:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Servicios' });
      } else {
        res.status(200).json({ message: 'Servicio eliminado exitosamente' });
      }
    });
  });


 
  // Ruta para eliminar un registro existente en la tabla Cita_Servicio por ID
  router.delete('/deletecitaservicio/:cod_cita/:id_servicios', (req, res) => {
    const cod_cita = req.params.cod_cita;
    const id_servicios = req.params.id_servicios;
    const sql = 'DELETE FROM Cita_Servicio WHERE cod_cita = ? AND id_servicios = ?';

    db.query(sql, [cod_cita, id_servicios], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Cita_Servicio:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Cita_Servicio' });
      } else {
        res.status(200).json({ message: 'Relación Cita-Servicio eliminada exitosamente' });
      }
    });
  });

  //------------------------------------------------CRUD TESTIMONIOS-----------------------------------------------

  // Ruta para leer registros de la tabla Testimonio
  router.get('/readtestimonios', (req, res) => {
    const sql = 'SELECT * FROM Testimonio';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Testimonio:', err);
        res.status(500).json({ error: 'Error al leer registros de Testimonio' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para crear un nuevo registro en la tabla Testimonio
  router.post('/createtestimonios', (req, res) => {
    const { fecha_testimonio, testimonio, id_cliente, puntuacion } = req.body;

    if (!fecha_testimonio || !testimonio || !id_cliente || !puntuacion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql =`INSERT INTO Testimonio (fecha_testimonio, testimonio, id_cliente, puntuacion) VALUES (?, ?, ?, ?)`;
    const values = [fecha_testimonio, testimonio, id_cliente, puntuacion];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Testimonio:', err);
        res.status(500).json({ error: 'Error al insertar registro en Testimonio' });
      } else {
        res.status(201).json({ message: 'Testimonio creado exitosamente' });
      }
    });
  });

  // Ruta para actualizar un registro existente en la tabla Testimonio por ID
  router.put('/upgradetestimonios/:id_testimonio', (req, res) => {
    const id_testimonio = req.params.id_testimonio;
    const { fecha_testimonio, testimonio, id_cliente, puntuacion } = req.body;

    if (!fecha_testimonio || !testimonio || !id_cliente || !puntuacion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
    UPDATE Testimonio
    SET fecha_testimonio = ?, testimonio = ?, id_cliente = ?, puntuacion = ?
    WHERE id_testimonio = ?    
  `;
 
  const values = [fecha_testimonio, testimonio, id_cliente, puntuacion, id_testimonio];


    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Testimonio:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en Testimonio' });
      } else {
        res.status(200).json({ message: 'Testimonio actualizado exitosamente' });
      }
    });
  });

  // Ruta para eliminar un registro existente en la tabla Testimonio por ID
  router.delete('/deletetestimonios/:id_testimonio', (req, res) => {
    const id_testimonio = req.params.id_testimonio;

    const sql = 'DELETE FROM Testimonio WHERE id_testimonio = ?';

    db.query(sql, [id_testimonio], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Testimonio:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Testimonio' });
      } else {
        res.status(200).json({ message: 'Testimonio eliminado exitosamente' });
      }
    });
  });


  // Ruta para leer registros de la tabla Fotos
router.get('/readfotos', (req, res) => {
  const sql = 'SELECT * FROM Fotos';

  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al leer registros de Fotos:', err);
          res.status(500).json({ error: 'Error al leer registros de Fotos' });
      } else {
          res.status(200).json(result);
      }
  });
});

// Ruta para crear un nuevo registro en la tabla Fotos
router.post('/createfotos', (req, res) => {
  const {  descripcion, imagen } = req.body;

  if (!descripcion || !imagen) {
      return res.status(400).json({ error: 'Nombre de archivo y ruta son obligatorios' });
  }

  const sql = `INSERT INTO Fotos (descripcion, imagen) VALUES (?, ?)`;
  const values = [descripcion, imagen];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error al insertar registro en Fotos:', err);
          res.status(500).json({ error: 'Error al insertar registro en Fotos' });
      } else {
          res.status(201).json({ message: 'Foto creada exitosamente' });
      }
  });
});

// Ruta para actualizar un registro existente en la tabla Fotos por ID
router.put('/upgradefotos/:id_foto', (req, res) => {
  const id_foto = req.params.id_foto;
  const {descripcion, ruta } = req.body;

  if (!descripcion || !ruta) {
      return res.status(400).json({ error: 'Nombre de archivo y imagen son obligatorios' });
  }

  const sql = `
      UPDATE Fotos
      SET descripcion = ?, imagen = ?
      WHERE id_foto = ?
  `;

  const values = [descripcion, imagen, id_foto];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error al actualizar el registro en Fotos:', err);
          res.status(500).json({ error: 'Error al actualizar el registro en Fotos' });
      } else {
          res.status(200).json({ message: 'Foto actualizada exitosamente' });
      }
  });
});

// Ruta para eliminar un registro existente en la tabla Fotos por ID
router.delete('/deletefotos/:id_foto', (req, res) => {
  const id_foto = req.params.id_foto;

  const sql = 'DELETE FROM Fotos WHERE id_foto = ?';

  db.query(sql, [id_foto], (err, result) => {
      if (err) {
          console.error('Error al eliminar el registro en Fotos:', err);
          res.status(500).json({ error: 'Error al eliminar el registro en Fotos' });
      } else {
          res.status(200).json({ message: 'Foto eliminada exitosamente' });
      }
  });
});


  return router;
};
