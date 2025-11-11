'use client';

import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ContactModal from '../components/ContactModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1030 }}>
        <Navbar bg="light" expand="lg" className="shadow-sm mb-0">
          <Container>
            <Navbar.Brand href="/" className="fw-bold">Rodoviária Cerro Largo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto gap-3">
                <Nav.Link href="/">Início</Nav.Link>
                <Nav.Link href="/services">Serviços</Nav.Link>
                <Nav.Link href="/orders">Encomendas</Nav.Link>
                <Nav.Link href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
                  Contato
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Spacer para compensar o header fixo */}
      <div style={{ height: '70px' }}></div>

      <ContactModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default Header;