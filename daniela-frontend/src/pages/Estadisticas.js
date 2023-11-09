import React, { useEffect, useState } from 'react';  // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import jsPDF from 'jspdf';  // Importación de jsPDF para la generación de documentos PDF
import Chart from 'chart.js/auto';  // Importación de Chart.js para gráficos
import '../styles/App.css';  // Importación de estilos CSS desde '../styles/App.css'


//Asegúrate de instalar jsPDF en tu proyecto si aún no lo has hecho
//  npm install jspdf
//Documentación:  https://github.com/parallax/jsPDF

//Asegúrate de instalar Chart.js en tu proyecto si aún no lo has hecho
//  npm install chart.js
//Documentación:  https://www.chartjs.org/docs/latest/


//Documentacion de react-bootstrap en caso de querer emplear otro componente en su intefaz
//  https://react-bootstrap.netlify.app/


function Estadisticas({ rol }) {  // Declaración del componente Estadisticas con el argumento 'rol'

  const [productos, setProductos] = useState([]);  // Declaración del estado 'productos' y su función 'setProductos' a través de useState, con un valor inicial de un array vacío
  const [myChart, setMyChart] = useState(null);  // Declaración del estado 'myChart' y su función 'setMyChart' a través de useState, con un valor inicial de 'null'

  useEffect(() => {
    fetch('http://localhost:5000/readcitas') // Actualiza la ruta para obtener citas y sus detalles
      .then((response) => response.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error('Error al obtener las citas:', error));
  }, []);

  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/readcitas') // Actualiza la ruta para obtener citas y sus detalles
      .then((response) => response.json())
      .then((citas) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Citas y Servicios", 20, 10);

        citas.forEach((cita) => {
          doc.text(`Cliente: ${cita.nombre_cliente}`, 20, y);
          doc.text(`Empleado: ${cita.nombre_empleado}`, 20, y + 10);
          doc.text(`Servicios: ${cita.servicios}`, 20, y + 20);

          y += 40;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_citas_servicios.pdf");
      })
      .catch((error) => console.error('Error al obtener las citas:', error));
  };

  return(
    <div>
      <Header rol={ rol } />  

      <Container className="margen-contenedor">

        <Row className="g-3">

          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>
                <canvas id="myChart"  height="300"></canvas>
              </Card.Body>

              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>

            </Card>
          </Col>

        </Row>
      </Container>

    </div>
  );
}

export default Estadisticas;  // Exporta el componente Estadisticas para su uso en otras partes de la aplicación
