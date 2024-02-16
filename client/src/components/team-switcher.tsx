import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppSelector } from '../store/configure-store';
import { useState, useEffect } from 'react';
import { Site } from '@/models';
import Input from './custom/input';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const { user } = useAppSelector((state) => state.account);

  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [localSite, setLocalSite] = useState<Site | null>(null);

  useEffect(() => {
    if (user) {
      const site = user.sites.find((site) => site.id === user.defaultSite);
      if (site) {
        setLocalSite(site);
      }
    }
  }, [user]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            aria-label='Select a team'
            className={cn('w-[200px] justify-between', className)}
          >
            <Avatar className='mr-2 h-5 w-5'>
              <AvatarImage
                src={`https://avatar.vercel.sh/${localSite?.id}.png`}
                alt={localSite?.name}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {localSite?.name}
            <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              <CommandInput placeholder='Search team...' />
              <CommandEmpty>No team found.</CommandEmpty>
              {user?.sites.map((site) => (
                <CommandItem
                  key={site.id}
                  onSelect={() => {
                    setLocalSite(site);
                    setOpen(false);
                  }}
                  className='text-sm'
                >
                  <Avatar className='mr-2 h-5 w-5'>
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${site.id}.png`}
                      alt={site.name}
                      className='grayscale'
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {site.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      localSite?.id === site.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className='mr-2 h-5 w-5' />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className='space-y-4 py-2 pb-4'>
            <div className='space-y-2'>
              {/* <Input label='Team Name' placeHolder='Acme Inc.' /> */}
              <Input
                label='Team Name'
                name={'teamName'}
                type={'text'}
                onChange={() => console.log('test')}
                fieldName={'teamName'}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type='submit'>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
