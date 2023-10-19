import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Citas from './pages/citas';
import Empleado from './pages/usuarios';
import Trabajos from './pages/trabajos';
import VerEmpleado from './pages/usuariolist';
import Cliente from './pages/Cliente';
import VerCliente from './pages/ClienteList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/trabajo" element={<Trabajos />} />
        <Route path="/verempleado" element={<VerEmpleado />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/vercliente" element={<VerCliente />} />
      </Routes>
    </Router>
  );
}

export default App;