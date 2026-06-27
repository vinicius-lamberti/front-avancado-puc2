import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

export const Layout: React.FC = () => {
  const location = useLocation();

  const handleVoltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">📚 Inventário</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={location.pathname}>
              <Nav.Link as={Link} to="/" eventKey="/">Início</Nav.Link>
              <Nav.Link as={Link} to="/cadastro" eventKey="/cadastro">Cadastrar Livro</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ minHeight: '75vh' }}>
        <Outlet />
      </Container>

      <footer className="mt-5 text-center py-4 bg-light border-top">
        <Container>
          <p className="mb-2 text-muted">Rota atual monitorada: {location.pathname}</p>
          <Button variant="secondary" size="sm" onClick={handleVoltarAoTopo}>
            Voltar ao topo
          </Button>
        </Container>
      </footer>
    </>
  );
};