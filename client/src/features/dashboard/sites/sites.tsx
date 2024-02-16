import { Icons } from '@/components/icons';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import SitesTable from './sites-table';

function Sites() {
  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Sites</CardTitle>
          <Icons.users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>All Sites</div>
          <p className='text-xs text-muted-foreground'>
            Select site to edit details
          </p>
        </CardContent>
      </Card>
      <Card className='p-6'>
        <SitesTable />
      </Card>
    </>
  );
}

export default Sites;
