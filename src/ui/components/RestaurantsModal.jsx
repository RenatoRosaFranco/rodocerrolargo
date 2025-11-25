'use client';

import restaurantsData from '@/data/restaurants.json';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaUtensils, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { SiWaze } from 'react-icons/si';

const RestaurantsModal = ({ show, onHide }) => {
  const handleCall = (phone) => {
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  };

  const handleWaze = (coordinates, name) => {
    // Abre o Waze com as coordenadas do restaurante
    window.open(
      `https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes&q=${encodeURIComponent(name)}`,
      '_blank'
    );
  };

  const getAvatar = (name) => {
    const initial = name.split(' ')[1]?.charAt(0).toUpperCase() || name.charAt(0).toUpperCase();
    return `https://placehold.co/50x50/1f2937/fff?text=${initial}`;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaUtensils className="me-2" />
          Restaurantes
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <div className="mb-3">
          <p className="text-muted mb-4">
            Confira as opções de restaurantes disponíveis no município
          </p>
          <Table hover responsive className="mb-0">
            <tbody>
              {restaurantsData.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td style={{ width: '50%' }}>
                    <div className="d-flex align-items-center">
                      <img
                        src={getAvatar(restaurant.name)}
                        className="rounded-circle me-3"
                        width={50}
                        height={50}
                        alt={restaurant.name}
                      />
                      <div>
                        <strong className="d-block">{restaurant.name}</strong>
                        <small className="text-muted d-flex align-items-center">
                          <FaMapMarkerAlt size={10} className="me-1" />
                          {restaurant.address}
                        </small>
                        <small className="text-muted d-block mt-1">
                          <FaPhone size={10} className="me-1" />
                          {restaurant.phone}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="text-end align-middle" style={{ width: '50%' }}>
                    <div className="d-flex gap-2 justify-content-end">
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => handleWaze(restaurant.coordinates, restaurant.name)}
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
                        variant="dark"
                        size="sm"
                        onClick={() => handleCall(restaurant.phone)}
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
            <FaUtensils className="me-1" />
            Entre em contato para verificar horários de funcionamento e fazer reservas
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RestaurantsModal;
