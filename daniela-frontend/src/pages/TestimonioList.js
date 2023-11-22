import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Form, Modal, FloatingLabel, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function TestimonioList({ rol }) {
  const [testimonios, setTestimonios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTestimonio, setSelectedTestimonio] = useState({});
  const [formData, setFormData] = useState({
    fecha_testimonio: '',
    testimonio: '',
    id_cliente: '',
    puntuacion: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (testimonio) => {
    setSelectedTestimonio(testimonio);

    const formattedFechaTestimonio = formatDateForInput(testimonio.fecha_testimonio);

    setFormData({
      fecha_testimonio: formattedFechaTestimonio,
      testimonio: testimonio.testimonio,
      id_cliente: testimonio.id_cliente,
      puntuacion: testimonio.puntuacion,
    });
    setShowModal(true);
  };

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadTestimonios = () => {
    fetch('http://localhost:5000/crud/readtestimonios')
      .then((response) => response.json())
      .then((data) => setTestimonios(data))
      .catch((error) => console.error('Error al obtener los testimonios:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/upgradetestimonios/${selectedTestimonio.id_testimonio}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadTestimonios();
        }
      })
      .catch((error) => console.error('Error al actualizar el testimonio:', error));
  };

  const handleDelete = (id_testimonio) => {
    setSelectedTestimonio({ id_testimonio }); // Guardamos el testimonio seleccionado para la confirmación
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    const id_testimonio = selectedTestimonio.id_testimonio;
    fetch(`http://localhost:5000/crud/deletetestimonios/${id_testimonio}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          loadTestimonios();
          setShowDeleteModal(false);
        }
      })
      .catch((error) => console.error('Error al eliminar el testimonio:', error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    loadTestimonios();
  }, []);

  function StarRatingEdit({ rating, onRatingChange }) {
    const maxRating = 5;
    const starSize = 30;
    const stars = [];

    const handleRatingChange = (newRating) => {
      onRatingChange(newRating);
    };

    for (let i = 1; i <= maxRating; i++) {
      const isSolid = i <= rating;

      const starStyle = {
        fontSize: `${starSize}px`,
        color: isSolid ? '#FFD700' : '#C0C0C0',
        cursor: 'pointer',
        marginRight: '0px',
        paddingTop: '5px',
        paddingLeft: '0px',
      };

      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={isSolid ? solidStar : regularStar}
          onClick={() => handleRatingChange(i)}
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

  function StarRating({ rating }) {
    const maxRating = 5;
    const starSize = 20;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const isSolid = i <= rating;

      const starStyle = {
        fontSize: `${starSize}px`,
        color: isSolid ? '#FFD700' : '#C0C0C0',
      };

      stars.push(
        <span key={i} style={starStyle}>
          {isSolid ? '★' : '☆'}
        </span>
      );
    }

    return <div>{stars}</div>;
  }

  const filteredTestimonios = testimonios.filter((testimonio) => {
    const search = searchTerm.toLowerCase();
    return (
      testimonio.id_testimonio.toString().includes(search) ||
      formatDateForInput(testimonio.fecha_testimonio).includes(search) ||
      testimonio.testimonio.toLowerCase().includes(search) ||
      testimonio.id_cliente.toString().includes(search)
    );
  });

  return (
    <div>
      <Header rol={rol} />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6 title">Listado de Testimonios</Card.Title>
          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr className='centrado'>
                <th>ID Testimonio</th>
                <th>Fecha</th>
                <th>Puntuación</th>
                <th>Comentario</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonios.map((testimonio) => (
                <tr className='centrado' key={testimonio.id_testimonio}>
                  <td>{testimonio.id_testimonio}</td>
                  <td>{formatDateForInput(testimonio.fecha_testimonio)}</td>
                  <td><StarRating rating={parseInt(testimonio.puntuacion)} /></td>
                  <td>{testimonio.testimonio}</td>
                  <td>{testimonio.nombre_cliente}</td>
                  <td className='buttomsAE'>
                    <Button variant="primary" className='actualizar' onClick={() => openModal(testimonio)}><FaPencil /></Button>
                    <Button variant="danger" className='eliminar' onClick={() => handleDelete(testimonio.id_testimonio)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Testimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Testimonio</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="9">
                    <FloatingLabel controlId="testimonio" label="Testimonio">
                      <Form.Control
                        type="text"
                        name="testimonio"
                        value={formData.testimonio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="3">
                    <FloatingLabel controlId="puntuacion" label="">
                      <StarRatingEdit rating={parseInt(formData.puntuacion)}
                        onRatingChange={(value) => setFormData({ ...formData, puntuacion: value })} />
                    </FloatingLabel>
                  </Col>

                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Testimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Seguro que deseas eliminar este testimonio?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TestimonioList;
