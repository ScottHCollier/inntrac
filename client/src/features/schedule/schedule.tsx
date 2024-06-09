import { Card, CardContent } from '@/components/card';
import PageHeader from '@/components/page-header';
import { useState } from 'react';
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
import { Shift, UserShift, UserShiftsParams } from '@/models';
import UserWeek from './components/user-week';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import AddShift from './dialogs/add-shift';
import { ConfirmDialog } from './dialogs/confirm-dialog';
import { toast } from '@/components/ui/use-toast';
import Select from '@/components/custom/select';
import useShifts from '@/hooks/useShifts';
import useGroups from '@/hooks/useGroups';
import Loading from '../../layout/loading';
import WeekSkeleton from './components/week-skeleton';

export function Schedule() {
  const setRequestParams = (params: UserShiftsParams) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('weekStart', params.weekStart);
    newSearchParams.set('weekEnd', params.weekEnd);
    if (params.searchTerm) {
      newSearchParams.set('searchTerm', params.searchTerm);
    }
    if (params.groupId) {
      newSearchParams.set('groupId', params.groupId);
    }
    if (params.userId) {
      newSearchParams.set('userId', params.userId);
    }
    setSearchParams(newSearchParams);
  };

  const weekStartDate = startOfWeek(Date.now(), { weekStartsOn: 1 });
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams({
      weekStart: weekStartDate.toISOString(),
      weekEnd: addDays(weekStartDate, 7).toDateString(),
    })
  );
  const { users, usersLoading } = useShifts(searchParams);
  const { groups, groupsLoading } = useGroups();

  const [monday, setMonday] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const [selectedUser, setSelectedUser] = useState<UserShift | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [selectedShifts, setSelectedShifts] = useState<Shift[]>([]);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleAddShift = (user: UserShift, date: Date) => {
    setSelectedUser(user);
    setSelectedDate(date);
    setOpen(true);
  };

  const handleEditShift = (user: UserShift, shift: Shift) => {
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
    setRequestParams({
      weekStart: monday.toISOString(),
      weekEnd: addDays(monday, 7).toISOString(),
    });
    setOpen(false);
  };

  const repeatSchedule = async () => {
    if (users) {
      try {
        const shifts = users.flatMap((user: UserShift) =>
          user.shifts.map((shift) => ({
            ...shift,
            startTime: addWeeks(parseISO(shift.startTime), 1).toISOString(),
            endTime: addWeeks(parseISO(shift.endTime), 1).toISOString(),
          }))
        );

        await agent.Shifts.addBulkShifts(shifts);

        toast({
          title: 'Success!',
          description: 'Shifts added',
        });
        navigateWeek('next');
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: String(error),
        });
        // handleApiErrors(error); // Uncomment if this function is defined
      }
    }
  };

  const navigateWeek = (direction: 'next' | 'before') => {
    const weekStart =
      direction === 'next' ? addWeeks(monday, 1) : subWeeks(monday, 1);
    const weekEnd = addDays(weekStart, 7);

    setRequestParams({
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toDateString(),
    });

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
    setRequestParams({
      weekStart: monday.toISOString(),
      weekEnd: addDays(monday, 7).toISOString(),
      groupId,
    });
  };

  const handleUserChange = (userId: string) => {
    setRequestParams({
      weekStart: monday.toISOString(),
      weekEnd: addDays(monday, 7).toISOString(),
      userId,
    });
  };

  const handleConfirm = () => {
    setConfirm(false);
    repeatSchedule();
  };

  if (groupsLoading) return <Loading />;

  return (
    <>
      <PageHeader title='Schedule' />
      <div className='grid gap-1'>
        <Card>
          <CardContent className='grid grid-cols-3 p-1'>
            <div className='flex'>
              <Select
                className='mr-1 w-48 p-0'
                items={groups || []}
                placeholder='Group'
                handleChange={handleGroupChange}
                clearable
              />
              <Select
                className='w-48 p-0'
                items={
                  users
                    ? users.map((user) => ({
                        ...user,
                        name: `${user.firstName} ${user.surname}`,
                      }))
                    : []
                }
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
                  onClick={() => navigateWeek('before')}
                />
              </Button>
              <Button className='ml-1' variant='outline' size='icon'>
                <Icons.chevronRight
                  className='w-4 h-4'
                  onClick={() => navigateWeek('next')}
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
      {usersLoading
        ? Array.from({ length: 7 }).map(() => {
            return <WeekSkeleton />;
          })
        : users!.map((user) => (
            <UserWeek
              key={user.id}
              user={user}
              date={monday}
              handleAddShift={(user, date) => handleAddShift(user, date)}
              handleEditShift={(user, shift) => handleEditShift(user, shift)}
              handleSelectShift={(shift) => handleSelectShift(shift)}
            />
          ))}
      <AddShift
        open={open}
        selectedUser={selectedUser}
        selectedDate={selectedDate}
        selectedShift={selectedShift}
        handleClose={onClose}
        handleChangeUser={(userId: string) =>
          setSelectedUser(
            users ? users.find((user) => user.id === userId) || null : null
          )
        }
        users={users}
        groups={groups}
      />
      <ConfirmDialog
        open={confirm}
        close={() => setConfirm(false)}
        handleConfirm={handleConfirm}
      />
    </>
  );
}
