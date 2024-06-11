import { Outlet } from 'react-router-dom';
import Header from './header';

function Layout() {
  return (
    <>
      <div className='flex flex-col'>
        <Header />
        <div className='flex-1 space-y-1 p-4'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
