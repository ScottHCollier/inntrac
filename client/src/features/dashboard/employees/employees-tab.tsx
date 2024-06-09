import { Icons } from '../../../components/icons';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../../components/card';
import EmployeesTable from './employees-table';

export function EmployeesTab() {
  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Employees</CardTitle>
          <Icons.users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>All Employees</div>
          <p className='text-xs text-muted-foreground'>
            Select employee to edit details
          </p>
        </CardContent>
      </Card>
      <Card className='p-6'>
        <EmployeesTable />
      </Card>
    </>
  );
}
