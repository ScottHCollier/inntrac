'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange'> {
  checked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { className, label, checked: controlledChecked, onChange, ...props },
    ref
  ) => {
    const [checked, setChecked] = React.useState(controlledChecked ?? false);

    React.useEffect(() => {
      if (controlledChecked !== undefined) {
        setChecked(controlledChecked);
      }
    }, [controlledChecked]);

    const handleClick = () => {
      if (!props.disabled) {
        const newChecked = !checked;
        setChecked(newChecked);
        onChange?.(newChecked);
      }
    };

    return (
      <>
        <button
          type='button'
          role='switch'
          aria-checked={checked}
          className={cn(
            'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
            {
              'bg-primary': checked,
              'bg-input': !checked,
            },
            className
          )}
          {...props}
          onClick={handleClick}
          ref={ref}
        >
          <span
            className={cn(
              'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
              {
                'translate-x-5': checked,
                'translate-x-0': !checked,
              }
            )}
          />
        </button>
        <p>{label}</p>
      </>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };
