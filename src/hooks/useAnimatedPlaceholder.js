'use client';

import { useState, useEffect } from 'react';

export const useAnimatedPlaceholder = (placeholders, interval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, interval);

    return () => clearInterval(timer);
  }, [placeholders.length, interval]);

  return placeholders[currentIndex];
};
