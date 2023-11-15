import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Dropdown } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cita({ rol }) {
  const [fecha_cita, setFechaCita] = useState('');
  const [id_cliente, setIdCliente] = useState('');
  const [id_empleado, setIdEmpleado] = useState('');
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = {
      fecha_cita,
      id_cliente,
      id_empleado,
      servicios: serviciosSeleccionados
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createcitas2', {
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
        setServiciosSeleccionados('');
      } else {
        alert('Error al registrar la cita');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  useEffect(() => {
    async function fetchServicios() {
      try {
        const response = await fetch('http://localhost:5000/crud/readservicios');
        if (response.ok) {
          const data = await response.json();
          setServiciosDisponibles(data);
        } else {
          console.error('Error al obtener servicios:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    }
    fetchServicios();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title className='title'>Registro de Citas</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="2">
                  <FloatingLabel controlId="fecha_cita" label="Fecha de Cita">
                    <Form.Control
                      type="date"
                      placeholder='Fecha de Cita'
                      value={fecha_cita}
                      onChange={(e) => setFechaCita(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="10">
                  <Card className="mt-3">
                    <Card.Body>
                      <Form.Group>
                        <Form.Label className="texto-negrita">Seleccione los servicios:</Form.Label>
                        {serviciosDisponibles.map((servicio) => (
                          <Form.Check
                            className="m-2"
                            inline
                            key={servicio.id_servicios}
                            type="checkbox"
                            label={servicio.nombre_servicio}

                            checked={serviciosSeleccionados.includes(servicio.id_servicios)}
                            onChange={(e) => {
                              const servicioId = servicio.id_servicios;
                              if (serviciosSeleccionados.includes(servicioId)) {
                                setServiciosSeleccionados(serviciosSeleccionados.filter((id) => id !== servicioId));
                              } else {
                                setServiciosSeleccionados([...serviciosSeleccionados, servicioId]);
                              }
                            }}
                          />
                        ))}
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm="6" md="6" lg="2">
                  <FloatingLabel controlId="id_cliente" label="ID Cliente">
                    <Form.Control
                      type="text"
                      placeholder='ID Cliente'
                      value={id_cliente}
                      onChange={(e) => setIdCliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="2">
                  <FloatingLabel controlId="id_empleado" label="ID Empleado">
                    <Form.Control
                      type="text"
                      placeholder="ID Empleado"
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

export default Cita;