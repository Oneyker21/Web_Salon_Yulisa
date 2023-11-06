import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Citas from './pages/Cita';
import CitasList from './pages/CitaList';
import Empleado from './pages/Usuario';
import Servicio from './pages/Servicio';
import ServicioList from './pages/ServicioList';
import VerEmpleado from './pages/usuariolist';
import Cliente from './pages/Cliente';
import VerCliente from './pages/ClienteList';
import TestimonioList from './pages/TestimonioList';
import Testimonio from './pages/Testimonio';
import Galeria from './pages/Galeria';


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
        <Route path="/serviciolist" element={<ServicioList />} />
        <Route path="/testimoniolist" element={<TestimonioList />} />
        <Route path="/testimonio" element={<Testimonio />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
    </Router>
  );
}

export default App;