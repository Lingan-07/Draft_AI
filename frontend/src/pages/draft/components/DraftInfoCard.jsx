import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import toast from "react-hot-toast";
import styles from "./Styles"

const DraftInfoCard = ({ draft }) => {
  const copyDraft = async () => {
    const text = `Subject: ${draft.subject ?? ""}

${draft.body ?? ""}`;

    await navigator.clipboard.writeText(text);

    toast.success("Copied to clipboard");
  };

  return (
    <Card
      elevation={0}
      sx={styles.info_card}
    >
      <CardContent sx={styles.info_cardcontent}>
        {/* Header */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={styles.info_typography}
            >
              {draft.title}
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
              sx={styles.info_typography}
            >
              AI Generated Draft
            </Typography>
          </Box>

          <Tooltip title="Copy Draft"
          sx={styles.info_tooltip}>
            <IconButton onClick={copyDraft}>
              <ContentCopyRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Chips */}

        <Stack
          direction="row"
          spacing={1.5}
          mt={3}
        >
          <Chip
            icon={
              draft.message_type === "EMAIL" ? (
                <EmailRoundedIcon />
              ) : (
                <ChatRoundedIcon />
              )
            }
            label={draft.message_type}
            color="primary"
          />

          <Chip
            label={draft.tone}
            color="success"
            variant="outlined"
          />

          <Chip
            label={draft.status}
            color="warning"
            variant="outlined"
          />
        </Stack>

        <Divider sx={styles.divider} />

        {/* Subject */}

        <Typography
          variant="subtitle2"
          color="text.secondary"
        >
          SUBJECT :
        </Typography>

        <Typography
          variant="h6"
          fontWeight={600}
          mt={1}
          mb={4}
        >
          {draft.subject || "No subject generated yet"}
        </Typography>

        {/* Body */}

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={styles.info_body_typography}
        >
          BODY :
        </Typography>

        <Box
          sx={styles.info_box}
        >
          {draft.body ||
            "Click Generate to create your draft using AI."}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DraftInfoCard;