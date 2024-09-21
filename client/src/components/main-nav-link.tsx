import { cn } from '@/utils/cn';
import { NavLink } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLElement> {
  to: string;
  isOpen: boolean;
  icon: React.ReactNode;
  end?: boolean;
}

const MainNavLink = ({
  className,
  title,
  to,
  isOpen,
  icon,
  end,
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
      end={end}
      {...props}
      to={to}
    >
      {isOpen ? title : icon}
    </NavLink>
  );
};

export default MainNavLink;
