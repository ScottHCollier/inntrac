import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface Props<T> extends PopoverTriggerProps {
  items: T[];
  placeholder: string;
  handleChange: (id: string) => void;
}

export default function SelectAvatar<T extends { id: string; name: string }>({
  className,
  items,
  placeholder,
  handleChange,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a team'
          className={cn('w-[160px] justify-between', className)}
        >
          <Avatar className='mr-2 h-5 w-5'>
            <AvatarImage
              src={`https://avatar.vercel.sh/${selected?.id}.png`}
              alt={selected?.name}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selected?.name || placeholder}
          <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search team...' />
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandItem
              onSelect={() => {
                setSelected(null);
                setOpen(false);
                handleChange('');
              }}
              className='text-sm'
            >
              Clear
            </CommandItem>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  setSelected(item);
                  setOpen(false);
                  handleChange(item.id);
                }}
                className='text-sm'
              >
                <Avatar className='mr-2 h-5 w-5'>
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${item.id}.png`}
                    alt={item.name}
                    className='grayscale'
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {item.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    selected?.id === item.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
