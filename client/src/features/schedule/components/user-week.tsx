import { addDays, isSameDay, parseISO, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { Shift, User } from '@/models';
import ShiftCard from './shift-card';
import NoShiftCard from './no-shift-card';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  user: User;
  date: Date;
  handleAddShift: (user: User, date: Date) => void;
  handleEditShift: (user: User, shift: Shift) => void;
  handleSelectShift: (shift: Shift) => void;
}

interface Day {
  date: Date;
  shift: Shift | null;
}

export default function UserWeek({
  user,
  date,
  handleAddShift,
  handleEditShift,
  handleSelectShift,
}: Props) {
  const [totalHours, setTotalHours] = useState<number>(0);
  const [schedule, setSchedule] = useState<Day[]>([
    {
      date: new Date(startOfWeek(date, { weekStartsOn: 1 })),
      shift: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 1),
      shift: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 2),
      shift: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 3),
      shift: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 4),
      shift: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 5),
      shift: null,
    },
    {
      date: addDays(new Date(startOfWeek(date, { weekStartsOn: 1 })), 6),
      shift: null,
    },
  ]);

  useEffect(() => {
    if (!user.shifts) return;
    setSchedule((schedule) =>
      schedule.map((day) => ({
        date: day.date,
        shift:
          user.shifts.find((shift) =>
            isSameDay(parseISO(shift.startTime), day.date)
          ) || null,
      }))
    );
  }, [user]);

  useEffect(() => {
    const total = schedule.reduce((total, day) => {
      if (day.shift?.hours) return total + day.shift.hours;
      return total;
    }, 0);

    setTotalHours(total);
  }, [schedule]);

  return (
    <div key={user.id} className='grid grid-cols-8 gap-1'>
      <Card className='flex'>
        <CardContent className='py-1 px-2 flex flex-col justify-around'>
          <p className='text-sm font-bold'>{user.name}</p>
          <div className='text-xs text-muted-foreground'>{totalHours}h</div>
        </CardContent>
      </Card>
      {schedule?.map((day, index) => {
        return day.shift ? (
          <ShiftCard
            key={day.shift.id}
            backgroundColor={user.group.color || '#999'}
            shift={day.shift}
            handleEditShift={(shift) => handleEditShift(user, shift)}
            handleSelect={(shift) => handleSelectShift(shift)}
          />
        ) : (
          <NoShiftCard
            key={index}
            date={day.date}
            handleAddShift={(date) => handleAddShift(user, date)}
          />
        );
      })}
    </div>
  );
}
