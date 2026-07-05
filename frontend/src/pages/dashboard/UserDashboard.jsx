import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";

import StatCard from "./components/StatCard";
import RecentDraftTable from "./components/RecentDraftTable";
import Loader from "../../components/Loader";
import styles from "./components/Styles";

import { getAllDrafts } from "../../api/draftApi";
import { getUserDashboard } from "../../api/dashboardApi";
import { useAuth } from "../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState([]);
  const [search, setSearch] = useState("");

  const loadDrafts = async (searchText = "") => {
    try {
      const draftData = await getAllDrafts(searchText);
      setDrafts(draftData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load drafts.");
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dashboardData = await getUserDashboard();
        setDashboard(dashboardData);

        await loadDrafts();
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDrafts(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Box mb={6}>
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
        >
          Welcome back, {user?.name}!
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={styles.user}
        >
          Create professional emails and messages faster with AI assistance.
        </Typography>
      </Box>

      <Box mb={6}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Drafts"
              value={dashboard?.total_drafts ?? 0}
              icon={<DescriptionRoundedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Generated Drafts"
              value={dashboard?.generated_drafts ?? 0}
              color="#14B8A6"
              icon={<AutoAwesomeRoundedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Templates"
              value={dashboard?.templates_available ?? 0}
              color="#F59E0B"
              icon={<LibraryBooksRoundedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="AI Generations"
              value={dashboard?.ai_generations ?? 0}
              color="#7C3AED"
              icon={<SmartToyRoundedIcon />}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <TextField
          size="small"
          placeholder="Search by title, subject or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={styles.textfield}
        />
      </Box>

      <RecentDraftTable drafts={drafts} />
    </Box>
  );
};

export default UserDashboard;