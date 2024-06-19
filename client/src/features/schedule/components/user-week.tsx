import { addDays, isSameDay, parseISO, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { ISchedule, IUserSchedule } from '@/models';
import ScheduleCard from './schedule-card';
import NoScheduleCard from './no-schedule-card';
import { Card, CardContent } from '@/components/card';

interface Props {
  user: IUserSchedule;
  date: Date;
  handleAddSchedule: (user: IUserSchedule, date: Date) => void;
  handleEditSchedule: (user: IUserSchedule, schedule: ISchedule) => void;
  resetSchedule: () => void;
}

interface Day {
  date: Date;
  schedule: ISchedule | null;
}

export default function UserWeek({
  user,
  date,
  handleAddSchedule,
  handleEditSchedule,
  resetSchedule,
}: Props) {
  const [totalHours, setTotalHours] = useState<number>(0);
  const [schedule, setSchedule] = useState<Day[]>([
    {
      date: new Date(startOfWeek(date, { weekStartsOn: 1 })),
      schedule: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 1),
      schedule: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 2),
      schedule: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 3),
      schedule: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 4),
      schedule: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 5),
      schedule: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 6),
      schedule: null,
    },
  ]);

  useEffect(() => {
    if (!user.schedules) return;
    setSchedule((schedule) =>
      schedule.map((day) => ({
        date: day.date,
        schedule:
          user.schedules.find((schedule) =>
            isSameDay(parseISO(schedule.startTime), day.date)
          ) || null,
      }))
    );
  }, [user]);

  useEffect(() => {
    const total = schedule.reduce((total, day) => {
      if (day.schedule?.hours) return total + day.schedule.hours;
      return total;
    }, 0);

    setTotalHours(total);
  }, [schedule]);

  return (
    <div key={user.id} className='grid grid-cols-8 gap-1'>
      <Card className='flex'>
        <CardContent className='py-1 px-2 flex flex-col justify-around'>
          <p className='text-sm font-bold'>{`${user.firstName} ${user.surname}`}</p>
          <div className='text-xs text-muted-foreground'>{totalHours}h</div>
        </CardContent>
      </Card>
      {schedule?.map((day, index) => {
        return day.schedule ? (
          <ScheduleCard
            key={day.schedule.id}
            backgroundColor={user.group.color || '#999'}
            schedule={day.schedule}
            handleEditSchedule={(schedule) =>
              handleEditSchedule(user, schedule)
            }
            resetSchedule={resetSchedule}
          />
        ) : (
          <NoScheduleCard
            key={index}
            date={day.date}
            handleAddSchedule={(date) => handleAddSchedule(user, date)}
          />
        );
      })}
    </div>
  );
}
