import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { useAppDispatch } from '@/store/configure-store';
import { fetchCurrentUser } from '@/store/account-slice';
import Loading from './loading';
import { Toaster } from '@/components/ui/toaster';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(fetchCurrentUser());
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, [dispatch]);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster />
      {loading ? <Loading /> : <Outlet />}
    </ThemeProvider>
  );
};

export default App;
