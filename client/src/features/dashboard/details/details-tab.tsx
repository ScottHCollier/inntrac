import RecentSales from '@/components/recent-sales';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import BarOverview from '@/components/bar-overview';

export function DetailsTab() {
  return (
    <>
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
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
          <Card className='col-span-3'>
            <CardHeader>
              <CardTitle>Labour by Group</CardTitle>
            </CardHeader>
            <CardContent>
              <BarOverview />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
