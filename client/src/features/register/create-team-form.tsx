import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/';
import { IAddSite } from '../models';
import { useForm } from 'react-hook-form';
import { SpinnerIcon, UsersIcon } from '@/components/ui/icons';

const FormSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
});

const CreateTeamForm = () => {
  const defaultValues = {
    name: '',
  };

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: IAddSite) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        onChange={(e) => setValue('name', e.target.value)}
        type='text'
        fieldName='name'
        placeholder='Team Name'
        defaultValue={defaultValues.name}
        errors={errors}
      />

      <div className='flex justify-end mt-6'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <UsersIcon className='mr-2 h-4 w-4' />
          )}
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateTeamForm;
