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
import styles from "./Styles";

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
      sx={styles.header_appbar}
    >
      <Toolbar
        sx={styles.header_toolbar}
      >
        <Typography variant="h6" fontWeight={700}>
          Dashboard
        </Typography>


        {profile && (
          <Box sx={styles.header_box}>
           <ThemeToggle />
            <Avatar
              sx={styles.header_avatar}
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