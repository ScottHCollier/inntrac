import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card/card';
import { Icons } from '@/components/ui/icons';
import { format } from 'date-fns';
import { ISchedule } from '@/models';
import NotificationItem from '../notifications/notification-item';
import { useUser } from '../../../lib/auth';

const Overview = () => {
  const user = useUser({});

  const formattedScheduleTime = (schedule: ISchedule) => {
    const startTime = new Date(schedule.startTime);
    const endTime = new Date(schedule.endTime);
    return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
  };

  return (
    <>
      <div className='space-y-4'>
        <Card
          style={{
            backgroundColor: user?.data.group?.color || '#999',
          }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Upcoming</CardTitle>
            <Icons.users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            {user?.data.schedules.length ? (
              <>
                <div className='flex justify-between items-center h-[24px]'>
                  <p className='text-sm font-bold'>
                    {formattedScheduleTime(user?.data.schedules[0])}
                  </p>
                </div>
                <div className='flex justify-between items-center h-[24px]'>
                  <p></p>
                  <div className='w-[16px] h-[16px] rounded-full' />
                </div>
              </>
            ) : (
              <div className='text-2xl font-bold'>
                You do not have any shifts scheduled
              </div>
            )}
          </CardContent>
        </Card>
        <Card className=''>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {user?.data.notifications.length
                ? 'The following items need your attention'
                : 'No notifications'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user?.data.notifications.length ? (
              <div className=''>
                {user?.data.notifications.map((notification) => (
                  <NotificationItem
                    key={notification.firstName}
                    firstName={notification.firstName}
                    surname={notification.surname}
                    schedules={notification.schedules}
                  />
                ))}
              </div>
            ) : (
              <p>You do not have any notifications that require attention</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Overview;
