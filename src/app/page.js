'use client';

import BannerPopup from '@/ui/components/banners/BannerPopup';
import BannerRodape from '@/ui/components/banners/BannerRodape';
import BannerTopo from '@/ui/components/banners/BannerTopo';
import BannerLateral from '@/ui/components/banners/BannerLateral';
import Faq from '@/ui/components/Faq';
import Hero from '@/ui/components/Hero';
import HowTo from '@/ui/components/HowTo';
import MapLocation from '@/ui/components/MapLocation';
import MobilityApps from '@/ui/components/MobilityApps';
import Newsletter from '@/ui/components/Newsletter';
import OktoberfestCard from '@/ui/components/OktoberfestCard';
import Orders from '@/ui/components/Orders';
import Schedule from '@/ui/components/Schedule';
import Services from '@/ui/components/Services';
import Header from '@/ui/shared/Header';

export default function Home() {
  return (
    <>
      <Header />
      <BannerTopo />
      
      {/* Layout com banners laterais */}
      <div style={{ position: 'relative' }}>
        {/* Banner Lateral Esquerdo - Fixo no lado esquerdo */}
        <div 
          className="d-none d-xl-block" 
          style={{ 
            position: 'fixed', 
            left: '10px', 
            top: '150px',
            width: '160px',
            zIndex: 100
          }}
        >
          <BannerLateral lado="esquerdo" />
        </div>

        {/* Conteúdo Principal */}
        <div>
          <Hero />
          <HowTo />
          <OktoberfestCard />
          <Schedule />
          <MobilityApps />
          <Orders />
          <Services />
          <Faq />
          <MapLocation />
          <Newsletter />
        </div>

        {/* Banner Lateral Direito - Fixo no lado direito */}
        <div 
          className="d-none d-xl-block" 
          style={{ 
            position: 'fixed', 
            right: '10px', 
            top: '150px',
            width: '160px',
            zIndex: 100
          }}
        >
          <BannerLateral lado="direito" />
        </div>
      </div>
      
      <BannerRodape />
      <BannerPopup />
    </>
  );
}
