import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function Usuariolist() {
  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState({});
  const [formData, setFormData] = useState({
    fecha_cita: '',
    id_cliente: '',
    id_empleado: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (cita) => {
    setSelectedCita(cita);
    const formattedfechacita = formatDateForInput(cita.fecha_cita);

    setFormData({
      fecha_cita: formattedfechacita,
      id_cliente: cita.id_cliente,
      id_empleado: cita.id_empleado,
    });
    setShowModal(true);
  };

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
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

  const loadCitas = () => {
    const url = searchTerm
      ? `http://localhost:5000/crud/searchcitas?term=${encodeURIComponent(searchTerm)}`
      : 'http://localhost:5000/crud/readcitas';

    fetch(url)
      .then((response) => response.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error('Error al obtener las citas:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/upgradecitas/${selectedCita.cod_cita}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadCitas();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (codCita) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta cita?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deletecitas/${codCita}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadCitas();
          }
        })
        .catch((error) => console.error('Error al eliminar la cita:', error));
    }
  };

  useEffect(() => {
    loadCitas();
  }, [searchTerm]);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6 title">Listado de Citas</Card.Title>
          <Form.Control
            type="text"
            placeholder="Buscar cita"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <Table striped bordered hover>
            <thead>
              <tr className='centrado'>
                <th>Código</th>
                <th>Fecha de Cita</th>
                <th>ID Cliente</th>
                <th>ID Empleado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr className='centrado' key={cita.cod_cita}>
                  <td>{cita.cod_cita}</td>
                  <td>{formatDateForInput(cita.fecha_cita)}</td>
                  <td>{cita.id_cliente}</td>
                  <td>{cita.id_empleado}</td>
                  <td className='buttomsAE'>
                    <Button variant="primary" className='actualizar' onClick={() => openModal(cita)}>Actualizar</Button>
                    <Button variant="danger" className='eliminar' onClick={() => handleDelete(cita.cod_cita)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Cita</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="fecha_cita" label="Fecha de Cita">
                      <Form.Control
                        type="date"
                        name="fecha_cita"
                        value={formData.fecha_cita}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="id_cliente" label="ID Cliente">
                      <Form.Control
                        type="text"
                        name="id_cliente"
                        value={formData.id_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="id_empleado" label="ID Empleado">
                      <Form.Control
                        type="text"
                        name="id_empleado"
                        value={formData.id_empleado}
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
