import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';


// ----------------------------------------------------------------------

// Error
const Page404 = lazy(() => import('src/pages/error/404'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense >
        <Outlet />
      </Suspense>
    ),
    children: [{ path: '404', element: <Page404 /> }],
  },
];
