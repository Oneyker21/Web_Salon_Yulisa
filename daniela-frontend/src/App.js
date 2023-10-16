import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Customer from './pages/Customer';
import Citas from './pages/citas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/citas" element={<Citas />} />
      </Routes>
    </Router>
  );
}

export default App;