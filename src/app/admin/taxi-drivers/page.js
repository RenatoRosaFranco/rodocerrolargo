import Header from '@/ui/shared/Header';
import AdminTaxiDrivers from '@/ui/components/AdminTaxiDrivers';

export const metadata = {
  title: 'Admin - Taxi Drivers Approval',
  description: 'Administrative panel for taxi driver registration approval.',
};

export default function AdminTaxiDriversPage() {
  return (
    <>
      <Header />
      <AdminTaxiDrivers />
    </>
  );
}
