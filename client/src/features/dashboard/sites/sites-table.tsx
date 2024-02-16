import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@/components/custom/skeleton';
import { Icons } from '@/components/icons';
import { useAppSelector, useAppDispatch } from '@/store/configure-store';
import { fetchSitesAsync, sitesSelectors } from '@/store/sites-slice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SitesTable = () => {
  const sites = useAppSelector(sitesSelectors.selectAll);
  const { sitesLoaded } = useAppSelector((state) => state.sites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!sites.length) {
      dispatch(fetchSitesAsync());
    }
  }, [dispatch, sites]);
  return (
    <div className='space-y-8'>
      {sitesLoaded
        ? sites.map((site) => (
            <div key={site.id} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Avatar>
                  <AvatarImage src='/avatars/01.png' alt={site?.name} />
                  <AvatarFallback>
                    {`${site.name.split(' ')[0].charAt(0)}${site.name
                      .split(' ')[1]
                      .charAt(0)}`}
                  </AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {site.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>Description</p>
                </div>
              </div>
              <Link to={`/dashboard/sites/${site.id}`}>
                <Icons.edit className='w-8 h-8' />
              </Link>
            </div>
          ))
        : [1, 2, 3, 4].map((item) => (
            <div key={item} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Skeleton className='h-9 w-9 rounded-full' />
                <div className='ml-4 space-y-1'>
                  <Skeleton className='h-3 w-16 rounded-full mb-2' />
                  <Skeleton className='h-3 w-44 rounded-full' />
                </div>
              </div>
              <Skeleton className='w-8 h-8 rounded-full' />
            </div>
          ))}
    </div>
  );
};

export default SitesTable;
