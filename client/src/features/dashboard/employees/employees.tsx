import { UsersIcon } from '@/components/ui/icons';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card/card';
import EmployeesTable from './employees-table';

const Employees = () => {
  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Employees</CardTitle>
          <UsersIcon className='h-4 w-4 text-muted-foreground' />
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
    </div>
  );
};

export default Employees;
