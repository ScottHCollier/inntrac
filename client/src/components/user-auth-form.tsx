import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInUser } from '../store/account-slice';
import { useAppDispatch } from '../store/configure-store';
import { Icons } from './icons';
import Input from './custom/input';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .regex(
      /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
    ),
});

const UserAuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: '',
    password: '',
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
      await dispatch(signInUser(data));
      navigate(location.state?.from || '/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        onChange={(e) => setValue('email', e.target.value)}
        type='text'
        fieldName='email'
        placeholder='Email'
        defaultValue={defaultValues.email}
        errors={errors}
      />

      <Input
        onChange={(e) => setValue('password', e.target.value)}
        type='password'
        fieldName='password'
        placeholder='Password'
        defaultValue={defaultValues.password}
        errors={errors}
      />

      <div className='flex justify-end mt-6'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Icons.users className='mr-2 h-4 w-4' />
          )}
          Login
        </Button>
      </div>
    </form>
  );
};

export default UserAuthForm;
