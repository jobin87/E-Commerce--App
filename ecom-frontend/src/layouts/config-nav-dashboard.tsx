import { paths } from "src/routes/paths";
import { CONFIG } from "src/config-global";
import { SvgColor } from "src/components/svg-color";
import { useUser } from "src/hooks/use-user";

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  overview: icon("ic-overview"),
  appointment: icon("ic-appointment"),
  doctor: icon("ic-doctor"),
  patient: icon("ic-patient"),
  treatment: icon("ic-treatment"),
  reports: icon("ic-reports"),
  inventory: icon("ic-inventory"),
  blog: icon("ic-blog"),
  chat: icon("ic-chat"),
  mail: icon("ic-mail"),
  user: icon("ic-user"),
  file: icon("ic-file"),
  lock: icon("ic-lock"),
  tour: icon("ic-tour"),
  order: icon("ic-order"),
  label: icon("ic-label"),
  blank: icon("ic-blank"),
  kanban: icon("ic-kanban"),
  folder: icon("ic-folder"),
  course: icon("ic-course"),
  banking: icon("ic-banking"),
  booking: icon("ic-booking"),
  invoice: icon("ic-invoice"),
  product: icon("ic-product"),
  calendar: icon("ic-calendar"),
  disabled: icon("ic-disabled"),
  external: icon("ic-external"),
  menuItem: icon("ic-menu-item"),
  ecommerce: icon("ic-ecommerce"),
  analytics: icon("ic-analytics"),
  dashboard: icon("ic-dashboard"),
  parameter: icon("ic-parameter"),
};

// Role-based navigation data
export const navData = () => {
  const { role } = useUser();

  return [
    /**
     * Management (Only for Managers)
     */
     
    /**
     * General
     */
    {
      items: [
        {
          title: "Products",
          path: paths.dashboard.reports.root,
          icon: ICONS.appointment,
        },
        {
          title: "Patients",
          path: paths.dashboard.reports.root,
          icon: ICONS.patient,
        },
        {
          title: "Doctors",
          path: paths.dashboard.reports.newReports,
          icon: ICONS.doctor,
        },
       
        {
          title: "Treatments",
          path: paths.dashboard.reports.newReports,
          icon: ICONS.treatment,
        },
        
      ],
    },
  ];
};
