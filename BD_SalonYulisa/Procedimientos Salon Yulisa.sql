/*CRUD EMPLEADO Y CLIENTE*/
/* Insertar */
DELIMITER //

# Procedimiento para insertar un nuevo cliente
CREATE PROCEDURE CrearCliente(
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_telefono VARCHAR(15)
)
BEGIN
    -- Insertar en la tabla Cliente
    INSERT INTO Cliente (nombre, apellido, telefono)
    VALUES (p_nombre, p_apellido, p_telefono);
END //

# Procedimiento para insertar un nuevo empleado
CREATE PROCEDURE CrearEmpleado(
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_telefono VARCHAR(15),
    IN p_direccion VARCHAR(45)
)
BEGIN
    -- Insertar en la tabla Empleado
    INSERT INTO Empleado (nombre, apellido, telefono, direccion)
    VALUES (p_nombre, p_apellido, p_telefono, p_direccion);
END //

DELIMITER ;

-- Llamada para crear un nuevo cliente
CALL CrearCliente('Kenny Antonio', 'Tellez Cruz', '123456789');

-- Llamada para crear un nuevo empleado
CALL CrearEmpleado('Gisela Paola', 'Tellez Cruz', '987654321', 'Ami de mi guacho');

/*Fin insertar*/

/* Actualizar */
DELIMITER //

# Procedimiento para actualizar un cliente
CREATE PROCEDURE ModificarCliente(
    IN p_id_cliente INT,
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_telefono VARCHAR(15)
)
BEGIN
    -- Actualizar la tabla Cliente
    UPDATE Cliente SET
        nombre = p_nombre,
        apellido = p_apellido,
        telefono = p_telefono
    WHERE id_cliente = p_id_cliente;
END //

# Procedimiento para actualizar un empleado
CREATE PROCEDURE ModificarEmpleado(
    IN p_id_empleado INT,
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_telefono VARCHAR(15),
    IN p_direccion VARCHAR(45)
)
BEGIN
    -- Actualizar la tabla Empleado
    UPDATE Empleado SET
        nombre = p_nombre,
        apellido = p_apellido,
        telefono = p_telefono,
        direccion = p_direccion
    WHERE id_empleado = p_id_empleado;
END //

DELIMITER ;

-- Llamada para actualizar un cliente
CALL ModificarCliente(1, 'Denis Oneyker', 'Galeano Castilla', '987654321');

-- Llamada para actualizar un empleado
CALL ModificarEmpleado(1, 'Oscar Jose', 'Perez Castilla', '123456789', 'Alfrente de las cariñosas');

/*Fin Actualizar*/

/* Mostrar */
DELIMITER //

# Procedimiento para mostrar la información de un cliente
CREATE PROCEDURE MostrarCliente(
    IN p_id_cliente INT
)
BEGIN
    -- Seleccionar la información del cliente
    SELECT *
    FROM Cliente
    WHERE id_cliente = p_id_cliente;
END //

# Procedimiento para mostrar la información de un empleado
CREATE PROCEDURE MostrarEmpleado(
    IN p_id_empleado INT
)
BEGIN
    -- Seleccionar la información del empleado
    SELECT *
    FROM Empleado
    WHERE id_empleado = p_id_empleado;
END //

DELIMITER ;

-- Llamada para mostrar la información de un cliente
CALL MostrarCliente(1);

-- Llamada para mostrar la información de un empleado
CALL MostrarEmpleado(1);

/*Fin Mostrar*/

/* Buscar */
DELIMITER //

# Procedimiento para buscar clientes por nombre y apellido
CREATE PROCEDURE BuscarCliente(
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50)
)
BEGIN
    -- Buscar clientes por nombre y apellido
    SELECT *
    FROM Cliente
    WHERE nombre = p_nombre AND apellido = p_apellido;
END //

# Procedimiento para buscar empleados por nombre y apellido
CREATE PROCEDURE BuscarEmpleado(
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50)
)
BEGIN
    -- Buscar empleados por nombre y apellido
    SELECT *
    FROM Empleado
    WHERE nombre = p_nombre AND apellido = p_apellido;
END //

DELIMITER ;

-- Llamada para buscar clientes por nombre y apellido
CALL BuscarCliente('Oneyker', 'Galeano');

-- Llamada para buscar empleados por nombre y apellido
CALL BuscarEmpleado('Oscar', 'Perez');

/*Fin Buscar*/

/* Eliminar */
DELIMITER //

