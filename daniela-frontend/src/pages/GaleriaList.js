import React, { useState, useEffect } from 'react';  // Importa las funciones useState y useEffect de React
import { Row, Col, Container, Card, Badge, Form, FloatingLabel } from 'react-bootstrap';  // Importa componentes de react-bootstrap
import Header from '../components/Header';  // Importa el componente Header desde su ubicación relativa
import '../styles/App.css';  // Importa estilos CSS del archivo App.css

function Galeria({ rol }) {  // Define un componente funcional Galeria que recibe props

  const [fotos, setFotos] = useState([]);  // Crea un estado para almacenar la lista de productos
  
  const [searchQuery, setSearchQuery] = useState('');  // Crea un estado para almacenar la cadena de búsqueda

  const handleSearchChange = (e) => {  // Función para manejar cambios en la búsqueda
    setSearchQuery(e.target.value);  // Actualiza el estado con la cadena de búsqueda ingresada
  };

  const filteredFotos = fotos.filter((foto) => {  // Filtra los productos según la cadena de búsqueda
    // Convierte a minúsculas los valores de los campos para realizar una búsqueda insensible a mayúsculas y minúsculas
    const descripcion = foto.descripcion;
    const imagen = foto.imagen;
    const search = searchQuery.toLowerCase();
    
    // Verifica si la cadena de búsqueda se encuentra en algún campo de los productos
    // Devuelve un nuevo array con los productos filtrados
    return (
      descripcion.includes(search)
    );

  });

  useEffect(() => {  // Realiza una solicitud GET al servidor para obtener los productos
    fetch('http://localhost:5000/crud/readfotos')  // Realiza una petición GET al servidor
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((data) => setFotos(data))  // Actualiza el estado con la lista de productos obtenida
      .catch((error) => console.error('Error al obtener los productos:', error));  // Maneja errores en la obtención de productos
  }, []);  // Se ejecuta solo en la primera renderización del componente

  return (
    <div>
    <Header rol={ rol } />

    <Container className="margen-contenedor">

      <Row className="mb-3">
        <Col sm="6" md="6" lg="4">
          <FloatingLabel controlId="search" label="Buscar">
            <Form.Control
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="g-3">
        {filteredFotos.map((foto) => (
          <Col sm="12" md="4" lg="3">
            <Card>
              <Card.Img className="image-card" variant="top" src={foto.imagen} alt={foto.descripcion} />
              <Card.Body>
                <Card.Title>{foto.descripcion}</Card.Title>
                <Card.Text>
                  {foto.descripcion}
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link href="/citas">Reservacion</Card.Link>
              </Card.Body>
            </Card>
          </Col>            
        ))}
      </Row>
    </Container>

  </div>
  );
}

export default Galeria;  // Exporta el componente Galeria
