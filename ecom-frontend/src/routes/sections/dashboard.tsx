import { Navigate, Outlet } from 'react-router-dom';
import { GuestGuard } from 'src/guard';
import MainLayout from 'src/layout/mainlayout';
import { Suspense, lazy } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';

// Lazy loaded components
const ProductListPage = lazy(() => import('src/pages/product/product'));
const CartPage = lazy(() => import('src/pages/product/productcart'));
const ProductDetailsPage = lazy(() => import('src/pages/product/productdetail'));
const CheckPage = lazy(() => import('src/pages/product/checkout'));


// Layout + fallback
const layoutContent = (
  <MainLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </MainLayout>
);

const dashboardRoutes = [
  {
    path: 'dashboard',
    element: <GuestGuard>{layoutContent}</GuestGuard>,
    children: [
      {
        index: true,
        element: <Navigate to="product" replace />, // ✅ This is the key fix
      },
      {
        path: 'product',
        element: <Outlet />,
        children: [
          { index: true, element: <ProductListPage /> },
          { path: 'add-cart', element: <CartPage /> },
          {path:'checkout/:id',element:<CheckPage/>},
          { path: 'product-details/:id', element: <ProductDetailsPage /> },
        ],
      },
    ],
  },
];

export default dashboardRoutes;
