'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Modal,
  Form,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { FaCheck, FaTimes, FaTrash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [taxistas, setTaxistas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pendente');
  const [showModal, setShowModal] = useState(false);
  const [selectedTaxista, setSelectedTaxista] = useState(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchTaxistas();
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    setAdminPassword(password);
    setIsAuthenticated(true);
    toast.success('Login realizado com sucesso!');
  };

  const fetchTaxistas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/taxistas?status=${activeTab}&admin=true`);
      const data = await response.json();

      if (data.success) {
        setTaxistas(data.data);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Erro ao buscar taxistas:', err);
      toast.error('Erro ao carregar taxistas');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (taxistaId) => {
    if (!confirm('Tem certeza que deseja aprovar este cadastro?')) return;

    try {
      const response = await fetch(`/api/taxistas/${taxistaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'aprovado',
          adminPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchTaxistas();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Erro ao aprovar:', err);
      toast.error('Erro ao aprovar cadastro');
    }
  };

  const handleReject = async () => {
    if (!selectedTaxista) return;

    try {
      const response = await fetch(`/api/taxistas/${selectedTaxista._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'rejeitado',
          motivoRejeicao,
          adminPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        setMotivoRejeicao('');
        setSelectedTaxista(null);
        fetchTaxistas();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Erro ao rejeitar:', err);
      toast.error('Erro ao rejeitar cadastro');
    }
  };

  const handleDelete = async (taxistaId) => {
    if (!confirm('Tem certeza que deseja excluir este cadastro permanentemente?'))
      return;

    try {
      const response = await fetch(
        `/api/taxistas/${taxistaId}?adminPassword=${adminPassword}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchTaxistas();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Erro ao excluir:', err);
      toast.error('Erro ao excluir cadastro');
    }
  };

  const openRejectModal = (taxista) => {
    setSelectedTaxista(taxista);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      pendente: 'warning',
      aprovado: 'success',
      rejeitado: 'danger',
    };
    return <Badge bg={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <h3 className="text-center mb-4" style={{ color: '#7C3AED' }}>
                  Admin Login
                </h3>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Senha de Administrador</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite a senha"
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100"
                    style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED' }}
                  >
                    Entrar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4" style={{ color: '#7C3AED' }}>
        Painel Administrativo - Taxistas
      </h2>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        justify
      >
        <Tab eventKey="pendente" title="Pendentes">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: '#7C3AED' }} />
            </div>
          ) : taxistas.length === 0 ? (
            <Alert variant="info">Nenhum cadastro pendente.</Alert>
          ) : (
            <Row>
              {taxistas.map((taxista) => (
                <Col key={taxista._id} md={6} lg={4} className="mb-4">
                  <TaxistaCard
                    taxista={taxista}
                    onApprove={handleApprove}
                    onReject={openRejectModal}
                    onDelete={handleDelete}
                    formatDate={formatDate}
                    getStatusBadge={getStatusBadge}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        <Tab eventKey="aprovado" title="Aprovados">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: '#7C3AED' }} />
            </div>
          ) : taxistas.length === 0 ? (
            <Alert variant="info">Nenhum cadastro aprovado.</Alert>
          ) : (
            <Row>
              {taxistas.map((taxista) => (
                <Col key={taxista._id} md={6} lg={4} className="mb-4">
                  <TaxistaCard
                    taxista={taxista}
                    onDelete={handleDelete}
                    formatDate={formatDate}
                    getStatusBadge={getStatusBadge}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        <Tab eventKey="rejeitado" title="Rejeitados">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: '#7C3AED' }} />
            </div>
          ) : taxistas.length === 0 ? (
            <Alert variant="info">Nenhum cadastro rejeitado.</Alert>
          ) : (
            <Row>
              {taxistas.map((taxista) => (
                <Col key={taxista._id} md={6} lg={4} className="mb-4">
                  <TaxistaCard
                    taxista={taxista}
                    onDelete={handleDelete}
                    formatDate={formatDate}
                    getStatusBadge={getStatusBadge}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Tab>
      </Tabs>

      {/* Modal de Rejeição */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rejeitar Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Motivo da Rejeição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={motivoRejeicao}
              onChange={(e) => setMotivoRejeicao(e.target.value)}
              placeholder="Explique o motivo da rejeição..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleReject}>
            Confirmar Rejeição
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const TaxistaCard = ({
  taxista,
  onApprove,
  onReject,
  onDelete,
  formatDate,
  getStatusBadge,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h6 className="mb-0">{taxista.nomeCompleto}</h6>
          {getStatusBadge(taxista.status)}
        </div>

        <div className="mb-2">
          <small className="text-muted">
            <strong>CPF:</strong> {taxista.cpf}
          </small>
        </div>
        <div className="mb-2">
          <small className="text-muted">
            <strong>Alvará:</strong> {taxista.numeroAlvara}
          </small>
        </div>
        <div className="mb-2">
          <small className="text-muted">
            <strong>Veículo:</strong> {taxista.modeloVeiculo} - {taxista.placaVeiculo}
          </small>
        </div>
        <div className="mb-3">
          <small className="text-muted">
            <strong>Cadastrado em:</strong> {formatDate(taxista.dataCadastro)}
          </small>
        </div>

        {showDetails && (
          <div className="mb-3 p-2 bg-light rounded">
            <small>
              <p className="mb-1">
                <strong>Email:</strong> {taxista.email}
              </p>
              <p className="mb-1">
                <strong>Telefone:</strong> {taxista.telefone}
              </p>
              {taxista.whatsapp && (
                <p className="mb-1">
                  <strong>WhatsApp:</strong> {taxista.whatsapp}
                </p>
              )}
              <p className="mb-1">
                <strong>Ano:</strong> {taxista.anoVeiculo}
              </p>
              <p className="mb-1">
                <strong>Cor:</strong> {taxista.corVeiculo}
              </p>
              {taxista.descricao && (
                <p className="mb-0">
                  <strong>Descrição:</strong> {taxista.descricao}
                </p>
              )}
              {taxista.motivoRejeicao && (
                <p className="mb-0 text-danger">
                  <strong>Motivo Rejeição:</strong> {taxista.motivoRejeicao}
                </p>
              )}
            </small>
          </div>
        )}

        <Button
          variant="link"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="p-0 mb-2"
        >
          <FaEye className="me-1" />
          {showDetails ? 'Ocultar' : 'Ver'} detalhes
        </Button>

        <div className="d-flex gap-2">
          {taxista.status === 'pendente' && onApprove && (
            <>
              <Button
                variant="success"
                size="sm"
                onClick={() => onApprove(taxista._id)}
                className="flex-fill"
              >
                <FaCheck className="me-1" /> Aprovar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onReject(taxista)}
                className="flex-fill"
              >
                <FaTimes className="me-1" /> Rejeitar
              </Button>
            </>
          )}
          {onDelete && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(taxista._id)}
              className={taxista.status === 'pendente' ? '' : 'w-100'}
            >
              <FaTrash className="me-1" /> Excluir
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminPanel;
