import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button/button';
import { useNavigate } from 'react-router-dom';
import { SpinnerIcon, UsersIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  firstName: z.string().min(1, { message: 'This field has to be filled.' }),
  surname: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  phoneNumber: z
    .string()
    .regex(
      /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?#(\d{4}|\d{3}))?$/,
      'Invalid Phone Number'
    ),
  password: z.string(),
  // .regex(
  //   /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
  // ),
});

interface FormData {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const UsersAddForm = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const defaultValues = {
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: '',
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

  async function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        onChange={(e) => setValue('firstName', e.target.value)}
        type='text'
        fieldName='firstName'
        placeholder='First Name'
        defaultValue={defaultValues.firstName}
        errors={errors}
      />

      <Input
        onChange={(e) => setValue('surname', e.target.value)}
        type='text'
        fieldName='surname'
        placeholder='Surname'
        defaultValue={defaultValues.surname}
        errors={errors}
      />

      <Input
        onChange={(e) => setValue('email', e.target.value)}
        type='text'
        fieldName='email'
        placeholder='Email'
        defaultValue={defaultValues.email}
        errors={errors}
      />

      <Input
        onChange={(e) => setValue('phoneNumber', e.target.value)}
        type='text'
        fieldName='phoneNumber'
        placeholder='Phone Number'
        defaultValue={defaultValues.phoneNumber}
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

      <div className='flex justify-between mt-6'>
        <Button onClick={() => navigate('/')}>
          <UsersIcon className='mr-2 h-4 w-4' />
          Skip for now
        </Button>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <UsersIcon className='mr-2 h-4 w-4' />
          )}
          Register
        </Button>
      </div>
    </form>
  );
};

export default UsersAddForm;
