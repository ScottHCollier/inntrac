import { Icons } from '@/components/icons';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/card';
import GroupsTable from './groups-table';

function Groups() {
  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Groups</CardTitle>
          <Icons.users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>All Groups</div>
          <p className='text-xs text-muted-foreground'>
            Select group to edit name, colour etc.
          </p>
        </CardContent>
      </Card>
      <Card className='p-6'>
        <GroupsTable />
      </Card>
    </>
  );
}

export default Groups;
