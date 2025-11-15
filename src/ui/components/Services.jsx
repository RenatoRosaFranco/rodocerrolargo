'use client';

import { useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { LuTicket } from "react-icons/lu";
import { PiTaxiFill } from "react-icons/pi";
import { MdLock, MdPhone } from "react-icons/md";
import UsefulPhonesModal from './UsefulPhonesModal';

const Services = () => {
  const [showModal, setShowModal] = useState(false);

  const services = [
    {
      icon: <LuTicket />,
      name: 'Passagens'
    },
    {
      icon: <PiTaxiFill />,
      name: 'Ponto de Taxi'
    },
    {
      icon: <MdLock />,
      name: 'Guarda-Volume'
    }
  ];

  const ServiceCard = ({ service }) => {
    const { icon, name } = service;

    return (
      <Col md={3} className="mb-4">
        <Card className="text-center h-100">
          <Card.Body>
            <h2 className="fw-bold">{icon}</h2>
            <h4 className="fw-bold">{name}</h4>
          </Card.Body>
        </Card>
      </Col>
    )
  }

  return (
    <>
      <Container id="services-section" className='py-5'>
        <Row>
          <Col>
            <h1 className="fw-bold text-center mb-0">Princiais Serviços</h1>
            <p className='text-center mt-0 mb-5'>Conheça os principais serviços que a estação oferece.</p>
          </Col>
        </Row>
        <Row>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}

          {/* Telefones Úteis Card */}
          <Col md={3} className="mb-4">
            <Card
              className="text-center h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowModal(true)}
            >
              <Card.Body>
                <h2 className="fw-bold"><MdPhone /></h2>
                <h4 className="fw-bold">Telefones Úteis</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <UsefulPhonesModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default Services;
