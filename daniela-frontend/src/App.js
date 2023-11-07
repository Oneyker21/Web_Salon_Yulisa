import React, { useState } from 'react';
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
import Login from './pages/Login';


function App() {

  const [userRol, setUserRol] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRol={setUserRol} />} />
        <Route path="/home" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol} />} />
        <Route path="/citas" element={<Citas rol={userRol} />} />
        <Route path="/citaslist" element={<CitasList rol={userRol} />} />
        <Route path="/empleado" element={<Empleado rol={userRol} />} />
        <Route path="/verempleado" element={<VerEmpleado rol={userRol} />} />
        <Route path="/cliente" element={<Cliente rol={userRol} />} />
        <Route path="/vercliente" element={<VerCliente rol={userRol} />} />
        <Route path="/servicio" element={<Servicio rol={userRol} />} />
        <Route path="/serviciolist" element={<ServicioList rol={userRol} />} />
        <Route path="/testimoniolist" element={<TestimonioList rol={userRol} />} />
        <Route path="/testimonio" element={<Testimonio rol={userRol} />} />
        <Route path="/galeria" element={<Galeria rol={userRol} />} />
      </Routes>
    </Router>
  );
}

export default App;