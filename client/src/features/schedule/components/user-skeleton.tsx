import { User } from '@/models';
import { Card, CardContent } from '@/components/ui/card';
import Skeleton from '@/components/custom/skeleton';

interface Props {
  user: User;
}

export default function UserSkeleton({ user }: Props) {
  return (
    <div key={user.id} className='grid grid-cols-8 gap-1'>
      <Card>
        <CardContent className='py-1 px-2'>
          <p className='text-sm font-bold'>{`${user.firstName} ${user.surname}`}</p>
          <Skeleton className='w-[16px] h-[16px] rounded-full my-0.5' />
        </CardContent>
      </Card>
      {[1, 2, 3, 4, 5, 6, 7].map((index) => {
        return (
          <Card key={index}>
            <CardContent className='py-2 px-2 flex flex-col justify-between h-[56px]'>
              <div className='flex justify-between'>
                <Skeleton className='w-[94px] h-[16px] rounded-full' />
                <Skeleton className='w-[16px] h-[16px] rounded-full' />
              </div>
              <div className='flex justify-end'>
                <Skeleton className='w-[16px] h-[16px] rounded-full' />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
