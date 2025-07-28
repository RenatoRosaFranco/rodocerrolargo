'use client';

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ContactModal from './ContactModal';

const ContactButton = () => {
  const [showModal, setShowModal] = useState(false);
 
  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        Contato
      </Button>
      <ContactModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default ContactButton;