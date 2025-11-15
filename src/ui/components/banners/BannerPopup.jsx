'use client';

import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import BannerBase from './BannerBase';

const BannerPopup = () => {
  const [banner, setBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await fetch('/api/ads?type=popup&active=true');
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const randomBanner = data.data[Math.floor(Math.random() * data.data.length)];
        setBanner(randomBanner);

        // Verifica frequência antes de mostrar
        if (shouldShowPopup(randomBanner)) {
          schedulePopup(randomBanner);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar banner popup:', error);
    }
  };

  const shouldShowPopup = (banner) => {
    const frequencia = banner.popupFrequency || 'once-per-session';
    const storageKey = `popup-${banner.id}`;

    if (frequencia === 'always') {
      return true;
    }

    if (frequencia === 'once-per-session') {
      const shown = sessionStorage.getItem(storageKey);
      return !shown;
    }

    if (frequencia === 'once-per-day') {
      const lastShown = localStorage.getItem(storageKey);
      if (!lastShown) return true;

      const hoje = new Date().toDateString();
      const ultimaVez = new Date(parseInt(lastShown)).toDateString();
      return hoje !== ultimaVez;
    }

    return true;
  };

  const schedulePopup = (banner) => {
    const delay = (banner.popupDisplayAfter || 5) * 1000;

    setTimeout(() => {
      setShowModal(true);
      markAsShown(banner);
    }, delay);
  };

  const markAsShown = (banner) => {
    const frequencia = banner.popupFrequency || 'once-per-session';
    const storageKey = `popup-${banner.id}`;

    if (frequencia === 'once-per-session') {
      sessionStorage.setItem(storageKey, 'true');
    } else if (frequencia === 'once-per-day') {
      localStorage.setItem(storageKey, Date.now().toString());
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
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
    }
  };

  if (!banner) return null;

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header className="border-0 pb-0">
        <Button
          variant="link"
          onClick={() => setShowModal(false)}
          className="ms-auto text-dark"
          style={{ fontSize: '1.5rem', textDecoration: 'none' }}
        >
          <FaTimes />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <BannerBase
          publicidade={banner}
          onView={handleView}
          onClick={handleClick}
          style={{
            position: 'relative',
            overflow: 'hidden',
            maxHeight: '600px',
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default BannerPopup;
