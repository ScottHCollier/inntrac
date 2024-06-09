import { AccountForm } from '../../admin/components/account-form';
import { useEffect, useState } from 'react';
import { User } from '@/models';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/card';
import { Icons } from '@/components/icons';
import useUsers from '../../../hooks/useUsers';

const Employee = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useState<URLSearchParams>(new URLSearchParams({}));
  const { users } = useUsers(searchParams);

  useEffect(() => {
    if (id && users) {
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
              <div className='text-2xl font-bold'>
                Edit {selectedUser.firstName}
              </div>
              <p className='text-xs text-muted-foreground'>
                Select selectedUser to edit details
              </p>
            </CardContent>
          </Card>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-lg font-medium'>
                    {selectedUser.firstName}
                  </h3>
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
