import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import toast from "react-hot-toast";
import styles from "./Styles"

const DraftInfoCard = (props) => {
  const {draft, loading, onSave} = props;
  const [editing, setEditing] = useState(false);

  const [subject, setSubject] = useState(
    draft.subject ?? ""
  );

  const [body, setBody] = useState(
    draft.body ?? ""
  );

  useEffect(() => {
    setSubject(draft.subject ?? "");
    setBody(draft.body ?? "");
  }, [draft]);

  const copyDraft = async () => {
    const text = `Subject: ${draft.subject ?? ""}
    ${draft.body ?? ""}`;
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleSave = async () => {
    await onSave({
      subject,
      body,
    });

    setEditing(false);
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

        {editing ? (
          <TextField
            fullWidth
            size="small"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            sx={{ mt: 1, mb: 4 }}
          />
        ) : (
          <Typography
            variant="h6"
            fontWeight={600}
            mt={1}
            mb={4}
          >
            {draft.subject ||
              "No subject generated yet"}
          </Typography>
        )}

        {/* Body */}

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={styles.info_body_typography}
        >
          BODY :
        </Typography>

        {editing ? (
          <TextField
            multiline
            minRows={10}
            fullWidth
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            }
          />
        ) : (
          <Box sx={styles.info_box}>
            {draft.body ||
              "Click Generate to create your draft using AI."}
          </Box>
        )}

        <Stack
          direction="row"
          sx={styles.info_button}
        >
          {editing ? (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  setSubject(draft.subject ?? "");
                  setBody(draft.body ?? "");
                  setEditing(false);
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DraftInfoCard;