import MainNav from '@/components/main-nav';
import Search from '@/components/search';
import UserNav from '@/components/user-nav';
import ModeToggle from '@/components/mode-toggle';

const Header = () => {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <MainNav className='' />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
