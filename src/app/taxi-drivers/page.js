import Header from '@/ui/shared/Header';
import TaxiDriverList from '@/ui/components/TaxiDriverList';

export const metadata = {
  title: 'Taxi Drivers - Estação Rodoviária de Cerro Largo',
  description: 'Find registered taxi drivers in Cerro Largo.',
};

export default function TaxiDriversPage() {
  return (
    <>
      <Header />
      <TaxiDriverList />
    </>
  );
}
