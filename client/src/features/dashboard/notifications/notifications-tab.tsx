import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import RecentNotifications from '@/components/recent-notifications';
import { Icons } from '@/components/icons';

export function NotificationsTab() {
  return (
    <>
      <div className='space-y-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Notifications</CardTitle>
            <Icons.pound className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>All Notifications</div>
            <p className='text-xs text-muted-foreground'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit
            </p>
          </CardContent>
        </Card>
        <Card className='p-6'>
          <RecentNotifications />
        </Card>
      </div>
    </>
  );
}
