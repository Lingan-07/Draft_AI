import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import EmptyState from "../../../components/EmptyState";
import { reuseDraft } from "../../../api/draftApi";
import styles from "./Styles";

const RecentDraftTable = ({ drafts = [] }) => {
  const navigate = useNavigate();

  const handleReuse = async (id) => {
    try {
      const newDraft = await reuseDraft(id);

      toast.success("Draft reused successfully!");

      navigate(`/drafts/${newDraft.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to reuse draft.");
    }
  };

  return (
    <Box sx={styles.recent_draft_box}>
      <Card
        elevation={0}
        sx={styles.recent_draft_card}
      >
        <CardContent sx={styles.recent_draft_cardcontent}>
          <Typography
            variant="h5"
            fontWeight={700}
            mb={4}
          >
            My Drafts
          </Typography>

          {drafts.length === 0 ? (
            <EmptyState message="No drafts created yet." />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.recent_draft_cell}>
                    Title
                  </TableCell>

                  <TableCell sx={styles.recent_draft_cell}>
                    Type
                  </TableCell>

                  <TableCell sx={styles.recent_draft_cell}>
                    Tone
                  </TableCell>

                  <TableCell sx={styles.recent_draft_cell}>
                    Date
                  </TableCell>

                  <TableCell sx={styles.recent_draft_cell}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {drafts.map((draft) => (
                  <TableRow key={draft.id}>
                    <TableCell>{draft.title}</TableCell>

                    <TableCell>
                      {draft.message_type}
                    </TableCell>

                    <TableCell>{draft.tone}</TableCell>

                    <TableCell>
                      {new Date(
                        draft.created_at
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          handleReuse(draft.id)
                        }
                      >
                        Reuse
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecentDraftTable;