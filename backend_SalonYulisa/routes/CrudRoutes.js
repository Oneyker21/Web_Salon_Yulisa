const express = require('express');
const router = express.Router();


// Ruta para leer los nombres de marca y categoria

// Ruta para obtener los nombres de las categorías
router.get('/nombreempleado', (req, res) => {
  const sql = 'SELECT id_empleados, nombre FROM Empleado';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener los empleados:', err);
      res.status(500).json({ error: 'Error al obtener los empleados' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para obtener los nombres de las marcas
router.get('/nombrecliente', (req, res) => {
  const sql = 'SELECT id_cliente, nombre FROM Cliente';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener los clientes:', err);
      res.status(500).json({ error: 'Error al obtener los clientes' });
    } else {
      res.status(200).json(result);
    }
  });
});

/* curl http://localhost:5000/crud/readclientes */

/* curl -X POST -H "Content-Type: application/json" -d "{\"nombre\":\"NombreCliente\",\"apellido\":\"ApellidoCliente\",\"telefono\":\"1234567890\"}" http://localhost:5000/crud/createclientes */

/* curl -X PUT -H "Content-Type: application/json" -d "{\"nombre\":\"NuevoNombre\",\"apellido\":\"NuevoApellido\",\"telefono\":\"98765432\"}" http://localhost:5000/crud/upgradeclientes/1 */

/* curl -X DELETE http://localhost:5000/crud/deleteclientes/1 */


module.exports = (db) => {
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

  /*  
   curl http://localhost:5000/crud/readempleados
 
   curl -X POST -H "Content-Type: application/json" -d "{\"nombre\":\"Oneyker\",\"apellido\":\"Galeano\",\"telefono\":\"12345678\",\"direccion\":\"la chula mula\"}" http://localhost:5000/crud/createempleados
 
  curl -X PUT -H "Content-Type: application/json" -d "{\"nombre\":\"NuevoNombre\",\"apellido\":\"NuevoApellido\",\"telefono\":\"NuevoTelefono\",\"direccion\":\"NuevaDireccion\"}" http://localhost:5000/crud/upgradeempleados/1
 
   curl -X DELETE http://localhost:5000/crud/deleteempleados/1 */




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

  /* 
curl http://localhost:5000/crud/readcitas

curl -X POST -H "Content-Type: application/json" -d "{\"fecha_cita\":\"2023-10-05\",\"id_cliente\":1,\"id_empleado\":2}" http://localhost:5000/crud/createcitas

curl -X PUT -H "Content-Type: application/json" -d "{\"fecha_cita\":\"2023-10-06\",\"id_cliente\":3,\"id_empleado\":4}" http://localhost:5000/crud/upgradecitas/1

curl -X DELETE http://localhost:5000/crud/deletecitas/1
 
*/


  // Ruta para leer registros de la tabla Cita
  router.get('/readcitas', (req, res) => {
    const sql = 'SELECT Cita.*, Cita_Servicio.id_servicios FROM Cita LEFT JOIN Cita_Servicio ON Cita.cod_cita = Cita_Servicio.cod_cita';
  
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
  router.post('/createcitas', (req, res) => {
    const { fecha_cita, id_cliente, id_empleado, id_servicios } = req.body;

    if (!fecha_cita || !id_cliente || !id_empleado || !id_servicios) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `INSERT INTO Cita (fecha_cita, id_cliente, id_empleado, id_servicios) VALUES (?, ?, ?, ?)`;
    const values = [fecha_cita, id_cliente, id_empleado, id_servicios];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Cita:', err);
        res.status(500).json({ error: 'Error al insertar registro en Cita' });
      } else {
        res.status(201).json({ message: 'Cita creada exitosamente' });
      }
    });
  });

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

    const sql = `
      UPDATE Cita
      SET fecha_cita = ?, id_cliente = ?, id_empleado = ?, id_servicios = ?
      WHERE cod_cita = ?
    `;

    const values = [fecha_cita, id_cliente, id_empleado, id_servicios, cod_cita];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Cita:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en Cita' });
      } else {
        res.status(200).json({ message: 'Cita actualizada exitosamente' });
      }
    });
  });

  // Ruta para eliminar un registro existente en la tabla Cita por ID
  router.delete('/deletecitas/:cod_cita', (req, res) => {
    const cod_cita = req.params.cod_cita;
    const sql = 'DELETE FROM Cita WHERE cod_cita = ?';

    db.query(sql, [cod_cita], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Cita:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Cita' });
      } else {
        res.status(200).json({ message: 'Cita eliminada exitosamente' });
      }
    });
  });


  //------------------------------------------------CRUD SERVICIOS-----------------------------------------------
  /* 
  curl http://localhost:5000/crud/readservicios

  curl -X POST -H "Content-Type: application/json" -d "{\"nombre_servicio\":\"NombreServicio\",\"descripcion\":\"DescripciónServicio\",\"precio_servicio\":100,\"cod_cita\":1}" http://localhost:5000/crud/createservicios

  curl -X PUT -H "Content-Type: application/json" -d "{\"nombre_servicio\":\"NuevoNombre\",\"descripcion\":\"NuevaDescripción\",\"precio_servicio\":200,\"cod_cita\":2}" http://localhost:5000/crud/upgradeservicios/1

  curl -X DELETE http://localhost:5000/crud/deleteservicios/1

  */


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

















  //ServicioCitas

  // Ruta para leer registros de la tabla Cita_Servicio
  router.get('/readcitaservicio', (req, res) => {
    const sql = 'SELECT * FROM Cita_Servicio';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Cita_Servicio:', err);
        res.status(500).json({ error: 'Error al leer registros de Cita_Servicio' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para crear un nuevo registro en la tabla Cita_Servicio
  router.post('/createcitaservicio', (req, res) => {
    const { cod_cita, id_servicios } = req.body;

    if (!cod_cita || !id_servicios) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `INSERT INTO Cita_Servicio (cod_cita, id_servicios) VALUES (?, ?)`;
    const values = [cod_cita, id_servicios];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Cita_Servicio:', err);
        res.status(500).json({ error: 'Error al insertar registro en Cita_Servicio' });
      } else {
        res.status(201).json({ message: 'Relación Cita-Servicio creada exitosamente' });
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

  /* 
    curl http://localhost:5000/crud/readtestimonios
  
    curl -X POST -H "Content-Type: application/json" -d "{\"fecha_testimonio\":\"2023-10-05\",\"testimonio\":\"Este es un testimonio\",\"id_cliente\":1}" http://localhost:5000/crud/createtestimonios
  
    curl -X PUT -H "Content-Type: application/json" -d "{\"fecha_testimonio\":\"2023-10-10\",\"testimonio\":\"Testimonio actualizado\",\"id_cliente\":2}" http://localhost:5000/crud/upgradetestimonios/1
  
    curl -X DELETE http://localhost:5000/crud/deletetestimonios/1
  
  */

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
    const { fecha_testimonio, testimonio, id_cliente } = req.body;

    if (!fecha_testimonio || !testimonio || !id_cliente) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `INSERT INTO Testimonio (fecha_testimonio, testimonio, id_cliente) VALUES (?, ?, ?)`;
    const values = [fecha_testimonio, testimonio, id_cliente];

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
    const { fecha_testimonio, testimonio, id_cliente } = req.body;

    if (!fecha_testimonio || !testimonio || !id_cliente) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
    UPDATE Testimonio
    SET fecha_testimonio = ?, testimonio = ?, id_cliente = ?
    WHERE id_testimonio = ?
  `;

    const values = [fecha_testimonio, testimonio, id_cliente, id_testimonio];

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

  return router;
};

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
  const { nombre_archivo, descripcion, ruta } = req.body;

  if (!nombre_archivo || !ruta) {
      return res.status(400).json({ error: 'Nombre de archivo y ruta son obligatorios' });
  }

  const sql = `INSERT INTO Fotos (nombre_archivo, descripcion, ruta) VALUES (?, ?, ?)`;
  const values = [nombre_archivo, descripcion, ruta];

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
  const { nombre_archivo, descripcion, ruta } = req.body;

  if (!nombre_archivo || !ruta) {
      return res.status(400).json({ error: 'Nombre de archivo y ruta son obligatorios' });
  }

  const sql = `
      UPDATE Fotos
      SET nombre_archivo = ?, descripcion = ?, ruta = ?
      WHERE id_foto = ?
  `;

  const values = [nombre_archivo, descripcion, ruta, id_foto];

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
