'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { FaCar, FaPhone, FaUserPlus, FaWhatsapp } from 'react-icons/fa';

const TaxistaList = () => {
  const [taxistas, setTaxistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('recent');
  const limit = 6; // Items per page

  useEffect(() => {
    fetchTaxistas(1);
  }, []);

  const fetchTaxistas = async (pageNum) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(`/api/taxi-drivers?page=${pageNum}&limit=${limit}`);
      const data = await response.json();

      if (data.success) {
        if (pageNum === 1) {
          setTaxistas(data.data);
        } else {
          setTaxistas((prev) => [...prev, ...data.data]);
        }
        setTotal(data.total);
        setPage(pageNum);
        setHasMore(pageNum < data.totalPages);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error('Erro ao buscar taxistas:', err);
      setError('Erro ao carregar taxistas');
    } finally {
      if (pageNum === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const handleLoadMore = () => {
    fetchTaxistas(page + 1);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    sortTaxistas(newSort);
  };

  const sortTaxistas = (sortType) => {
    let sorted = [...taxistas];

    switch (sortType) {
      case 'recent':
        sorted.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate));
        break;
      case 'name':
        sorted.sort((a, b) => a.fullName.localeCompare(b.fullName, 'pt-BR'));
        break;
      default:
        break;
    }

    setTaxistas(sorted);
  };

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

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">
        Taxistas de Cerro Largo
      </h2>

      {/* Card de Cadastro */}
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card className="shadow-sm" style={{ border: '1px solid #dee2e6', backgroundColor: '#f8f9fa' }}>
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="mb-2 fw-bold">
                    <FaUserPlus className="me-2" />
                    Você é taxista?
                  </h5>
                  <p className="text-muted mb-md-0">
                    Cadastre-se gratuitamente e seja encontrado por turistas, visitantes e pela comunidade de Cerro Largo!
                  </p>
                </Col>
                <Col md={4} className="text-md-end mt-3 mt-md-0">
                  <Link href="/taxi-drivers/register">
                    <Button
                      variant="primary"
                      size="lg"
                      className="fw-semibold"
                      style={{
                        borderRadius: '8px'
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

      {/* Loading initial */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" style={{ color: '#7C3AED' }}>
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
          <p className="mt-3">Carregando taxistas...</p>
        </div>
      ) : null}

      {/* Error message */}
      {error && (
        <Alert variant="danger">{error}</Alert>
      )}

      {/* Empty state */}
      {!loading && taxistas.length === 0 && (
        <Alert variant="info" className="text-center">
          Nenhum taxista cadastrado ainda.
        </Alert>
      )}

      {/* Taxistas list */}
      {!loading && taxistas.length > 0 && (
        <>
          <div className="filter-header">
            <p className="text-muted mb-0">
              Exibindo {taxistas.length} de {total} taxista{total !== 1 ? 's' : ''}
            </p>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="recent">Mais novos</option>
              <option value="oldest">Mais antigos</option>
              <option value="name">Por nome</option>
            </select>
          </div>

          <Row>
            {taxistas.map((taxista) => (
              <Col key={taxista.id} md={6} lg={4} className="mb-4">
                <div className="decolar-card">
                  <div className="card-header">
                    <div className="avatar">
                      <FaCar />
                    </div>

                    <div className="header-info">
                      <h6 className="card-title">{taxista.fullName}</h6>
                      {taxista.description && (
                        <p className="card-description">
                          {taxista.description.length > 60
                            ? `${taxista.description.substring(0, 60)}...`
                            : taxista.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="card-actions">
                    <a
                      href={`tel:${taxista.phone}`}
                      className="btn-action call"
                    >
                      <FaPhone />
                      Ligar
                    </a>

                    {taxista.whatsapp && (
                      <a
                        href={`https://wa.me/55${taxista.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action whatsapp"
                      >
                        <FaWhatsapp />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Load more button */}
          {hasMore && (
            <Row className="justify-content-center mt-4">
              <Col className="text-center">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="fw-semibold"
                  style={{ borderRadius: '8px' }}
                >
                  {loadingMore ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Carregando...
                    </>
                  ) : (
                    'Mostrar Mais'
                  )}
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}

      <style jsx>{`
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 4px;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          background: #fff;
          color: #666;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          padding-right: 28px;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 6px center;
          background-size: 18px;
          padding-right: 30px;
        }

        .filter-select:hover {
          border-color: #d0d0d0;
          background-color: #f9f9f9;
        }

        .filter-select:focus {
          outline: none;
          border-color: #7C3AED;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .decolar-card {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .decolar-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-color: #d0d0d0;
        }

        .card-header {
          display: flex;
          gap: 12px;
          padding: 12px;
          align-items: flex-start;
          flex: 1;
        }

        .avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: #eee;
          border-radius: 50%;
          color: #666;
          font-size: 32px;
          flex-shrink: 0;
        }

        .header-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          min-width: 0;
        }

        .card-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.3;
        }

        .card-description {
          font-size: 12px;
          color: #666;
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid #f0f0f0;
          justify-content: flex-start;
        }

        .btn-action {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 1px solid #e0e0e0;
          cursor: pointer;
          white-space: nowrap;
          background: #f5f5f5;
          color: #666;
        }

        .btn-action.call {
          background: #f5f5f5;
          color: #666;
          border-color: #e0e0e0;
        }

        .btn-action.call:hover {
          background: #efefef;
          border-color: #d0d0d0;
          transform: translateY(-1px);
          text-decoration: none;
          color: #333;
        }

        .btn-action.whatsapp {
          background: #f5f5f5;
          color: #666;
          border-color: #e0e0e0;
        }

        .btn-action.whatsapp:hover {
          background: #efefef;
          border-color: #d0d0d0;
          transform: translateY(-1px);
          text-decoration: none;
          color: #333;
        }

        .btn-action svg {
          font-size: 13px;
          flex-shrink: 0;
        }

        /* footer-divider moved to shared Footer component */
      `}</style>
    </Container>
  );
};

export default TaxistaList;
