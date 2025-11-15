'use client';

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import BannerBase from './BannerBase';

const BannerRodape = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await fetch('/api/ads?type=footer&active=true');
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const randomBanner = data.data[Math.floor(Math.random() * data.data.length)];
        setBanner(randomBanner);
      }
    } catch (error) {
      console.error('Erro ao buscar banner do rodapé:', error);
    }
  };

  const handleView = async (id) => {
    if (!id) return;
    try {
      await fetch(`/api/ads/${id}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
    }
  };

  const handleClick = async (id) => {
    if (!id) return;
    try {
      await fetch(`/api/ads/${id}/click`, { method: 'POST' });
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
    }
  };

  if (!banner) return null;

  return (
    <div className="banner-rodape-wrapper" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6', paddingTop: '20px' }}>
      <Container className="pb-3">
        <BannerBase
          publicidade={banner}
          onView={handleView}
          onClick={handleClick}
          style={{
            maxHeight: '100px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        />
      </Container>
    </div>
  );
};

export default BannerRodape;
