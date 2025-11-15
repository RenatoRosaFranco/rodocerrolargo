'use client';

import { useState, useEffect } from 'react';
import BannerBase from './BannerBase';

const BannerLateral = ({ lado = 'esquerdo' }) => {
  const [banner, setBanner] = useState(null);
  // Mapear lado para o tipo correto no banco
  const tipoBanner = lado === 'esquerdo' ? 'left' : 'right';

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await fetch(`/api/ads?type=${tipoBanner}&active=true`);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const randomBanner = data.data[Math.floor(Math.random() * data.data.length)];
        setBanner(randomBanner);
      }
    } catch (error) {
      console.error(`Erro ao buscar banner lateral ${lado}:`, error);
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
    <div
      className={`banner-lateral banner-lateral-${lado}`}
      style={{
        width: '100%',
        marginBottom: '20px',
      }}
    >
      <BannerBase
        publicidade={banner}
        onView={handleView}
        onClick={handleClick}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default BannerLateral;
