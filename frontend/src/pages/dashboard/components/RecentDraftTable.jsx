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

const RecentDraftTable = ({ drafts = [] }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        <CardContent sx={{ p: 4 }}>
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
                  <TableCell sx={{ fontWeight: 700 }}>
                    Title
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Type
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Tone
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
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