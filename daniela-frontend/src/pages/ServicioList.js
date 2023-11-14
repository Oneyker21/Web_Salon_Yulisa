import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function Usuariolist({ rol }) {
  const [servicios, setServicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState({});
  const [formData, setFormData] = useState({
    nombre_servicio: '',
    descripcion: '',
    precio_servicio: '',
    cod_cita: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (servicio) => {
    setSelectedServicio(servicio);

    setFormData({
      nombre_servicio: servicio.nombre_servicio,
      descripcion: servicio.descripcion,
      precio_servicio: servicio.precio_servicio,
      cod_cita: servicio.cod_cita,
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
    fetch('http://localhost:5000/crud/readservicios')
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

  const openDeleteModal = (servicio) => {
    setSelectedServicio(servicio);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    const idServicio = selectedServicio.id_servicios;

    fetch(`http://localhost:5000/crud/deleteservicios/${idServicio}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          loadServicios();
          setShowDeleteModal(false); // Cerramos el modal después de la eliminación
        }
      })
      .catch((error) => console.error('Error al eliminar el servicio:', error));
  };

  const filteredServicios = servicios.filter((servicio) => {
    const serviceName = servicio.nombre_servicio.toLowerCase();
    const search = searchTerm.toLowerCase();

    return serviceName.includes(search);
  });

  useEffect(() => {
    loadServicios();
  }, [searchTerm]);

  return (
    <div>
      <Header rol={rol} />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6 title">Listado de Servicios</Card.Title>

          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Buscar por nombre de servicio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr className='centrado'>
                <th>Código</th>
                <th>Servicio</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredServicios.map((servicio) => (
                <tr className='centrado' key={servicio.id_servicios}>
                  <td>{servicio.id_servicios}</td>
                  <td>{servicio.nombre_servicio}</td>
                  <td>{servicio.descripcion}</td>
                  <td><span>C$</span>{servicio.precio_servicio.toFixed(2)}</td>
                  <td className='buttomsAE'>
                    <Button variant="primary" className='actualizar' onClick={() => openModal(servicio)}><FaPencil/></Button>
                    <Button variant="danger" className='eliminar' onClick={() => openDeleteModal(servicio)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal para actualizar servicio */}
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
                        placeholder="Ingrese el nombre del servicio"
                        name="nombre_servicio"
                        value={formData.nombre_servicio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="descripcion" label="Descripción">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la descripción"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="precio_servicio" label="Precio">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el precio"
                        name="precio_servicio"
                        value={formData.precio_servicio}
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

      {/* Modal de confirmación para eliminar servicio */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Seguro que deseas eliminar el servicio <b>{selectedServicio.nombre_servicio}</b>?</p>
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

export default Usuariolist;
