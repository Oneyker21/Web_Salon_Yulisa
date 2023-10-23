// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function About() {
  return (
    <div>
      <Header />
    <section id="inicio">
<footer>
        <div class="informacion-contacto">
            <h3>Información de Contacto</h3>
            <p>Dirección: [Dirección]</p>
            <p>Correo electrónico: [Correo electrónico]</p>
        </div>
        <div class="redes-sociales">
            <h3>Síguenos en Redes Sociales</h3>
            {/*  Agregar iconos o enlaces a las redes sociales */} 
        </div>
    </footer>
</section>
    </div>
  );
}

export default About;