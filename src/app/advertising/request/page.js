import Header from '@/ui/shared/Header';
import AdvertisementForm from '@/ui/components/AdvertisementForm';

export const metadata = {
  title: 'Request Advertisement - Estação Rodoviária',
  description: 'Request your advertising space and increase your local business visibility.',
};

export default function RequestAdvertisementPage() {
  return (
    <>
      <Header />
      <AdvertisementForm />
    </>
  );
}
