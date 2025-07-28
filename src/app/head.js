export default function Head(){
  return(
    <>
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/social-image.png" />
      <meta property="og:title" content="Rodoviária de Cerro Largo" />
      <meta property="og:description" content="A Rodoviária de Cerro Largo é uma empresa de transporte de passageiros que oferece serviços de transporte de longa distância e local." />
      <meta property="og:url" content="https://rodocerrolargo.com.br" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#25d366" />
      <link rel="apple-touch-icon" href="/icon-192.png" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BusStation",
        "name": "Rodoviária de Cerro Largo",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rua Helmuth Schmidt, 700",
          "addressLocality": "Cerro Largo",
          "addressRegion": "RS",
          "postalCode": "97900000",
          "addressCountry": "BR"
        },
        "url": "https://rodocerrolargo.com.br",
        "telephone": "+55 55 3431-1760"
      }) }} />
    </>
  );
}