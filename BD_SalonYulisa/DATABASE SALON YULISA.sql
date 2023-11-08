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

# CREACION DE TABLA Servicios
CREATE TABLE Servicios (
    id_servicios INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(15) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    precio_servicio INT NOT NULL
);

# CREACION DE TABLA Cita
CREATE TABLE Cita (
    cod_cita INT AUTO_INCREMENT PRIMARY KEY,
    fecha_cita DATE NOT NULL,
    id_cliente INT,
    id_empleado INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES Empleado(id_empleado)
);

# Relación entre Cita y Servicios
CREATE TABLE Cita_Servicio (
    cod_cita INT,
    id_servicios INT,
    PRIMARY KEY (cod_cita, id_servicios),
    FOREIGN KEY (cod_cita) REFERENCES Cita(cod_cita),
    FOREIGN KEY (id_servicios) REFERENCES Servicios(id_servicios)
);


# CREACION DE TABLA Testimonio
CREATE TABLE Testimonio (
    id_testimonio INT AUTO_INCREMENT PRIMARY KEY,
    fecha_testimonio DATE NOT NULL,
    puntuacion INT NOT NULL,
    testimonio VARCHAR(100) NOT NULL,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE Usuario (
  id_Usuario Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario Varchar(30) NOT NULL,
  contrasena Varchar(16) NOT NULL,
  rol Varchar(20) NOT NULL
);

# CREACION DE TABLA Fotos
CREATE TABLE Fotos (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    imagen LONGTEXT NOT NULL
);
