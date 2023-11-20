import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cita({ rol }) {
  const [fecha_cita, setFechaCita] = useState('');
  const [id_cliente, setIdCliente] = useState('');
  const [id_empleado, setIdEmpleado] = useState('');
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [alerta, setAlerta] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fecha_cita || !id_cliente || !id_empleado || serviciosSeleccionados.length === 0) {
      mostrarAlerta('warning', '¡Todos los campos deben estar llenos!');
      return;
    }

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
        mostrarAlerta('success', 'Registro de cita exitoso');
        setFechaCita('');
        setIdCliente('');
        setIdEmpleado('');
        setServiciosSeleccionados([]);
      } else {
        mostrarAlerta('danger', 'Error al registrar la cita');
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
            <Card.Title className='title'>Registro de Citas</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">


                <Col sm="6" md="6" lg="3">
                  <FloatingLabel controlId="fecha_cita" label="Fecha de Cita">
                    <Form.Control
                      type="date"
                      placeholder='Fecha de Cita'
                      value={fecha_cita}
                      onChange={(e) => setFechaCita(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="9">
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
