'use client';

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoClose } from "react-icons/io5";

const ContactModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-dark">Contato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fw-bold mb-2">Para entrar em contato conosco, ligue:</p>
        <p>(55) 3431.1760 ou pelo e-mail <a href="mailto:contato@rodocerrolargo.com.br">
          contato@rodocerrolargo.com.br</a>
        </p>
        <hr />
        <p className="fw-bold mb-1">Nosso Endereço:</p>
        <p>
          Rua Helmuth Schmidt, 700<br />
          Centro | Cerro Largo / RS
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <IoClose className='me-1'/>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;