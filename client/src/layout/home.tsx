import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/page-header';
import { useAppSelector } from '../store/configure-store';
import { OverviewTab } from '../features/dashboard/overview/overview-tab';
import { cn } from '../lib/utils';
import { DetailsTab } from '../features/dashboard/details/details-tab';
import { EmployeesTab } from '../features/dashboard/employees/employees-tab';
import { GroupsTab } from '../features/dashboard/groups/groups-tab';
import { NotificationsTab } from '../features/dashboard/notifications/notifications-tab';

const tabs = [
  {
    title: 'Overview',
    index: 0,
  },
  {
    title: 'Details',
    index: 1,
  },
  {
    title: 'Employees',
    index: 2,
  },
  {
    title: 'Groups',
    index: 3,
  },
  {
    title: 'Notifications',
    index: 5,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.account);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (account?.user?.status === 1) {
      navigate('/setup');
    }
  }, [account, navigate]);
  return (
    <>
      <PageHeader title={tabs[selectedTab].title}></PageHeader>
      <div className='flex flex-col space-y-4'>
        <div>
          <div
            className={cn(
              'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground'
            )}
          >
            {tabs.map((tab) => (
              <div
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                  selectedTab === tab.index
                    ? 'bg-background text-foreground shadow cursor-default pointer-events-none'
                    : ''
                )}
                key={tab.index}
                onClick={() => setSelectedTab(tab.index)}
              >
                {tab.title}
              </div>
            ))}
          </div>
        </div>
        {selectedTab === 0 && <OverviewTab />}
        {selectedTab === 1 && <DetailsTab />}
        {selectedTab === 2 && <EmployeesTab />}
        {selectedTab === 3 && <GroupsTab />}
        {selectedTab === 4 && <NotificationsTab />}
      </div>
    </>
  );
};

export default Home;
