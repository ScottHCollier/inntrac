import { IGroup, ISchedule, IUserSchedule } from '@/models';
import { Tabs, Tab } from '@/components/ui/tabs';
import ScheduleForm from '../components/schedule-form';
import TimeOffForm from '../components/time-off-form';
import { Dialog } from '@/components/ui/dialog';

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
    <Dialog title='Schedule Entry' isOpen={open} onClose={handleClose}>
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
    </Dialog>
  );
};

export default ScheduleDialog;
