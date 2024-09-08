import { Outlet } from 'react-router-dom';
import Header from './header';
import { useState } from 'react';
import { Icons } from '../components/icons';
import MainNavLink from '../components/main-nav-link';

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
              to={'/'}
              isOpen={isOpen}
              icon={<Icons.dashboard className='w-6 h-6' />}
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Schedule'
              to={'/schedule'}
              isOpen={isOpen}
              icon={<Icons.schedule className='w-6 h-6' />}
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Assistant'
              to={'/assistant'}
              isOpen={isOpen}
              icon={<Icons.assistant className='w-6 h-6' />}
            />
          </li>
          <li className={`flex items-center`}>
            <MainNavLink
              title='Admin'
              to={'/admin'}
              isOpen={isOpen}
              icon={<Icons.settings className='w-6 h-6' />}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex h-screen'>
      <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <Sidebar isOpen={isOpen} />
        <div className='flex flex-col flex-1'>
          <div className='flex-1 space-y-1 p-4'>
            <div className='h-16' />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
