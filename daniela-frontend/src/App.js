import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Citas from './pages/Cita';
import CitasList from './pages/CitaList';
import Empleado from './pages/Usuario';
import Servicio from './pages/Servicio';
import VerEmpleado from './pages/UsuarioList';
import Cliente from './pages/Cliente';
import VerCliente from './pages/ClienteList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/citaslist" element={<CitasList />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/verempleado" element={<VerEmpleado />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/vercliente" element={<VerCliente />} />
        <Route path="/servicio" element={<Servicio />} />
      </Routes>
    </Router>
  );
}

export default App;