import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLElement> {
  to: string;
  isOpen: boolean;
  icon: React.ReactNode;
}

const MainNavLink = ({
  className,
  title,
  to,
  isOpen,
  icon,
  ...props
}: Props) => {
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
      {isOpen ? title : icon}
    </NavLink>
  );
};

export default MainNavLink;
