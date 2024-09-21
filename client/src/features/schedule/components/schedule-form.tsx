import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import { IGroup, ISchedule, IUserSchedule } from '@/models';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { addDays, format, parseISO } from 'date-fns';
import { AddIcon, CrossIcon, SpinnerIcon } from '@/components/ui/icons';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { getTimeString } from '@/utils/format';

const FormSchema = z.object({
  userId: z.string({
    required_error: 'User is required.',
  }),
  groupId: z.string({
    required_error: 'Group is required.',
  }),
  date: z.date({
    required_error: 'Date is required.',
  }),
  start: z.string({
    required_error: 'Start time is required.',
  }),
  end: z.string({
    required_error: 'End time is required.',
  }),
});

interface Props {
  users: IUserSchedule[];
  groups: IGroup[];
  selectedUser: IUserSchedule | null;
  selectedDate: Date | null;
  selectedSchedule: ISchedule | null;
  handleClose: () => void;
  handleChangeUser: (userId: string) => void;
}

const ScheduleForm = ({
  users,
  groups,
  selectedUser,
  selectedDate,
  selectedSchedule,
  handleClose,
  handleChangeUser,
}: Props) => {
  const [touched, setTouched] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<z.infer<typeof FormSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(FormSchema),
  });

  function handleApiErrors(errors: unknown) {
    if (errors && Array.isArray(errors)) {
      errors.forEach((error: string) => {
        if (error.includes('start')) {
          setError('start', { message: error });
        }
      });
    }
  }

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    const { userId, groupId, date, start, end } = data;

    const st = new Date(date);
    st.setHours(parseInt(start.split(':')[0]));
    st.setMinutes(parseInt(start.split(':')[1]));
    st.setSeconds(0);
    st.setMilliseconds(0);

    const et =
      parseInt(end.split(':')[0]) < 9
        ? addDays(new Date(date), 1)
        : new Date(date);
    et.setHours(parseInt(end.split(':')[0]));
    et.setMinutes(parseInt(end.split(':')[1]));
    et.setSeconds(0);
    et.setMilliseconds(0);
  };

  async function deleteSchedule() {
    if (selectedSchedule && selectedSchedule.id) {
      setDeleting(true);
    }
  }

  const getInitialValues = useCallback(() => {
    if (selectedSchedule) {
      return {
        userId: selectedUser?.id || undefined,
        groupId: selectedSchedule.groupId || undefined,
        date: parseISO(selectedSchedule.startTime),
        start: format(parseISO(selectedSchedule.startTime), 'HH:mm'),
        end: format(parseISO(selectedSchedule.endTime), 'HH:mm'),
      };
    }
    return {
      userId: selectedUser?.id || undefined,
      groupId: selectedUser?.group.id || undefined,
      date: selectedDate || new Date(),
      start: getTimeString(new Date().getHours()),
      end: getTimeString(new Date().getHours() + 4),
    };
  }, [selectedDate, selectedSchedule, selectedUser]);

  useEffect(() => {
    reset(getInitialValues());
  }, [getInitialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        items={users.map((user) => ({
          ...user,
          name: `${user.firstName} ${user.surname}`,
        }))}
        handleChange={(userId) => {
          handleChangeUser(userId);
          setTouched(true);
        }}
        value={getInitialValues().userId}
        errors={errors}
        fieldName={'userId'}
        placeholder={'User'}
      />

      <Select
        items={groups}
        handleChange={(groupId) => {
          setValue('groupId', groupId);
          setTouched(true);
        }}
        value={getInitialValues().groupId}
        errors={errors}
        fieldName={'groupId'}
        placeholder={'Group'}
      />

      <Input
        onChange={(e) => {
          setValue('date', parseISO(e.target.value));
          setTouched(true);
        }}
        type='date'
        fieldName='date'
        defaultValue={format(getInitialValues().date, 'yyyy-LL-dd')}
        errors={errors}
      />

      <Input
        onChange={(e) => {
          setValue('start', e.target.value);
          setTouched(true);
        }}
        type='time'
        fieldName='start'
        defaultValue={getInitialValues().start}
        errors={errors}
      />

      <Input
        onChange={(e) => {
          setValue('end', e.target.value);
          setTouched(true);
        }}
        type='time'
        fieldName='end'
        defaultValue={getInitialValues().end}
        errors={errors}
      />

      <div className='flex justify-end mt-6'>
        {selectedSchedule && (
          <Button
            className='mr-4'
            variant='destructive'
            onClick={handleSubmit(deleteSchedule)}
          >
            {isSubmitting && deleting ? (
              <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <CrossIcon className='mr-2 h-4 w-4' />
            )}
            Delete
          </Button>
        )}
        <Button
          type='submit'
          disabled={isSubmitting || (selectedSchedule !== null && !touched)}
        >
          {isSubmitting && !deleting ? (
            <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <AddIcon className='mr-2 h-4 w-4' />
          )}
          {selectedSchedule ? 'Update' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default ScheduleForm;
