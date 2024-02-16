import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configure-store';
import { fetchCurrentUser } from '../store/account-slice';
import Loading from './loading';
import Login from '../features/login/login';
import Header from './header';
import { Toaster } from '../components/ui/toaster';

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState<boolean>(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error: unknown) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Toaster />
        {loading ? (
          <Loading />
        ) : user ? (
          <>
            <div className='flex flex-col'>
              <Header />
              <div className='flex-1 space-y-1 p-4'>
                <Outlet />
              </div>
            </div>
          </>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
