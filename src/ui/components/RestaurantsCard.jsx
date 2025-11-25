'use client';

import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaUtensils } from 'react-icons/fa';
import RestaurantsModal from './RestaurantsModal';

const RestaurantsCard = () => {
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
              <FaUtensils
                size={50}
                style={{
                  color: '#1f2937',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            </Col>

            <Col xs={9}>
              <div className="mb-1">
                <small
                  className="d-inline-block px-2 py-1"
                  style={{
                    backgroundColor: '#e5e7eb',
                    color: '#1f2937',
                    borderRadius: '12px',
                    fontSize: '0.65rem',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}
                >
                  ALIMENTAÇÃO
                </small>
              </div>
              <h5 className="fw-bold mb-1" style={{ fontSize: '1.1rem', color: '#1f2937' }}>
                Restaurantes
              </h5>
              <p className="mb-2" style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                Opções gastronômicas em Cerro Largo.
              </p>

              <Button
                size="sm"
                onClick={() => setShowModal(true)}
                style={{
                  backgroundColor: '#1f2937',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  padding: '6px 18px',
                  fontSize: '0.85rem',
                  boxShadow: '0 2px 8px rgba(31,41,55,0.3)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                VER RESTAURANTES
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <RestaurantsModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default RestaurantsCard;
