import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '@/layout/app';
import RequireAuth from './require-auth';
import Layout from '@/layout/layout';
import Dashboard from '@/features/dashboard/dashboard';
import ScheduleOverview from '@/features/schedule/schedule-overview';
import Assistant from '@/features/assistant/assistant';
import Admin from '@/features/admin/admin';
import Profile from '@/features/admin/components/profile';
import Account from '@/features/admin/components/account';
import Setup from '@/features/register/setup';
import AddUsers from '@/features/register/add-users';
import Login from '@/features/login/login';
import Register from '@/features/register/register';
import ServerError from '@/errors/server-error';
import NotFound from '@/errors/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: '',
                element: <Dashboard />,
              },
              {
                path: 'schedule',
                element: <ScheduleOverview />,
              },
              {
                path: 'assistant',
                element: <Assistant />,
              },
              {
                path: 'admin',
                element: <Admin />,
                children: [
                  {
                    path: '',
                    element: <Profile />,
                  },
                  {
                    path: 'account',
                    element: <Account />,
                  },
                  {
                    path: 'appearance',
                    element: <Account />,
                  },
                  {
                    path: 'notifications',
                    element: <Account />,
                  },
                  {
                    path: 'display',
                    element: <Account />,
                  },
                ],
              },
            ],
          },
          {
            path: 'setup',
            element: <Setup />,
          },
          {
            path: 'setup/add-users',
            element: <AddUsers />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'server-error',
    element: <ServerError />,
  },
  {
    path: 'not-found',
    element: <NotFound />,
  },
  {
    path: '/*',
    element: <Navigate replace to='/not-found' />,
  },
]);
