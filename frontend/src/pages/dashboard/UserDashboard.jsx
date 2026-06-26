import { Box, Grid, Typography } from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import StatCard from "../../components/dashboard/StatCard";
import RecentDraftTable from "../../components/dashboard/RecentDraftTable";

const UserDashboard = () => {
  return (
    <Box>

      {/* Greeting */}

      <Box mb={6}>
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
        >
          Welcome back, User!
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{pb:3}}
        >
          Create professional emails and messages faster with AI assistance.
        </Typography>
      </Box>

      {/* Statistics */}

      <Box mb={6}>
        <Grid container spacing={2.5}>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Drafts"
              value="24"
              icon={<DescriptionRoundedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Emails"
              value="18"
              color="#14B8A6"
              icon={<EmailRoundedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Messages"
              value="6"
              color="#F59E0B"
              icon={<ChatRoundedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="AI Requests"
              value="52"
              color="#7C3AED"
              icon={<AutoAwesomeRoundedIcon />}
            />
          </Grid>

        </Grid>
      </Box>

      {/* Recent Drafts */}

      <RecentDraftTable />

    </Box>
  );
};

export default UserDashboard;