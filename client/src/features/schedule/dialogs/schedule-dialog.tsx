import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IGroup, ISchedule, IUserSchedule } from '@/models';
import Tab from '@/components/tab';
import Tabs from '@/components/tabs';
import ScheduleForm from '../components/schedule-form';
import TimeOffForm from '../components/time-off-form';

interface Props {
  users: IUserSchedule[];
  groups: IGroup[];
  open: boolean;
  selectedUser: IUserSchedule | null;
  selectedDate: Date | null;
  selectedSchedule: ISchedule | null;
  handleClose: () => void;
  handleChangeUser: (userId: string) => void;
}

const ScheduleDialog = ({
  users,
  groups,
  open,
  selectedUser,
  selectedDate,
  selectedSchedule,
  handleClose,
  handleChangeUser,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Schedule Entry</DialogTitle>
        </DialogHeader>
        <Tabs>
          <Tab title={selectedSchedule ? 'Edit Schedule' : 'Add Schedule'}>
            <ScheduleForm
              users={users}
              groups={groups}
              selectedUser={selectedUser}
              selectedDate={selectedDate}
              selectedSchedule={selectedSchedule}
              handleClose={handleClose}
              handleChangeUser={handleChangeUser}
            />
          </Tab>
          <Tab title='Time Off'>
            <TimeOffForm
              users={users}
              selectedUser={selectedUser}
              selectedDate={selectedDate}
              handleClose={handleClose}
              handleChangeUser={handleChangeUser}
            />
          </Tab>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
