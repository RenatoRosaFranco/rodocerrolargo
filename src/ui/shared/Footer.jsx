import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container className='py-2'>
        <Row className='mb-4'>
          <Col className='col-md-4'>
            <h6 className='fw-bold'>Rua Helmuth Schmidt, 700 <br/>
            Centro | Cerro Largo / RS</h6>
          </Col>
          <Col className="col-md-8 text-end">
            <ul className="list-unstyled d-flex justify-content-end gap-3 mb-0">
              <li><a href="#" className="nav-link">Início</a></li>
              <li><a href="#" className="nav-link">Infraestrutura</a></li>
              <li><a href="#" className="nav-link">Serviços</a></li>
              <li><a href="#" className="nav-link">Dúvidas Frequentes</a></li>
              <li><a href="#" className="nav-link">Contato</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;