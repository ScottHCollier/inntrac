import UsersAddForm from '@/components/users-add-form';

const AddUsers = () => {
  return (
    <>
      <div className='container h-screen flex items-center justify-center md:grid lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Add Users</h1>
            {/* <p className='text-sm text-muted-foreground'>
              Join a team or create one
            </p> */}
          </div>
          <UsersAddForm />
        </div>
      </div>
    </>
  );
};

export default AddUsers;
