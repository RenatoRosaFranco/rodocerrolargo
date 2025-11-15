import Header from '@/ui/shared/Header';
import AdminAdvertisements from '@/ui/components/AdminAdvertisements';

export const metadata = {
  title: 'Admin - Manage Advertisements',
  description: 'Administrative panel for advertisement management.',
};

export default function AdminAdvertisementsPage() {
  return (
    <>
      <Header />
      <AdminAdvertisements />
    </>
  );
}
