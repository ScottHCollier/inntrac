import { AccountForm } from '../../admin/components/account-form';
import { useAppDispatch, useAppSelector } from '@/store/configure-store';
import { useEffect, useState } from 'react';
import { User } from '@/models';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { fetchUsersAsync, userSelectors } from '@/store/users-slice';

const Employee = () => {
  const users = useAppSelector(userSelectors.selectAll);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.site.id && !users.length) {
      dispatch(fetchUsersAsync(user?.site.id));
    }
  }, [dispatch, user, users]);

  useEffect(() => {
    if (id) {
      const selectedUser = users.find((selectedUser) => selectedUser.id === id);
      if (selectedUser) {
        setSelectedUser(selectedUser);
      } else {
        navigate('/dashboard/employees');
      }
    }
  }, [id, navigate, users]);

  return (
    <>
      {selectedUser && (
        <>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Employees</CardTitle>
              <Icons.users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>Edit {selectedUser.name}</div>
              <p className='text-xs text-muted-foreground'>
                Select selectedUser to edit details
              </p>
            </CardContent>
          </Card>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-lg font-medium'>{selectedUser.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    Edit selectedUser
                  </p>
                </div>
              </div>
              <AccountForm />
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default Employee;
