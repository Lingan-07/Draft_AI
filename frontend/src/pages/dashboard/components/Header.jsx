import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

import { getProfile } from "../../../api/profileApi";
import ThemeToggle from "../../../components/ThemeToggle";

const drawerWidth = 260;

const Header = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        borderBottom: "1px solid #E5E7EB",
        height: 80,
      }}
    >
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Dashboard
        </Typography>


        {profile && (
          <Box sx={{display: "flex", gap:2}}>
           <ThemeToggle />
            <Avatar
              sx={{
                width: 45,
                height: 45,
                bgcolor: "primary.main",
                fontWeight: 700,
              }}
            >
              {profile.name.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;