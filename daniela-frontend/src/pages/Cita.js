import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Usuario() {
  const [fecha_cita, setFechaCita] = useState('');
  const [id_cliente, setIdCliente] = useState('');
  const [id_empleado, setIdEmpleado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const formData = {
      fecha_cita,
      id_cliente,
      id_empleado,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createcitas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro de cita exitoso');
        setFechaCita('');
        setIdCliente('');
        setIdEmpleado('');
      } else {
        alert('Error al registrar la cita');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Citas</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="fechaCita" label="Fecha de Cita">
                    <Form.Control
                      type="date"
                      value={fecha_cita}
                      onChange={(e) => setFechaCita(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="idCliente" label="ID Cliente">
                    <Form.Control
                      type="text"
                      value={id_cliente}
                      onChange={(e) => setIdCliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="idEmpleado" label="ID Empleado">
                    <Form.Control
                      type="text"
                      value={id_empleado}
                      onChange={(e) => setIdEmpleado(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 custom-button" size="lg">
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
