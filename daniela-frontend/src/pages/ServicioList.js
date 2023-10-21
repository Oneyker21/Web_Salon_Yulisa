import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function Usuariolist() {
  const [servicios, setServicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState({});
  const [formData, setFormData] = useState({
    id_servicios: '',
    cod_cita: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (servicios) => {
    setSelectedServicio(servicios);


    setFormData({
        nombre_servicio: servicios.nombre_servicio,
        descripcion: servicios.descripcion,
        precio_servicio: servicios.precio_servicio,
        cod_cita: servicios.cod_cita,

    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadServicios = () => {
    const url = searchTerm
      ? `http://localhost:5000/crud/searchcitas?term=${encodeURIComponent(searchTerm)}`
      : 'http://localhost:5000/crud/readservicios';

    fetch(url)
      .then((response) => response.json())
      .then((data) => setServicios(data))
      .catch((error) => console.error('Error al obtener los servicios:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/upgradeservicios/${selectedServicio.id_servicios}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadServicios();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (id_servicios) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este servicio?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteservicios/${id_servicios}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadServicios();
          }
        })
        .catch((error) => console.error('Error al eliminar el servicio:', error));
    }
  };

  useEffect(() => {
    loadServicios();
  }, [searchTerm]);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6 title">Listado de Servicios</Card.Title>
          <Form.Control
            type="text"
            placeholder="Buscar servicio"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <Table striped bordered hover>
            <thead>
              <tr className='centrado'>
                <th>Código</th>
                <th>Servicio</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>ID Cita</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr className='centrado' key={servicio.id_servicios}>
                  <td>{servicio.id_servicios}</td>
                  <td>{servicio.nombre_servicio}</td>
                  <td>{servicio.descripcion}</td>
                  <td>{servicio.precio_servicio}</td>
                  <td>{servicio.cod_cita}</td>
                  <td className='buttomsAE'>
                    <Button variant="primary" className='actualizar' onClick={() => openModal(servicio)}>Actualizar</Button>
                    <Button variant="danger" className='eliminar' onClick={() => handleDelete(servicio.id_servicios)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Servicio</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre_servicio" label="Servicio">
                      <Form.Control
                        type="text"
                        name="nombre_servicio"
                        value={formData.nombre_servicio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="precio_servicio" label="Precio">
                      <Form.Control
                        type="number"
                        name="precio_servicio"
                        value={formData.precio_servicio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="cod_cita" label="ID Cita">
                      <Form.Control
                        type="text"
                        name="cod_cita"
                        value={formData.cod_cita}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="descripcion" label="Descripcion">
                      <Form.Control
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleFormChange}
                      />
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
    </div>
  );
}

export default Usuariolist;
