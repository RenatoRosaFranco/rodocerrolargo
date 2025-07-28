'use client';

import Hero from '@/ui/components/Hero';
import Orders from '@/ui/components/Orders';
import Services from '@/ui/components/Services';
import Faq from '@/ui/components/Faq';
import MapLocation from '@/ui/components/MapLocation';

export default function Home() {
  return (
    <>
      <Hero />
      <Orders />
      <Services />
      <Faq />
      <MapLocation />
    </>
  );
}
