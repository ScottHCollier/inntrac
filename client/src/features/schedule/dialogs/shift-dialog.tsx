import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Group, Shift, UserShift } from '@/models';
import Tab from '../../../components/tab';
import Tabs from '../../../components/tabs';
import ShiftForm from '../components/shift-form';
import TimeOffForm from '../components/time-off-form';

interface Props {
  users: UserShift[];
  groups: Group[];
  open: boolean;
  selectedUser: UserShift | null;
  selectedDate: Date | null;
  selectedShift: Shift | null;
  handleClose: () => void;
  handleChangeUser: (userId: string) => void;
}

const ShiftDialog = ({
  users,
  groups,
  open,
  selectedUser,
  selectedDate,
  selectedShift,
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
          <Tab title={selectedShift ? 'Edit Shift' : 'Add Shift'}>
            <ShiftForm
              users={users}
              groups={groups}
              selectedUser={selectedUser}
              selectedDate={selectedDate}
              selectedShift={selectedShift}
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

export default ShiftDialog;
