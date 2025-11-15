'use client';

import { useState, useEffect } from 'react';
import BannerBase from './BannerBase';

const BannerLateral = ({ lado = 'esquerdo' }) => {
  const [banner, setBanner] = useState(null);
  const tipoBanner = `lateral-${lado}`;

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await fetch(`/api/publicidades?tipo=${tipoBanner}&ativos=true`);
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
    try {
      await fetch(`/api/publicidades/${id}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
    }
  };

  const handleClick = async (id) => {
    try {
      await fetch(`/api/publicidades/${id}/click`, { method: 'POST' });
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
    }
  };

  if (!banner) return null;

  return (
    <div
      className={`banner-lateral banner-lateral-${lado}`}
      style={{
        position: 'sticky',
        top: '100px',
        maxWidth: '300px',
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
        }}
      />
    </div>
  );
};

export default BannerLateral;
