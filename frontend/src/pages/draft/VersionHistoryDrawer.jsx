import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import toast from "react-hot-toast";
import styles from "./components/Styles";

import { getDraftVersions } from "../../api/draftApi";

const VersionHistoryDrawer = ({
  open,
  onClose,
  draftId,
}) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !draftId) return;

    const loadVersions = async () => {
      try {
        setLoading(true);

        const data = await getDraftVersions(draftId);

        setVersions(data);
      } catch (error) {
        toast.error(
          error.response?.data?.detail ??
            "Failed to load versions."
        );
      } finally {
        setLoading(false);
      }
    };

    loadVersions();
  }, [open, draftId]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={styles.version_box}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={3}
        >
          <HistoryRoundedIcon color="primary" />

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Version History
          </Typography>
        </Stack>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            mt={8}
          >
            <CircularProgress />
          </Box>
        ) : versions.length === 0 ? (
          <Typography color="text.secondary">
            No versions available.
          </Typography>
        ) : (
          versions.map((version) => (
            <Box
              key={version.id}
              sx={styles.version_map_box}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                mb={2}
              >
                <Typography fontWeight={700}>
                  Version {version.version_no}
                </Typography>

                <Chip
                  label={version.tone}
                  size="small"
                  color="primary"
                />
              </Stack>

              <Typography
                variant="subtitle2"
                color="text.secondary"
              >
                Subject
              </Typography>

              <Typography mb={2}>
                {version.subject}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
              >
                Body
              </Typography>
              <Box
              sx={styles.version_typography_box}>
              <Typography
                sx={styles.version_typography}
              >
                {version.body}
              </Typography>
              </Box>
              <Divider sx={styles.version_divider} />

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {new Date(
                  version.created_at
                ).toLocaleString()}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Drawer>
  );
};

export default VersionHistoryDrawer;