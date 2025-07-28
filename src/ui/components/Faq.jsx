import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const Faq = () => {
  const faq = [
    {
      question: 'Fumo',
      answer: 'É proibido o fumo nos ônibus das linhas de transporte coletivo intermunicipal de passageiros.'
    },
    {
      question: 'Transporte de menores e adolescentes',
      answer: 'O transporte de menores desacompanhados exige autorização dos responsáveis legais, conforme norma da ANTT.'
    },
    {
      question: 'Aposentados e pensionistas',
      answer: 'Aposentados e pensionistas têm direito a transporte gratuito, conforme norma da ANTT.'
    },
    {
      question: 'Deficientes físicos',
      answer: 'Ônibus acessíveis estão disponíveis nas principais linhas. Consulte com antecedência.'
    },
    {
      question: 'Passagem de volta',
      answer: 'As passagens de volta são válidas para o mesmo dia da viagem de ida.'
    },
    {
      question: 'Animais de estimação',
      answer: 'Os animais de estimação são transportados em compartimentos especiais, conforme norma da ANTT.'
    }
  ];

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="fw-bold mb-4">Dúvidas Frequentes</h1>
          <Accordion defaultActiveKey="">
            {faq.map((item, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Faq;