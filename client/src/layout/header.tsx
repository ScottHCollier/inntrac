import Search from '@/components/search';
import UserNav from '@/components/user-nav';
import ModeToggle from '@/components/mode-toggle';
import { Icons } from '../components/icons';

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ isOpen, toggleSidebar }: Props) => {
  return (
    <div className='border-b fixed w-full bg-background pr-4'>
      <div className='flex h-16 justify-between items-center'>
        <div
          className={`flex items-center border-r h-16 transition-width duration-300 ease-in-out px-4 ${
            isOpen ? 'w-64 justify-end' : 'w-16 justify-center'
          }`}
        >
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <Icons.chevronLeft className='w-6 h-6' />
            ) : (
              <Icons.chevronRight className='w-6 h-6' />
            )}
          </button>
        </div>
        <div className='flex items-center space-x-4'>
          <Search />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
