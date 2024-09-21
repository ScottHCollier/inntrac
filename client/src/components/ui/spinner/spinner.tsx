import { Icons } from '@/components/ui/icons';

export const Spinner = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Icons.loading className='w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-primary' />
    </div>
  );
};
