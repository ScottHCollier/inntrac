import { Icons } from '../components/icons';

interface LoadingComponentProps {
  message?: string;
}

const Loading = ({ message }: LoadingComponentProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Icons.loading className='w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-primary' />
      {message && (
        <p className='text-gray-200 dark:text-gray-600 mt-2 text-3xl'>
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
