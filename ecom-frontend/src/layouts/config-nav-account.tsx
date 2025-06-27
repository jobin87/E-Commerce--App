import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const _account = [
  {
    label: 'Security',
    href: paths.dashboard.reports.root,
    icon: <Iconify icon="solar:shield-keyhole-bold-duotone" />,
  },
  {
    label: 'Account settings',
    href: paths.dashboard.reports.details,
    icon: <Iconify icon="solar:settings-bold-duotone" />,
  },
];
