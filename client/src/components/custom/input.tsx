import { FieldErrors } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fieldName: string;
  errors?: FieldErrors;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errors, label, fieldName, ...props }, ref) => {
    return (
      <div className='py-4 relative'>
        {label && (
          <span className='text-muted-foreground text-sm'>{label}</span>
        )}
        <input
          className={cn(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            className,
            errors && errors[fieldName] ? 'border-red-700 animate-shake' : ''
          )}
          ref={ref}
          {...props}
        />
        {errors && errors[fieldName] && (
          <span className='absolute text-red-700 text-xs left-3 bottom-0'>
            {`${errors?.[fieldName]?.message}`}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
