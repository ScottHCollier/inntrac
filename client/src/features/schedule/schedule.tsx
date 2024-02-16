import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { useAppDispatch, useAppSelector } from '@/store/configure-store';
import {
  fetchShiftsAsync,
  setShiftParams,
  setShiftsLoaded,
  shiftSelectors,
} from '@/store/shifts-slice';
import { useEffect, useState } from 'react';
import { fetchGroupsAsync, groupsSelectors } from '@/store/groups-slice';
import {
  addDays,
  addWeeks,
  format,
  isSameMonth,
  parseISO,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import agent from '@/api/agent';
import Loading from '@/layout/loading';
import { Shift, User } from '@/models';
import UserWeek from './components/user-week';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import AddShift from './dialogs/add-shift';
import { ConfirmDialog } from './dialogs/confirm-dialog';
import { toast } from '@/components/ui/use-toast';
import UserSkeleton from './components/user-skeleton';
import Select from '@/components/custom/select';

export function Schedule() {
  const groups = useAppSelector(groupsSelectors.selectAll);
  const { groupsLoaded } = useAppSelector((state) => state.groups);

  // const [weekOffset, setWeekOffset] = useState<number>(0);
  const [monday, setMonday] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const userShifts = useAppSelector(shiftSelectors.selectAll);

  const dispatch = useAppDispatch();
  const { shiftsLoaded } = useAppSelector((state) => state.shifts);
  const { selectedSite } = useAppSelector((state) => state.account);

  useEffect(() => {
    if (!shiftsLoaded && selectedSite) {
      dispatch(fetchShiftsAsync(selectedSite?.id));
    }
  }, [dispatch, shiftsLoaded, selectedSite]);

  useEffect(() => {
    if (selectedSite && !groups.length) {
      dispatch(fetchGroupsAsync(selectedSite?.id));
    }
  }, [dispatch, selectedSite, groups]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [selectedShifts, setSelectedShifts] = useState<Shift[]>([]);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleAddShift = (user: User, date: Date) => {
    setSelectedUser(user);
    setSelectedDate(date);
    setOpen(true);
  };

  const handleEditShift = (user: User, shift: Shift) => {
    setSelectedUser(user);
    setSelectedShift(shift);
    setOpen(true);
  };

  const handleSelectShift = (shift: Shift) => {
    const exists = selectedShifts.find((s) => s.id === shift.id);
    if (exists === undefined) {
      setSelectedShifts((selectedShifts) => [...selectedShifts, shift]);
    } else {
      setSelectedShifts((selectedShifts) =>
        selectedShifts.filter((s) => s.id !== shift.id)
      );
    }
  };

  const onClose = () => {
    setSelectedUser(null);
    setSelectedDate(null);
    setSelectedShift(null);
    dispatch(setShiftsLoaded(false));
    setOpen(false);
  };

  const repeatSchedule = async () => {
    const shifts = userShifts.reduce((shifts: Shift[], user: User) => {
      return [
        ...shifts,
        ...user.shifts.map((shift) => {
          return {
            ...shift,
            startTime: addWeeks(parseISO(shift.startTime), 1).toISOString(),
            endTime: addWeeks(parseISO(shift.endTime), 1).toISOString(),
          };
        }),
      ];
    }, []);

    await agent.Shifts.addBulkShifts(shifts)
      .then(() => {
        toast({
          title: 'Success!',
          description: 'Shifts added',
        });
        navigateNext();
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error,
        });
        // handleApiErrors(error);
      });
  };

  const navigateNext = () => {
    const weekStart = addWeeks(monday, 1);
    const weekEnd = addDays(weekStart, 7);

    dispatch(
      setShiftParams({
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
      })
    );

    setMonday(weekStart);
  };

  const navigateBefore = () => {
    const weekStart = subWeeks(monday, 1);
    const weekEnd = addDays(weekStart, 8);

    dispatch(
      setShiftParams({
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
      })
    );

    setMonday(weekStart);
  };

  const formattedWeekDisplay = () => {
    const startDay = monday;
    const endDay = addDays(monday, 6);

    const start = isSameMonth(startDay, endDay)
      ? format(startDay, 'do')
      : format(startDay, 'do MMM');
    const end = format(endDay, 'do MMM');

    return `${start} - ${end}`;
  };

  const handleGroupChange = (groupId: string) => {
    dispatch(setShiftParams({ groupId }));
  };

  const handleUserChange = (userId: string) => {
    dispatch(setShiftParams({ userId }));
  };

  const handleConfirm = () => {
    setConfirm(false);
    repeatSchedule();
  };

  if (!groupsLoaded) return <Loading message='Loading users...' />;

  return (
    <>
      <PageHeader title='Schedule' />
      <div className='grid gap-1'>
        <Card>
          <CardContent className='grid grid-cols-3 p-1'>
            <div className='flex'>
              <Select
                className='mr-1 w-48 p-0'
                items={groups}
                placeholder='Group'
                handleChange={handleGroupChange}
                clearable
              />
              <Select
                className='w-48 p-0'
                items={userShifts}
                placeholder='User'
                handleChange={handleUserChange}
                clearable
              />
            </div>
            <div className='flex justify-center items-center'>
              <p className='text-lg font-bold'>{formattedWeekDisplay()}</p>
            </div>
            <div className='flex justify-end items-center'>
              <Button variant='outline' size='icon'>
                <Icons.repeat
                  className='w-4 h-4'
                  onClick={() => setConfirm(true)}
                />
              </Button>
              <Button className='ml-1' variant='outline' size='icon'>
                <Icons.chevronLeft
                  className='w-4 h-4'
                  onClick={() => navigateBefore()}
                />
              </Button>
              <Button className='ml-1' variant='outline' size='icon'>
                <Icons.chevronRight
                  className='w-4 h-4'
                  onClick={() => navigateNext()}
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid grid-cols-8 gap-1'>
        <Card>
          <CardContent className='py-1 px-2'></CardContent>
        </Card>
        <Card>
          <CardContent className='py-1 px-2'>
            <div className='text-xs text-muted-foreground'>
              {format(monday, 'eeee')}
            </div>
            <p className='text-md font-bold text-muted-foreground'>
              {format(monday, 'do')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='py-1 px-2'>
            <div className='text-xs text-muted-foreground'>
              {format(addDays(monday, 1), 'eeee')}
            </div>
            <p className='text-md font-bold text-muted-foreground'>
              {format(addDays(monday, 1), 'do')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='py-1 px-2'>
            <div className='text-xs text-muted-foreground'>
              {format(addDays(monday, 2), 'eeee')}
            </div>
            <p className='text-md font-bold text-muted-foreground'>
              {format(addDays(monday, 2), 'do')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='py-1 px-2'>
            <div className='text-xs text-muted-foreground'>
              {format(addDays(monday, 3), 'eeee')}
            </div>
            <p className='text-md font-bold text-muted-foreground'>
              {format(addDays(monday, 3), 'do')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='py-1 px-2'>
            <div className='text-xs text-muted-foreground'>
              {format(addDays(monday, 4), 'eeee')}
            </div>
            <p className='text-md font-bold text-muted-foreground'>
              {format(addDays(monday, 4), 'do')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='py-1 px-2'>
            <div className='text-xs text-muted-foreground'>
              {format(addDays(monday, 5), 'eeee')}
            </div>
            <p className='text-md font-bold text-muted-foreground'>
              {format(addDays(monday, 5), 'do')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='py-1 px-2'>
            <div className='text-xs text-muted-foreground'>
              {format(addDays(monday, 6), 'eeee')}
            </div>
            <p className='text-md font-bold text-muted-foreground'>
              {format(addDays(monday, 6), 'do')}
            </p>
          </CardContent>
        </Card>
      </div>
      {userShifts.map((user) =>
        shiftsLoaded ? (
          <UserWeek
            key={user.id}
            user={user}
            date={monday}
            handleAddShift={(user, date) => handleAddShift(user, date)}
            handleEditShift={(user, shift) => handleEditShift(user, shift)}
            handleSelectShift={(shift) => handleSelectShift(shift)}
          />
        ) : (
          <UserSkeleton key={user.id} user={user} />
        )
      )}
      <AddShift
        open={open}
        selectedUser={selectedUser}
        selectedDate={selectedDate}
        selectedShift={selectedShift}
        handleClose={onClose}
        handleChangeUser={(userId: string) =>
          setSelectedUser(userShifts.find((user) => user.id === userId) || null)
        }
      />
      <ConfirmDialog
        open={confirm}
        close={() => setConfirm(false)}
        handleConfirm={handleConfirm}
      />
    </>
  );
}
