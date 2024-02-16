import PageHeader from '@/components/page-header';
import DashboardNav from '../components/dashboard-nav';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SitesTab = () => {
  return (
    <>
      <PageHeader title='Dashboard'>
        <Button>Add Site</Button>
      </PageHeader>
      <div className='flex flex-col space-y-4'>
        <DashboardNav />
        <Outlet />
      </div>
    </>
  );
};

export default SitesTab;
