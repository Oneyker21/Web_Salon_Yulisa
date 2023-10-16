import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Citas from './pages/citas';
import Usuario from './pages/usuarios';
import Trabajos from './pages/trabajos';
import VerCliente from './pages/usuariolist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/trabajo" element={<Trabajos />} />
        <Route path="/vercliente" element={<VerCliente />} />
      </Routes>
    </Router>
  );
}

export default App;