import React from 'react';
import { FaArrowRight, FaBus, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Card, Row, Col, Badge } from 'react-bootstrap';

const ScheduleCard = ({ day, schedules }) => {
  const dayData = schedules[day] || [];

  return (
    <div className="mb-3">
      {dayData.length === 0 ? (
        <Card className="shadow-sm border-0">
          <Card.Body className="text-center text-muted py-4">
            <FaBus size={40} className="mb-3 opacity-25" />
            <p className="mb-0">Não há horários disponíveis para este dia.</p>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-3">
          {dayData.map((trip, index) => (
            <Col key={index} md={12}>
              <Card className="shadow-sm border-0 ticket-card" style={{
                borderLeft: '4px solid #0d6efd',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}>
                <Card.Body className="p-3">
                  <Row className="align-items-center">
                    {/* Rota */}
                    <Col md={4}>
                      <div className="d-flex align-items-center gap-3">
                        <div>
                          <div className="d-flex align-items-center mb-2">
                            <FaMapMarkerAlt className="text-success me-2" size={14} />
                            <span className="fw-bold text-dark">{trip.origin}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FaMapMarkerAlt className="text-danger me-2" size={14} />
                            <span className="fw-bold text-dark">{trip.destination}</span>
                          </div>
                        </div>
                        <FaArrowRight className="text-primary ms-2" size={24} />
                      </div>
                      {/* Empresa */}
                      {trip.company && (
                        <div className="mt-2">
                          <small className="text-muted">
                            <FaBus className="me-1" size={12} />
                            {trip.company}
                          </small>
                        </div>
                      )}
                    </Col>

                    {/* Horários de Partida */}
                    <Col md={6}>
                      <div className="d-flex align-items-center mb-2">
                        <FaClock className="text-primary me-2" size={14} />
                        <small className="fw-semibold text-secondary">Horários de Partida</small>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        {trip.departures && trip.departures.map((departure, idx) => (
                          <Badge
                            key={idx}
                            bg="primary"
                            className="px-3 py-2"
                            style={{ fontSize: '0.9rem', fontWeight: '600' }}
                          >
                            {departure}
                          </Badge>
                        ))}
                      </div>
                    </Col>

                    {/* Previsão de Chegada */}
                    <Col md={2} className="text-end">
                      {trip.estimatedTimeArrival && (
                        <div>
                          <small className="text-muted d-block mb-1">Chegada prevista</small>
                          <div className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>
                            {trip.estimatedTimeArrival}
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default ScheduleCard;