'use client';

import { useEffect } from 'react';

const IubendaConsent = () => {
  useEffect(() => {
    window._iub = window._iub || [];
    window._iub.csConfiguration = {
      siteId: 4180088,
      cookiePolicyId: 93854109,
      lang: 'pt-BR',
      storage: {
        useSiteId: true,
      },
    };

    const script1 = document.createElement('script');
    script1.src = 'https://cs.iubenda.com/autoblocking/4180088.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.iubenda.com/cs/gpp/stub.js';
    script2.async = true;
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = 'https://cdn.iubenda.com/cs/iubenda_cs.js';
    script3.async = true;
    script3.charset = 'UTF-8';
    document.body.appendChild(script3);
  }, []);

  return null;
};

export default IubendaConsent;
