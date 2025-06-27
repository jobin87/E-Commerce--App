import { lazy, Suspense, useMemo } from "react";
import { Outlet } from "react-router-dom";

// Roles
// const StaffRolesList = lazy(() => import('src/pages/dashboard/settings/staff/roles'));

import { LoadingScreen } from "src/components/loading-screen";

import { DashboardLayout } from "src/layouts/dashboard/layout";
import ReportEditForm from "src/sections/reports/edit-report";
import ReportFormPage from "src/sections/reports/report-form";
import ReportDetailsPage from "src/sections/reports/report-details";
import { useUser } from "src/hooks/use-user";

// ----------------------------------------------------------------------

const ReportPage = lazy(() => import("src/pages/reports/reports"));

// const GeneralPage = lazy(() => import('src/pages/dashboard/user/general-account'));

// ----------------------------------------------------------------------

// Layout wrapper with a loading fallback
const LayoutContent = () => (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

// Component to determine routes based on role
export const dashboardRoutes = [
  {
    path: "dashboard",
    element: <LayoutContent/>,
    children: [
      {
        path: "report",
        children: [
          { element: <ReportPage />, index: true },
          { path: "add-report", element: <ReportFormPage /> },
          { path: "report-details/:id", element: <ReportDetailsPage /> },
          { path: "report-edit", element: <ReportEditForm /> },
        ],
      },
    ],
  },
];
