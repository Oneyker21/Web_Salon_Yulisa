import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function Usuariolist() {
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

  // Función para abrir el modal y pasar los datos del cliente seleccionado
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

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadEmpleados = () => {
    const url = searchTerm
      ? `http://localhost:5000/crud/searchempleados?term=${encodeURIComponent(searchTerm)}`
      : 'http://localhost:5000/crud/readempleados';

    fetch(url)
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error('Error al obtener los empleados:', error));
  };

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/upgradeempleados/${selectedEmpleado.id_empleado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de empleados
          setShowModal(false);
          loadEmpleados(); // Cargar la lista de empleados actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un empleado
  const handleDelete = (idEmpleado) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este empleado?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el empleado
      fetch(`http://localhost:5000/crud/deleteempleados/${idEmpleado}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de empleados
            loadEmpleados();
          }
        })
        .catch((error) => console.error('Error al eliminar el empleado:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los empleados
  useEffect(() => {
    loadEmpleados();
  }, [searchTerm]);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6">Listado de Empleados</Card.Title>
          <Form.Control
            type="text"
            placeholder="Buscar empleado"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado) => (
                <tr key={empleado.id_empleado}>
                  <td>{empleado.id_empleado}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.telefono}</td>
                  <td>{empleado.direccion}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(empleado)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(empleado.id_empleado)}>Eliminar</Button>
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
