import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import GaleriaList from './pages/GaleriaList';
import Estadisticas from './pages/Estadisticas';
import Login from './pages/Login';
import SinAcceso from './pages/SinAcceso';

function App() {

  
  const storedRol = localStorage.getItem('userRol');
  const [id_Usuario, setId_Usuario] = useState(''); 

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol} setId_Usuario={setId_Usuario} />} />
        <Route path="/home" element={userRol ? <Home rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/about" element={userRol ? <About rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/citas" element={userRol ? <Citas rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/citaslist" element={userRol ? <CitasList rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/empleado" element={userRol ? <Empleado rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/verempleado" element={userRol ? <VerEmpleado rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/cliente" element={userRol ? <Cliente rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/vercliente" element={userRol ? <VerCliente rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/servicio" element={userRol ? <Servicio rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/serviciolist" element={userRol ? <ServicioList rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/testimoniolist" element={userRol ? <TestimonioList rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/testimonio" element={userRol ? <Testimonio rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/galeria" element={userRol ? <Galeria rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/galerialist" element={userRol ? <GaleriaList rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/estadisticas" element={userRol ? <Estadisticas rol={userRol} /> : <Navigate to="/SinAcceso" />} />
        <Route path="/SinAcceso" element={<SinAcceso />} />
      </Routes>
    </Router>
  );
}

export default App;