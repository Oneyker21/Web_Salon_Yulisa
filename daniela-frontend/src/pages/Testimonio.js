import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Testimonio() {
  // Crear un estado para cada campo del formulario
  const [fecha_testimonio, setFechaTestimonio] = useState('');
  const [testimonio, setTestimonio] = useState('');
  const [id_cliente, setIdCliente] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      fecha_testimonio,
      testimonio,
      id_cliente,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createtestimonios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El testimonio se creó exitosamente
        alert('Testimonio registrado exitosamente');
        // Reiniciar los campos del formulario
        setFechaTestimonio('');
        setTestimonio('');
        setIdCliente('');
      } else {
        alert('Error al registrar el testimonio');
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
            <Card.Title className='title'>Registro de Testimonio</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="fecha_testimonio" label="Fecha del Testimonio">
                    <Form.Control
                      type="date"
                      value={fecha_testimonio}
                      onChange={(e) => setFechaTestimonio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="id_cliente" label="ID Cliente">
                    <Form.Control
                      type="text"
                      placeholder="ID del cliente"
                      value={id_cliente}
                      onChange={(e) => setIdCliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="12">
                  <FloatingLabel controlId="testimonio" label="Testimonio">
                    <Form.Control
                      as="textarea"
                      placeholder="Ingrese el testimonio"
                      value={testimonio}
                      onChange={(e) => setTestimonio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 register-button" size="lg">
                  Registrar Testimonio
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Testimonio;
