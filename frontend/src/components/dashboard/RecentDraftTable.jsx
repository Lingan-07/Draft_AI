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

const rows = [
  {
    title: "Leave Request",
    type: "Email",
    tone: "Formal",
    date: "25 Jun 2026",
  },
  {
    title: "Client Follow Up",
    type: "Email",
    tone: "Professional",
    date: "24 Jun 2026",
  },
  {
    title: "Team Update",
    type: "Message",
    tone: "Friendly",
    date: "23 Jun 2026",
  },
];

const RecentDraftTable = () => {
  return (
    <Box sx={{mt:6}}>
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

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.title}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.tone}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </Box>
  );
};

export default RecentDraftTable;