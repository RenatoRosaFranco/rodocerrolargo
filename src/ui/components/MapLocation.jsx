import React from 'react';

const MapLocation = () => {
  return (
    <div style={{ width: '100%', height: '400px', marginBottom: '2rem' }}>
      <iframe
        title="Mapa da Rodoviária"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.543254715624!2d-54.73834528488202!3d-28.154867282614076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9504dc32b6234c23%3A0xddaef273fc6e660e!2sR.%20Helmuth%20Schmidt%2C%20700%20-%20Centro%2C%20Cerro%20Largo%20-%20RS%2C%2097900-000!5e0!3m2!1spt-BR!2sbr!4v1736551200000!5m2!1spt-BR!2sbr"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapLocation;