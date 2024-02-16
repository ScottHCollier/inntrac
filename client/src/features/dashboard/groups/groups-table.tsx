import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@/components/custom/skeleton';
import { Icons } from '@/components/icons';
import { useAppSelector, useAppDispatch } from '@/store/configure-store';
import { groupsSelectors, fetchGroupsAsync } from '@/store/groups-slice';

const GroupsTable = () => {
  const groups = useAppSelector(groupsSelectors.selectAll);
  const { selectedSite } = useAppSelector((state) => state.account);
  const { groupsLoaded } = useAppSelector((state) => state.groups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedSite && !groups.length) {
      dispatch(fetchGroupsAsync(selectedSite?.id));
    }
  }, [dispatch, selectedSite, groups]);
  return (
    <div className='space-y-8'>
      {groupsLoaded
        ? groups.map((group) => (
            <div key={group.id} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div
                  style={{ backgroundColor: group.color }}
                  className='h-10 w-10 rounded-full'
                />
                <div className='ml-4 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {group.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Group description
                  </p>
                </div>
              </div>
              <Link to={`/dashboard/groups/${group.id}`}>
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

export default GroupsTable;
