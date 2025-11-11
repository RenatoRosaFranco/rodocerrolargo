'use client';

import { Card, Col, Row } from 'react-bootstrap';

const PopularDestinations = ({ filters, onSelectDestination }) => {
  const popularDestinations = [
    { name: 'Porto Alegre' },
    { name: 'Santo Ângelo' },
    { name: 'Santa Rosa' },
    { name: 'São Luiz Gonzaga' }
  ];

  return (
    <Row className="mb-4">
      <Col md={12} lg={12}>
        <h5 className="text-center mt-0 mb-4 text-muted fw-normal">Destinos mais buscados</h5>
        <Row className="g-3">
          {popularDestinations.map((destination) => (
            <Col xs={3} md={3} key={destination.name}>
              <Card
                className="shadow-sm border text-left h-100"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '12px',
                  border: '1px solid #EEE',
                  backgroundColor: filters.destination === destination.name ? '#7C3AED' : '#fff'
                }}
                onClick={() => onSelectDestination(destination.name)}
                onMouseEnter={(e) => {
                  if (filters.destination !== destination.name) {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <Card.Body className="py-3 px-2">
                  <div
                    style={{
                      fontSize: '2rem',
                      marginBottom: '0.5rem',
                      filter: filters.destination === destination.name ? 'grayscale(100%) brightness(200%)' : 'none'
                    }}
                  >
                  </div>
                    <div className='mx-3'>
                      <h5 className='mb-1'>Horários para</h5>
                      <h4 className='mt-0 fw-bold'>{destination.name}</h4>
                    </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default PopularDestinations;
