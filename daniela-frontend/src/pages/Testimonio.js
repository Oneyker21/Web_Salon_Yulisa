import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function Testimonio() {
  const [fecha_testimonio, setFechaTestimonio] = useState('');
  const [testimonio, setTestimonio] = useState('');
  const [id_cliente, setIdCliente] = useState('');
  const [puntuacion, setPuntuacion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    function getCurrentDateFormatted() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    const currentDate = getCurrentDateFormatted();

    const formData = {
      puntuacion,
      testimonio,
      id_cliente,
      fecha_testimonio: currentDate,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createtestimonios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Testimonio registrado exitosamente');
        setPuntuacion(0);
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

  function StarRating({ rating, onRatingChange }) {
    const maxRating = 5;
    const starSize = 30;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const isSolid = i <= rating;

      const starStyle = {
        fontSize: `${starSize}px`,
        color: isSolid ? '#FFD700' : '#C0C0C0',
        cursor: 'pointer',
        marginRight: '5px', 
        paddingTop: '12px', 
        paddingLeft: '10px',
      };

      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={isSolid ? solidStar : regularStar}
          onClick={() => onRatingChange(i)}
          style={starStyle}
        />
      );
    }

    return (
      <div className="star-rating-container">
        <div className="star-rating">{stars}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title className='title'>Registro de Testimonio</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="3">
                  <FloatingLabel controlId="puntuacion" label="">
                    <StarRating rating={puntuacion} onRatingChange={setPuntuacion} />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="9">
                  <FloatingLabel controlId="testimonio" label="Testimonio">
                    <Form.Control
                      as="textarea"
                      placeholder="Ingrese el testimonio"
                      value={testimonio}
                      onChange={(e) => setTestimonio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="2">
                  <FloatingLabel controlId="id_cliente" label="ID Cliente">
                    <Form.Control
                      type="text"
                      placeholder="ID del cliente"
                      value={id_cliente}
                      onChange={(e) => setIdCliente(e.target.value)}
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

export default Testimonio;
