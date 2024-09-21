import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useContext,
} from 'react';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/utils/cn';

// DropdownMenu Context and Hook
const DropdownMenuContext = React.createContext<any>(null);

const useDropdownMenu = () => {
  return useContext(DropdownMenuContext);
};

// Root Component
const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      <div ref={menuRef} className='relative inline-block text-left'>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

// Trigger Component
const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen } = useDropdownMenu();

  return (
    <div onClick={() => setIsOpen((prev: boolean) => !prev)}>{children}</div>
  );
};

// Content Component
const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; sideOffset?: number }
>(({ children, sideOffset = 4 }, ref) => {
  const { isOpen } = useDropdownMenu();

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      style={{ top: `calc(100% + ${sideOffset}px)` }}
      className={cn(
        'absolute right-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5',
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        'animate-fade-in-top'
      )}
    >
      {children}
    </div>
  );
});

// Item Component
type DropdownMenuItemProps = {
  children: React.ReactNode;
  inset?: boolean;
  onClick?: () => void;
};

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, inset, onClick, ...props }, ref) => {
    const { handleClose } = useDropdownMenu();

    const handleClick = () => {
      if (onClick) onClick();
      handleClose();
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          inset && 'pl-8'
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// SubTrigger Component
type DropdownMenuSubTriggerProps = {
  children: React.ReactNode;
  inset?: boolean;
  onClick?: () => void;
};

const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  DropdownMenuSubTriggerProps
>(({ children, inset, onClick, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent',
      inset && 'pl-8'
    )}
    onClick={onClick}
    {...props}
  >
    {children}
    <ChevronRightIcon className='ml-auto h-4 w-4' />
  </div>
));

// SubContent Component
type DropdownMenuSubContentProps = {
  children: React.ReactNode;
};

const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out'
    )}
    {...props}
  >
    {children}
  </div>
));

// CheckboxItem Component
type DropdownMenuCheckboxItemProps = {
  children: React.ReactNode;
  checked?: boolean;
  onClick?: () => void;
};

const DropdownMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(({ children, checked, onClick, ...props }, ref) => {
  const { handleClose } = useDropdownMenu();

  const handleClick = () => {
    if (onClick) onClick();
    handleClose();
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
      )}
      onClick={handleClick}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        {checked && <CheckIcon className='h-4 w-4' />}
      </span>
      {children}
    </div>
  );
});

// RadioItem Component
type DropdownMenuRadioItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const DropdownMenuRadioItem = forwardRef<
  HTMLDivElement,
  DropdownMenuRadioItemProps
>(({ children, onClick, ...props }, ref) => {
  const { handleClose } = useDropdownMenu();

  const handleClick = () => {
    if (onClick) onClick();
    handleClose();
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
      )}
      onClick={handleClick}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DotFilledIcon className='h-4 w-4 fill-current' />
      </span>
      {children}
    </div>
  );
});

// Label Component
type DropdownMenuLabelProps = {
  children: React.ReactNode;
  inset?: boolean;
};

const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ children, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8')}
      {...props}
    >
      {children}
    </div>
  )
);

// Separator Component
const DropdownMenuSeparator = forwardRef<HTMLHRElement, {}>((props, ref) => (
  <hr ref={ref} className={cn('-mx-1 my-1 h-px bg-muted')} {...props} />
));

// Shortcut Component
const DropdownMenuShortcut = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
    {...props}
  >
    {children}
  </span>
);

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
