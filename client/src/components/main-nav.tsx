import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <NavLink
        to='/dashboard'
        className={({ isActive }) =>
          isActive
            ? 'text-sm font-medium transition-colors hover:text-primary'
            : 'text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to='/schedule'
        className={({ isActive }) =>
          isActive
            ? 'text-sm font-medium transition-colors hover:text-primary'
            : 'text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
        }
      >
        Schedule
      </NavLink>
      <NavLink
        to='/assistant'
        className={({ isActive }) =>
          isActive
            ? 'text-sm font-medium transition-colors hover:text-primary'
            : 'text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
        }
      >
        Assistant
      </NavLink>
      <NavLink
        to='/admin'
        className={({ isActive }) =>
          isActive
            ? 'text-sm font-medium transition-colors hover:text-primary'
            : 'text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
        }
      >
        Admin
      </NavLink>
    </nav>
  );
};

export default MainNav;
