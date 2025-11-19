'use client';

import hotelsData from '@/data/hotels.json';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaBed, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { SiWaze } from 'react-icons/si';

const HotelsModal = ({ show, onHide }) => {
  const handleCall = (phone) => {
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  };

  const handleWaze = (coordinates, name) => {
    // Abre o Waze com as coordenadas do hotel
    window.open(
      `https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes&q=${encodeURIComponent(name)}`,
      '_blank'
    );
  };

  const getAvatar = (name) => {
    const initial = name.split(' ')[1].charAt(0).toUpperCase();
    return `https://placehold.co/50x50/16a34a/fff?text=${initial}`;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaBed className="me-2" />
          Hotéis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <div className="mb-3">
          <p className="text-muted mb-4">
            Confira as opções de hospedagem disponíveis no município
          </p>
          <Table hover responsive className="mb-0">
            <tbody>
              {hotelsData.map((hotel) => (
                <tr key={hotel.id}>
                  <td style={{ width: '50%' }}>
                    <div className="d-flex align-items-center">
                      <img
                        src={getAvatar(hotel.name)}
                        className="rounded-circle me-3"
                        width={50}
                        height={50}
                        alt={hotel.name}
                      />
                      <div>
                        <strong className="d-block">{hotel.name}</strong>
                        <small className="text-muted d-flex align-items-center">
                          <FaMapMarkerAlt size={10} className="me-1" />
                          {hotel.address}
                        </small>
                        <small className="text-muted d-block mt-1">
                          <FaPhone size={10} className="me-1" />
                          {hotel.phone}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="text-end align-middle" style={{ width: '50%' }}>
                    <div className="d-flex gap-2 justify-content-end">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleWaze(hotel.coordinates, hotel.name)}
                        style={{
                          borderRadius: '8px',
                          fontWeight: '500',
                          fontSize: '0.875rem'
                        }}
                      >
                        <SiWaze className="me-1" size={14} />
                        Waze
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleCall(hotel.phone)}
                        style={{
                          borderRadius: '8px',
                          fontWeight: '500',
                          fontSize: '0.875rem'
                        }}
                      >
                        <FaPhone className="me-1" size={12} />
                        Ligar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Info Footer */}
        <div className="mt-4 pt-3 border-top text-center">
          <small className="text-muted">
            <FaBed className="me-1" />
            Entre em contato para verificar disponibilidade e fazer sua reserva
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default HotelsModal;
