import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';

export const AppRoot = () => {
  const location = useLocation();
  return (
    <DashboardLayout>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong!</div>}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </DashboardLayout>
  );
};
