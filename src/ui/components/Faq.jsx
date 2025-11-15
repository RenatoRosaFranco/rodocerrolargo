'use client';

import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaRegQuestionCircle } from 'react-icons/fa';

const Faq = () => {
  const faq = [
    {
      id: 1,
      question: 'Fumo',
      answer: 'É proibido o fumo nos ônibus das linhas de transporte coletivo intermunicipal de passageiros.'
    },
    {
      id: 2,
      question: 'Transporte de menores e adolescentes',
      answer: 'O transporte de menores desacompanhados exige autorização dos responsáveis legais, conforme norma da ANTT.'
    },
    {
      id: 3,
      question: 'Aposentados e pensionistas',
      answer: 'Aposentados e pensionistas têm direito a transporte gratuito, conforme norma da ANTT.'
    },
    {
      id: 4,
      question: 'Deficientes físicos',
      answer: 'Ônibus acessíveis estão disponíveis nas principais linhas. Consulte com antecedência.'
    },
    {
      id: 5,
      question: 'Passagem de volta',
      answer: 'As passagens de volta são válidas para o mesmo dia da viagem de ida.'
    },
    {
      id: 6,
      question: 'Animais de estimação',
      answer: 'Os animais de estimação são transportados em compartimentos especiais, conforme norma da ANTT.'
    }
  ];

  const [selectedFaq, setSelectedFaq] = useState(faq[0]);

  return (
    <div style={{ border: '1px solid #EEE', padding: '40px 30px', margin: '40px 0', marginBottom: '1px' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="d-flex gap-3 align-items-start">
              <FaRegQuestionCircle style={{ fontSize: '2.5rem', color: '#000', flexShrink: 0 }} />
              <div>
                <h2 className="fw-bold mb-2">Dúvidas Frequentes</h2>
                <p className="text-muted mb-0">
                  Encontre respostas para as perguntas mais comuns sobre nossos serviços.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Coluna Esquerda - Lista de Perguntas */}
          <Col md={4}>
            <div className="d-flex flex-column gap-2">
              {faq.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedFaq(item)}
                  className={`p-3 ${selectedFaq.id === item.id ? 'bg-light' : ''}`}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: selectedFaq.id === item.id ? '#dee2e6' : 'transparent',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedFaq.id === item.id ? '#f8f9fa' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedFaq.id !== item.id) {
                      e.currentTarget.style.backgroundColor = '#fafafa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedFaq.id !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div className="fw-semibold" style={{ fontSize: '0.95rem' }}>
                    {item.question}
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* Coluna Direita - Resposta */}
          <Col md={8}>
            <div
              className="p-4"
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                minHeight: '200px'
              }}
            >
              <h4 className="fw-bold mb-3" style={{ fontSize: '1.25rem' }}>
                {selectedFaq.question}
              </h4>
              <p className="text-muted mb-0" style={{ lineHeight: '1.7', fontSize: '1rem' }}>
                {selectedFaq.answer}
              </p>
            </div>

            <div className="mt-3 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
              <small className="text-muted">
                Ainda tem dúvidas? Entre em contato pelo telefone
                <strong className="mx-1">(55) 3359-1191</strong>
                ou email
                <strong className="mx-1">contato@rodocerrolargo.com.br</strong>
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Faq;
