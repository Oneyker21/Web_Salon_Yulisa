import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function Home() {
  return(
    <div>
      <Header />
      <section id="inicio">
        <main class="inicio-contactos">
          <div class="contenido-principal">
            <h1>Bienvenido al Salón Yulisa</h1>
            <p>todavia nada.</p>
          </div>
        </main>
      </section>
    </div>
  );
}
export default Home;