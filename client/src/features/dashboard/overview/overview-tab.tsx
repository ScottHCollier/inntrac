import Overview from '@/components/overview';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import RecentNotifications from '@/components/recent-notifications';
import PageHeader from '@/components/page-header';
import DashboardNav from '../components/dashboard-nav';

export function OverviewTab() {
  return (
    <>
      <PageHeader title='Dashboard'></PageHeader>
      <div className='flex flex-col space-y-4'>
        <DashboardNav />
        <div className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Last Weeks Sales
                </CardTitle>
                <Icons.pound className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>£5,231.89</div>
                <p className='text-xs text-muted-foreground'>
                  +20.1% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Last Weeks Labour
                </CardTitle>
                <Icons.users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>190 Hours</div>
                <p className='text-xs text-muted-foreground'>
                  +180.1% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Last Weeks Gross Profit
                </CardTitle>
                <Icons.chart className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>72.3%</div>
                <p className='text-xs text-muted-foreground'>
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Employees</CardTitle>
                <Icons.users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>17</div>
                <p className='text-xs text-muted-foreground'></p>
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <Overview />
              </CardContent>
            </Card>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>
                  The following items need your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentNotifications />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