# Procedimiento para eliminar un cliente
CREATE PROCEDURE EliminarCliente(
    IN p_id_cliente INT
)
BEGIN
    -- Eliminar el cliente
    DELETE FROM Cliente
    WHERE id_cliente = p_id_cliente;
END //

# Procedimiento para eliminar un empleado
CREATE PROCEDURE EliminarEmpleado(
    IN p_id_empleado INT
)
BEGIN
    -- Eliminar el empleado
    DELETE FROM Empleado
    WHERE id_empleado = p_id_empleado;
END //

DELIMITER ;

-- Llamada para eliminar un cliente
-- CALL EliminarCliente(1);

-- Llamada para eliminar un empleado
-- CALL EliminarEmpleado(1);

/* Fin Eliminar */

/*CRUD EMPLEADO Y CLIENTE*/
DELIMITER //

# Procedimiento para insertar una nueva cita
CREATE PROCEDURE CrearCita(
    IN p_fecha_cita DATE,
    IN p_id_cliente INT,
    IN p_id_empleado INT
)
BEGIN
    -- Insertar en la tabla Cita
    INSERT INTO Cita (fecha_cita, id_cliente, id_empleado)
    VALUES (p_fecha_cita, p_id_cliente, p_id_empleado);
END //

# Procedimiento para insertar un nuevo servicio
CREATE PROCEDURE CrearServicio(
    IN p_nombre_servicio VARCHAR(15),
    IN p_descripcion VARCHAR(50),
    IN p_precio_servicio INT,
    IN p_cod_cita INT
)
BEGIN
    -- Insertar en la tabla Servicios
    INSERT INTO Servicios (nombre_servicio, descripcion, precio_servicio, cod_cita)
    VALUES (p_nombre_servicio, p_descripcion, p_precio_servicio, p_cod_cita);
END //

DELIMITER ;

-- Llamada para crear una nueva cita
CALL CrearCita('2023-10-10', 1, 1);

-- Llamada para crear un nuevo servicio
CALL CrearServicio('Manicura', 'Uñas no tan largas pero en negro', 50, 1);

/* Fin Insertar*/

/* Actualizar */
DELIMITER //

# Procedimiento para actualizar una cita
CREATE PROCEDURE ModificarCita(
    IN p_cod_cita INT,
    IN p_fecha_cita DATE,
    IN p_id_cliente INT,
    IN p_id_empleado INT
)
BEGIN
    -- Actualizar la tabla Cita
    UPDATE Cita SET
        fecha_cita = p_fecha_cita,
        id_cliente = p_id_cliente,
        id_empleado = p_id_empleado
    WHERE cod_cita = p_cod_cita;
END //

# Procedimiento para actualizar un servicio
CREATE PROCEDURE ModificarServicio(
    IN p_id_servicio INT,
    IN p_nombre_servicio VARCHAR(15),
    IN p_descripcion VARCHAR(50),
    IN p_precio_servicio INT,
    IN p_cod_cita INT
)
BEGIN
    -- Actualizar la tabla Servicios
    UPDATE Servicios SET
        nombre_servicio = p_nombre_servicio,
        descripcion = p_descripcion,
        precio_servicio = p_precio_servicio,
        cod_cita = p_cod_cita
    WHERE id_servicios = p_id_servicio;
END //

DELIMITER ;

-- Llamada para modificar una cita
CALL ModificarCita(1, '2023-10-15', 1, 1);

-- Llamada para modificar un servicio
CALL ModificarServicio(1, 'Maquillaje', 'Natural', 75, 1);

/* Fin Actualizar */

/* Mostrar */
DELIMITER //

# Procedimiento para mostrar información de una cita
CREATE PROCEDURE MostrarCita(
    IN p_cod_cita INT
)
BEGIN
    -- Seleccionar información de la cita
    SELECT *
    FROM Cita
    WHERE cod_cita = p_cod_cita;
END //

# Procedimiento para mostrar información de un servicio
CREATE PROCEDURE MostrarServicio(
    IN p_id_servicio INT
)
BEGIN
    -- Seleccionar información del servicio
    SELECT *
    FROM Servicios
    WHERE id_servicios = p_id_servicio;
END //

DELIMITER ;

-- Llamada para mostrar información de una cita
CALL MostrarCita(1);

-- Llamada para mostrar información de un servicio
CALL MostrarServicio(1);

/* Fin Mostrar */

/* Buscar */
DELIMITER //

# Procedimiento para buscar citas por fecha
CREATE PROCEDURE BuscarCitaPorFecha(
    IN p_fecha_cita DATE
)
BEGIN
    -- Buscar citas por fecha
    SELECT *
    FROM Cita
    WHERE fecha_cita = p_fecha_cita;
