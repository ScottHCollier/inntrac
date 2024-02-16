import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '@/layout/app';
// import ServerError from '../errors/ServerError';
// import NotFound from '../errors/NotFound';
import RequireAuth from './require-auth';
import { Schedule } from '@/features/schedule/schedule';
import { Dashboard } from '@/features/dashboard/dashboard';
import { Admin } from '@/features/admin/admin';
import { Profile } from '@/features/admin/components/profile';
import { Account } from '@/features/admin/components/account';
import { Assistant } from '@/features/assistant/assistant';
import Group from '../features/dashboard/groups/group';
import { OverviewTab } from '../features/dashboard/overview/overview-tab';
import { DetailsTab } from '../features/dashboard/details/details-tab';
import SitesTab from '../features/dashboard/sites/sites-tab';
import { NotificationsTab } from '../features/dashboard/notifications/notifications-tab';
import { GroupsTab } from '../features/dashboard/groups/groups-tab';
import Home from '../layout/home';
import Groups from '../features/dashboard/groups/groups';
import Employees from '../features/dashboard/employees/employees';
import Employee from '../features/dashboard/employees/employee';
import { EmployeesTab } from '../features/dashboard/employees/employees-tab';
import Sites from '../features/dashboard/sites/sites';
import Site from '../features/dashboard/sites/site';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
            children: [
              {
                path: '',
                element: <OverviewTab />,
              },
              {
                path: 'details',
                element: <DetailsTab />,
              },
              {
                path: 'sites',
                element: <SitesTab />,
                children: [
                  {
                    path: '',
                    element: <Sites />,
                  },
                  {
                    path: ':id',
                    element: <Site />,
                  },
                ],
              },
              {
                path: 'groups',
                element: <GroupsTab />,
                children: [
                  {
                    path: '',
                    element: <Groups />,
                  },
                  {
                    path: ':id',
                    element: <Group />,
                  },
                ],
              },
              {
                path: 'employees',
                element: <EmployeesTab />,
                children: [
                  {
                    path: '',
                    element: <Employees />,
                  },
                  {
                    path: ':id',
                    element: <Employee />,
                  },
                ],
              },
              {
                path: 'notifications',
                element: <NotificationsTab />,
              },
            ],
          },
          {
            path: 'schedule',
            element: <Schedule />,
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
      //   path: 'server-error',
      //   element: <ServerError />,
      // },
      // {
      //   path: 'not-found',
      //   element: <NotFound />,
      // },
      {
        path: '/*',
        element: <Navigate replace to='/not-found' />,
      },
    ],
  },
]);
