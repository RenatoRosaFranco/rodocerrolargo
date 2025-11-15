import Header from '@/ui/shared/Header';
import TaxiDriverForm from '@/ui/components/TaxiDriverForm';

export const metadata = {
  title: 'Taxi Driver Registration - Estação Rodoviária de Cerro Largo',
  description: 'Register as a taxi driver in Cerro Largo and be found by tourists and visitors.',
};

export default function RegisterTaxiDriverPage() {
  return (
    <>
      <Header />
      <TaxiDriverForm />
    </>
  );
}
