import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/5555990000000" // <-- Substitua pelo número real
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Fale conosco no WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsappButton;