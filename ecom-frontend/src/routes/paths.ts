// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  // DASHBOARD
  dashboard: {
    reports: {
      root: `${ROOTS.DASHBOARD}/report`,
      newReports: `${ROOTS.DASHBOARD}/report/add-report`,
      details: `${ROOTS.DASHBOARD}/report/report-details/:id`,
      edit: `${ROOTS.DASHBOARD}/report/report-edit`,
    },
  },
};
