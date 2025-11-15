'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Form, InputGroup, Button } from 'react-bootstrap';
import { FaPhone, FaWhatsapp, FaEnvelope, FaCar, FaSearch, FaUserPlus } from 'react-icons/fa';
import Link from 'next/link';

const TaxistaList = () => {
  const [taxistas, setTaxistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTaxistas();
  }, []);

  const fetchTaxistas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/taxistas');
      const data = await response.json();

      if (data.success) {
        setTaxistas(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error('Erro ao buscar taxistas:', err);
      setError('Erro ao carregar taxistas');
    } finally {
      setLoading(false);
    }
  };

  const filteredTaxistas = taxistas.filter((taxista) => {
    const term = searchTerm.toLowerCase();
    return (
      taxista.nomeCompleto.toLowerCase().includes(term) ||
      taxista.modeloVeiculo.toLowerCase().includes(term) ||
      taxista.placaVeiculo.toLowerCase().includes(term) ||
      (taxista.descricao && taxista.descricao.toLowerCase().includes(term))
    );
  });

  const formatPhone = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" style={{ color: '#7C3AED' }}>
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <p className="mt-3">Carregando taxistas...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4" style={{ color: '#7C3AED' }}>
        Taxistas de Cerro Largo
      </h2>

      {/* Card de Cadastro */}
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)' }}>
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="text-white mb-2">
                    <FaUserPlus className="me-2" />
                    Você é taxista?
                  </h5>
                  <p className="text-white mb-md-0" style={{ opacity: 0.9 }}>
                    Cadastre-se gratuitamente e seja encontrado por turistas, visitantes e pela comunidade de Cerro Largo!
                  </p>
                </Col>
                <Col md={4} className="text-md-end mt-3 mt-md-0">
                  <Link href="/taxistas/cadastro" passHref legacyBehavior>
                    <Button
                      variant="light"
                      size="lg"
                      className="fw-bold"
                      style={{
                        color: '#7C3AED',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      Cadastrar Agora
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col md={8} lg={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por nome, modelo ou placa do veículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {filteredTaxistas.length === 0 ? (
        <Alert variant="info" className="text-center">
          {searchTerm
            ? 'Nenhum taxista encontrado com os critérios de busca.'
            : 'Nenhum taxista cadastrado ainda.'}
        </Alert>
      ) : (
        <>
          <p className="text-center text-muted mb-4">
            {filteredTaxistas.length} taxista{filteredTaxistas.length !== 1 ? 's' : ''}{' '}
            {searchTerm ? 'encontrado(s)' : 'cadastrado(s)'}
          </p>

          <Row>
            {filteredTaxistas.map((taxista) => (
              <Col key={taxista._id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm hover-shadow">
                  <Card.Body>
                    <h5 className="mb-3" style={{ color: '#7C3AED' }}>
                      {taxista.nomeCompleto}
                    </h5>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaCar className="me-2" style={{ color: '#7C3AED' }} />
                        <strong className="me-2">Veículo:</strong>
                        <span>
                          {taxista.modeloVeiculo} {taxista.anoVeiculo}
                        </span>
                      </div>
                      <div className="ms-4">
                        <small className="text-muted">
                          {taxista.corVeiculo} - Placa: {taxista.placaVeiculo}
                        </small>
                      </div>
                    </div>

                    {taxista.descricao && (
                      <p className="text-muted small mb-3">
                        {taxista.descricao.length > 100
                          ? `${taxista.descricao.substring(0, 100)}...`
                          : taxista.descricao}
                      </p>
                    )}

                    <div className="border-top pt-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaPhone className="me-2" style={{ color: '#7C3AED' }} />
                        <a
                          href={`tel:${taxista.telefone}`}
                          className="text-decoration-none"
                        >
                          {formatPhone(taxista.telefone)}
                        </a>
                      </div>

                      {taxista.whatsapp && (
                        <div className="d-flex align-items-center mb-2">
                          <FaWhatsapp className="me-2" style={{ color: '#25D366' }} />
                          <a
                            href={`https://wa.me/55${taxista.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            {formatPhone(taxista.whatsapp)}
                          </a>
                        </div>
                      )}

                      <div className="d-flex align-items-center">
                        <FaEnvelope className="me-2" style={{ color: '#7C3AED' }} />
                        <a
                          href={`mailto:${taxista.email}`}
                          className="text-decoration-none small"
                        >
                          {taxista.email}
                        </a>
                      </div>
                    </div>

                    <div className="mt-3">
                      <small className="text-muted">
                        Alvará: {taxista.numeroAlvara}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      <style jsx>{`
        .hover-shadow {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(124, 58, 237, 0.15) !important;
        }
      `}</style>
    </Container>
  );
};

export default TaxistaList;
