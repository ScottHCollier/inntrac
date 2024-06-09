import { Link } from 'react-router-dom';
import Skeleton from '@/components/custom/skeleton';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useUsers from '../../../hooks/useUsers';
import { useState } from 'react';

const EmployeesTable = () => {
  const [searchParams] = useState<URLSearchParams>(new URLSearchParams({}));
  const { users, loading } = useUsers(searchParams);
  return (
    <div className='space-y-8'>
      {!loading
        ? users.map((user) => (
            <div key={user.id} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Avatar>
                  <AvatarImage src='/avatars/01.png' alt={user?.name} />
                  <AvatarFallback>
                    {`${user.firstName.charAt(0)}${user.surname.charAt(0)}`}
                  </AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {`${user.firstName} ${user.surname}`}
                  </p>
                  <p className='text-sm text-muted-foreground'>{user.email}</p>
                </div>
              </div>
              <Link to={`/dashboard/employees/${user.id}`}>
                <Icons.edit className='w-8 h-8' />
              </Link>
            </div>
          ))
        : [1, 2, 3, 4].map((item) => (
            <div key={item} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Skeleton className='h-9 w-9 rounded-full' />
                <div className='ml-4 space-y-1'>
                  <Skeleton className='h-3 w-16 rounded-full mb-2' />
                  <Skeleton className='h-3 w-44 rounded-full' />
                </div>
              </div>
              <Skeleton className='w-8 h-8 rounded-full' />
            </div>
          ))}
    </div>
  );
};

export default EmployeesTable;
