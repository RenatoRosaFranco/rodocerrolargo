'use client';

import { useEffect } from 'react';
import Image from 'next/image';

const BannerBase = ({ publicidade, onView, onClick, className, style }) => {
  useEffect(() => {
    if (publicidade && onView) {
      onView(publicidade._id);
    }
  }, [publicidade, onView]);

  const handleClick = () => {
    if (onClick) {
      onClick(publicidade._id);
    }

    if (publicidade.linkDestino) {
      window.open(publicidade.linkDestino, '_blank', 'noopener,noreferrer');
    }
  };

  if (!publicidade) return null;

  return (
    <div
      className={`banner-container ${className || ''}`}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <img
        src={publicidade.imagemUrl}
        alt={publicidade.textoAlternativo || publicidade.nomeEmpresa}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: publicidade.linkDestino ? 'pointer' : 'default',
        }}
      />
      {publicidade.nomeEmpresa && (
        <small
          className="text-muted"
          style={{
            fontSize: '10px',
            position: 'absolute',
            bottom: '2px',
            right: '5px',
            background: 'rgba(255,255,255,0.8)',
            padding: '2px 5px',
            borderRadius: '3px',
          }}
        >
          {publicidade.nomeEmpresa}
        </small>
      )}
    </div>
  );
};

export default BannerBase;
