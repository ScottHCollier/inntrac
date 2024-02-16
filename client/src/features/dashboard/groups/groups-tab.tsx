import { Outlet } from 'react-router-dom';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import DashboardNav from '../components/dashboard-nav';

export function GroupsTab() {
  return (
    <>
      <PageHeader title='Dashboard'>
        <Button>Add Group</Button>
      </PageHeader>
      <div className='flex flex-col space-y-4'>
        <DashboardNav />
        <Outlet />
      </div>
    </>
  );
}
