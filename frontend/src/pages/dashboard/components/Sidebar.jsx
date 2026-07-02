import { useContext } from "react";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

import {
  userMenu,
  adminMenu,
} from "../../../utils/navigation";

const drawerWidth = 260;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const menu =
    user?.role === "ADMIN"
      ? adminMenu
      : userMenu;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #E5E7EB",
          bgcolor: "background.default",
          color: "text.primary",
        },
      }}
    >
      <Box p={3} pb={10}>
        <Typography
          sx={{ pt: 1 }}
          variant="h5"
          fontWeight="bold"
          color="primary"
          align="center"
        >
          AI Assistant
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          Email & Message Draft
        </Typography>
      </Box>

      <Divider sx={{ mt: 2.4 }} />

      <List>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <ListItemButton
              key={item.title}
              selected={
                location.pathname === item.path
              }
              onClick={() =>
                navigate(item.path)
              }
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,

                "&.Mui-selected": {
                  backgroundColor: "#E8F0FE",
                  color: "#2563EB",
                },

                "&.Mui-selected .MuiListItemIcon-root":
                  {
                    color: "#2563EB",
                  },

                "&:hover": {
                  backgroundColor: "#F3F4F6",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                }}
              >
                <Icon />
              </ListItemIcon>

              <ListItemText
                primary={item.title}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            mx: 1,
            mb: 2,
            borderRadius: 2,

            "&:hover": {
              backgroundColor: "#FEF2F2",
              color: "#DC2626",
            },

            "&:hover .MuiListItemIcon-root": {
              color: "#DC2626",
            },
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;