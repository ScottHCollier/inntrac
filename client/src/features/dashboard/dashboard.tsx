import PageHeader from '@/components/page-header';
import { cn } from '../../lib/utils';
import { OverviewTab } from './overview/overview-tab';

const tabs = [
  {
    title: 'Overview',
    href: '/dashboard',
  },
  {
    title: 'Details',
    href: '/dashboard/details',
  },
  {
    title: 'Employees',
    href: '/dashboard/employees',
  },
  {
    title: 'Groups',
    href: '/dashboard/groups',
  },
  {
    title: 'Sites',
    href: '/dashboard/sites',
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
  },
];

export function Dashboard() {
  return (
    <>
      <PageHeader title='Dashboard'></PageHeader>
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
                  'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                  location.pathname.split('/')[2] === tab.href.split('/')[2]
                    ? 'bg-background text-foreground shadow'
                    : ''
                )}
                key={tab.href}
              >
                {tab.title}
              </div>
            ))}
          </div>
        </div>
        <OverviewTab />
      </div>
    </>
  );
}
