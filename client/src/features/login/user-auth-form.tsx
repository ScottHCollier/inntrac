import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button/button';
import { SpinnerIcon, UsersIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { ILogin } from '@/models';
import { useLogin } from '@/lib/auth';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string(),
  // .regex(
  //   /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
  // ),
});

type LoginFormProps = {
  onSuccess: () => void;
};

const UserAuthForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });

  const defaultValues = {
    email: '',
    password: '',
  };
  // curl https://api.stripe.com/v1/checkout/sessions \
  // -u "sk_test_...Y9nO:" \
  // --data-urlencode success_url="https://dashboard.stripe.com/test/billing/starter-guide/checkout-success" \
  // -d "line_items[0][price]"=price_1P9pfYDTJCjsckLdDzwIYKvV \
  // -d "line_items[0][quantity]"=1 \
  // -d mode=subscription

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: ILogin) {
    try {
      await login.mutate(data);
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
            <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <UsersIcon className='mr-2 h-4 w-4' />
          )}
          Login
        </Button>
      </div>
    </form>
  );
};

export default UserAuthForm;
