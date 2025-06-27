import type { NavSectionProps } from 'src/components/nav-section';
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { iconButtonClasses } from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

// import { allLangs } from 'src/locales';
// import { _contacts, _notifications } from 'src/_mock';

import { Logo } from 'src/components/logo';
import { SettingsDrawer, useSettingsContext } from 'src/components/settings';

import { Main } from './main';
import { NavMobile } from './nav-mobile';
import { layoutClasses } from '../classes';
import { NavVertical } from './nav-vertical';
// import { NavHorizontal } from './nav-horizontal';
import { _account } from '../config-nav-account';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../config-nav-workspace';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { StyledDivider, useNavColorVars } from './styles';
import { AccountDrawer } from '../components/account-drawer';
// import { LanguagePopover } from '../components/language-popover';
// import { ContactsPopover } from '../components/contacts-popover';
// import { WorkspacesPopover } from '../components/workspaces-popover';
import { navData as dashboardNavData } from '../config-nav-dashboard';
import { NavHorizontal } from './nav-horizontal';
// import { NotificationsDrawer } from '../components/notifications-drawer';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  data?: {
    nav?: NavSectionProps['data'];
  };
};

export function DashboardLayout({ sx, children, header, data }: DashboardLayoutProps) {
  const theme = useTheme();
  const mobileNavOpen = useBoolean();
  const settings = useSettingsContext();

  // ✅ Force horizontal layout before computing layout flags
  settings.navLayout = 'horizontal';

  const navColorVars = useNavColorVars(theme, settings);
  const layoutQuery: Breakpoint = 'lg';
  const navData = data?.nav ?? dashboardNavData();

  // ✅ These now use the forced 'horizontal' setting correctly
  const isNavHorizontal = settings.navLayout === 'horizontal';

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            toolbar: {
              sx: {
                ...(isNavHorizontal && {
                  bgcolor: 'var(--layout-nav-bg)',
                  [`& .${iconButtonClasses.root}`]: {
                    color: 'var(--layout-nav-text-secondary-color)',
                  },
                  [theme.breakpoints.up(layoutQuery)]: {
                    height: 'var(--layout-nav-horizontal-height)',
                  },
                }),
              },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            bottomArea: isNavHorizontal ? (
              <NavHorizontal
                data={navData}
                layoutQuery={layoutQuery}
                cssVars={navColorVars.section}
              />
            ) : null,
            leftArea: (
              <>
                <MenuButton
                  onClick={mobileNavOpen.onTrue}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={mobileNavOpen.value}
                  onClose={mobileNavOpen.onFalse}
                  cssVars={navColorVars.section}
                />
                {isNavHorizontal && (
                  <Logo
                    sx={{
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
                    }}
                  />
                )}
                {isNavHorizontal && (
                  <StyledDivider
                    sx={{ [theme.breakpoints.up(layoutQuery)]: { display: 'flex' } }}
                  />
                )}
                <Searchbar data={navData} />
              </>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 0, sm: 0.75 }}>
                <SettingsDrawer />
                <AccountDrawer data={_account} />
              </Box>
            ),
          }}
        />
      }
      footerSection={null}
      cssVars={{
        ...navColorVars.layout,
        '--layout-transition-easing': 'linear',
        '--layout-transition-duration': '120ms',
        '--layout-nav-mini-width': '88px',
        '--layout-nav-vertical-width': '300px',
        '--layout-nav-horizontal-height': '64px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            transition: theme.transitions.create(['padding-left'], {
              easing: 'var(--layout-transition-easing)',
              duration: 'var(--layout-transition-duration)',
            }),
          },
        },
        ...sx,
      }}
    >
      <Main isNavHorizontal={isNavHorizontal}>{children}</Main>
    </LayoutSection>
  );
}

