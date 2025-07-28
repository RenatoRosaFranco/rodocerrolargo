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
    <Container className="my-1 mb-5">
      <Row>
        <Col>
          <h2 className="fw-bold mb-1">Dúvidas Frequentes</h2>
          <p className='mb-5'>
            Aqui você encontra as respostas para as dúvidas mais frequentes.
          </p>
          
          <Accordion defaultActiveKey="">
            {faq.map((item, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header className='fw-bold'>{item.question}</Accordion.Header>
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