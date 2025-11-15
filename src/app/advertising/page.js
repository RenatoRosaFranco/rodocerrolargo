import Header from '@/ui/shared/Header';
import AdvertisingPlans from '@/ui/components/AdvertisingPlans';

export const metadata = {
  title: 'Advertising Plans - Estação Rodoviária de Cerro Largo',
  description: 'Increase your company visibility with our advertising plans.',
};

export default function AdvertisingPage() {
  return (
    <>
      <Header />
      <AdvertisingPlans />
    </>
  );
}
