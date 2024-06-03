import { addHours, format, parseISO } from 'date-fns';
// import { useState } from 'react';
import { Shift } from '@/models';
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  backgroundColor: string;
  shift: Shift;
  handleEditShift: (shift: Shift) => void;
  handleSelect: (shift: Shift) => void;
}

const ShiftCard = ({
  backgroundColor,
  shift,
  handleEditShift,
}: // handleSelect,
Props) => {
  // const [selected, setSelected] = useState<boolean>(false);

  const formattedShiftTime = (shift: Shift) => {
    const timeZoneOffset =
      (parseISO(shift.startTime).getTimezoneOffset() / 60) * -1;
    const startTime = addHours(parseISO(shift.startTime), timeZoneOffset);
    const endTime = addHours(parseISO(shift.endTime), timeZoneOffset);
    return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
  };

  return (
    <Card>
      <CardContent className='py-1 px-2'>
        <div className='flex justify-between items-center h-[24px]'>
          <p className='text-sm font-bold'>{formattedShiftTime(shift)}</p>
          <Icons.edit
            className='w-4 h-4 text-muted-foreground'
            onClick={() => handleEditShift(shift)}
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

export default ShiftCard;
