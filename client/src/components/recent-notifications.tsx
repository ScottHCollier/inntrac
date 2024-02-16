import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from './icons';
import { Button } from './ui/button';

const RecentNotifications = () => {
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Olivia Martin</p>
          <p className='text-sm text-muted-foreground'>
            Olivia has requested time off
          </p>
        </div>
        <div className='ml-auto font-medium'>
          <Button variant='outline' size='icon'>
            <Icons.tick className='w-10 h-10' />
          </Button>
          <Button variant='outline' size='icon' className='ml-2'>
            <Icons.cross className='w-10 h-10' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentNotifications;
