# CREACION DE LA BASE DE DATOS
CREATE DATABASE Salon_yulisa;  

# SELECCION DE BD
USE Salon_yulisa;

# CREACION DE TABLA Cliente
CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(15) NOT NULL
);

# CREACION DE TABLA Empleado
CREATE TABLE Empleado (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    direccion VARCHAR(45) NOT NULL
);

CREATE TABLE Cita (
    cod_cita INT AUTO_INCREMENT PRIMARY KEY,
    fecha_cita DATE NOT NULL,
    id_cliente INT,
    id_empleado INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES Empleado(id_empleado)
);

CREATE TABLE Servicios (
    id_servicios INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(15) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    precio_servicio INT NOT NULL,
    cod_cita INT,
    FOREIGN KEY (cod_cita) REFERENCES Cita(cod_cita)
);

CREATE TABLE Testimonio (
    id_testimonio INT AUTO_INCREMENT PRIMARY KEY,
    fecha_testimonio DATE NOT NULL,
    testimonio VARCHAR(100) NOT NULL,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);