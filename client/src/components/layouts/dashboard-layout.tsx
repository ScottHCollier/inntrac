import { useState } from 'react';
import MainNavLink from './dashboard/main-nav-link';
import ModeToggle from './dashboard/mode-toggle';
import Search from './dashboard/search';
import UserNav from './dashboard/user-nav';
import {
  AssistantIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DashboardIcon,
  ScheduleIcon,
  SettingsIcon,
} from '@/components/ui/icons';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  // const navigation = [
  //   { name: 'Dashboard', to: '.', icon: Home },
  //   { name: 'Discussions', to: './discussions', icon: Folder },
  //   checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
  //     name: 'Users',
  //     to: './users',
  //     icon: Users,
  //   },
  // ].filter(Boolean) as SideNavigationItem[];
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
              icon={<DashboardIcon className='w-6 h-6' />}
              end
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Schedule'
              to={'/app/schedule'}
              isOpen={isOpen}
              icon={<ScheduleIcon className='w-6 h-6' />}
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Assistant'
              to={'/app/assistant'}
              isOpen={isOpen}
              icon={<AssistantIcon className='w-6 h-6' />}
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Admin'
              to={'/app/admin'}
              isOpen={isOpen}
              icon={<SettingsIcon className='w-6 h-6' />}
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
                <ChevronLeftIcon className='w-6 h-6' />
              ) : (
                <ChevronRightIcon className='w-6 h-6' />
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
