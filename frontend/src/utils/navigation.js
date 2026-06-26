import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export const userMenu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: DashboardRoundedIcon,
  },
  {
    title: "Create Draft",
    path: "/create",
    icon: EditNoteRoundedIcon,
  },
  {
    title: "Draft History",
    path: "/history",
    icon: HistoryRoundedIcon,
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
    title: "Templates",
    path: "/admin/templates",
    icon: DescriptionRoundedIcon,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: PersonRoundedIcon,
  },
];