import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';
import { FieldErrors } from 'react-hook-form';
import Skeleton from './skeleton';

interface Props {
  items: { id: string; name: string }[];
  placeholder: string;
  handleChange: (value: string) => void;
  value?: string;
  errors?: FieldErrors;
  fieldName?: string;
  loaded?: boolean;
  clearable?: boolean;
  className?: string;
}

const Select = ({
  items,
  handleChange,
  value,
  errors,
  fieldName,
  placeholder,
  loaded = true,
  clearable = false,
  className = '',
}: Props) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  function useOutsideAlerter(ref: MutableRefObject<HTMLDivElement | null>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setSelectOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    const selectedItem = items.find((item) => item.id === value);
    if (selectedItem) setTitle(selectedItem.name);
  }, [items, value]);

  const onSelect = (item: { id: string; name: string }) => {
    handleChange(item.id);
    setTitle(item.name);
    setSelectOpen(false);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleChange('');
    setTitle(null);
    setSelectOpen(false);
  };

  return (
    <>
      {loaded ? (
        <div className={cn('relative w-full py-4', className)} ref={wrapperRef}>
          <div
            className={cn(
              'flex h-9 w-full items-center justify-between bg-background whitespace-nowrap rounded-md border border-input px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
              selectOpen ? 'outline-none ring-1 ring-ring' : '',
              errors && fieldName && errors?.[fieldName]
                ? 'border-red-700 animate-shake'
                : ''
            )}
            onClick={() => setSelectOpen(!selectOpen)}
          >
            <span className='text-dark cursor-pointer'>
              {title || `Select ${placeholder}`}
            </span>
            <div className='flex'>
              {clearable && (
                <Icons.cross className='h-4 w-4 mr-2' onClick={clear} />
              )}
              {selectOpen ? (
                <Icons.chevronUp className='h-4 w-4' />
              ) : (
                <Icons.chevronDown className='h-4 w-4' />
              )}
            </div>
          </div>
          {errors && fieldName && errors[fieldName] && (
            <span className='absolute text-red-700 text-xs left-7 bottom-0'>
              {`${errors?.[fieldName]?.message}`}
            </span>
          )}

          {selectOpen && (
            <ul className='absolute z-50 mt-1 w-full rounded-md bg-background border border-input text-sm'>
              {items.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className='cursor-pointer select-none py-2 px-3 hover:bg-gray-800'
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className='w-full py-4'>
          <div className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'>
            <Skeleton className='w-[50px] h-[16px] rounded-full' />
            <Skeleton className='w-[16px] h-[16px] rounded-full' />
          </div>
        </div>
      )}
    </>
  );
};

export default Select;
