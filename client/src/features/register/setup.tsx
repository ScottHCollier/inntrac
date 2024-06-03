import CreateTeamForm from '../../components/create-team-form';

const Setup = () => {
  return (
    <>
      <div className='container h-screen flex items-center justify-center md:grid lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Create a team
            </h1>
            {/* <p className='text-sm text-muted-foreground'>
              Join a team or create one
            </p> */}
          </div>
          <CreateTeamForm />
        </div>
      </div>
    </>
  );
};

export default Setup;
