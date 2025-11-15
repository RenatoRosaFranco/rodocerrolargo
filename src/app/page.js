'use client';

import BannerPopup from '@/ui/components/banners/BannerPopup';
import BannerRodape from '@/ui/components/banners/BannerRodape';
import BannerTopo from '@/ui/components/banners/BannerTopo';
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
      <BannerRodape />
      <BannerPopup />
    </>
  );
}
