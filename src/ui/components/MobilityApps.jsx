'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';
import mobilityApps from '@/data/mobility-apps.json';

const MobilityApps = () => {
  return (
    <section 
      className="py-4" 
      style={{
        backgroundColor: '#fff',
        borderTop: '1px solid #f3f4f6',
        borderBottom: '1px solid #f3f4f6'
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col xs={12} lg={10} xl={9}>
            <Row className="align-items-center">
              <Col xs={12} md={4} lg={3}>
                <div className="d-flex align-items-center gap-3 mb-3 mb-md-0">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '2px solid #e5e7eb',
                      backgroundColor: '#EEE',
                      flexShrink: 0
                    }}
                  >
                    <FaCar size={22} style={{ color: '#000' }} />
                  </div>
                  <div style={{ minWidth: 'max-content' }}>
                    <h5 className="fw-bold mb-0" style={{ fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
                      Opções de Mobilidade
                    </h5>
                    <small className="text-muted" style={{ whiteSpace: 'nowrap' }}>
                      Apps disponíveis na região
                    </small>
                  </div>
                </div>
              </Col>
              
              <Col xs={12} md={8} lg={9}>
                <div className="d-flex flex-wrap gap-3 justify-content-md-end justify-content-start">
                  {mobilityApps.map((app) => (
                    <a
                      key={app.id}
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center gap-2 text-decoration-none"
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s ease',
                        minWidth: 'fit-content'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = app.color;
                        e.currentTarget.style.boxShadow = `0 2px 8px ${app.color}20`;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={app.logo}
                          alt={app.name}
                          style={{
                            maxWidth: '24px',
                            maxHeight: '24px',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div style="font-size: 1rem; color: ${app.color}; font-weight: bold">${app.name.charAt(0)}</div>`;
                          }}
                        />
                      </div>
                      <span
                        className="fw-semibold"
                        style={{
                          fontSize: '0.9rem',
                          color: '#1f2937'
                        }}
                      >
                        {app.name}
                      </span>
                    </a>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MobilityApps;
