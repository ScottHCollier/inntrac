import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/card';

interface Props {
  date: Date;
  handleAddShift: (date: Date) => void;
}

const ShiftCard = ({ date, handleAddShift }: Props) => {
  return (
    <Card>
      <CardContent className='py-2 px-2 flex flex-col items-end h-[56px]'>
        <Icons.add
          className='w-4 h-4 text-muted-foreground'
          onClick={() => handleAddShift(date)}
        />
      </CardContent>
    </Card>
  );
};

export default ShiftCard;
