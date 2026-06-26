import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 260;

const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        borderBottom: "1px solid #E5E7EB",
        height:80,
      }}
    >
      <Toolbar sx={{minHeight: 72, alignItems: "center"}}>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar
          sx={{
            ml: 2,
            bgcolor: "primary.main",
          }}
        >
          A
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;