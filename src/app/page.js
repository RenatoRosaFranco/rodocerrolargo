'use client';

import Faq from '@/ui/components/Faq';
import Hero from '@/ui/components/Hero';
import HowTo from '@/ui/components/HowTo';
import MapLocation from '@/ui/components/MapLocation';
import Newsletter from '@/ui/components/Newsletter';
import Orders from '@/ui/components/Orders';
import Schedule from '@/ui/components/Schedule';
import Services from '@/ui/components/Services';
import Header from '@/ui/shared/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HowTo />
      <Schedule />
      <Orders />
      <Services />
      <Faq />
      <MapLocation />
      <Newsletter />
    </>
  );
}
