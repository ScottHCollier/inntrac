import { Icons } from '@/components/ui/icons';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card/card';
import GroupsTable from './groups-table';

const Groups = () => {
  return (
    <div className='space-y-4'>
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
    </div>
  );
};

export default Groups;
