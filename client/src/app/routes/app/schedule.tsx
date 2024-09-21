import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { useState } from 'react';
import {
  addDays,
  addWeeks,
  format,
  isSameMonth,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import { ISchedule, IUserSchedule, IUserScheduleParams } from '@/models';
import { Button } from '@/components/ui/button';
import ScheduleDialog from '@/features/schedule/dialogs/schedule-dialog';
import { ConfirmDialog } from '@/features/schedule/dialogs/confirm-dialog';
import WeekSkeleton from '@/features/schedule/components/week-skeleton';
import UserWeek from '@/features/schedule/components/user-week';
import {
  getGroupsQueryOptions,
  useGroups,
} from '@/features/groups/api/get-groups';
import { QueryClient } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import {
  getSchedulesQueryOptions,
  useSchedules,
} from '@/features/users/api/get-users';
import { Select } from '@/components/ui/select';
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from '@/components/ui/icons';

export const schedulesLoader = (queryClient: QueryClient) => async () => {
  // Fetch groups first
  const groupsQuery = getGroupsQueryOptions();
  const groups =
    queryClient.getQueryData(groupsQuery.queryKey) ??
    (await queryClient.fetchQuery(groupsQuery));

  // Fetch schedules
  const schedulesQuery = getSchedulesQueryOptions({
    weekStart: startOfWeek(Date.now(), { weekStartsOn: 1 }).toISOString(),
    weekEnd: addDays(
      startOfWeek(Date.now(), { weekStartsOn: 1 }),
      7
    ).toISOString(),
    searchTerm: '',
    groupId: '',
    userId: '',
  });
  const schedules = await queryClient.fetchQuery(schedulesQuery);

  return { groups, schedules };
};

export const ScheduleRoute = () => {
  const setRequestParams = (params: IUserScheduleParams) => {
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

  const [monday, setMonday] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const [selectedUser, setSelectedUser] = useState<IUserSchedule | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleAddSchedule = (user: IUserSchedule, date: Date) => {
    setSelectedUser(user);
    setSelectedDate(date);
    setOpen(true);
  };

  const handleAddScheduleNoUser = () => {
    setSelectedUser(null);
    setSelectedDate(null);
    setOpen(true);
  };

  const handleEditSchedule = (user: IUserSchedule, schedule: ISchedule) => {
    setSelectedUser(user);
    setSelectedSchedule(schedule);
    setOpen(true);
  };

  const onClose = () => {
    setSelectedUser(null);
    setSelectedDate(null);
    setSelectedSchedule(null);
    setRequestParams({
      weekStart: monday.toISOString(),
      weekEnd: addDays(monday, 7).toISOString(),
    });
    setOpen(false);
  };

  const repeatSchedule = async () => {
    // if (users) {
    //   try {
    //     const schedules = users.flatMap((user: IUserSchedule) =>
    //       user.schedules.map((schedule) => ({
    //         ...schedule,
    //         startTime: addWeeks(parseISO(schedule.startTime), 1).toISOString(),
    //         endTime: addWeeks(parseISO(schedule.endTime), 1).toISOString(),
    //       }))
    //     );
    //     await agent.Schedules.addBulkSchedules(schedules);
    //     toast({
    //       title: 'Success!',
    //       description: 'Schedules added',
    //     });
    //     navigateWeek('next');
    //   } catch (error) {
    //     console.log(error);
    //     toast({
    //       variant: 'destructive',
    //       title: 'Error',
    //       description: String(error),
    //     });
    //     // handleApiErrors(error); // Uncomment if this function is defined
    //   }
    // }
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

  const resetSchedule = () => {
    setRequestParams({
      weekStart: monday.toISOString(),
      weekEnd: addDays(monday, 7).toISOString(),
    });
  };

  const groupsQuery = useGroups();
  const usersQuery = useSchedules({
    weekStart: weekStartDate.toISOString(),
    weekEnd: addDays(monday, 7).toISOString(),
  });

  if (groupsQuery.isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const groups = groupsQuery.data?.data;

  if (!groups) return null;

  if (usersQuery.isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const users = usersQuery.data?.data;

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
              <Button
                variant='outline'
                size='icon'
                onClick={() => setConfirm(true)}
              >
                <RepeatIcon className='w-4 h-4' />
              </Button>
              <Button
                className='ml-1'
                variant='outline'
                size='icon'
                onClick={() => navigateWeek('before')}
              >
                <ChevronLeftIcon className='w-4 h-4' />
              </Button>
              <Button
                className='ml-1'
                variant='outline'
                size='icon'
                onClick={() => navigateWeek('next')}
              >
                <ChevronRightIcon className='w-4 h-4' />
              </Button>
              <Button
                className='ml-1 bg-indigo-300'
                variant='outline'
                size='icon'
                onClick={() => handleAddScheduleNoUser()}
              >
                <AddIcon className='w-4 h-4' />
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
      {usersQuery.isLoading
        ? Array.from({ length: 7 }).map((_, index) => {
            return <WeekSkeleton key={index} />;
          })
        : users.map((user) => (
            <UserWeek
              key={user.id}
              user={user}
              date={monday}
              handleAddSchedule={(user, date) => handleAddSchedule(user, date)}
              handleEditSchedule={(user, schedule) =>
                handleEditSchedule(user, schedule)
              }
              resetSchedule={resetSchedule}
            />
          ))}
      <ScheduleDialog
        open={open}
        selectedUser={selectedUser}
        selectedDate={selectedDate}
        selectedSchedule={selectedSchedule}
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
};
