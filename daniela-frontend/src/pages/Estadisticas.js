import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import '../styles/App.css';

function Estadisticas({ rol }) {
  const [citas, setCitas] = useState([]);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/crud/readcitas')
      .then((response) => response.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error('Error al obtener las citas:', error));
  }, []);

  useEffect(() => {
    if (citas.length > 0) {
      const ctx = document.getElementById('myChart');

      if (myChart !== null) {
        myChart.destroy();
      }

      // Conteo de citas por fecha
      const citasPorFecha = citas.reduce((acc, cita) => {
        const fecha = cita.fecha_cita.split('T')[0];
        acc[fecha] = (acc[fecha] || 0) + 1;
        return acc;
      }, {});

      const fechas = Object.keys(citasPorFecha);
      const citasCount = Object.values(citasPorFecha);

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: fechas,
          datasets: [{
            label: 'Citas por fecha',
            data: citasCount,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setMyChart(chart);
    }
  }, [citas]);

  const generarReportecitas = () => {
    const doc = new jsPDF();
    let y = 30; // Ajusta el espacio del título aquí

    doc.text("Reporte de citas", 20, 10);

    citas.forEach((cita) => {
      const fechaSinTiempo = cita.fecha_cita.split('T')[0];

      // Ajusta el espacio entre el título y la primera sección
      y += 10;
      
      doc.text(`Fecha: ${fechaSinTiempo}`, 20, y);
      doc.text(`Cliente: ${cita.nombre_cliente} ${cita.apellido_cliente}`, 20, y + 10);

      // Agrega servicios vinculados a la cita
      const servicios = cita.servicios ? cita.servicios.split(', ').join(', ') : '';
      if (servicios) {
        y += 20;
        doc.text(`Servicios: ${servicios}`, 20, y);
      }

      // Ajusta el espacio adicional después de cada cita
      y += 20;
      if (y >= 280) {
        doc.addPage();
        y = 30; // Ajusta el espacio del título aquí también
      }
    });

    // Agregar el gráfico al final del PDF
    if (myChart !== null) {
      const chartDataURL = myChart.toBase64Image();
      doc.addPage();
      doc.addImage(chartDataURL, 'PNG', 10, 10, 180, 90); // Ajusta las dimensiones según tus necesidades
    }

    doc.save("reporte_citas.pdf");
  };

  return (
    <div>
      <Header rol={rol} />

      <Container className="margen-contenedor">
        <Row className="g-3">
          <Col sm="12" md="12" lg="12">
            <Card>
              <Card.Body>
                <Card.Title>Estado del citas</Card.Title>
                <canvas id="myChart" style={{ height: '100%' }}></canvas>
              </Card.Body>
              <Card.Body>
                <Button className='register-button' onClick={generarReportecitas}>
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

export default Estadisticas;
