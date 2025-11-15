'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaFacebookF, FaInstagram, FaClock } from 'react-icons/fa';
import ContactModal from '../components/ContactModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Atualiza o horário a cada segundo
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1030 }}>
        {/* PreHeader */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          fontSize: '0.85rem'
        }}>
          <Container>
            <Row className="align-items-center py-2">
              {/* Localização */}
              <Col md={4} className="d-none d-md-block">
                <div className="d-flex align-items-center text-muted">
                  <FaMapMarkerAlt className="me-2" style={{ fontSize: '0.9rem' }} />
                  <small>R. Helmuth Schmidt, 700 - Centro</small>
                </div>
              </Col>

              {/* Telefone Central */}
              <Col md={4} className="d-none d-md-block text-center">
                <div className="d-flex align-items-center justify-content-center text-muted">
                  <FaPhone className="me-2" style={{ fontSize: '0.9rem' }} />
                  <small className="fw-bold">(55) 3359-1191</small>
                </div>
              </Col>

              {/* Redes Sociais e Horário */}
              <Col md={4} xs={12} className="d-flex align-items-center justify-content-md-end justify-content-center">
                <div className="d-flex align-items-center gap-3 text-muted">
                  <div className="d-flex gap-2">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                      style={{ textDecoration: 'none' }}
                    >
                      <FaFacebookF style={{ fontSize: '0.9rem' }} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                      style={{ textDecoration: 'none' }}
                    >
                      <FaInstagram style={{ fontSize: '0.9rem' }} />
                    </a>
                  </div>
                  <span style={{ color: '#dee2e6' }}>|</span>
                  <div className="d-flex align-items-center">
                    <FaClock className="me-2" style={{ fontSize: '0.9rem' }} />
                    <small className="fw-bold">{currentTime}</small>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Main Navbar */}
        <Navbar bg="light" expand="lg" className="shadow-sm mb-0">
          <Container>
            <Navbar.Brand href="/" className="fw-bold">Rodoviária Cerro Largo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto gap-3">
                <Nav.Link href="/">Início</Nav.Link>
                <Nav.Link href="/services">Serviços</Nav.Link>
                <Nav.Link href="/orders">Encomendas</Nav.Link>
                <Nav.Link href="/taxi-drivers">Taxistas</Nav.Link>
                <Nav.Link href="/advertising">Anuncie</Nav.Link>
                <Nav.Link href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
                  Contato
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Spacer para compensar o header fixo (PreHeader + Navbar) */}
      <div style={{ height: '115px' }}></div>

      <ContactModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default Header;