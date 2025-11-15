'use client';

import usefulPhonesData from '@/data/useful-phones.json';
import { Button, Modal, Table, Image } from 'react-bootstrap';
import { FaPhone } from 'react-icons/fa';

const UsefulPhonesModal = ({ show, onHide }) => {
  const emergencyPhones = usefulPhonesData.filter(p => p.category === 'emergencia');
  const otherPhones = usefulPhonesData.filter(p => p.category !== 'emergencia');

  const handleCall = (phone) => {
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  };

  const getAvatar = (name) => {
    // Gera um avatar baseado no nome usando placehold.co
    const initial = name.charAt(0).toUpperCase();
    return `https://placehold.co/50x50/EEE/333?text=${initial}`;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaPhone className="me-2" />
          Telefones Úteis - Cerro Largo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Emergency Section */}
        <div className="mb-4">
          <h6 className="mb-3 fw-bold">Emergências</h6>
          <Table hover responsive className="mb-0">
            <tbody>
              {emergencyPhones.map((phone) => (
                <tr key={phone.id}>
                  <td style={{ width: '45%' }}>
                    <div className="d-flex align-items-center">
                      <Image
                        src={getAvatar(phone.name)}
                        roundedCircle
                        width={40}
                        height={40}
                        className="me-3"
                        alt={phone.name}
                      />
                      <div>
                        <strong>{phone.name}</strong>
                        <br />
                        <small className="text-muted">{phone.location}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-end align-middle" style={{ width: '25%' }}>
                    <span className="fw-bold">
                      {phone.phone}
                    </span>
                  </td>
                  <td className="text-end align-middle" style={{ width: '30%' }}>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => handleCall(phone.phone)}
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <FaPhone className="me-2" size={12} />
                      Ligar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Other Services */}
        <div>
          <h6 className="mb-3 fw-bold">Outros Serviços</h6>
          <Table hover responsive className="mb-0">
            <tbody>
              {otherPhones.map((phone) => (
                <tr key={phone.id}>
                  <td style={{ width: '45%' }}>
                    <div className="d-flex align-items-center">
                      <Image
                        src={getAvatar(phone.name)}
                        roundedCircle
                        width={40}
                        height={40}
                        className="me-3"
                        alt={phone.name}
                      />
                      <div>
                        <strong>{phone.name}</strong>
                        <br />
                        <small className="text-muted">{phone.location}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-end align-middle" style={{ width: '25%' }}>
                    <span className="fw-bold">
                      {phone.phone}
                    </span>
                  </td>
                  <td className="text-end align-middle" style={{ width: '30%' }}>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => handleCall(phone.phone)}
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <FaPhone className="me-2" size={12} />
                      Ligar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Info Footer */}
        <div className="mt-4 pt-3 border-top text-center">
          <small className="text-muted">
            <FaPhone className="me-1" />
            Clique no botão "Ligar" para fazer a chamada
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UsefulPhonesModal;
