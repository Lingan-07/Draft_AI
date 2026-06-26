import { Box, Toolbar } from "@mui/material";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#F5F7FB",
          minHeight: "100vh",
          px: 5,
          py: 4,
        }}
      >
        <Toolbar />

        <Box
          sx={{
            maxWidth: 1400,
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;