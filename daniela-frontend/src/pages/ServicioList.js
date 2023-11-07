import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function Usuariolist({rol}) {
  const [servicios, setServicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const handleDelete = (idServicio) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este servicio?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteservicios/${idServicio}`, {
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
      <Header rol={rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6 title">Listado de Servicios</Card.Title>
          
          {/* Input para la búsqueda */}
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
                  <td>{servicio.precio_servicio}</td>
                  <td className='buttomsAE'>
                    <Button variant="primary" className='actualizar' onClick={() => openModal(servicio)}><FaPencil/></Button>
                    <Button variant="danger" className='eliminar' onClick={() => handleDelete(servicio.id_servicios)}><FaTrashCan/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal para actualizar servicio */}
    </div>
  );
}

export default Usuariolist;
