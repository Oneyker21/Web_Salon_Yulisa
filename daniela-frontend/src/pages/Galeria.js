import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Usuario({ rol }) {
    // Crear un estado para cada campo del formulario
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            descripcion,
            imagen,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/createfotos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // El registro se creó exitosamente
                alert('imagen guardado');
                // Reiniciar los campos del formulario
                setDescripcion('');
                setImagen('');
            } else {
                alert('Error al registrar la imagen');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado
      
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result; // Obtener la imagen en formato base64
          setImagen(base64String); // Guardado imagen en variable de estado
        }; 
        if (file) {
          reader.readAsDataURL(file); // Lee el contenido del archivo como base64
        }
      };

    return (
        <div>
            <Header rol={rol} />

            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title className='title'>Registro de Imagenes</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col sm="6" md="6" lg="12">
                                    <FloatingLabel controlId="descripcion" label="Descripcion">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el nombre"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="12">
                                    <Form.Group controlId="imagen" className="" >
                                        <Form.Control
                                            type="file"
                                            accept=".jpg, .png, .jpeg"
                                            size="lg"
                                            onChange={handleImagenChange}
                                        />
                                    </Form.Group>
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

export default Usuario;
