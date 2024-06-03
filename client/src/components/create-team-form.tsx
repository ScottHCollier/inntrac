import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Icons } from './icons';
import Input from './custom/input';
import agent from '../api/agent';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/configure-store';

const FormSchema = z.object({
  teamName: z.string().min(1, { message: 'This field has to be filled.' }),
});

const CreateTeamForm = () => {
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();
  const defaultValues = {
    teamName: '',
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

  async function onSubmit(data: FieldValues) {
    try {
      const body = {
        userId: user?.id,
        ...data,
      };
      await agent.Sites.addSite(body);
      navigate('/setup/add-users');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        onChange={(e) => setValue('teamName', e.target.value)}
        type='text'
        fieldName='teamName'
        placeholder='Team Name'
        defaultValue={defaultValues.teamName}
        errors={errors}
      />

      <div className='flex justify-end mt-6'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Icons.users className='mr-2 h-4 w-4' />
          )}
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateTeamForm;
