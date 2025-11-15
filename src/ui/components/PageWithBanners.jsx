'use client';

import { Container, Row, Col } from 'react-bootstrap';
import BannerLateral from './banners/BannerLateral';
import BannerTopo from './banners/BannerTopo';
import BannerRodape from './banners/BannerRodape';
import BannerPopup from './banners/BannerPopup';

const PageWithBanners = ({ children, showLaterais = true, showTopo = true, showRodape = true, showPopup = true }) => {
  return (
    <>
      {showTopo && <BannerTopo />}

      {showLaterais ? (
        <Container fluid className="py-4">
          <Row>
            {/* Banner Lateral Esquerdo */}
            <Col lg={2} className="d-none d-lg-block">
              <BannerLateral lado="esquerdo" />
            </Col>

            {/* Conteúdo Principal */}
            <Col lg={8}>
              {children}
            </Col>

            {/* Banner Lateral Direito */}
            <Col lg={2} className="d-none d-lg-block">
              <BannerLateral lado="direito" />
            </Col>
          </Row>
        </Container>
      ) : (
        children
      )}

      {showRodape && <BannerRodape />}
      {showPopup && <BannerPopup />}
    </>
  );
};

export default PageWithBanners;
