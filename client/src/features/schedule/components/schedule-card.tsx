import { addHours, format, parseISO } from 'date-fns';
// import { useState } from 'react';
import { Schedule } from '@/models';
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/card';

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
    const timeZoneOffset =
      (parseISO(schedule.startTime).getTimezoneOffset() / 60) * -1;
    const startTime = addHours(parseISO(schedule.startTime), timeZoneOffset);
    const endTime = addHours(parseISO(schedule.endTime), timeZoneOffset);
    return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
  };

  return (
    <Card>
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
