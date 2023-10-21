import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Usuario() {
  // Crear un estado para cada campo del formulario
  const [nombre_servicio, setNombreServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio_servicio, setPrecioServicio] = useState('');
  const [cod_cita, setCodCita] = useState('');


  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre_servicio,
      descripcion,
      precio_servicio,
      cod_cita,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createservicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setNombreServicio('');
        setDescripcion('');
        setPrecioServicio('');
        setCodCita('');
      } else {
        alert('Error al registrar el servicio');
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
            <Card.Title className='title'>Registro de Servicios</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombre_servicio" label="Nombre Del Servicio">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre_servicio}
                      onChange={(e) => setNombreServicio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="descripcion" label="Descripcion">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="precio_servicio" label="Precio">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el teléfono"
                      value={precio_servicio}
                      onChange={(e) => setPrecioServicio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="cod_cita" label="ID Cita">
                    <Form.Control
                      type="text"
                      placeholder="ID Cita"
                      value={cod_cita}
                      onChange={(e) => setCodCita(e.target.value)}
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
