import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PageHeader from '@/components/page-header';
import { useAppSelector } from '@/store/configure-store';
import Overview from '@/features/dashboard/overview/overview';
import Details from '@/features/dashboard/details/details';
import Tabs from '@/components/tabs';
import Tab from '@/components/tab';
import Employees from '@/features/dashboard/employees/employees';
import Groups from '@/features/dashboard/groups/groups';

const Dashboard = () => {
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.account);

  useEffect(() => {
    if (account?.user?.status === 1) {
      navigate('/setup');
    }
  }, [account, navigate]);
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
