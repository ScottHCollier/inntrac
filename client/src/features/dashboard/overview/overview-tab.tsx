import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import RecentNotifications from '@/components/recent-notifications';
import { useAppSelector } from '../../../store/configure-store';
import { parseISO, addHours, format } from 'date-fns';
import { Shift } from '../../../models';

export function OverviewTab() {
  const { user } = useAppSelector((state) => state.account);

  const formattedShiftTime = (shift: Shift) => {
    const timeZoneOffset =
      (parseISO(shift.startTime).getTimezoneOffset() / 60) * -1;
    const startTime = addHours(parseISO(shift.startTime), timeZoneOffset);
    const endTime = addHours(parseISO(shift.endTime), timeZoneOffset);
    return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
  };

  return (
    <>
      <div className='space-y-4'>
        <Card
          style={{
            backgroundColor:
              user?.groups.find((group) => group.id === user.shifts[0]?.groupId)
                ?.color || '#999',
          }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Upcoming</CardTitle>
            <Icons.users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            {user?.shifts.length ? (
              <>
                <div className='flex justify-between items-center h-[24px]'>
                  <p className='text-sm font-bold'>
                    {formattedShiftTime(user?.shifts[0])}
                  </p>
                </div>
                <div className='flex justify-between items-center h-[24px]'>
                  <p></p>
                  <div className='w-[16px] h-[16px] rounded-full' />
                </div>
              </>
            ) : (
              <div className='text-2xl font-bold'>
                You do have any shifts scheduled
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
}
