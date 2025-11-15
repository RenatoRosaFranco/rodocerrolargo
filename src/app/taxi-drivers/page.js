import MapLocation from '@/ui/components/MapLocation';
import TaxiDriverList from '@/ui/components/TaxiDriverList';
import Header from '@/ui/shared/Header';

export const metadata = {
  title: 'Taxi Drivers - Estação Rodoviária de Cerro Largo',
  description: 'Find registered taxi drivers in Cerro Largo.',
};

export default function TaxiDriversPage() {
  return (
    <>
      <Header />
      <TaxiDriverList />
      <MapLocation />
    </>
  );
}
