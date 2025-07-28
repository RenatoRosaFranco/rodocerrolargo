import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MdShareLocation } from "react-icons/md";
import { LuTicket } from "react-icons/lu";
import { PiTaxiFill } from "react-icons/pi";

import { MdLock } from "react-icons/md";

const Services = () => {
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
    },
    {
      icon: <MdShareLocation />,
      name: 'Venda Integrada'
    }
  ];

  const ServiceCard = ({ service }) => {
    const { icon, name } = service;

    return (
      <Col md={3} className="mb-4">
        <Card className="text-center h-100">
          <Card.Body>
            <h1 className="fw-bold">{icon}</h1>
            <h4 className="fw-bold">{name}</h4>
          </Card.Body>
        </Card>
      </Col>
    )
  }
  
  return (
    <Container id="services-section">
      <Row>
        <Col>
          <h1 className="fw-bold text-center mb-4">Princiais Serviços</h1>
        </Col>
      </Row>
      <Row>
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </Row>
    </Container>
  );
};

export default Services;