'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaBeer } from 'react-icons/fa';
import HostelsCard from './HostelsCard';

const OktoberfestCard = () => {
  return (
    <section className="py-4">
      <Container>
        <Row className="justify-content-center">
          <Col lg={11}>
            <Row>
              <Col md={7} className="mb-4 mb-md-0">
                <Card
                  className="border-0 overflow-hidden h-100"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #6366f1 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                  }}
                >
                  <Card.Body className="p-3">
                    <Row className="align-items-center">
                      {/* Ilustração */}
                      <Col md={2} className="d-none d-md-flex justify-content-center">
                        <div style={{ position: 'relative' }}>
                          <FaBeer
                            size={50}
                            style={{
                              color: 'rgba(255,255,255,0.3)',
                              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                            }}
                          />
                        </div>
                      </Col>

                      {/* Conteúdo Principal */}
                      <Col md={7} className="text-white">
                        <div className="mb-1">
                          <small
                            className="d-inline-block px-2 py-1"
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              borderRadius: '12px',
                              fontSize: '0.65rem',
                              fontWeight: '600',
                              letterSpacing: '0.5px'
                            }}
                          >
                            8 A 12 DE OUTUBRO
                          </small>
                        </div>
                        <h5 className="fw-bold mb-1" style={{ fontSize: '1.3rem' }}>
                          Oktoberfest Missões
                        </h5>
                        <p className="mb-0" style={{ fontSize: '0.85rem', opacity: 0.95 }}>
                          Evento típico que acontece em outubro. Tradição alemã, gastronomia e muita diversão!
                        </p>
                      </Col>

                      {/* CTA e Redes Sociais */}
                      <Col md={3} className="text-center text-md-end mt-3 mt-md-0">
                        <Button
                          size="sm"
                          className="mb-2 w-100"
                          style={{
                            backgroundColor: '#fff',
                            color: '#1e3a8a',
                            border: 'none',
                            fontWeight: 'bold',
                            borderRadius: '25px',
                            padding: '8px 16px',
                            fontSize: '0.85rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'transform 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          SAIBA MAIS
                        </Button>

                        <div className="d-flex gap-2 justify-content-center justify-content-md-end">
                          <a
                            href="https://www.facebook.com/oktoberfestmissoes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: '32px',
                              height: '32px',
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              borderRadius: '50%',
                              color: '#fff',
                              textDecoration: 'none',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                          >
                            <FaFacebookF size={14} />
                          </a>
                          <a
                            href="https://www.instagram.com/oktoberfestmissoes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: '32px',
                              height: '32px',
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              borderRadius: '50%',
                              color: '#fff',
                              textDecoration: 'none',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                          >
                            <FaInstagram size={14} />
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={5}>
                <HostelsCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OktoberfestCard;
