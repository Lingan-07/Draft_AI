import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import toast from "react-hot-toast";

import PageHeader from "../../components/PageHeader";
import styles from "./components/Styles"
import { getDraftVersions } from "../../api/draftApi";

const DraftHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVersions = useCallback(async () => {
    try {
      const data = await getDraftVersions(id);
      setVersions(data);
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Failed to load version history."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadVersions();
  }, [loadVersions]);

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

  return (
    <Box>
      <PageHeader title="Draft Version History" />

      <Button
        startIcon={<ArrowBackRoundedIcon />}
        sx={styles.history_button}
        onClick={() =>
          navigate(`/drafts/${id}`)
        }
      >
        Back to Draft
      </Button>

      {versions.length === 0 ? (
        <Typography
          color="text.secondary"
          textAlign="center"
          mt={8}
        >
          No versions available.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {versions
            .slice()
            .reverse()
            .map((version) => (
              <Card
                key={version.id}
                elevation={0}
                sx={styles.history_card}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                    sx={styles.history_stack}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      Version {version.version_no}
                    </Typography>

                    <Chip
                      label={version.tone}
                      color="primary"
                    />
                  </Stack>

                  <Divider sx={styles.history_divider} />

                  <Typography
                    variant="subtitle2"
                    gutterBottom
                  >
                    Subject
                  </Typography>

                  <Typography
                    sx={styles.history_typography}
                  >
                    {version.subject || "-"}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    gutterBottom
                  >
                    Body
                  </Typography>

                  <Box
                    sx={styles.history_box}
                  >
                    {version.body}
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={styles.history_created}
                  >
                    {new Date(
                      version.created_at
                    ).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Stack>
      )}
    </Box>
  );
};

export default DraftHistory;