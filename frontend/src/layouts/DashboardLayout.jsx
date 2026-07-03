import { Box, Toolbar } from "@mui/material";

import Sidebar from "../pages/dashboard/components/Sidebar";
import Header from "../pages/dashboard/components/Header";
import styles from "./Styles";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={styles.dashboard_box}>
      <Sidebar />

      <Header />

      <Box
        component="main"
        sx={styles.main_box}
      >
        <Toolbar />

        <Box
          sx={styles.children_box}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;