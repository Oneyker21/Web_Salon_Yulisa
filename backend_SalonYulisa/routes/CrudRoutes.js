const express = require('express');
const router = express.Router();

/* curl -X POST -H "Content-Type: application/json" -d "{\"nombre\":\"NombreCliente\",\"apellido\":\"ApellidoCliente\",\"telefono\":\"1234567890\"}" http://localhost:5000/clientes */

/* curl -X PUT -H "Content-Type: application/json" -d "{\"nombre\":\"NuevoNombre\",\"apellido\":\"NuevoApellido\",\"telefono\":\"98765432\"}" http://localhost:5000/crud/clientes/1 */

/* curl -X DELETE http://localhost:5000/crud/clientes/1 */


module.exports = (db) => {
  // Ruta para leer registros de la tabla Cliente
  router.get('/clientes', (req, res) => {
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
  router.post('/clientes', (req, res) => {
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
  router.put('/clientes/:id_cliente', (req, res) => {
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
  router.delete('/clientes/:id_cliente', (req, res) => {
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

  // Repite el proceso para las otras tablas (Empleado, Cita, Servicios, Testimonio)



  //------------------------------------------------CRUD EMPLEADO-----------------------------------------------

  // Ruta para leer registros de la tabla Empleado
  router.get('/empleados', (req, res) => {
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
  router.post('/empleados', (req, res) => {
    const { nombre, apellido, telefono, direccion } = req.body;

    if (!nombre || !apellido || !telefono || !direccion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `INSERT INTO Empleado (nombre, apellido, telefono, direccion) VALUES (?, ?, ?, ?)`;
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
  router.put('/empleados/:id_empleado', (req, res) => {
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
  router.delete('/empleados/:id_empleado', (req, res) => {
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
  router.get('/citas', (req, res) => {
    const sql = 'SELECT * FROM Cita';

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
  router.post('/citas', (req, res) => {
    const { fecha_cita, id_cliente, id_empleado } = req.body;

    if (!fecha_cita || !id_cliente || !id_empleado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `INSERT INTO Cita (fecha_cita, id_cliente, id_empleado) VALUES (?, ?, ?)`;
    const values = [fecha_cita, id_cliente, id_empleado];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Cita:', err);
        res.status(500).json({ error: 'Error al insertar registro en Cita' });
      } else {
        res.status(201).json({ message: 'Cita creada exitosamente' });
      }
    });
  });

  // Ruta para actualizar un registro existente en la tabla Cita por ID
  router.put('/citas/:cod_cita', (req, res) => {
    const cod_cita = req.params.cod_cita;
    const { fecha_cita, id_cliente, id_empleado } = req.body;

    if (!fecha_cita || !id_cliente || !id_empleado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
    UPDATE Cita
    SET fecha_cita = ?, id_cliente = ?, id_empleado = ?
    WHERE cod_cita = ?
  `;

    const values = [fecha_cita, id_cliente, id_empleado, cod_cita];

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
  router.delete('/citas/:cod_cita', (req, res) => {
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

  // Ruta para leer registros de la tabla Servicios
  router.get('/servicios', (req, res) => {
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
  router.post('/servicios', (req, res) => {
    const { nombre_servicio, descripcion, precio_servicio, cod_cita } = req.body;

    if (!nombre_servicio || !descripcion || !precio_servicio || !cod_cita) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `INSERT INTO Servicios (nombre_servicio, descripcion, precio_servicio, cod_cita) VALUES (?, ?, ?, ?)`;
    const values = [nombre_servicio, descripcion, precio_servicio, cod_cita];

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
  router.put('/servicios/:id_servicios', (req, res) => {
    const id_servicios = req.params.id_servicios;
    const { nombre_servicio, descripcion, precio_servicio, cod_cita } = req.body;

    if (!nombre_servicio || !descripcion || !precio_servicio || !cod_cita) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
    UPDATE Servicios
    SET nombre_servicio = ?, descripcion = ?, precio_servicio = ?, cod_cita = ?
    WHERE id_servicios = ?
  `;

    const values = [nombre_servicio, descripcion, precio_servicio, cod_cita, id_servicios];

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
  router.delete('/servicios/:id_servicios', (req, res) => {
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


  //------------------------------------------------CRUD TESTIMONIOS-----------------------------------------------

  // Ruta para leer registros de la tabla Testimonio
  router.get('/testimonios', (req, res) => {
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
  router.post('/testimonios', (req, res) => {
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
  router.put('/testimonios/:id_testimonio', (req, res) => {
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
  router.delete('/testimonios/:id_testimonio', (req, res) => {
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