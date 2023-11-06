import React, { useState } from 'react';
import { Form, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Fotos() {
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ruta, setRuta] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre_archivo', nombreArchivo);
    formData.append('descripcion', descripcion);
    formData.append('ruta', ruta);
    formData.append('imagen', imagen);

    try {
      const response = await fetch('http://localhost:5000/upload/photo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Imagen subida con éxito');
        setNombreArchivo('');
        setDescripcion('');
        setRuta('');
        setImagen(null);
      } else {
        alert('Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title className='title'>Carga de Fotos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <FloatingLabel controlId="nombreArchivo" label="Nombre del Archivo">
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del archivo"
                  value={nombreArchivo}
                  onChange={(e) => setNombreArchivo(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="descripcion" label="Descripción">
                <Form.Control
                  as="textarea"
                  placeholder="Ingrese la descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="ruta" label="Ruta">
                <Form.Control
                  type="text"
                  placeholder="Ingrese la ruta"
                  value={ruta}
                  onChange={(e) => setRuta(e.target.value)}
                />
              </FloatingLabel>
              <Form.Group controlId="imagen" className="mb-3">
                <Form.Label>Seleccione una imagen</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Subir Imagen
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Fotos;
