'use client';

import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Container className="py-5">
        <Row className="py-5">
          <Col className="text-center py-5" md={12}>
            <h1 className="fw-bold">Em construção</h1>
            <p>Estamos trabalhando para trazer a melhor<br /> experiência possível para você.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
