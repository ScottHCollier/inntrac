import { SidebarNav } from './components/sidebar-nav';
import PageHeader from '@/components/page-header';
import { Outlet } from 'react-router-dom';

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/admin',
  },
  {
    title: 'Account',
    href: '/admin/account',
  },
  {
    title: 'Appearance',
    href: '/admin/appearance',
  },
  {
    title: 'Notifications',
    href: '/admin/notifications',
  },
  {
    title: 'Display',
    href: '/admin/display',
  },
];

export function Admin() {
  return (
    <>
      <PageHeader title='Admin' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex-1 lg:max-w-2xl'>
          <div className='space-y-6'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
