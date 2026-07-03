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

import styles from "./Styles";

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
      sx={styles.sidebar_drawer}
    >
      <Box p={3} pb={10}>
        <Typography
          sx={styles.sidebar_typography}
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

      <Divider sx={styles.sidebar_divider} />

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
              sx={styles.sidebar_listitem}
            >
              <ListItemIcon
                sx={styles.sidebar_listitemicon}
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

      <Box sx={styles.sidebar_box} />

      <Divider />

      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={styles.sidebar_logout}
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