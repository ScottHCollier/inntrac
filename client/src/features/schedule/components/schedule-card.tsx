import { format } from 'date-fns';
// import { useState } from 'react';
import { Schedule } from '@/models';
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/card';
import { cn } from '../../../lib/utils';

interface Props {
  backgroundColor: string;
  schedule: Schedule;
  handleEditSchedule: (schedule: Schedule) => void;
  handleSelect: (schedule: Schedule) => void;
}

const ScheduleCard = ({
  backgroundColor,
  schedule,
  handleEditSchedule,
}: // handleSelect,
Props) => {
  // const [selected, setSelected] = useState<boolean>(false);

  const formattedScheduleTime = (schedule: Schedule) => {
    const startTime = new Date(schedule.startTime);
    const endTime = new Date(schedule.endTime);
    return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
  };

  return (
    <Card
      className={cn(
        schedule.type === 3 || schedule.type === 4 ? 'bg-gray-200' : ''
      )}
    >
      <CardContent className='py-1 px-2'>
        <div className='flex justify-between items-center h-[24px]'>
          {schedule.type === 3 || schedule.type === 4 ? (
            <p className='text-sm font-bold'>HOLIDAY</p>
          ) : (
            <p className='text-sm font-bold'>
              {formattedScheduleTime(schedule)}
            </p>
          )}
          <Icons.edit
            className='w-4 h-4 text-muted-foreground'
            onClick={() => handleEditSchedule(schedule)}
          />
        </div>
        <div className='flex justify-between items-center h-[24px]'>
          <p></p>
          <div
            style={{ backgroundColor: backgroundColor }}
            className='w-[16px] h-[16px] rounded-full'
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
