'use client';

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import BannerBase from './BannerBase';

const BannerTopo = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await fetch('/api/ads?type=top&active=true');
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const randomBanner = data.data[Math.floor(Math.random() * data.data.length)];
        setBanner(randomBanner);
      }
    } catch (error) {
      console.error('Error fetching top banner:', error);
    }
  };

  const handleView = async (id) => {
    try {
      await fetch(`/api/ads/${id}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Error registering view:', error);
    }
  };

  const handleClick = async (id) => {
    try {
      await fetch(`/api/ads/${id}/click`, { method: 'POST' });
    } catch (error) {
      console.error('Error registering click:', error);
    }
  };

  if (!banner) return null;

  return (
    <div className="banner-topo-wrapper" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
      <Container className="py-3">
        <BannerBase
          publicidade={banner}
          onView={handleView}
          onClick={handleClick}
          style={{
            maxHeight: '120px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        />
      </Container>
    </div>
  );
};

export default BannerTopo;
