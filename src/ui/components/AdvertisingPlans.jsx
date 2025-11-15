'use client';

import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaCheck, FaChartBar, FaEye, FaMouse } from 'react-icons/fa';
import Link from 'next/link';

const PlanosPublicidade = () => {
  const planos = [
    {
      nome: 'Básico',
      preco: 150,
      periodo: 'mês',
      cor: '#17a2b8',
      destaque: false,
      recursos: [
        '1 posição de banner',
        'Rotação com outros anúncios',
        'Estatísticas básicas',
        'Suporte por email',
        'Relatório mensal',
      ],
    },
    {
      nome: 'Intermediário',
      preco: 250,
      periodo: 'mês',
      cor: '#7C3AED',
      destaque: true,
      recursos: [
        '2 posições de banner',
        'Prioridade na rotação',
        'Estatísticas detalhadas',
        'Suporte prioritário',
        'Relatório semanal',
        'Banner destacado',
      ],
    },
    {
      nome: 'Premium',
      preco: 400,
      periodo: 'mês',
      cor: '#FFD700',
      destaque: false,
      recursos: [
        '3 posições de banner',
        'Máxima prioridade',
        'Dashboard em tempo real',
        'Suporte VIP 24/7',
        'Relatório diário',
        'Banner exclusivo',
        'Popup garantido',
      ],
    },
  ];

  const posicoesDisponiveis = [
    {
      tipo: 'Topo',
      descricao: 'Banner horizontal no topo da página',
      dimensoes: '1200 x 120 pixels',
      visualizacoes: 'Alta',
      icon: '🔝',
    },
    {
      tipo: 'Lateral Esquerdo',
      descricao: 'Banner vertical na lateral esquerda',
      dimensoes: '300 x 600 pixels',
      visualizacoes: 'Média-Alta',
      icon: '⬅️',
    },
    {
      tipo: 'Lateral Direito',
      descricao: 'Banner vertical na lateral direita',
      dimensoes: '300 x 600 pixels',
      visualizacoes: 'Média-Alta',
      icon: '➡️',
    },
    {
      tipo: 'Rodapé',
      descricao: 'Banner horizontal no rodapé',
      dimensoes: '1200 x 100 pixels',
      visualizacoes: 'Média',
      icon: '🔽',
    },
    {
      tipo: 'Popup',
      descricao: 'Banner popup modal centralizado',
      dimensoes: '800 x 600 pixels',
      visualizacoes: 'Muito Alta',
      icon: '🎯',
    },
  ];

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 style={{ color: '#7C3AED', fontWeight: 'bold' }}>
          Planos de Publicidade
        </h1>
        <p className="lead text-muted">
          Aumente a visibilidade da sua empresa local com nossas cotas de publicidade
        </p>
      </div>

      {/* Posições Disponíveis */}
      <h3 className="text-center mb-4" style={{ color: '#7C3AED' }}>
        Posições Disponíveis
      </h3>

      <Row className="mb-5">
        {posicoesDisponiveis.map((posicao, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="text-center mb-3">
                  <span style={{ fontSize: '3rem' }}>{posicao.icon}</span>
                </div>
                <h5 className="text-center mb-3" style={{ color: '#7C3AED' }}>
                  {posicao.tipo}
                </h5>
                <p className="text-muted text-center small mb-3">
                  {posicao.descricao}
                </p>
                <div className="text-center">
                  <Badge bg="secondary" className="mb-2">
                    {posicao.dimensoes}
                  </Badge>
                  <br />
                  <Badge
                    bg={
                      posicao.visualizacoes === 'Muito Alta'
                        ? 'success'
                        : posicao.visualizacoes === 'Alta'
                        ? 'primary'
                        : 'info'
                    }
                  >
                    <FaEye className="me-1" />
                    {posicao.visualizacoes} Visualização
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Planos */}
      <h3 className="text-center mb-4 mt-5" style={{ color: '#7C3AED' }}>
        Escolha Seu Plano
      </h3>

      <Row className="mb-5">
        {planos.map((plano, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card
              className={`h-100 shadow ${plano.destaque ? 'border-0' : ''}`}
              style={{
                borderColor: plano.destaque ? plano.cor : undefined,
                borderWidth: plano.destaque ? '3px' : undefined,
                transform: plano.destaque ? 'scale(1.05)' : undefined,
              }}
            >
              {plano.destaque && (
                <div
                  className="text-center text-white py-2"
                  style={{ backgroundColor: plano.cor }}
                >
                  <strong>⭐ MAIS POPULAR ⭐</strong>
                </div>
              )}
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-4">
                  <h4 style={{ color: plano.cor }}>{plano.nome}</h4>
                  <h2 className="mb-0">
                    <strong style={{ color: plano.cor }}>R$ {plano.preco}</strong>
                  </h2>
                  <small className="text-muted">por {plano.periodo}</small>
                </div>

                <ul className="list-unstyled mb-4 flex-grow-1">
                  {plano.recursos.map((recurso, i) => (
                    <li key={i} className="mb-2">
                      <FaCheck className="me-2" style={{ color: plano.cor }} />
                      {recurso}
                    </li>
                  ))}
                </ul>

                <div className="d-grid">
                  <Link href="/publicidade/solicitar" passHref legacyBehavior>
                    <Button
                      variant={plano.destaque ? 'primary' : 'outline-primary'}
                      size="lg"
                      style={{
                        backgroundColor: plano.destaque ? plano.cor : undefined,
                        borderColor: plano.cor,
                        color: plano.destaque ? 'white' : plano.cor,
                      }}
                    >
                      Solicitar Agora
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Benefícios */}
      <Row className="mt-5">
        <Col md={12}>
          <Card className="shadow-sm" style={{ borderTop: `4px solid #7C3AED` }}>
            <Card.Body className="p-4">
              <h4 className="mb-4 text-center" style={{ color: '#7C3AED' }}>
                Por que anunciar conosco?
              </h4>
              <Row>
                <Col md={4} className="text-center mb-3">
                  <FaEye size={40} className="mb-3" style={{ color: '#7C3AED' }} />
                  <h5>Alta Visibilidade</h5>
                  <p className="text-muted">
                    Milhares de visitantes diários de Cerro Largo e região
                  </p>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <FaChartBar size={40} className="mb-3" style={{ color: '#7C3AED' }} />
                  <h5>Estatísticas Detalhadas</h5>
                  <p className="text-muted">
                    Acompanhe visualizações e cliques em tempo real
                  </p>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <FaMouse size={40} className="mb-3" style={{ color: '#7C3AED' }} />
                  <h5>Público Segmentado</h5>
                  <p className="text-muted">
                    Alcance turistas, visitantes e a comunidade local
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA Final */}
      <Row className="mt-5">
        <Col md={12}>
          <div
            className="text-center p-5 rounded"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
            }}
          >
            <h3 className="text-white mb-3">Pronto para começar?</h3>
            <p className="text-white mb-4">
              Entre em contato conosco ou solicite sua cota agora mesmo!
            </p>
            <Link href="/publicidade/solicitar" passHref legacyBehavior>
              <Button variant="light" size="lg" className="me-3">
                Solicitar Cota
              </Button>
            </Link>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => {
                const whatsapp = '5555999999999'; // Substitua pelo número real
                window.open(
                  `https://wa.me/${whatsapp}?text=Olá! Gostaria de mais informações sobre publicidade.`,
                  '_blank'
                );
              }}
            >
              Falar no WhatsApp
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanosPublicidade;
