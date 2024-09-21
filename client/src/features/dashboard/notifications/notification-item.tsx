import { CrossIcon, TickIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button/button';
import { IEditSchedule, ISchedule } from '@/models';
import { format, parseISO } from 'date-fns';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../../../components/ui/avatar/avatar';

interface Props {
  firstName: string;
  surname: string;
  schedules: ISchedule[];
}

const NotificationItem = ({ firstName, surname, schedules }: Props) => {
  const handleAcceptAll = async () => {
    try {
      const body: IEditSchedule[] = schedules.map((schedule) => {
        return {
          ...schedule,
          type: 4,
        };
      });
      console.log(body);
      // await agent.Schedules.updateSchedules(body);
      // dispatch(updateNotifications());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex items-center mb-4'>
        <Avatar>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>
            {`${firstName.charAt(0).toUpperCase()}${surname
              .charAt(0)
              .toUpperCase()}`}
          </AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>
            {firstName} {surname}
          </p>
          <p className='text-sm text-muted-foreground'>
            {firstName} has requested time off
          </p>
        </div>
        <div className='ml-auto font-medium'>
          <Button variant='outline' onClick={handleAcceptAll}>
            ACCEPT ALL
          </Button>
          <Button variant='outline' className='ml-2'>
            REJECT ALL
          </Button>
        </div>
      </div>
      {schedules.map((schedule) => (
        <div key={schedule.id} className='flex items-center font-medium'>
          <div className='text-sm ml-14'>
            {format(parseISO(schedule.startTime), 'dd/MM/yyyy')}
          </div>
          <div className='ml-auto'>
            <Button variant='outline' size='icon'>
              <TickIcon className='w-10 h-10' />
            </Button>
            <Button variant='outline' size='icon' className='ml-2'>
              <CrossIcon className='w-10 h-10' />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default NotificationItem;
