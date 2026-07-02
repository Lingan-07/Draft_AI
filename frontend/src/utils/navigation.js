import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

export const userMenu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: DashboardRoundedIcon,
  },
  {
    title: "Create Draft",
    path: "/drafts/create",
    icon: DescriptionRoundedIcon,
  },
  {
    title: "Templates",
    path: "/templates",
    icon: AutoAwesomeRoundedIcon,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: PersonRoundedIcon,
  },
];

export const adminMenu = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: DashboardRoundedIcon,
  },
  {
    title: "Manage Templates",
    path: "/admin/templates",
    icon: AdminPanelSettingsRoundedIcon,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: PersonRoundedIcon,
  },
];