import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function Usuariolist({rol}) {
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (empleado) => {
    setSelectedEmpleado(empleado);

    setFormData({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
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

  const loadEmpleados = () => {
    fetch('http://localhost:5000/crud/readempleados')
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error('Error al obtener los empleados:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/upgradeempleados/${selectedEmpleado.id_empleado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadEmpleados();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (idEmpleado) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este empleado?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteempleados/${idEmpleado}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadEmpleados();
          }
        })
        .catch((error) => console.error('Error al eliminar el empleado:', error));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    loadEmpleados();
  }, [searchTerm]);

  const filteredEmpleados = empleados.filter((empleado) => {
    const search = searchTerm.toLowerCase();
    return (
      empleado.nombre.toLowerCase().includes(search) ||
      empleado.apellido.toLowerCase().includes(search) ||
      empleado.telefono.toString().includes(search) ||
      empleado.direccion.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <Header rol={rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6 title">Listado de Empleados</Card.Title>
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
          <Table striped bordered hover>
            <thead>
              <tr className='centrado'>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpleados.map((empleado) => (
                <tr className='centrado' key={empleado.id_empleado}>
                  <td>{empleado.id_empleado}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.telefono}</td>
                  <td>{empleado.direccion}</td>
                  <td>
                    <Button variant="primary" className='actualizar' onClick={() => openModal(empleado)}><FaPencil/></Button>
                    <Button variant="danger" className='eliminar' onClick={() => handleDelete(empleado.id_empleado)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Empleado</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre" label="Nombres">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los nombres"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="apellido" label="Apellidos">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los apellidos"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el teléfono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="12">
                    <FloatingLabel controlId="direccion" label="Dirección">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la dirección"
                        name="direccion"
                        value={formData.direccion}
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
