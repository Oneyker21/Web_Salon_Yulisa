import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">Salon Yulisa</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/about" className="link-unstyled">Contacto</Link>
              </Nav.Link>
              <NavDropdown title="Empleados" id="Estilistas">
                <NavDropdown.Item>
                  <Link to="/empleado" className="link-unstyled">Registrar Empleado</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/verempleado" className="link-unstyled">Empleados</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Clientes" id="Clientes">
                <NavDropdown.Item>
                  <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/vercliente" className="link-unstyled">Clientes</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Citas" id="Cita">
                <NavDropdown.Item>
                  <Link to="/citas" className="link-unstyled">Registrar Cita</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/citaslist" className="link-unstyled">Citas</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Trabajos" id=" Trabajos">
                <NavDropdown.Item>
                  <Link to="/servicio" className="link-unstyled">Registrar Trabajos</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/ver-cita" className="link-unstyled">Trabajos</Link>
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link>
              <Link to="/" className="link-unstyled">Inicio</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about" className="link-unstyled">Contacto</Link>
            </Nav.Link>
            <NavDropdown title="Usuarios" id="clientes">
              <NavDropdown.Item>
                <Link to="/customer" className="link-unstyled">Registrar Usuario</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-cliente" className="link-unstyled">Actualizar Usuario</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/ver-cliente" className="link-unstyled">Ver Usuario</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/eliminar-cliente" className="link-unstyled">Eliminar Usuario</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Cita" id=" Cita">
              <NavDropdown.Item>
                <Link to="/customer" className="link-unstyled">Registrar Cita</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-cita" className="link-unstyled">Actualizar Cita</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/ver-cita" className="link-unstyled">Ver Cita</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/eliminar-cita" className="link-unstyled">Eliminar Cita</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Trabajos" id=" Trabajos">
              <NavDropdown.Item>
                <Link to="/customer" className="link-unstyled">Registrar Trabajos</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-cita" className="link-unstyled">Actualizar Trabajos</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/ver-cita" className="link-unstyled">Ver Trabajos</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/eliminar-cita" className="link-unstyled">Eliminar Trabajos</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;