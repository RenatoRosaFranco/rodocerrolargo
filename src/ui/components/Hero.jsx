import { Col, Container, Row } from 'react-bootstrap';

const Hero = () => {
  return (
    <section id="hero-section" className="bg-dark text-white py-5" style={{ marginTop: "-22px"}}>
      <Container className='py-5'>
        <Row className='pt-5'>
          <Col className='ms-5'>
            <h1 className="fw-bold mb-3">Estação Rodoviária <br />de Cerro Largo</h1>
            <p>O Terminal Rodoviário de Cerro Largo no Rio Grande do Sul<br />
            oferece a seus passageiros trechos estaduais e interestaduais.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
