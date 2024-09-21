import { AddIcon } from '@/components/ui/icons';
import { Card, CardContent } from '@/components/ui/card/card';

interface Props {
  date: Date;
  handleAddSchedule: (date: Date) => void;
}

const ScheduleCard = ({ date, handleAddSchedule }: Props) => {
  return (
    <Card>
      <CardContent className='py-2 px-2 flex flex-col items-end h-[56px]'>
        <AddIcon
          className='w-4 h-4 text-muted-foreground'
          onClick={() => handleAddSchedule(date)}
        />
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
