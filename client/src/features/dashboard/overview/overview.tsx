import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/card';
import { Icons } from '@/components/icons';
import RecentNotifications from '@/components/recent-notifications';
import { useAppSelector } from '../../../store/configure-store';
import { format } from 'date-fns';
import { Schedule } from '../../../models';

const Overview = () => {
  const { user } = useAppSelector((state) => state.account);

  const formattedScheduleTime = (schedule: Schedule) => {
    const startTime = new Date(schedule.startTime);
    const endTime = new Date(schedule.endTime);
    return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
  };

  return (
    <>
      <div className='space-y-4'>
        <Card
          style={{
            backgroundColor: user?.group?.color || '#999',
          }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Upcoming</CardTitle>
            <Icons.users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            {user?.schedules.length ? (
              <>
                <div className='flex justify-between items-center h-[24px]'>
                  <p className='text-sm font-bold'>
                    {formattedScheduleTime(user?.schedules[0])}
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
            {/* <p className='text-xs text-muted-foreground'>
                +20.1% from last year
              </p> */}
          </CardContent>
        </Card>
        {/* <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
              <Overview />
            </CardContent>
          </Card> */}
        <Card className=''>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              The following items need your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentNotifications />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Overview;
