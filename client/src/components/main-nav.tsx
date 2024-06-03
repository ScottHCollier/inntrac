import { cn } from '@/lib/utils';
import MainNavLink from './main-nav-link';

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <MainNavLink title='Dashboard' to={'/'} />
      <MainNavLink title='Schedule' to={'/schedule'} />
      <MainNavLink title='Assistant' to={'/assistant'} />
      <MainNavLink title='Admin' to={'/admin'} />
    </nav>
  );
};

export default MainNav;
