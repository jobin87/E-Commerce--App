import { Navigate, useRoutes } from 'react-router-dom';


import { mainRoutes } from './main';
import { CONFIG } from 'src/config-global';
import { paths } from '../paths';
import dashboardRoutes from './dashboard';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={paths.dashboard.product.root} replace />,
    },


    // Dashboard
    ...dashboardRoutes,

    // Main
    // ...mainRoutes,

    // No match
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
