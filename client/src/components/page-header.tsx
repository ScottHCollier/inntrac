import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  separator?: boolean;
}

const PageHeader = ({ title, children }: Props) => {
  return (
    <>
      <div className='flex items-center justify-between pb-4'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
        </div>
        <div className='flex items-center space-x-2 m-0'>{children}</div>
      </div>
    </>
  );
};

export default PageHeader;
