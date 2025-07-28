import React from 'react';

const GoogleAnalytics = () => {
  return(
    <>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XC0XRGQTRH"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments) }
        gtag('js', new Date());
      
        gtag('config', 'G-XC0XRGQTRH');
      </script>
    </>
  );
};

export default GoogleAnalytics;