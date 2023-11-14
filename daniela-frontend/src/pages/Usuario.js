import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Usuario({ rol }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [alerta, setAlerta] = useState(null);

  const nombreApellidoRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
  const telefonoRegex = /^\d+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !telefono || !direccion) {
      mostrarAlerta('warning', 'Todos los campos deben estar llenos');
      return;
    }

    if (!nombreApellidoRegex.test(nombre) || !nombreApellidoRegex.test(apellido)) {
      mostrarAlerta('warning', 'El nombre y el apellido deben comenzar con mayúscula');
      return;
    }

    if (!telefonoRegex.test(telefono)) {
      mostrarAlerta('warning', 'El teléfono debe contener solo números');
      return;
    }

    const formData = {
      nombre,
      apellido,
      telefono,
      direccion,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createempleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        mostrarAlerta('success', 'Registro exitoso');
        setNombre('');
        setApellido('');
        setTelefono('');
        setDireccion('');
      } else {
        mostrarAlerta('danger', 'Error al registrar el empleado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      mostrarAlerta('danger', 'Error en la solicitud al servidor');
    }
  };

  const mostrarAlerta = (tipo, mensaje) => {
    setAlerta({ tipo, mensaje });
    setTimeout(() => {
      setAlerta(null);
    }, 4000);
  };

  return (
    <div>
      <Header rol={rol} />
      <div style={{ position: 'relative' }}>
              {alerta && (
                <Alert
                  variant={alerta.tipo}
                  className="position-absolute mt-4 start-50 translate-middle p-2"
                  style={{ zIndex: 1, opacity: alerta ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                >
                  {alerta.mensaje}
                </Alert>
              )}
            </div>
      <Container>
        <Card className="mt-5">
          <Card.Body>
            <Card.Title className='title'>Registro de Empleados</Card.Title>
            
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="apellido" label="Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="12">
                  <FloatingLabel controlId="direccion" label="Dirección">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la dirección"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 register-button" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Usuario;
