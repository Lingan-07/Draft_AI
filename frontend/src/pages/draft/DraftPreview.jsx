import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Skeleton,
} from "@mui/material";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/PageHeader";
import styles from "./components/Styles"
import DraftInfoCard from "./components/DraftInfoCard";
import DraftActionCard from "./components/DraftActionCard";

import {
  getDraft,
  generateDraft,
  rewriteDraft,
  improveDraft,
  expandDraft,
  shortenDraft,
  changeTone,
} from "../../api/draftApi";

const DraftPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);


  const loadDraft = useCallback(async () => {
  try {
    const data = await getDraft(id);
    setDraft(data);
  } catch {
    toast.error("Failed to load draft.");
  } finally {
    setLoading(false);
  }
}, [id]);

  useEffect(() => {
    loadDraft();
  }, [loadDraft]);
  

  const executeAction = async (apiCall, ...args) => {
    try {
      setActionLoading(true);

      await apiCall(id, ...args);

      await loadDraft();

      toast.success("Draft updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Something went wrong."
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Box>
        <PageHeader title="Draft Preview" />

        <Skeleton
          variant="rounded"
          height={500}
          sx={styles.preview_skeleton}
        />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader title="Draft Preview" />

      <Grid
        container
        spacing={3}
        sx={styles.preview_grid}
      >
        <Grid size={{ xs: 12, md: 8 }}>
          <DraftInfoCard draft={draft} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DraftActionCard
            loading={actionLoading}
            tone={draft.tone}
            draft={draft}
            onGenerate={() =>
              executeAction(generateDraft)
            }
            onRewrite={() =>
              executeAction(rewriteDraft)
            }
            onImprove={() =>
              executeAction(improveDraft)
            }
            onExpand={() =>
              executeAction(expandDraft)
            }
            onShorten={() =>
              executeAction(shortenDraft)
            }
            onChangeTone={(tone) =>
              executeAction(changeTone, tone)
            }
            onHistory={() =>
              navigate(`/drafts/${id}/history`)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DraftPreview;