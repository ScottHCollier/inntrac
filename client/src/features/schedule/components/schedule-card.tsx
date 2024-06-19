import { format } from 'date-fns';
// import { useState } from 'react';
import { IEditSchedule, ISchedule } from '@/models';
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/card';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/configure-store';
import agent from '@/api/agent';
import { updateNotifications } from '@/store/account-slice';

interface Props {
  backgroundColor: string;
  schedule: ISchedule;
  handleEditSchedule: (schedule: ISchedule) => void;
  resetSchedule: () => void;
}

const ScheduleCard = ({
  backgroundColor,
  schedule,
  handleEditSchedule,
  resetSchedule,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleAccept = async () => {
    try {
      const body: IEditSchedule = {
        ...schedule,
        type: 4,
      };
      await agent.Schedules.updateSchedule(body);
      dispatch(updateNotifications());
      resetSchedule();
    } catch (error) {
      console.log(error);
    }
  };

  const formattedScheduleTime = (schedule: ISchedule) => {
    const startTime = new Date(schedule.startTime);
    const endTime = new Date(schedule.endTime);
    return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
  };

  return (
    <Card
      className={cn(
        schedule.type === 3 || schedule.type === 4 ? 'bg-gray-100' : ''
      )}
    >
      <CardContent className='py-1 px-2'>
        <div className='flex justify-between items-center h-[24px]'>
          {schedule.type === 1 && (
            <>
              <p className='text-sm'>{formattedScheduleTime(schedule)}</p>
              <Icons.edit
                className='w-4 h-4 text-muted-foreground'
                onClick={() => handleEditSchedule(schedule)}
              />
            </>
          )}
          {schedule.type === 3 && (
            <>
              <p className='text-sm'>REQUEST</p>
              <div className='flex'>
                <Icons.tick
                  className='w-4 h-4 text-muted-foreground'
                  onClick={handleAccept}
                />
                <Icons.cross
                  className='w-4 h-4 ml-2 text-muted-foreground'
                  onClick={() => console.log('REJECT')}
                />
              </div>
            </>
          )}
          {schedule.type === 4 && <p className='text-sm'>HOLIDAY</p>}
        </div>
        {schedule.type === 1 ||
          (schedule.type === 2 && (
            <div className='flex justify-between items-center h-[24px]'>
              <div
                style={{ backgroundColor: backgroundColor }}
                className='w-[16px] h-[16px] rounded-full'
              />
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
