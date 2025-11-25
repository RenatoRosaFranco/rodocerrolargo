'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaBeer } from 'react-icons/fa';
import HostelsCard from './HostelsCard';
import RestaurantsCard from './RestaurantsCard';

const OktoberfestCard = () => {
  return (
    <section className="py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
                <Card
                  className="border-0 overflow-hidden h-100"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #6366f1 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    position: 'relative'
                  }}
                >
                  {/* Redes Sociais no canto superior direito */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 10
                  }}>
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

                  <Card.Body className="p-3">
                    <Row className="align-items-center">
                      {/* Ilustração */}
                      <Col xs={3} className="text-center">
                        <FaBeer
                          size={40}
                          style={{
                            color: 'rgba(255,255,255,0.3)',
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                          }}
                        />
                      </Col>

                      {/* Conteúdo Principal */}
                      <Col xs={9} className="text-white">
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
                        <h5 className="fw-bold mb-1" style={{ fontSize: '1.1rem' }}>
                          Oktoberfest Missões
                        </h5>
                        <p className="mb-2" style={{ fontSize: '0.8rem', opacity: 0.95 }}>
                          Tradição alemã e gastronomia!
                        </p>

                        <Button
                          size="sm"
                          className="w-100"
                          style={{
                            backgroundColor: '#fff',
                            color: '#1e3a8a',
                            border: 'none',
                            fontWeight: 'bold',
                            borderRadius: '25px',
                            padding: '6px 16px',
                            fontSize: '0.85rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'transform 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          SAIBA MAIS
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4} className="mb-4 mb-md-0">
                <HostelsCard />
              </Col>

          <Col md={4}>
            <RestaurantsCard />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OktoberfestCard;
