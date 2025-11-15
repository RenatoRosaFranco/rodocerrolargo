'use client';

import { useEffect } from 'react';

const BannerBase = ({ publicidade, onView, onClick, className, style }) => {
  useEffect(() => {
    if (publicidade?.id && onView) {
      onView(publicidade.id);
    }
  }, [publicidade, onView]);

  const handleClick = () => {
    if (publicidade?.id && onClick) {
      onClick(publicidade.id);
    }

    if (publicidade?.destinationLink) {
      window.open(publicidade.destinationLink, '_blank', 'noopener,noreferrer');
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
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <img
        src={publicidade.imageUrl}
        alt={`Anúncio ${publicidade.id}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: publicidade.destinationLink ? 'pointer' : 'default',
        }}
      />
    </div>
  );
};

export default BannerBase;
