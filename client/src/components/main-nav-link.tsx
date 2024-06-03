import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLElement> {
  to: string;
}

const MainNavLink = ({ className, title, to, ...props }: Props) => {
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
      {title}
    </NavLink>
  );
};

export default MainNavLink;
