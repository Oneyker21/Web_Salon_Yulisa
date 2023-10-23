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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet nisi id purus tristique posuere.
              Etiam eu lectus a urna varius lacinia. Suspendisse potenti.</p>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Home;