'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaRegClock, FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';
import ContactModal from '../components/ContactModal';
import WeatherWidget from '../components/WeatherWidget';

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
      <style dangerouslySetInnerHTML={{
        __html: `
          #user-dropdown::after {
            display: none !important;
          }
          .dropdown-toggle::after {
            display: none !important;
          }
        `
      }} />
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
                  <FaPhone className="me-1" style={{ fontSize: '0.7rem' }} />
                  <small className="fw-bold mx-1">(55) 3359-1191</small> |
                  <small className="mx-1 text-muted">contato@rodocerrolargo.com.br</small>
                </div>
              </Col>

              {/* Redes Sociais, Horário e Clima */}
              <Col md={4} xs={12} className="d-flex align-items-center justify-content-md-end justify-content-center">
                <div className="d-flex align-items-center gap-2 text-muted">
                  <div className="d-flex gap-2">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                      style={{ textDecoration: 'none' }}
                      title="Facebook"
                    >
                      <FaFacebookF style={{ fontSize: '0.9rem' }} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                      style={{ textDecoration: 'none' }}
                      title="Instagram"
                    >
                      <FaInstagram style={{ fontSize: '0.9rem' }} />
                    </a>
                    <a
                      href="https://wa.me/5555933591191"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                      style={{ textDecoration: 'none' }}
                      title="WhatsApp"
                    >
                      <FaWhatsapp style={{ fontSize: '0.9rem' }} />
                    </a>
                    <a
                      href="mailto:contato@rodocerrolargo.com.br"
                      className="text-muted"
                      style={{ textDecoration: 'none' }}
                      title="Email"
                    >
                      <FaRegEnvelope style={{ fontSize: '0.9rem' }} />
                    </a>
                  </div>
                  <span style={{ color: '#dee2e6' }}>|</span>
                  <div className="d-flex align-items-center">
                    <FaRegClock className="me-2" style={{ fontSize: '0.9rem' }} />
                    <small className="fw-bold">{currentTime}</small>
                  </div>
                  <span style={{ color: '#dee2e6' }}>|</span>
                  <WeatherWidget />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Main Navbar */}
        <Navbar bg="light" expand="lg" className="shadow-sm mb-0" style={{ borderBottom: '1px solid #EEE' }}>
          <Container>
            <Navbar.Brand href="/" className="fw-bold d-flex align-items-center gap-2">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src="https://placehold.co/40x40/f8f9fa/6c757d?text=RC"
                  alt="Logo Rodoviária Cerro Largo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span>Rodoviária Cerro Largo</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-flex align-items-center">
                <Nav.Link href="/">Início</Nav.Link>
                <span className="text-muted mx-2">|</span>
                <Nav.Link href="/services">Serviços</Nav.Link>
                <span className="text-muted mx-2">|</span>
                <Nav.Link href="/orders">Encomendas</Nav.Link>
                <span className="text-muted mx-2">|</span>
                <Nav.Link href="/taxi-drivers">Taxistas</Nav.Link>
                <span className="text-muted mx-2">|</span>
                <Nav.Link href="/advertising">Anuncie</Nav.Link>
                <span className="text-muted mx-2">|</span>
                <Nav.Link href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
                  Contato
                </Nav.Link>
                <span className="text-muted mx-2">|</span>
                <div style={{
                  border: '1px solid #dee2e6',
                  borderRadius: '50px',
                  padding: '4px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white'
                }}>
                  <NavDropdown
                    title={
                      <span className="d-flex align-items-center gap-2" style={{ fontSize: 'inherit' }}>
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#6c757d',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            flexShrink: 0
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#495057' }}>
                          <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/>
                        </svg>
                      </span>
                    }
                    id="user-dropdown"
                    align="end"
                  >
                  <div className="px-3 py-2" style={{ minWidth: '280px' }}>
                    <div className="d-flex align-items-center gap-3 pb-3 border-bottom">
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: '#6c757d',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.2rem'
                        }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '1.1rem' }}>Olá!</div>
                        <small className="text-muted">Visitante</small>
                      </div>
                    </div>

                    <NavDropdown.Item
                      href="/login"
                      className="mt-3 py-2 px-2 rounded"
                      style={{
                        color: '#0d6efd',
                        fontWeight: '500'
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                        </svg>
                        <span>Iniciar Sessão</span>
                      </div>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
                </div>
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
