import { Navigate, useRoutes } from 'react-router-dom';


import { mainRoutes } from './main';
import { CONFIG } from 'src/config-global';
import { dashboardRoutes } from './dashboard';
import { paths } from '../paths';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={paths.dashboard.reports.root} replace />,
    },


    // Dashboard
    ...dashboardRoutes,

    // Main
    // ...mainRoutes,

    // No match
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
