import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = ({ setRol }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [nombre_Usuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = async () => {
    const formData = {
      nombre_Usuario,
      contrasena,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { rol } = await response.json();
        setRol(rol);
        navigate('/home');
      } else {
        console.log('Credenciales incorrectas');
        setErrorMensaje('¡usuario o contraseña incorrecto!');

        setTimeout(() => {
          setErrorMensaje('');
        }, 4000);
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };


  return (
    <div>
      <section id="inicio">
        <main className="inicio-contactos">
          <div className="contenido-principal">
            <h1>Bienvenido al Salón Yulisa</h1>
            <p>todavía nada.</p>
            <div className="center-button">
              <Button variant="primary" onClick={handleShowLoginModal} className="mt-3">
                Iniciar Sesión
              </Button>
              <Button variant="secondary" className="mt-3 ms-2">
                Registrarse
              </Button>
            </div>
          </div>
        </main>
      </section>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {errorMensaje && (
            <Alert variant="danger" className="mt-3 alert">
              {errorMensaje}
            </Alert>
          )}

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Row>
              <Col sm="12" md="12" lg="12" className="mb-3">
                <FloatingLabel controlId="nombreUsuarioModal" label="Usuario">
                  <Form.Control
                    placeholder="Usuario"
                    type="text"
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col sm="12" md="12" lg="12" className="mb-3">
                <FloatingLabel controlId="contrasenaModal" label="Contraseña">
                  <Form.Control
                    placeholder="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col sm="12" md="12" lg="12">
                <Form.Check
                  type="checkbox"
                  label="Mostrar contraseña"
                  onChange={() => setShowPassword(!showPassword)}
                />
              </Col>
            </Row>
            <div className="center-button">
              <Button variant="primary" type="submit" block className="mt-3">
                Iniciar Sesión
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default Home;
