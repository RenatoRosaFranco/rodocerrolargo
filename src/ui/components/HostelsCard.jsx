'use client';

import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaBed } from 'react-icons/fa';
import HotelsModal from './HotelsModal';

const HostelsCard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card
        className="border-0 overflow-hidden h-100"
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        <Card.Body className="p-3">
          <Row className="align-items-center">
            <Col xs={3} className="text-center">
              <FaBed
                size={50}
                style={{
                  color: '#16a34a',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            </Col>

            <Col xs={9}>
              <div className="mb-1">
                <small
                  className="d-inline-block px-2 py-1"
                  style={{
                    backgroundColor: '#e8f5e9',
                    color: '#16a34a',
                    borderRadius: '12px',
                    fontSize: '0.65rem',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}
                >
                  HOSPEDAGEM
                </small>
              </div>
              <h5 className="fw-bold mb-1" style={{ fontSize: '1.1rem', color: '#1f2937' }}>
                Hostéis em Cerro Largo
              </h5>
              <p className="mb-2" style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                Acomodações confortáveis no município.
              </p>

              <Button
                size="sm"
                onClick={() => setShowModal(true)}
                style={{
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  padding: '6px 18px',
                  fontSize: '0.85rem',
                  boxShadow: '0 2px 8px rgba(22,163,74,0.3)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                VER HOTÉIS
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <HotelsModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default HostelsCard;
