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
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
      }}
    >
      <CardContent sx={{ p: 4 }}>
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
              sx={{ pb: 1}}
            >
              {draft.title}
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
              sx={{ pb: 1}}
            >
              AI Generated Draft
            </Typography>
          </Box>

          <Tooltip title="Copy Draft"
          sx={{bottom: 20}}>
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

        <Divider sx={{ my: 4 }} />

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
          sx={{ pt: 3}}
        >
          BODY :
        </Typography>

        <Box
          sx={{
            mt: 2,
            p: 3,
            bgcolor: "background.paper",
            color: "text.primary",
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            minHeight: 350,
            whiteSpace: "pre-wrap",
            lineHeight: 1.8,
            fontSize: 15,
          }}
        >
          {draft.body ||
            "Click Generate to create your draft using AI."}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DraftInfoCard;