import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaExternalLinkAlt, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const FutsalTeam = () => {
  return (
    <section
      style={{
        padding: '2rem 0',
        paddingTop: '40px',
        paddingBottom: '40px',
        background: '#fafafa',
        border: '1px solid #EEE'
     }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9}>
            <Card
              className=""
              style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                border: '1px solid #EEE'
              }}
            >
              <Card.Body style={{ padding: '50px 50px' }}>
                <Row className="align-items-center">
              {/* Conteúdo Principal */}
              <Col md={8}>
                <h5 className="fw-bold mb-2" style={{ fontSize: '1.1rem', color: '#111827' }}>
                  Futsal Cerro Largo
                </h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  Conheça o time que representa nossa cidade em competições regionais e estaduais.
                </p>
              </Col>

              {/* Links e Redes Sociais */}
              <Col md={3} className="text-end mt-3 mt-md-0">
                <div className="d-flex gap-2 justify-content-end align-items-center flex-wrap">
                  <a
                    href="https://blog.cerrolargofutsal.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-inline-flex align-items-center gap-1"
                    style={{
                      padding: '6px 14px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '20px',
                      color: '#111827',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  >
                    Site <FaExternalLinkAlt size={10} />
                  </a>

                  <a
                    href="https://www.facebook.com/CERROLARGOFUTSAL/?locale=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '50%',
                      color: '#111827',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#111827';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.color = '#111827';
                    }}
                  >
                    <FaFacebookF size={14} />
                  </a>

                  <a
                    href="https://www.instagram.com/cerrolargofutsal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '50%',
                      color: '#111827',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#111827';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.color = '#111827';
                    }}
                  >
                    <FaInstagram size={14} />
                  </a>

                  <a
                    href="https://www.youtube.com/@cerrolargofutsal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '50%',
                      color: '#111827',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#111827';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.color = '#111827';
                    }}
                  >
                    <FaYoutube size={14} />
                  </a>
                </div>
              </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FutsalTeam;
