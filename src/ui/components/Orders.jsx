import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';

const whatsappNumber = '+5551999999999';

const Orders = () => {
  return (
    <section id="orders-section" className='py-5 bg-light'>
      <Container className='py-4'>
        <Row>
          <Col className='col-md-6 d-flex justify-content-center align-items-center'>
            <Image src='https://placehold.co/400x200' alt='Encomendas Rodoviárias' className='img-fluid' />
          </Col>
          <Col className='col-md-6'>
            <h1 className="fw-bold mb-2">Encomendas Rodoviárias</h1>
            <p className='mt-2 mb-2'>O serviço de encomendas da rodoviária é rapido e seguro.
            Atendemos todo estado, se informe no guichê de encomendas
            ou pelo telefone.
            </p>
            <Button variant='primary' className='mt-2' 
               onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}>
              <FaWhatsapp className='me-2' />
              Entre em contato
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;