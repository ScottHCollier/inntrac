import PageHeader from '@/components/page-header';
import Overview from '@/features/dashboard/overview/overview';
import Details from '@/features/dashboard/details/details';
import Tabs from '@/components/tabs';
import Tab from '@/components/ui/tabs/tab';
import Employees from '@/features/dashboard/employees/employees';
import Groups from '@/features/dashboard/groups/groups';

const Dashboard = () => {
  return (
    <>
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

export default Dashboard;
