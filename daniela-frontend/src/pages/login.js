import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = ({ setRol }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [nombre_Usuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = async () => {
    const formData = {
      nombre_Usuario,
      contrasena
    };

    try {
      const response = await fetch('http://localhost:5000/crud/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const { rol } = await response.json();
        setRol(rol);
        navigate('/home');
      } else {
        console.log('Credenciales incorrectas');
        alert('¡Credenciales incorrectas!');
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Pantalla Principal</Card.Title>
              <div className="center-button">
                <Button variant="primary" onClick={handleShowLoginModal} className="mt-3">
                  Iniciar Sesión
                </Button>
                <Button variant="secondary" className="mt-3 ms-2">
                  Registrarse
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Row>
              <Col sm="12" md="12" lg="12" className="mb-3">
                <FloatingLabel controlId="nombreUsuarioModal" label="Ingrese su usuario">
                  <Form.Control
                    placeholder="Ingrese su usuario"
                    type="text"
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col sm="12" md="12" lg="12">
                <FloatingLabel controlId="contrasenaModal" label="Ingrese su contraseña">
                  <Form.Control
                    placeholder="Ingrese su contraseña"
                    type="password"
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Button variant="primary" type="submit" block className="mt-3">
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Home;
