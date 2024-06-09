import { AccountForm } from '../../admin/components/account-form';
import { useEffect, useState } from 'react';
import { Group } from '@/models';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/card';
import { Icons } from '@/components/icons';
import useGroups from '../../../hooks/useGroups';

const Groups = () => {
  const { groups } = useGroups();

  const [group, setGroup] = useState<Group | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && groups) {
      const group = groups.find((group) => group.id === id);
      if (group) {
        setGroup(group);
      } else {
        navigate('/dashboard/groups');
      }
    }
  }, [groups, id, navigate]);

  return (
    <>
      {group && (
        <>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Groups</CardTitle>
              <Icons.users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>Edit {group.name} Group</div>
              <p className='text-xs text-muted-foreground'>
                Select group to edit name, colour etc.
              </p>
            </CardContent>
          </Card>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-lg font-medium'>{group.name}</h3>
                  <p className='text-sm text-muted-foreground'>Edit group</p>
                </div>
                <div
                  style={{ backgroundColor: group.color }}
                  className='h-9 w-9 rounded-full'
                />
              </div>
              <AccountForm />
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default Groups;
