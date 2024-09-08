import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLElement> {
  icon: React.ReactNode;
  to: string;
}

const MainNavIcon = ({ className, icon, to, ...props }: Props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          isActive
            ? 'text-sm font-medium cursor-default pointer-events-none'
            : 'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          className
        )
      }
      {...props}
      to={to}
    >
      {icon}
    </NavLink>
  );
};

export default MainNavIcon;
