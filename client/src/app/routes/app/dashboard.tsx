import PageHeader from '@/components/page-header';
import Overview from '@/features/dashboard/overview/overview';
import Details from '@/features/dashboard/details/details';
import { Tabs, Tab } from '@/components/ui/tabs';
import Employees from '@/features/dashboard/employees/employees';
import Groups from '@/features/dashboard/groups/groups';
import { Head } from '@/components/seo';

export const DashboardRoute = () => {
  return (
    <>
      <Head title='Dashboard' />
      <PageHeader title='Dashboard'></PageHeader>
      <Tabs>
        <Tab title='Overview'>
          <Overview />
        </Tab>
        <Tab title='Details'>
          <Details />
        </Tab>
        <Tab title='Employees'>
          <Employees />
        </Tab>
        <Tab title='Groups'>
          <Groups />
        </Tab>
      </Tabs>
    </>
  );
};
