import { AccountForm } from '../../admin/components/account-form';
import { useAppDispatch, useAppSelector } from '@/store/configure-store';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { fetchSitesAsync, sitesSelectors } from '@/store/sites-slice';
import { Site } from '@/models';

const Sites = () => {
  const sites = useAppSelector(sitesSelectors.selectAll);
  const [site, setSite] = useState<Site | null>(null);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !sites.length) {
      dispatch(fetchSitesAsync());
    }
  }, [dispatch, user, sites.length]);

  useEffect(() => {
    if (id) {
      const site = sites.find((site) => site.id === id);
      if (site) {
        setSite(site);
      } else {
        navigate('/dashboard/sites');
      }
    }
  }, [id, navigate, sites]);

  return (
    <>
      {site && (
        <>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sites</CardTitle>
              <Icons.users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>Edit {site.name}</div>
              <p className='text-xs text-muted-foreground'>
                Select site to edit details
              </p>
            </CardContent>
          </Card>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-lg font-medium'>{site.name}</h3>
                  <p className='text-sm text-muted-foreground'>Edit site</p>
                </div>
              </div>
              <AccountForm />
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default Sites;
