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
} from "@mui/material";

import EmptyState from "../../../components/EmptyState";
import styles from "./Styles";

const RecentDraftTable = ({ drafts = [] }) => {
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
            Recent Drafts
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
                </TableRow>
              </TableHead>

              <TableBody>
                {drafts.slice(0, 5).map((draft) => (
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