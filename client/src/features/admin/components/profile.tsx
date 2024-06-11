import { ProfileForm } from './profile-form';

const Profile = () => {
  return (
    <>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <ProfileForm />
    </>
  );
};

export default Profile;
