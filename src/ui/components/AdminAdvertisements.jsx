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
  Table,
} from 'react-bootstrap';
import { FaCheck, FaTimes, FaTrash, FaEye, FaPause, FaPlay, FaChartBar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminPublicidade = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [publicidades, setPublicidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pendente');
  const [showModal, setShowModal] = useState(false);
  const [selectedPublicidade, setSelectedPublicidade] = useState(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchPublicidades();
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    setAdminPassword(password);
    setIsAuthenticated(true);
    toast.success('Login realizado com sucesso!');
  };

  const fetchPublicidades = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/publicidades?status=${activeTab}&admin=true`);
      const data = await response.json();

      if (data.success) {
        setPublicidades(data.data);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Erro ao buscar publicidades:', err);
      toast.error('Erro ao carregar publicidades');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (publicidadeId, newStatus) => {
    if (!confirm(`Tem certeza que deseja ${newStatus === 'ativo' ? 'aprovar' : 'pausar'} esta publicidade?`)) return;

    try {
      const response = await fetch(`/api/publicidades/${publicidadeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          adminPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchPublicidades();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      toast.error('Erro ao atualizar publicidade');
    }
  };

  const handleReject = async () => {
    if (!selectedPublicidade) return;

    try {
      const response = await fetch(`/api/publicidades/${selectedPublicidade._id}`, {
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
        setSelectedPublicidade(null);
        fetchPublicidades();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Erro ao rejeitar:', err);
      toast.error('Erro ao rejeitar publicidade');
    }
  };

  const handleDelete = async (publicidadeId) => {
    if (!confirm('Tem certeza que deseja excluir esta publicidade permanentemente?'))
      return;

    try {
      const response = await fetch(
        `/api/publicidades/${publicidadeId}?adminPassword=${adminPassword}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchPublicidades();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Erro ao excluir:', err);
      toast.error('Erro ao excluir publicidade');
    }
  };

  const openRejectModal = (publicidade) => {
    setSelectedPublicidade(publicidade);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      pendente: 'warning',
      ativo: 'success',
      pausado: 'secondary',
      expirado: 'dark',
      rejeitado: 'danger',
    };
    return <Badge bg={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const getTipoBanner = (tipo) => {
    const tipos = {
      'topo': 'Topo',
      'lateral-esquerdo': 'Lateral Esquerdo',
      'lateral-direito': 'Lateral Direito',
      'rodape': 'Rodapé',
      'popup': 'Popup',
    };
    return tipos[tipo] || tipo;
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <h3 className="text-center mb-4" style={{ color: '#7C3AED' }}>
                  Admin - Publicidades
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
        Painel Administrativo - Publicidades
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
          ) : publicidades.length === 0 ? (
            <Alert variant="info">Nenhuma publicidade pendente.</Alert>
          ) : (
            <PublicidadeTable
              publicidades={publicidades}
              onApprove={handleUpdateStatus}
              onReject={openRejectModal}
              onDelete={handleDelete}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
              getTipoBanner={getTipoBanner}
            />
          )}
        </Tab>

        <Tab eventKey="ativo" title="Ativos">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: '#7C3AED' }} />
            </div>
          ) : publicidades.length === 0 ? (
            <Alert variant="info">Nenhuma publicidade ativa.</Alert>
          ) : (
            <PublicidadeTable
              publicidades={publicidades}
              onPause={handleUpdateStatus}
              onDelete={handleDelete}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
              getTipoBanner={getTipoBanner}
            />
          )}
        </Tab>

        <Tab eventKey="pausado" title="Pausados">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: '#7C3AED' }} />
            </div>
          ) : publicidades.length === 0 ? (
            <Alert variant="info">Nenhuma publicidade pausada.</Alert>
          ) : (
            <PublicidadeTable
              publicidades={publicidades}
              onResume={handleUpdateStatus}
              onDelete={handleDelete}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
              getTipoBanner={getTipoBanner}
            />
          )}
        </Tab>

        <Tab eventKey="expirado" title="Expirados">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: '#7C3AED' }} />
            </div>
          ) : publicidades.length === 0 ? (
            <Alert variant="info">Nenhuma publicidade expirada.</Alert>
          ) : (
            <PublicidadeTable
              publicidades={publicidades}
              onDelete={handleDelete}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
              getTipoBanner={getTipoBanner}
            />
          )}
        </Tab>

        <Tab eventKey="rejeitado" title="Rejeitados">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: '#7C3AED' }} />
            </div>
          ) : publicidades.length === 0 ? (
            <Alert variant="info">Nenhuma publicidade rejeitada.</Alert>
          ) : (
            <PublicidadeTable
              publicidades={publicidades}
              onDelete={handleDelete}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
              getTipoBanner={getTipoBanner}
            />
          )}
        </Tab>
      </Tabs>

      {/* Modal de Rejeição */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rejeitar Publicidade</Modal.Title>
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

const PublicidadeTable = ({
  publicidades,
  onApprove,
  onReject,
  onPause,
  onResume,
  onDelete,
  formatDate,
  getStatusBadge,
  getTipoBanner,
}) => {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Tipo</th>
            <th>Período</th>
            <th>Status</th>
            <th>Estatísticas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {publicidades.map((pub) => (
            <>
              <tr key={pub._id}>
                <td>
                  <strong>{pub.nomeEmpresa}</strong>
                  <br />
                  <small className="text-muted">{pub.responsavel}</small>
                </td>
                <td>
                  <Badge bg="primary">{getTipoBanner(pub.tipoBanner)}</Badge>
                  <br />
                  <small className="text-muted">{pub.plano}</small>
                </td>
                <td>
                  <small>
                    {formatDate(pub.dataInicio)} até {formatDate(pub.dataFim)}
                  </small>
                </td>
                <td>{getStatusBadge(pub.status)}</td>
                <td>
                  <FaEye className="me-1" /> {pub.visualizacoes}
                  <br />
                  <FaChartBar className="me-1" /> {pub.cliques}
                </td>
                <td>
                  <div className="d-flex gap-1 flex-wrap">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => toggleDetails(pub._id)}
                    >
                      <FaEye />
                    </Button>
                    {pub.status === 'pendente' && onApprove && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => onApprove(pub._id, 'ativo')}
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onReject(pub)}
                        >
                          <FaTimes />
                        </Button>
                      </>
                    )}
                    {pub.status === 'ativo' && onPause && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => onPause(pub._id, 'pausado')}
                      >
                        <FaPause />
                      </Button>
                    )}
                    {pub.status === 'pausado' && onResume && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => onResume(pub._id, 'ativo')}
                      >
                        <FaPlay />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(pub._id)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
              {showDetails[pub._id] && (
                <tr>
                  <td colSpan={6}>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <h6>Informações da Empresa</h6>
                            <p className="mb-1">
                              <strong>Email:</strong> {pub.email}
                            </p>
                            <p className="mb-1">
                              <strong>Telefone:</strong> {pub.telefone}
                            </p>
                            {pub.cnpj && (
                              <p className="mb-1">
                                <strong>CNPJ:</strong> {pub.cnpj}
                              </p>
                            )}
                          </Col>
                          <Col md={6}>
                            <h6>Detalhes do Banner</h6>
                            <p className="mb-1">
                              <strong>Imagem:</strong>{' '}
                              <a href={pub.imagemUrl} target="_blank" rel="noopener noreferrer">
                                Ver imagem
                              </a>
                            </p>
                            {pub.linkDestino && (
                              <p className="mb-1">
                                <strong>Link:</strong>{' '}
                                <a href={pub.linkDestino} target="_blank" rel="noopener noreferrer">
                                  {pub.linkDestino}
                                </a>
                              </p>
                            )}
                            <p className="mb-1">
                              <strong>Prioridade:</strong> {pub.prioridade}
                            </p>
                          </Col>
                        </Row>
                        {pub.motivoRejeicao && (
                          <Alert variant="danger" className="mt-3 mb-0">
                            <strong>Motivo da rejeição:</strong> {pub.motivoRejeicao}
                          </Alert>
                        )}
                      </Card.Body>
                    </Card>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPublicidade;
