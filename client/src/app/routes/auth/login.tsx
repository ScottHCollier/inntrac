import { UsersIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserAuthForm from '../../../features/login/user-auth-form';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  return (
    <>
      <div className='container h-screen flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center'>
            <span className='text-4xl font-bold'>Inntrac</span>
          </div>
          <div className='relative z-20 mt-auto'>
            {/* <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className='text-sm'>Sofia Davis</footer>
            </blockquote> */}
            <div className='space-y-2'>
              <p className='text-lg'>
                Management and organisational tools for hospitality
              </p>
            </div>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below
              </p>
            </div>
            <UserAuthForm
              onSuccess={() =>
                navigate(`${redirectTo ? `${redirectTo}` : '/app'}`, {
                  replace: true,
                })
              }
            />
            <Button onClick={() => navigate('/register')}>
              <UsersIcon className='mr-2 h-4 w-4' />
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
