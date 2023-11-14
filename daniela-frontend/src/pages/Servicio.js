import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Usuario({ rol }) {
  const [nombre_servicio, setNombreServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio_servicio, setPrecioServicio] = useState('');
  const [alerta, setAlerta] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre_servicio || !descripcion || !precio_servicio) {
      mostrarAlerta('warning', '¡Todos los campos deben estar llenos!');
      return;
    }

    const formData = {
      nombre_servicio,
      descripcion,
      precio_servicio,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createservicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        mostrarAlerta('success', 'Registro exitoso');
        setNombreServicio('');
        setDescripcion('');
        setPrecioServicio('');
      } else {
        mostrarAlerta('danger', 'Error al registrar el servicio');
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
            <Card.Title className='title'>Registro de Servicios</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre_servicio" label="Nombre Del Servicio">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre_servicio}
                      onChange={(e) => setNombreServicio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio_servicio" label="Precio">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el precio"
                      value={precio_servicio}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (/^\d*$/.test(inputValue) || inputValue === "") {
                          setPrecioServicio(inputValue);
                        }
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="12">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
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
