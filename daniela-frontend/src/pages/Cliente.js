import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Usuario({ rol }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [alerta, setAlerta] = useState(null);

  const nombreApellidoRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
  const telefonoRegex = /^\d+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !telefono) {
      mostrarAlerta('warning', '¡Todos los campos deben estar llenos!');
      return;
    }

    if (!nombreApellidoRegex.test(nombre) || !nombreApellidoRegex.test(apellido)) {
      mostrarAlerta('warning', '¡Los nombres y los apellidos deben comenzar con mayúsculas!');
      return;
    }

    if (!telefonoRegex.test(telefono)) {
      mostrarAlerta('warning', '¡El teléfono debe contener solo números!');
      return;
    }

    const formData = {
      nombre,
      apellido,
      telefono,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createclientes', {
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
      } else {
        mostrarAlerta('danger', 'Error al registrar el cliente');
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
            style={{ zIndex: 1, transition: 'opacity 1s ease-in-out' }}
          >
            {alerta.mensaje}
          </Alert>
        )}
      </div>
      <Container>
        <Card className="mt-5">
          <Card.Body>
            <Card.Title className='title'>Registro de Clientes</Card.Title>
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
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (/^\d*$/.test(inputValue) || inputValue === "") {
                          setTelefono(inputValue);
                        }
                      }}
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
