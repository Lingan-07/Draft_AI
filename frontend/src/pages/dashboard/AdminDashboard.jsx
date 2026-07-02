import { useCallback, useEffect, useState } from "react";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import toast from "react-hot-toast";

import StatCard from "./components/StatCard";
import { getAdminDashboard } from "../../api/dashboardApi";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    try {
      const data = await getAdminDashboard();
      setDashboard(data);
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={8}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <Box>
      <Box mb={6}>
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
        >
          Admin Dashboard
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx = {{pb:5}}
        >
          Monitor users, templates and AI usage.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Users"
            value={dashboard.total_users}
            icon={<GroupRoundedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Drafts"
            value={dashboard.total_drafts}
            color="#14B8A6"
            icon={<DescriptionRoundedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="AI Generations"
            value={dashboard.total_ai_generations}
            color="#7C3AED"
            icon={<AutoAwesomeRoundedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Templates"
            value={dashboard.active_templates}
            color="#F59E0B"
            icon={<DescriptionOutlinedIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;