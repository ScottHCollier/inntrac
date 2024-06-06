import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@/components/custom/skeleton';
import { Icons } from '@/components/icons';
import { useAppSelector, useAppDispatch } from '@/store/configure-store';
import { fetchUsersAsync, userSelectors } from '@/store/users-slice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const EmployeesTable = () => {
  const users = useAppSelector(userSelectors.selectAll);
  const { user } = useAppSelector((state) => state.account);
  const { usersLoaded } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !users.length) {
      dispatch(fetchUsersAsync(user?.site.id));
    }
  }, [dispatch, user, users]);
  return (
    <div className='space-y-8'>
      {usersLoaded
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
