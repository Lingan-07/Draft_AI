import { Box, Toolbar } from "@mui/material";

import Sidebar from "../pages/dashboard/components/Sidebar";
import Header from "../pages/dashboard/components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          color: "text.primary",
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