END //

# Procedimiento para buscar servicios por nombre
CREATE PROCEDURE BuscarServicioPorNombre(
    IN p_nombre_servicio VARCHAR(15)
)
BEGIN
    -- Buscar servicios por nombre
    SELECT *
    FROM Servicios
    WHERE nombre_servicio = p_nombre_servicio;
END //

DELIMITER ;

-- Llamada para buscar citas por fecha
CALL BuscarCitaPorFecha('2023-10-15');

-- Llamada para buscar servicios por nombre
CALL BuscarServicioPorNombre('Maquillaje');

/* Fin Buscar */
DELIMITER //

# Procedimiento para eliminar una cita
CREATE PROCEDURE EliminarCita(
    IN p_cod_cita INT
)
BEGIN
    -- Eliminar la cita
    DELETE FROM Cita
    WHERE cod_cita = p_cod_cita;
END //

# Procedimiento para eliminar un servicio
CREATE PROCEDURE EliminarServicio(
    IN p_id_servicio INT
)
BEGIN
    -- Eliminar el servicio
    DELETE FROM Servicios
    WHERE id_servicios = p_id_servicio;
END //

DELIMITER ;

-- Llamada para eliminar una cita
-- CALL EliminarCita(1);

-- Llamada para eliminar un servicio
-- CALL EliminarServicio(1);

/* Fin Eliminar */

/* CRUD TESTIMONIO */
DELIMITER //

# Procedimiento para insertar un nuevo testimonio
CREATE PROCEDURE CrearTestimonio(
    IN p_fecha_testimonio DATE,
    IN p_testimonio VARCHAR(100),
    IN p_id_cliente INT
)
BEGIN
    -- Insertar en la tabla Testimonio
    INSERT INTO Testimonio (fecha_testimonio, testimonio, id_cliente)
    VALUES (p_fecha_testimonio, p_testimonio, p_id_cliente);
END //

DELIMITER ;

-- Llamada para crear un nuevo testimonio
CALL CrearTestimonio('2023-10-20', 'Este es un testimonio increíble.', 1);

/* Fin Insertar */

/* Actualizar */
DELIMITER //

# Procedimiento para actualizar un testimonio
CREATE PROCEDURE ModificarTestimonio(
    IN p_id_testimonio INT,
    IN p_fecha_testimonio DATE,
    IN p_testimonio VARCHAR(100),
    IN p_id_cliente INT
)
BEGIN
    -- Actualizar la tabla Testimonio
    UPDATE Testimonio SET
        fecha_testimonio = p_fecha_testimonio,
        testimonio = p_testimonio,
        id_cliente = p_id_cliente
    WHERE id_testimonio = p_id_testimonio;
END //

DELIMITER ;

-- Llamada para modificar un testimonio
CALL ModificarTestimonio(1, '2023-10-25', 'Ya no es tan increible.', 1);

/* Fin Actualizar */

/* Mostrar */
DELIMITER //

# Procedimiento para mostrar información de un testimonio
CREATE PROCEDURE MostrarTestimonio(
    IN p_id_testimonio INT
)
BEGIN
    -- Seleccionar información del testimonio
    SELECT *
    FROM Testimonio
    WHERE id_testimonio = p_id_testimonio;
END //

DELIMITER ;

-- Llamada para mostrar información de un testimonio
CALL MostrarTestimonio(1);

/* Fin Mostrar */

/* Buscar */
DELIMITER //

# Procedimiento para buscar testimonios por fecha
CREATE PROCEDURE BuscarTestimonioPorFecha(
    IN p_fecha_testimonio DATE
)
BEGIN
    -- Buscar testimonios por fecha
    SELECT *
    FROM Testimonio
    WHERE fecha_testimonio = p_fecha_testimonio;
END //

DELIMITER ;

-- Llamada para buscar testimonios por fecha
CALL BuscarTestimonioPorFecha('2023-10-25');

/* Fin Buscar */

/* Eliminar */
DELIMITER //

# Procedimiento para eliminar un testimonio
CREATE PROCEDURE EliminarTestimonio(
    IN p_id_testimonio INT
)
BEGIN
    -- Eliminar el testimonio
    DELETE FROM Testimonio
    WHERE id_testimonio = p_id_testimonio;
END //

DELIMITER ;

-- Llamada para eliminar un testimonio
-- CALL EliminarTestimonio(1);

/* Fin Eliminar */
