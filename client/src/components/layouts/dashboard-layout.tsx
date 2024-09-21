import { useState } from 'react';
import { Icons } from '../ui/icons';
import MainNavLink from '../main-nav-link';
import ModeToggle from '../mode-toggle';
import Search from '../search';
import UserNav from '../user-nav';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div
      className={`fixed flex flex-col top-16 inset-y-0 left-0 transition-width duration-300 ease-in-out border-r ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className='p-5 border-t'>
        <ul className='space-y-6'>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Dashboard'
              to={'/app'}
              isOpen={isOpen}
              icon={<Icons.dashboard className='w-6 h-6' />}
              end
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Schedule'
              to={'/app/schedule'}
              isOpen={isOpen}
              icon={<Icons.schedule className='w-6 h-6' />}
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Assistant'
              to={'/app/assistant'}
              isOpen={isOpen}
              icon={<Icons.assistant className='w-6 h-6' />}
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Admin'
              to={'/app/admin'}
              isOpen={isOpen}
              icon={<Icons.settings className='w-6 h-6' />}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex h-screen'>
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
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <Sidebar isOpen={isOpen} />
        <div className='flex flex-col flex-1'>
          <div className='flex-1 space-y-1 p-4'>
            <div className='h-16' />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
