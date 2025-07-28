'use client';

import Hero from '@/ui/components/Hero';
import Orders from '@/ui/components/Orders';
import Services from '@/ui/components/Services';
import Faq from '@/ui/components/Faq';
import MapLocation from '@/ui/components/MapLocation';
import HowTo from '@/ui/components/HowTo';

export default function Home() {
  return (
    <>
      <Hero />
      <HowTo />
      <Orders />
      <Services />
      <Faq />
      <MapLocation />
    </>
  );
}
