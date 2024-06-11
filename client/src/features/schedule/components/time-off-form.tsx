import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import { UserShift } from '@/models';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import agent from '@/api/agent';
import { Icons } from '@/components/icons';
import Select from '@/components/custom/select';
import Input from '@/components/custom/input';

const FormSchema = z.object({
  userId: z.string({
    required_error: 'User is required.',
  }),
  startDate: z.date({
    required_error: 'Date is required.',
  }),
  endDate: z.date({
    required_error: 'Date is required.',
  }),
});

interface Props {
  users: UserShift[];
  selectedUser: UserShift | null;
  selectedDate: Date | null;
  handleClose: () => void;
  handleChangeUser: (userId: string) => void;
}

const TimeOffForm = ({
  users,
  selectedUser,
  selectedDate,
  handleClose,
  handleChangeUser,
}: Props) => {
  const [touched, setTouched] = useState(false);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('startDate')) {
          setError('startDate', { message: error });
        }
      });
    }
  }

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    const { userId, startDate, endDate } = data;

    const body = {
      userId,
      pending: false,
      startDate,
      endDate,
      type: 3,
    };

    console.log(body);
    return;

    await agent.Shifts.requestTimeOff(body)
      .then(() => {
        toast({
          title: 'Request Submitted',
        });
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        handleApiErrors(error);
      });
  };

  // async function deleteShift() {
  //   if (selectedShift) {
  //     setDeleting(true);
  //     await agent.Shifts.delete(selectedShift?.id)
  //       .then(() => {
  //         toast({
  //           title: 'Shift deleted',
  //         });
  //         handleClose();
  //         setDeleting(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         handleApiErrors(error);
  //         setDeleting(false);
  //       });
  //   }
  // }

  const getInitialValues = useCallback(() => {
    return {
      userId: selectedUser?.id || undefined,
      startDate: selectedDate || new Date(),
      endDate: selectedDate || new Date(),
    };
  }, [selectedDate, selectedUser]);

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

      <Input
        onChange={(e) => {
          setValue('startDate', parseISO(e.target.value));
          setTouched(true);
        }}
        type='date'
        fieldName='startDate'
        defaultValue={format(getInitialValues().startDate, 'yyyy-LL-dd')}
        errors={errors}
      />

      <Input
        onChange={(e) => {
          setValue('endDate', parseISO(e.target.value));
          setTouched(true);
        }}
        type='date'
        fieldName='endDate'
        defaultValue={format(getInitialValues().endDate, 'yyyy-LL-dd')}
        errors={errors}
      />

      <div className='flex justify-end mt-6'>
        {/* {selectedShift && (
          <Button
            className='mr-4'
            variant='destructive'
            onClick={handleSubmit(deleteShift)}
          >
            {isSubmitting && deleting ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Icons.cross className='mr-2 h-4 w-4' />
            )}
            Delete
          </Button>
        )} */}
        <Button type='submit' disabled={isSubmitting || !touched}>
          {isSubmitting ? (
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Icons.add className='mr-2 h-4 w-4' />
          )}
          {'Save'}
        </Button>
      </div>
    </form>
  );
};

export default TimeOffForm;
